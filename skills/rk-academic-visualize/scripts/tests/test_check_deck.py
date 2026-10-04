"""Executable contract tests for the standalone PPTX validator."""

from __future__ import annotations

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


SCRIPT = Path(__file__).resolve().parents[1] / "check-deck.py"
spec = importlib.util.spec_from_file_location("check_deck", SCRIPT)
check_deck = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = check_deck
spec.loader.exec_module(check_deck)

A = check_deck.A
P = check_deck.P
R = check_deck.R
PKG = check_deck.PKG_REL


def valid_plan():
    return {"slides": [
        {"kind": "cover", "title": "Research Talk", "section": None},
        {"kind": "toc", "title": "Outline", "section": None,
         "sections": ["Introduction", "Conclusion"]},
        {"kind": "section", "title": "I. Introduction", "section": "Introduction"},
        {"kind": "content", "title": "Research gap", "section": "Introduction",
         "ideas": ["Shared resources cause contention", "Scheduling matters"]},
        {"kind": "section", "title": "II. Conclusion", "section": "Conclusion"},
        {"kind": "conclusion", "title": "Takeaways", "section": "Conclusion",
         "ideas": ["Adaptive routing admits more requests"]},
        {"kind": "qa", "title": "Q&A", "section": None},
    ]}


def slide_xml(paragraphs, *, outside=False):
    root = ET.Element(P + "sld")
    tree = ET.SubElement(ET.SubElement(root, P + "cSld"), P + "spTree")
    for index, paragraph in enumerate(paragraphs):
        shape = ET.SubElement(tree, P + "sp")
        xfrm = ET.SubElement(ET.SubElement(shape, P + "spPr"), A + "xfrm")
        ET.SubElement(xfrm, A + "off", {"x": "950000" if outside and index == 0 else "100", "y": "100"})
        ET.SubElement(xfrm, A + "ext", {"cx": "100000", "cy": "10000"})
        text_body = ET.SubElement(shape, P + "txBody")
        para = ET.SubElement(text_body, A + "p")
        ET.SubElement(ET.SubElement(para, A + "r"), A + "t").text = paragraph
    return ET.tostring(root, encoding="utf-8")


def make_pptx(plan, *, order=None, overrides=None, outside=None, invalid_xml=None):
    slides = plan["slides"]
    order = order or list(range(1, len(slides) + 1))
    overrides = overrides or {}
    ids = ET.Element(P + "presentation")
    listing = ET.SubElement(ids, P + "sldIdLst")
    for index in range(1, len(slides) + 1):
        ET.SubElement(listing, P + "sldId", {"id": str(255 + index), R + "id": f"rId{index}"})
    ET.SubElement(ids, P + "sldSz", {"cx": "1000000", "cy": "600000"})
    rels = ET.Element(PKG + "Relationships")
    for index, slide_number in enumerate(order, 1):
        ET.SubElement(rels, PKG + "Relationship", {
            "Id": f"rId{index}",
            "Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide",
            "Target": f"slides/slide{slide_number}.xml",
        })
    output = io.BytesIO()
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        archive.writestr("[Content_Types].xml", "<Types/>")
        archive.writestr("ppt/presentation.xml", ET.tostring(ids))
        archive.writestr("ppt/_rels/presentation.xml.rels", ET.tostring(rels))
        for index, slide in enumerate(slides, 1):
            paragraphs = [slide["title"]]
            if slide["kind"] == "toc":
                paragraphs += slide["sections"]
            paragraphs += slide.get("ideas", [])
            archive.writestr(f"ppt/slides/slide{index}.xml",
                             b"<not-xml" if index == invalid_xml else slide_xml(
                                 overrides.get(index, paragraphs), outside=index == outside))
    return output.getvalue()


