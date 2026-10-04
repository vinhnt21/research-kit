"""Executable contract tests for native OMML math injection into PPTX."""

from __future__ import annotations

import copy
import importlib.util
import io
import json
import subprocess
import sys
import tempfile
import unittest
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path


SCRIPTS_DIR = Path(__file__).resolve().parents[1]
INJECT_SCRIPT = SCRIPTS_DIR / "inject-math.py"
CHECK_SCRIPT = SCRIPTS_DIR / "check-deck.py"

spec_inject = importlib.util.spec_from_file_location("inject_math", INJECT_SCRIPT)
inject_math = importlib.util.module_from_spec(spec_inject)
sys.modules[spec_inject.name] = inject_math
spec_inject.loader.exec_module(inject_math)

spec_check = importlib.util.spec_from_file_location("check_deck", CHECK_SCRIPT)
check_deck = importlib.util.module_from_spec(spec_check)
sys.modules[spec_check.name] = check_deck
spec_check.loader.exec_module(check_deck)

A = check_deck.A
P = check_deck.P
R = check_deck.R
PKG = check_deck.PKG_REL
MC = "{http://schemas.openxmlformats.org/markup-compatibility/2006}"
A14 = "{http://schemas.microsoft.com/office/drawing/2010/main}"
M = "{http://schemas.openxmlformats.org/officeDocument/2006/math}"


def make_test_pptx(paragraphs_per_slide: list[list[str]]) -> bytes:
    """Build a minimal PPTX archive with given text paragraphs per slide."""
    ids = ET.Element(P + "presentation")
    listing = ET.SubElement(ids, P + "sldIdLst")
    for index in range(1, len(paragraphs_per_slide) + 1):
        ET.SubElement(listing, P + "sldId", {"id": str(255 + index), R + "id": f"rId{index}"})
    ET.SubElement(ids, P + "sldSz", {"cx": "1000000", "cy": "600000"})
    rels = ET.Element(PKG + "Relationships")
    for index in range(1, len(paragraphs_per_slide) + 1):
        ET.SubElement(rels, PKG + "Relationship", {
            "Id": f"rId{index}",
            "Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide",
            "Target": f"slides/slide{index}.xml",
        })

    output = io.BytesIO()
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        archive.writestr("[Content_Types].xml", "<Types/>")
        archive.writestr("ppt/presentation.xml", ET.tostring(ids))
        archive.writestr("ppt/_rels/presentation.xml.rels", ET.tostring(rels))
        for index, paragraphs in enumerate(paragraphs_per_slide, 1):
            root = ET.Element(P + "sld")
            tree = ET.SubElement(ET.SubElement(root, P + "cSld"), P + "spTree")
            shape = ET.SubElement(tree, P + "sp")
            xfrm = ET.SubElement(ET.SubElement(shape, P + "spPr"), A + "xfrm")
            ET.SubElement(xfrm, A + "off", {"x": "100", "y": "100"})
            ET.SubElement(xfrm, A + "ext", {"cx": "100000", "cy": "10000"})
            text_body = ET.SubElement(shape, P + "txBody")
            for para_text in paragraphs:
                p = ET.SubElement(text_body, A + "p")
                r = ET.SubElement(p, A + "r")
                rPr = ET.SubElement(r, A + "rPr", {"sz": "1800"})
                fill = ET.SubElement(rPr, A + "solidFill")
                ET.SubElement(fill, A + "srgbClr", {"val": "123B70"})
                t = ET.SubElement(r, A + "t")
                t.text = para_text
            archive.writestr(f"ppt/slides/slide{index}.xml", ET.tostring(root, encoding="utf-8"))
    return output.getvalue()


