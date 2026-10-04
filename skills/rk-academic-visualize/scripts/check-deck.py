#!/usr/bin/env python3
"""Validate PPTX structure against a JSON slide plan.

This checks OOXML structure and text. Visual hierarchy, images, and whether a
sentence is truly one key idea still need visual inspection.
"""

from __future__ import annotations

import argparse
import json
import math
import posixpath
import re
import sys
import unicodedata
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path


A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
P = "{http://schemas.openxmlformats.org/presentationml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
PKG_REL = "{http://schemas.openxmlformats.org/package/2006/relationships}"
KINDS = {"cover", "toc", "section", "content", "recap", "conclusion", "qa"}
BODY_KINDS = {"content", "recap", "conclusion"}
DECK_TYPES = {"research_talk", "lecture", "internal_report"}
QA_PATTERN = re.compile(r"(?:q\s*(?:&|and)\s*a|questions?\s*(?:&|and)\s*answers?)", re.I)
SLIDE_MEMBER = re.compile(r"ppt/slides/[^/]+\.xml\Z")
EPSILON = 1  # One EMU accommodates integer rounding in group transforms.


def normal(value: str) -> str:
    return " ".join(unicodedata.normalize("NFKC", value).casefold().split())


def roman(number: int) -> str:
    pieces = []
    for value, symbol in ((1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
                          (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
                          (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")):
        count, number = divmod(number, value)
        pieces.append(symbol * count)
    return "".join(pieces)


def validate_plan(plan: object) -> list[str]:
    errors: list[str] = []
    if not isinstance(plan, dict) or not isinstance(plan.get("slides"), list):
        return ["Plan must be a JSON object with a 'slides' array."]
    slides = plan["slides"]
    deck_type = plan.get("deck_type", "research_talk")
    if not isinstance(deck_type, str) or deck_type not in DECK_TYPES:
        errors.append(f"Invalid deck_type {deck_type!r}; use research_talk, lecture, or internal_report.")
    if len(slides) < 5:
        errors.append("Plan needs a cover, TOC, section content, and a closing section.")
    for number, slide in enumerate(slides, 1):
        label = f"Plan slide {number}"
        if not isinstance(slide, dict):
            errors.append(f"{label} must be an object.")
            continue
        kind = slide.get("kind")
        if not isinstance(kind, str) or kind not in KINDS:
            errors.append(f"{label} has invalid kind {kind!r}.")
            continue
        title = slide.get("title")
        if not isinstance(title, str) or not title.strip():
            errors.append(f"{label} needs a nonempty 'title' string.")
        section = slide.get("section")
        if kind in {"section", *BODY_KINDS}:
            if not isinstance(section, str) or not section.strip():
                errors.append(f"{label} ({kind}) needs a nonempty 'section' string.")
        elif section is not None:
            errors.append(f"{label} ({kind}) must have null or absent 'section'.")
        ideas = slide.get("ideas", [])
        if not isinstance(ideas, list) or any(not isinstance(x, str) or not x.strip() for x in ideas):
            errors.append(f"{label} 'ideas' must be an array of nonempty strings.")
        elif kind in {"content", "recap"} and not 1 <= len(ideas) <= 3:
            errors.append(f"{label} ({kind}) needs 1–3 key ideas; found {len(ideas)}.")
        elif kind == "conclusion" and not 1 <= len(ideas) <= (2 if deck_type == "research_talk" else 3):
            limit = "1–2" if deck_type == "research_talk" else "1–3"
            errors.append(f"{label} (conclusion) needs {limit} key ideas; found {len(ideas)}.")
        elif kind not in BODY_KINDS and ideas:
            errors.append(f"{label} ({kind}) must not list key ideas.")
        if kind == "toc":
            sections = slide.get("sections")
            if not isinstance(sections, list) or not sections or any(
                not isinstance(x, str) or not x.strip() for x in sections
            ):
                errors.append(f"{label} needs a nonempty 'sections' array of names.")
            elif len({normal(x) for x in sections}) != len(sections):
                errors.append(f"{label} lists a TOC section more than once.")
        elif "sections" in slide:
            errors.append(f"{label} may use 'sections' only on the TOC slide.")
    for kind, required_index in (("cover", 0), ("toc", 1)):
        count = sum(isinstance(s, dict) and s.get("kind") == kind for s in slides)
        if count != 1:
            errors.append(f"Plan must contain exactly one {kind} slide; found {count}.")
        if not (0 <= required_index < len(slides) and isinstance(slides[required_index], dict)
                and slides[required_index].get("kind") == kind):
            errors.append(f"Plan {kind} slide is in the wrong position.")
    qa_count = sum(isinstance(s, dict) and s.get("kind") == "qa" for s in slides)
    if qa_count > 1 or (qa_count == 1 and
                        (not isinstance(slides[-1], dict) or slides[-1].get("kind") != "qa")):
        errors.append("Plan may contain one Q&A slide, and it must be last.")
    conclusion_count = sum(isinstance(s, dict) and s.get("kind") == "conclusion" for s in slides)
    if conclusion_count != 1:
        errors.append(f"Plan must contain exactly one closing slide (kind conclusion); found {conclusion_count}.")
    if errors:
        return errors

    toc_names = slides[1]["sections"]
    expected = [normal(x) for x in toc_names]
    final_section = expected[-1]
    dividers = [normal(s["section"]) for s in slides if s["kind"] == "section"]
    if dividers != expected:
        errors.append("Section dividers must occur exactly once in TOC order: "
                      + ", ".join(toc_names) + ".")
    for ordinal, slide in enumerate((s for s in slides if s["kind"] == "section"), 1):
        match = re.match(r"^([IVXLCDM]+)\.\s+(.+)$", slide["title"].strip(), re.I)
        if match and (match.group(1).upper() != roman(ordinal) or
                      normal(match.group(2)) != normal(slide["section"])):
            errors.append(f"Section divider {ordinal} must use '{roman(ordinal)}. {slide['section']}' numbering.")
    current: str | None = None
    body_counts = {name: 0 for name in expected}
    for number, slide in enumerate(slides, 1):
        kind = slide["kind"]
        if kind == "section":
            current = normal(slide["section"])
            if current not in body_counts:
                errors.append(f"Plan slide {number} is an orphan section outside the TOC.")
        elif kind in BODY_KINDS:
            section = normal(slide["section"])
            if current is None or section != current or section not in body_counts:
                errors.append(f"Plan slide {number} ({kind}) is outside its section; "
                              "place it after the matching divider.")
            else:
                body_counts[section] += 1
            if kind == "conclusion" and section != final_section:
                errors.append(f"Plan slide {number}: closing slide must belong to the final TOC section.")
            if deck_type == "research_talk" and section == final_section and kind != "conclusion":
                errors.append(f"Plan slide {number}: research-talk closing section may contain only its conclusion slide.")
    for raw_name, key in zip(toc_names, expected):
        if body_counts[key] == 0:
            errors.append(f"TOC section {raw_name!r} has no body slide.")
    closing_index = len(slides) - (2 if qa_count else 1)
    if slides[closing_index]["kind"] != "conclusion":
        errors.append("The final content slide must be the closing slide (kind conclusion).")
    if deck_type == "research_talk" and (
        closing_index < 1 or slides[closing_index - 1]["kind"] != "section" or
        normal(slides[closing_index - 1].get("section", "")) != final_section
    ):
        errors.append("Research talk must end with its closing divider and one conclusion slide.")
    if qa_count and not QA_PATTERN.fullmatch(normal(slides[-1]["title"])):
        errors.append("Final Q&A title must be 'Q&A' or 'Questions and Answers'.")
    return errors


# Six-number affine transforms let the same bounds check work for ordinary
# shapes, rotated shapes, and shapes inside scaled/rotated groups.
IDENTITY = (1.0, 0.0, 0.0, 1.0, 0.0, 0.0)


def affine_apply(m: tuple[float, ...], x: float, y: float) -> tuple[float, float]:
    a, b, c, d, e, f = m
    return a*x + c*y + e, b*x + d*y + f


def affine_mul(left: tuple[float, ...], right: tuple[float, ...]) -> tuple[float, ...]:
    a, b, c, d, e, f = left
    g, h, i, j, k, l = right
    return (a*g+c*h, b*g+d*h, a*i+c*j, b*i+d*j, a*k+c*l+e, b*k+d*l+f)


def geometry_transform(xfrm: ET.Element, *, group: bool) -> tuple[tuple[float, ...], int, int]:
    off, ext = xfrm.find(A + "off"), xfrm.find(A + "ext")
    if off is None or ext is None:
        raise ValueError("missing offset or extent")
    x, y = int(off.get("x", "0")), int(off.get("y", "0"))
    width, height = int(ext.get("cx", "-1")), int(ext.get("cy", "-1"))
    if width < 0 or height < 0:
        raise ValueError("negative or missing shape extent")
    if group:
        child_off, child_ext = xfrm.find(A + "chOff"), xfrm.find(A + "chExt")
        if child_off is None or child_ext is None:
            raise ValueError("group missing child offset or extent")
        child_width, child_height = int(child_ext.get("cx", "0")), int(child_ext.get("cy", "0"))
        if child_width <= 0 or child_height <= 0:
            raise ValueError("group child extent must be positive")
        sx, sy = width / child_width, height / child_height
        local = (sx, 0.0, 0.0, sy,
                 x - int(child_off.get("x", "0")) * sx,
                 y - int(child_off.get("y", "0")) * sy)
    else:
        local = (1.0, 0.0, 0.0, 1.0, float(x), float(y))
    flip_h, flip_v = xfrm.get("flipH") in {"1", "true"}, xfrm.get("flipV") in {"1", "true"}
    angle = math.radians(int(xfrm.get("rot", "0")) / 60000)
    if flip_h or flip_v or angle:
        cx, cy = x + width / 2, y + height / 2
        cosine, sine = math.cos(angle), math.sin(angle)
        fh, fv = (-1.0 if flip_h else 1.0), (-1.0 if flip_v else 1.0)
        turn = (cosine*fh, sine*fh, -sine*fv, cosine*fv,
                cx - cosine*fh*cx + sine*fv*cy,
                cy - sine*fh*cx - cosine*fv*cy)
        local = affine_mul(turn, local)
    return local, width, height


def shape_xfrm(element: ET.Element) -> ET.Element | None:
    for path in (f"./{P}spPr/{A}xfrm", f"./{P}xfrm", f"./{P}grpSpPr/{A}xfrm"):
        xfrm = element.find(path)
        if xfrm is not None:
            return xfrm
    return None


def check_shape_bounds(slide: ET.Element, width: int, height: int, number: int) -> list[str]:
    errors: list[str] = []
    tree = slide.find(f"./{P}cSld/{P}spTree")
    if tree is None:
        return [f"Slide {number}: missing shape tree."]

    def visit(parent: ET.Element, transform: tuple[float, ...]) -> None:
        for element in parent:
            kind = element.tag.rsplit("}", 1)[-1]
            if kind == "AlternateContent":
                for choice in element:
                    if choice.tag.rsplit("}", 1)[-1] == "Choice":
                        visit(choice, transform)
                continue
            if kind not in {"sp", "pic", "cxnSp", "graphicFrame", "grpSp"}:
                continue
            xfrm = shape_xfrm(element)
            if xfrm is None:
                errors.append(f"Slide {number}: {kind} has no transform; bounds cannot be checked.")
                continue
            try:
                own, shape_width, shape_height = geometry_transform(xfrm, group=(kind == "grpSp"))
                combined = affine_mul(transform, own)
                if kind == "grpSp":
                    visit(element, combined)
                    continue
                corners = [affine_apply(combined, x, y) for x, y in (
                    (0, 0), (shape_width, 0), (shape_width, shape_height), (0, shape_height)
                )]
                xs, ys = [p[0] for p in corners], [p[1] for p in corners]
                if min(xs) < -EPSILON or min(ys) < -EPSILON or max(xs) > width + EPSILON or max(ys) > height + EPSILON:
                    errors.append(
                        f"Slide {number}: {kind} exceeds slide bounds "
                        f"({round(min(xs))}, {round(min(ys))})–"
                        f"({round(max(xs))}, {round(max(ys))}) vs {width} × {height} EMU."
                    )
            except (TypeError, ValueError, ZeroDivisionError) as exc:
                errors.append(f"Slide {number}: cannot check {kind} bounds: {exc}.")

    visit(tree, IDENTITY)
    return errors


M = "{http://schemas.openxmlformats.org/officeDocument/2006/math}"


def slide_paragraphs(root: ET.Element) -> list[str]:
    paragraphs: list[str] = []

    def collect(parent: ET.Element) -> None:
        for elem in parent:
            kind = elem.tag.rsplit("}", 1)[-1]
            if kind == "Fallback":
                continue
            if elem.tag == A + "p":
                parts = [
                    node.text for node in elem.iter()
                    if node.tag in {A + "t", M + "t"} and node.text
                ]
                text = "".join(parts).strip()
                if text:
                    paragraphs.append(text)
            else:
                collect(elem)

    collect(root)
    return paragraphs


def slide_order(parts: dict[str, ET.Element], members: set[str]) -> list[str]:
    presentation = parts["ppt/presentation.xml"]
    rels = parts["ppt/_rels/presentation.xml.rels"]
    relationships = {rel.get("Id"): rel for rel in rels.iter(PKG_REL + "Relationship")}
    slide_list = presentation.find(P + "sldIdLst")
    if slide_list is None:
        raise ValueError("presentation.xml has no slide ID list")
    paths = []
    for item in slide_list.findall(P + "sldId"):
        rid = item.get(R + "id")
        rel = relationships.get(rid)
        if rel is None or not rel.get("Type", "").endswith("/slide"):
            raise ValueError(f"slide relationship {rid!r} is missing or is not a slide")
        if rel.get("TargetMode") == "External":
            raise ValueError(f"slide relationship {rid!r} points outside the PPTX")
        target = rel.get("Target", "")
        path = posixpath.normpath(target.lstrip("/") if target.startswith("/") else posixpath.join("ppt", target))
        if not SLIDE_MEMBER.fullmatch(path) or path not in members:
            raise ValueError(f"slide relationship {rid!r} points to missing/invalid part {path!r}")
        paths.append(path)
    if not paths or len(paths) != len(set(paths)):
        raise ValueError("presentation has no slides or refers to a slide more than once")
    return paths


def inspect_pptx(path: Path) -> tuple[list[list[str]], list[str]]:
    errors: list[str] = []
    try:
        with zipfile.ZipFile(path) as archive:
            bad_member = archive.testzip()
            if bad_member:
                return [], [f"PPTX ZIP CRC check failed for {bad_member!r}."]
            members = set(archive.namelist())
            required = {"[Content_Types].xml", "ppt/presentation.xml", "ppt/_rels/presentation.xml.rels"}
            missing = required - members
            if missing:
                return [], [f"PPTX is missing required part(s): {', '.join(sorted(missing))}."]
            parts: dict[str, ET.Element] = {}
            for member in sorted(members):
                if member.endswith((".xml", ".rels")):
                    try:
                        parts[member] = ET.fromstring(archive.read(member))
                    except ET.ParseError as exc:
                        errors.append(f"Invalid XML in {member}: {exc}.")
            if errors:
                return [], errors
            try:
                paths = slide_order(parts, members)
                size = parts["ppt/presentation.xml"].find(P + "sldSz")
                if size is None:
                    raise ValueError("presentation.xml has no slide size")
                width, height = int(size.get("cx", "0")), int(size.get("cy", "0"))
                if width <= 0 or height <= 0:
                    raise ValueError("presentation slide size must be positive")
            except (KeyError, TypeError, ValueError) as exc:
                return [], [f"Invalid PPTX presentation structure: {exc}."]
            slides = []
            for number, member in enumerate(paths, 1):
                root = parts[member]
                if root.tag != P + "sld":
                    errors.append(f"Slide {number}: {member} is not a slide XML part.")
                    slides.append([])
                    continue
                slides.append(slide_paragraphs(root))
                errors.extend(check_shape_bounds(root, width, height, number))
            return slides, errors
    except (OSError, zipfile.BadZipFile, RuntimeError, ValueError) as exc:
        return [], [f"Cannot read PPTX ZIP {path}: {exc}."]


def compare_deck(plan: dict, actual: list[list[str]]) -> list[str]:
    errors: list[str] = []
    planned = plan["slides"]
    if len(actual) != len(planned):
        errors.append(f"Slide count mismatch: plan has {len(planned)}, PPTX has {len(actual)}.")
    for number, (slide, paragraphs) in enumerate(zip(planned, actual), 1):
        text = normal(" ".join(paragraphs))
        if normal(slide["title"]) not in text:
            errors.append(f"Slide {number} ({slide['kind']}): title {slide['title']!r} is absent or out of order.")
        if slide["kind"] == "toc":
            cursor = -1
            for section in slide["sections"]:
                found = text.find(normal(section), cursor + 1)
                if found < 0:
                    errors.append(f"Slide {number} (TOC): section {section!r} is absent or out of order.")
                else:
                    cursor = found
        elif slide["kind"] == "section" and normal(slide["section"]) not in text:
            errors.append(f"Slide {number} (section): name {slide['section']!r} is absent.")
        for idea in slide.get("ideas", []):
            if normal(idea) not in text:
                errors.append(f"Slide {number} ({slide['kind']}): key idea {idea!r} is absent from slide text.")
        if slide["kind"] == "qa" and (
            len(paragraphs) != 1 or not QA_PATTERN.fullmatch(normal(paragraphs[0]))
        ):
            errors.append(f"Slide {number} (Q&A): must contain only one Q&A text paragraph.")
    return errors


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pptx", type=Path, help="PPTX presentation to check")
    parser.add_argument("plan", type=Path, help="JSON slide plan")
    parser.add_argument("--json", action="store_true", help="Write a machine-readable result")
    args = parser.parse_args(argv)
    try:
        plan = json.loads(args.plan.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        errors = [f"Cannot read JSON plan {args.plan}: {exc}."]
        plan = None
    else:
        errors = validate_plan(plan)
    count = 0
    if not errors:
        actual, pptx_errors = inspect_pptx(args.pptx)
        count = len(actual)
        errors.extend(pptx_errors)
        if actual:
            errors.extend(compare_deck(plan, actual))
    result = {"ok": not errors, "slide_count": count, "errors": errors}
    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    elif errors:
        print("FAIL: deck validation", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
    else:
        print(f"PASS: {count} slides match the plan; ZIP/XML and shape bounds are valid.")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