class CheckDeckTests(unittest.TestCase):
    def test_valid_plan_and_pptx(self):
        plan = valid_plan()
        self.assertEqual([], check_deck.validate_plan(plan))
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "slides.pptx"
            path.write_bytes(make_pptx(plan))
            slides, errors = check_deck.inspect_pptx(path)
        self.assertEqual([], errors)
        self.assertEqual([], check_deck.compare_deck(plan, slides))

    def test_toc_divider_and_orphan_checks(self):
        plan = valid_plan()
        plan["slides"][1]["sections"] = ["Conclusion", "Introduction"]
        self.assertTrue(any("TOC order" in e or "final TOC" in e for e in check_deck.validate_plan(plan)))
        plan = valid_plan()
        plan["slides"].insert(4, {"kind": "section", "title": "II. Extra", "section": "Extra"})
        errors = check_deck.validate_plan(plan)
        self.assertTrue(any("orphan" in e or "exactly once" in e for e in errors))
        plan = valid_plan()
        plan["slides"][3]["section"] = "Conclusion"
        self.assertTrue(any("outside its section" in e for e in check_deck.validate_plan(plan)))

    def test_idea_counts_conclusion_and_qa_rules(self):
        plan = valid_plan()
        plan["slides"][3]["ideas"] = []
        self.assertTrue(any("1–3" in e for e in check_deck.validate_plan(plan)))
        plan = valid_plan()
        plan["slides"][5]["ideas"] = ["one", "two", "three"]
        self.assertTrue(any("1–2" in e for e in check_deck.validate_plan(plan)))
        plan = valid_plan()
        plan["slides"][-1]["title"] = "Questions and next steps"
        self.assertTrue(any("Q&A title" in e for e in check_deck.validate_plan(plan)))
        plan = valid_plan()
        plan["slides"][4]["title"] = "IV. Conclusion"
        self.assertTrue(any("numbering" in e for e in check_deck.validate_plan(plan)))
        plan = valid_plan()
        plan["slides"][3]["kind"] = []
        self.assertTrue(any("invalid kind" in e for e in check_deck.validate_plan(plan)))

    def test_non_english_final_section(self):
        plan = valid_plan()
        plan["slides"][1]["sections"][-1] = "Kết luận"
        plan["slides"][4].update(title="II. Kết luận", section="Kết luận")
        plan["slides"][5]["section"] = "Kết luận"
        self.assertEqual([], check_deck.validate_plan(plan))
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "slides.pptx"
            path.write_bytes(make_pptx(plan))
            slides, errors = check_deck.inspect_pptx(path)
        self.assertEqual([], errors + check_deck.compare_deck(plan, slides))

    def test_lecture_and_report_closings(self):
        lecture = valid_plan()
        lecture["deck_type"] = "lecture"
        lecture["slides"][1]["sections"] = ["Core concept", "Key takeaways"]
        lecture["slides"][2].update(title="I. Core concept", section="Core concept")
        lecture["slides"][3].update(title="A worked example explains the concept",
                                     section="Core concept", ideas=["Definition", "Example"])
        lecture["slides"][4].update(title="II. Key takeaways", section="Key takeaways")
        lecture["slides"][5].update(title="Key takeaways", section="Key takeaways",
                                     ideas=["Principle", "Worked example", "Common pitfall"])
        lecture["slides"].pop()  # A lecture handout does not need a Q&A slide.
        self.assertEqual([], check_deck.validate_plan(lecture))
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "lecture.pptx"
            path.write_bytes(make_pptx(lecture))
            slides, errors = check_deck.inspect_pptx(path)
        self.assertEqual([], errors + check_deck.compare_deck(lecture, slides))

        report = json.loads(json.dumps(lecture))
        report["deck_type"] = "internal_report"
        report["slides"][1]["sections"][-1] = "Next steps"
        report["slides"][4].update(title="II. Next steps", section="Next steps")
        report["slides"][5]["section"] = "Next steps"
        report["slides"].insert(5, {"kind": "content", "title": "Two risks need owners",
                                    "section": "Next steps", "ideas": ["Risk one", "Risk two"]})
        self.assertEqual([], check_deck.validate_plan(report))

    def test_optional_qa_and_deck_type_rules(self):
        plan = valid_plan()
        plan["slides"].pop()
        self.assertEqual([], check_deck.validate_plan(plan))
        plan["deck_type"] = "other"
        self.assertTrue(any("deck_type" in e for e in check_deck.validate_plan(plan)))
        plan = valid_plan()
        plan["slides"].insert(4, {"kind": "qa", "title": "Q&A", "section": None})
        self.assertTrue(any("Q&A slide" in e for e in check_deck.validate_plan(plan)))

    def test_actual_order_count_toc_ideas_and_qa(self):
        plan = valid_plan()
        cases = [
            (make_pptx(plan, order=[1, 2, 4, 3, 5, 6, 7]), "title"),
            (make_pptx(plan, overrides={2: ["Outline", "Conclusion", "Introduction"]}), "out of order"),
            (make_pptx(plan, overrides={4: ["Research gap", "Scheduling matters"]}), "key idea"),
            (make_pptx(plan, overrides={7: ["Q&A", "Thank you"]}), "Q&A"),
        ]
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "slides.pptx"
            for raw, expected in cases:
                path.write_bytes(raw)
                slides, errors = check_deck.inspect_pptx(path)
                self.assertEqual([], errors)
                self.assertTrue(any(expected in e for e in check_deck.compare_deck(plan, slides)))
        self.assertTrue(any("Slide count mismatch" in e for e in check_deck.compare_deck(plan, [[] for _ in range(6)])))

    def test_bad_shape_xml_and_zip(self):
        plan = valid_plan()
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "slides.pptx"
            path.write_bytes(make_pptx(plan, outside=3))
            _, errors = check_deck.inspect_pptx(path)
            self.assertTrue(any("exceeds slide bounds" in e for e in errors))
            path.write_bytes(make_pptx(plan, invalid_xml=3))
            _, errors = check_deck.inspect_pptx(path)
            self.assertTrue(any("Invalid XML" in e for e in errors))
            path.write_bytes(b"not a ZIP")
            _, errors = check_deck.inspect_pptx(path)
            self.assertTrue(any("Cannot read PPTX ZIP" in e for e in errors))

    def test_cli_exit_code_and_json(self):
        plan = valid_plan()
        with tempfile.TemporaryDirectory() as directory:
            plan_path = Path(directory) / "plan.json"
            deck_path = Path(directory) / "slides.pptx"
            plan_path.write_text(json.dumps(plan), encoding="utf-8")
            deck_path.write_bytes(make_pptx(plan))
            command = [sys.executable, str(SCRIPT), str(deck_path), str(plan_path), "--json"]
            result = subprocess.run(command, capture_output=True, text=True, check=False)
            self.assertEqual(0, result.returncode)
            self.assertEqual({"ok": True, "slide_count": 7, "errors": []}, json.loads(result.stdout))
            deck_path.write_bytes(make_pptx(plan, outside=3))
            result = subprocess.run(command, capture_output=True, text=True, check=False)
            self.assertNotEqual(0, result.returncode)
            self.assertTrue(any("exceeds slide bounds" in e for e in json.loads(result.stdout)["errors"]))

    def test_math_omml_and_alternate_content(self):
        root = ET.Element(P + "sld")
        tree = ET.SubElement(ET.SubElement(root, P + "cSld"), P + "spTree")
        alt = ET.SubElement(tree, check_deck.MC + "AlternateContent" if hasattr(check_deck, "MC") else "{http://schemas.openxmlformats.org/markup-compatibility/2006}AlternateContent")
        choice = ET.SubElement(alt, "{http://schemas.openxmlformats.org/markup-compatibility/2006}Choice", {"Requires": "a14"})
        sp_choice = ET.SubElement(choice, P + "sp")
        xfrm = ET.SubElement(ET.SubElement(sp_choice, P + "spPr"), A + "xfrm")
        ET.SubElement(xfrm, A + "off", {"x": "100", "y": "100"})
        ET.SubElement(xfrm, A + "ext", {"cx": "100000", "cy": "10000"})
        p_elem = ET.SubElement(ET.SubElement(sp_choice, P + "txBody"), A + "p")
        ET.SubElement(ET.SubElement(p_elem, A + "r"), A + "t").text = "Phép toán → "
        m_elem = ET.SubElement(p_elem, "{http://schemas.microsoft.com/office/drawing/2010/main}m")
        omath = ET.SubElement(m_elem, "{http://schemas.openxmlformats.org/officeDocument/2006/math}oMath")
        ET.SubElement(ET.SubElement(omath, "{http://schemas.openxmlformats.org/officeDocument/2006/math}r"), "{http://schemas.openxmlformats.org/officeDocument/2006/math}t").text = "Ax=b"
        ET.SubElement(ET.SubElement(p_elem, A + "r"), A + "t").text = " → span"

        fallback = ET.SubElement(alt, "{http://schemas.openxmlformats.org/markup-compatibility/2006}Fallback")
        sp_fb = ET.SubElement(fallback, P + "sp")
        p_fb = ET.SubElement(ET.SubElement(sp_fb, P + "txBody"), A + "p")
        ET.SubElement(ET.SubElement(p_fb, A + "r"), A + "t").text = "Phép toán → Ax=b → span"

        paragraphs = check_deck.slide_paragraphs(root)
        self.assertEqual(["Phép toán → Ax=b → span"], paragraphs)
        bounds_errors = check_deck.check_shape_bounds(root, 1000000, 600000, 1)
        self.assertEqual([], bounds_errors)


if __name__ == "__main__":
    unittest.main()