class InjectMathTests(unittest.TestCase):
    def test_split_text_math(self):
        tokens = inject_math.split_text_math("Phép toán → $Ax=b$ → linear combination → span")
        self.assertEqual(
            [("text", "Phép toán → "), ("inline", "Ax=b"), ("text", " → linear combination → span")],
            tokens,
        )

        display_tokens = inject_math.split_text_math("Formula: $$ \\frac{a}{b}=c $$ done")
        self.assertEqual(
            [("text", "Formula: "), ("display", "\\frac{a}{b}=c"), ("text", " done")],
            display_tokens,
        )

        placeholder_tokens = inject_math.split_text_math("Check {{MATH:inline:e=mc^2}} here")
        self.assertEqual(
            [("text", "Check "), ("inline", "e=mc^2"), ("text", " here")],
            placeholder_tokens,
        )

        plain_tokens = inject_math.split_text_math("Just plain text without equations")
        self.assertEqual([("text", "Just plain text without equations")], plain_tokens)

    def test_batch_latex_to_omml(self):
        expressions = [("Ax=b", False), (r"\frac{a}{b}=c", True)]
        cache = inject_math.batch_latex_to_omml(expressions)
        self.assertEqual(2, len(cache))

        inline_elem = cache[("Ax=b", False)]
        self.assertIsNotNone(inline_elem.find(f"{M}oMath"))
        self.assertIsNone(inline_elem.find(f"{M}oMathPara"))

        display_elem = cache[(r"\frac{a}{b}=c", True)]
        self.assertIsNotNone(display_elem.find(f"{M}oMathPara"))

    def test_style_omml_runs(self):
        expressions = [("Ax=b", False)]
        cache = inject_math.batch_latex_to_omml(expressions)
        elem = copy.deepcopy(cache[("Ax=b", False)])

        rPr_template = ET.Element(A + "rPr", {"sz": "2400"})
        fill = ET.SubElement(rPr_template, A + "solidFill")
        ET.SubElement(fill, A + "srgbClr", {"val": "112233"})

        inject_math.style_omml_runs(elem, rPr_template)
        for r in elem.iter(f"{M}r"):
            rPr = r.find(f"{A}rPr")
            self.assertIsNotNone(rPr)
            self.assertEqual("2400", rPr.get("sz"))
            latin = rPr.find(f"{A}latin")
            self.assertIsNotNone(latin)
            self.assertEqual("Cambria Math", latin.get("typeface"))
            srgb = rPr.find(f"{A}solidFill/{A}srgbClr")
            self.assertIsNotNone(srgb)
            self.assertEqual("112233", srgb.get("val"))

    def test_inject_math_deck_end_to_end(self):
        pptx_bytes = make_test_pptx([
            ["Phép toán → $Ax=b$ → linear combination → span"],
            ["No math on this slide"],
        ])

        with tempfile.TemporaryDirectory() as directory:
            in_path = Path(directory) / "input.pptx"
            out_path = Path(directory) / "output.pptx"
            in_path.write_bytes(pptx_bytes)

            result = inject_math.inject_math_deck(in_path, out_path, with_fallback=True)
            self.assertTrue(result["ok"])
            self.assertEqual(1, result["formulas_injected"])
            self.assertEqual(1, result["slides_modified"])

            # Verify ZIP CRC
            with zipfile.ZipFile(out_path) as z:
                self.assertIsNone(z.testzip())
                slide1_xml = z.read("ppt/slides/slide1.xml")
                self.assertIn(b"AlternateContent", slide1_xml)
                self.assertIn(b"a14:m", slide1_xml)
                self.assertIn(b"Fallback", slide1_xml)

                slide2_xml = z.read("ppt/slides/slide2.xml")
                self.assertNotIn(b"AlternateContent", slide2_xml)

            # Verify check_deck inspection
            slides, errors = check_deck.inspect_pptx(out_path)
            self.assertEqual([], errors)
            self.assertEqual(2, len(slides))
            self.assertEqual(["Phép toán → Ax=b → linear combination → span"], slides[0])

    def test_cli_execution(self):
        pptx_bytes = make_test_pptx([["Check $E=mc^2$ formula"]])
        with tempfile.TemporaryDirectory() as directory:
            in_path = Path(directory) / "input.pptx"
            out_path = Path(directory) / "output.pptx"
            in_path.write_bytes(pptx_bytes)

            command = [sys.executable, str(INJECT_SCRIPT), str(in_path), str(out_path), "--json"]
            proc = subprocess.run(command, capture_output=True, text=True, check=False)
            self.assertEqual(0, proc.returncode)
            data = json.loads(proc.stdout)
            self.assertTrue(data["ok"])
            self.assertEqual(1, data["formulas_injected"])


if __name__ == "__main__":
    unittest.main()
