#!/usr/bin/env python3
"""Inject native DrawingML OMML math equations into PPTX presentations.

Converts LaTeX math expressions ($inline$ and $$display$$ or {{MATH:...}} placeholders)
into native PowerPoint OMML (<a14:m><m:oMath>...</m:oMath></a14:m>) using Pandoc,
wrapping shapes in mc:AlternateContent with fallback for maximum compatibility.
"""

from __future__ import annotations

import argparse
import copy
import io
import json
import re
import subprocess
import sys
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path


A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
P = "{http://schemas.openxmlformats.org/presentationml/2006/main}"
M = "{http://schemas.openxmlformats.org/officeDocument/2006/math}"
MC = "{http://schemas.openxmlformats.org/markup-compatibility/2006}"
A14 = "{http://schemas.microsoft.com/office/drawing/2010/main}"
XML_NS = "{http://www.w3.org/XML/1998/namespace}"

ET.register_namespace("a", "http://schemas.openxmlformats.org/drawingml/2006/main")
ET.register_namespace("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
ET.register_namespace("p", "http://schemas.openxmlformats.org/presentationml/2006/main")
ET.register_namespace("m", "http://schemas.openxmlformats.org/officeDocument/2006/math")
ET.register_namespace("mc", "http://schemas.openxmlformats.org/markup-compatibility/2006")
ET.register_namespace("a14", "http://schemas.microsoft.com/office/drawing/2010/main")

MATH_PATTERN = re.compile(r"(\$\$.+?\$\$|\$[^\$\n]+?\$|\{\{MATH:[^}]+?\}\})", re.DOTALL)


def split_text_math(text: str) -> list[tuple[str, str]]:
    """Split text into a sequence of ('text'|'inline'|'display', content) tokens."""
    tokens: list[tuple[str, str]] = []
    last_end = 0
    for match in MATH_PATTERN.finditer(text):
        start, end = match.span()
        if start > last_end:
            tokens.append(("text", text[last_end:start]))
        token = match.group(0)
        if token.startswith("$$") and token.endswith("$$"):
            tokens.append(("display", token[2:-2].strip()))
        elif token.startswith("$") and token.endswith("$"):
            tokens.append(("inline", token[1:-1].strip()))
        elif token.startswith("{{MATH:"):
            inner = token[7:-2].strip()
            if inner.startswith("display:"):
                tokens.append(("display", inner[8:].strip()))
            elif inner.startswith("inline:"):
                tokens.append(("inline", inner[7:].strip()))
            else:
                tokens.append(("inline", inner))
        last_end = end
    if last_end < len(text):
        tokens.append(("text", text[last_end:]))
    return tokens


def batch_latex_to_omml(expressions: list[tuple[str, bool]]) -> dict[tuple[str, bool], ET.Element]:
    """Batch convert list of (latex_code, is_display) tuples into OMML elements via Pandoc."""
    unique_exprs = list(dict.fromkeys(expressions))
    if not unique_exprs:
        return {}

    lines = []
    for code, is_display in unique_exprs:
        clean = code.strip()
        if is_display:
            lines.append(f"$${clean}$$\n")
        else:
            lines.append(f"- ${clean}$")
    md_content = "\n".join(lines)

    proc = subprocess.run(
        ["pandoc", "-f", "markdown", "-t", "pptx", "-o", "-"],
        input=md_content.encode("utf-8"),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=True,
    )

    with zipfile.ZipFile(io.BytesIO(proc.stdout)) as archive:
        slide_xml = archive.read("ppt/slides/slide1.xml")

    root = ET.fromstring(slide_xml)
    m_nodes = list(root.iter(f"{A14}m"))
    if len(m_nodes) != len(unique_exprs):
        raise RuntimeError(
            f"Pandoc OMML node count mismatch: expected {len(unique_exprs)}, got {len(m_nodes)}"
        )

    return {expr: node for expr, node in zip(unique_exprs, m_nodes)}


def style_omml_runs(m_elem: ET.Element, rPr_template: ET.Element | None) -> None:
    """Style math runs with Cambria Math and inherited font size/fill."""
    target_sz = rPr_template.get("sz") if rPr_template is not None else None
    fill = rPr_template.find(f"{A}solidFill") if rPr_template is not None else None

    for r in m_elem.iter(f"{M}r"):
        rPr = r.find(f"{A}rPr")
        if rPr is None:
            rPr = ET.Element(f"{A}rPr")
            r.insert(0, rPr)
        if target_sz and "sz" not in rPr.attrib:
            rPr.set("sz", target_sz)
        latin = rPr.find(f"{A}latin")
        if latin is None:
            latin = ET.SubElement(rPr, f"{A}latin")
        latin.set("typeface", "Cambria Math")
        if fill is not None and rPr.find(f"{A}solidFill") is None:
            rPr.append(copy.deepcopy(fill))


def transform_paragraph(
    p: ET.Element,
    omml_cache: dict[tuple[str, bool], ET.Element],
) -> int:
    """Transform paragraph text runs containing math into text + a14:m elements.
    
    Returns the number of math formulas injected into this paragraph.
    """
    raw_runs = p.findall(f"{A}r")
    if not raw_runs:
        return 0

    full_text = "".join(t.text or "" for r in raw_runs for t in r.findall(f"{A}t"))
    tokens = split_text_math(full_text)
    math_count = sum(1 for kind, _ in tokens if kind in {"inline", "display"})
    if math_count == 0:
        return 0

    # Pick representative rPr and endParaRPr
    first_rPr = raw_runs[0].find(f"{A}rPr")
    pPr = p.find(f"{A}pPr")
    endParaRPr = p.find(f"{A}endParaRPr")

    p.clear()
    if pPr is not None:
        p.append(pPr)

    for kind, content in tokens:
        if kind == "text":
            if not content:
                continue
            r = ET.SubElement(p, f"{A}r")
            if first_rPr is not None:
                r.append(copy.deepcopy(first_rPr))
            t = ET.SubElement(r, f"{A}t")
            t.text = content
            if content.startswith(" ") or content.endswith(" "):
                t.set(f"{XML_NS}space", "preserve")
        elif kind in {"inline", "display"}:
            is_display = (kind == "display")
            key = (content, is_display)
            if key in omml_cache:
                m_copy = copy.deepcopy(omml_cache[key])
                style_omml_runs(m_copy, first_rPr)
                p.append(m_copy)

    if endParaRPr is not None:
        p.append(endParaRPr)

    return math_count


def transform_shape(
    sp: ET.Element,
    omml_cache: dict[tuple[str, bool], ET.Element],
    *,
    with_fallback: bool = True,
) -> tuple[ET.Element, int]:
    """Transform math in a single shape, wrapping in mc:AlternateContent if modified.
    
    Returns (result_element, formulas_injected).
    """
    txBody = sp.find(f"{P}txBody")
    if txBody is None:
        return sp, 0

    paragraphs = txBody.findall(f"{A}p")
    total_injected = 0
    fallback_copy = copy.deepcopy(sp) if with_fallback else None

    for p in paragraphs:
        total_injected += transform_paragraph(p, omml_cache)

    if total_injected == 0:
        return sp, 0

    if not with_fallback:
        return sp, total_injected

    alt = ET.Element(f"{MC}AlternateContent")
    choice = ET.SubElement(alt, f"{MC}Choice", {"Requires": "a14"})
    choice.append(sp)
    fallback = ET.SubElement(alt, f"{MC}Fallback")
    fallback.append(fallback_copy)
    return alt, total_injected


def get_presentation_slide_order(archive: zipfile.ZipFile) -> list[str]:
    """Return slide XML member paths in presentation order."""
    R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
    P = "{http://schemas.openxmlformats.org/presentationml/2006/main}"
    try:
        pres = ET.fromstring(archive.read("ppt/presentation.xml"))
        rels = ET.fromstring(archive.read("ppt/_rels/presentation.xml.rels"))
        rel_map = {r.get("Id"): r.get("Target") for r in rels}
        paths = []
        sldIdLst = pres.find(f"{P}sldIdLst")
        if sldIdLst is not None:
            for item in sldIdLst:
                rid = item.get(f"{R}id")
                target = rel_map.get(rid, "")
                path = target.lstrip("/") if target.startswith("/") else f"ppt/{target}"
                if path in archive.namelist():
                    paths.append(path)
        if paths:
            return paths
    except Exception:
        pass
    # Fallback to numeric sorting by slide number
    return sorted(
        [name for name in archive.namelist() if re.fullmatch(r"ppt/slides/slide\d+\.xml", name)],
        key=lambda name: int(re.search(r"\d+", name).group(0)),
    )


def collect_math_expressions(
    archive: zipfile.ZipFile,
    slide_numbers: set[int] | None = None,
    map_dict: dict[str, str] | None = None,
) -> list[tuple[str, bool]]:
    """Scan all target slides and collect all (latex_code, is_display) expressions."""
    expressions: list[tuple[str, bool]] = []
    slide_files = get_presentation_slide_order(archive)

    for idx, slide_path in enumerate(slide_files, 1):
        if slide_numbers is not None and idx not in slide_numbers:
            continue
        xml_bytes = archive.read(slide_path)
        root = ET.fromstring(xml_bytes)
        for t in root.iter(f"{A}t"):
            text = t.text or ""
            if map_dict:
                for k, v in map_dict.items():
                    text = text.replace(k, v)
            for kind, content in split_text_math(text):
                if kind == "inline":
                    expressions.append((content, False))
                elif kind == "display":
                    expressions.append((content, True))
    return expressions


def inject_math_deck(
    input_path: Path,
    output_path: Path | None = None,
    *,
    slide_numbers: set[int] | None = None,
    with_fallback: bool = True,
    map_dict: dict[str, str] | None = None,
) -> dict:
    """Inject native OMML math into a PPTX presentation file."""
    if output_path is None:
        output_path = input_path.with_name(f"{input_path.stem}.math{input_path.suffix}")

    with zipfile.ZipFile(input_path, "r") as src_zip:
        bad = src_zip.testzip()
        if bad:
            raise ValueError(f"Corrupt source PPTX archive: {bad}")

        # 1. Collect all math expressions across targeted slides
        expressions = collect_math_expressions(src_zip, slide_numbers, map_dict)
        if not expressions:
            # No math found, copy input to output
            output_path.write_bytes(input_path.read_bytes())
            return {
                "ok": True,
                "input": str(input_path),
                "output": str(output_path),
                "formulas_injected": 0,
                "slides_modified": 0,
            }

        # 2. Batch convert all expressions via Pandoc
        omml_cache = batch_latex_to_omml(expressions)

        # 3. Transform slide XMLs
        slide_files = get_presentation_slide_order(src_zip)
        total_injected = 0
        modified_slides = 0
        new_parts: dict[str, bytes] = {}

        for idx, slide_path in enumerate(slide_files, 1):
            if slide_numbers is not None and idx not in slide_numbers:
                continue

            root = ET.fromstring(src_zip.read(slide_path))

            # Apply map_dict text replacement if requested
            if map_dict:
                for t in root.iter(f"{A}t"):
                    if t.text:
                        for k, v in map_dict.items():
                            t.text = t.text.replace(k, v)

            spTree = root.find(f".//{P}spTree")
            if spTree is None:
                continue

            slide_injected = 0
            children = list(spTree)
            for child_idx, child in enumerate(children):
                if child.tag == f"{P}sp":
                    replacement, count = transform_shape(
                        child, omml_cache, with_fallback=with_fallback
                    )
                    if count > 0:
                        slide_injected += count
                        spTree.remove(child)
                        spTree.insert(child_idx, replacement)

            if slide_injected > 0:
                total_injected += slide_injected
                modified_slides += 1
                new_parts[slide_path] = ET.tostring(root, encoding="utf-8", xml_declaration=True)

        # 4. Write back new PPTX archive
        with zipfile.ZipFile(output_path, "w", compression=zipfile.ZIP_DEFLATED) as dst_zip:
            for item in src_zip.infolist():
                if item.filename in new_parts:
                    dst_zip.writestr(item.filename, new_parts[item.filename])
                else:
                    dst_zip.writestr(item, src_zip.read(item.filename))

    return {
        "ok": True,
        "input": str(input_path),
        "output": str(output_path),
        "formulas_injected": total_injected,
        "slides_modified": modified_slides,
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pptx", type=Path, help="Input PPTX presentation")
    parser.add_argument("output", type=Path, nargs="?", default=None, help="Output PPTX path")
    parser.add_argument("--slides", type=str, default=None, help="Comma-separated slide numbers (1-based), e.g. 6,7")
    parser.add_argument("--no-fallback", action="store_true", help="Do not emit mc:Fallback element")
    parser.add_argument("--map-json", type=Path, default=None, help="JSON file with text-to-latex replacements")
    parser.add_argument("--in-place", action="store_true", help="Overwrite input PPTX in place")
    parser.add_argument("--json", action="store_true", help="Output result as JSON")

    args = parser.parse_args(argv)

    slide_numbers = None
    if args.slides:
        try:
            slide_numbers = {int(x.strip()) for x in args.slides.split(",") if x.strip()}
        except ValueError:
            print("Error: --slides must be comma-separated integers, e.g. 6,7", file=sys.stderr)
            return 1

    map_dict = None
    if args.map_json:
        try:
            map_dict = json.loads(args.map_json.read_text(encoding="utf-8"))
        except Exception as exc:
            print(f"Error reading --map-json: {exc}", file=sys.stderr)
            return 1

    output_path = args.output
    if args.in_place:
        output_path = args.pptx

    try:
        result = inject_math_deck(
            args.pptx,
            output_path,
            slide_numbers=slide_numbers,
            with_fallback=not args.no_fallback,
            map_dict=map_dict,
        )
    except Exception as exc:
        if args.json:
            print(json.dumps({"ok": False, "error": str(exc)}, indent=2))
        else:
            print(f"FAIL: {exc}", file=sys.stderr)
        return 1

    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(
            f"PASS: Injected {result['formulas_injected']} formulas across "
            f"{result['slides_modified']} slides -> {result['output']}"
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
