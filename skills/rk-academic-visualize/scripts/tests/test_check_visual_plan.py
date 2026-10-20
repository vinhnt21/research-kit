"""Contracts for optional visual decisions and external-asset provenance."""

import hashlib
import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock


SCRIPT = Path(__file__).resolve().parents[1] / "check-visual-plan.py"
spec = importlib.util.spec_from_file_location("check_visual_plan", SCRIPT)
checker = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = checker
spec.loader.exec_module(checker)
svg_spec = importlib.util.spec_from_file_location("sanitize_svg", SCRIPT.with_name("sanitize-svg.py"))
sanitizer = importlib.util.module_from_spec(svg_spec)
sys.modules[svg_spec.name] = sanitizer
svg_spec.loader.exec_module(sanitizer)


def slide(visual=None, *, title="A source-backed idea"):
    item = {"kind": "content", "title": title, "ideas": ["One key idea"]}
    if visual is not None:
        item["visual"] = visual
    return item


class CheckVisualPlanTests(unittest.TestCase):
    def test_old_plan_is_optional_but_new_plan_requires_visual(self):
        plan = {"slides": [slide()]}
        self.assertTrue(checker.check_visuals(plan, False, None, Path("."))["ok"])
        result = checker.check_visuals(plan, True, None, Path("."))
        self.assertFalse(result["ok"])
        self.assertIn("visual decision", result["errors"][0])

    def test_diagram_and_chart_are_semantic_without_bitmap(self):
        plan = {"slides": [
            slide({"type": "diagram", "purpose": "Show the trust boundary", "source": "source-ledger:5"}),
            slide({"type": "chart", "purpose": "Compare the two result counts", "source": "data:results.csv"}),
        ]}
        result = checker.check_visuals(plan, True, None, Path("."))
        self.assertTrue(result["ok"])
        self.assertEqual([], result["warnings"])

    def test_text_only_is_allowed_and_warns_on_sequence(self):
        plan = {"slides": [
            slide({"type": "none", "reason": "Three short caveats are clearer as text"}),
            slide({"type": "none", "reason": "A short definition needs exact wording"}),
        ]}
        result = checker.check_visuals(plan, True, None, Path("."))
        self.assertTrue(result["ok"])
        self.assertEqual(3, len(result["warnings"]))
        self.assertTrue(any("two consecutive" in warning for warning in result["warnings"]))

    def test_invalid_decisions_fail_without_icon_quota(self):
        for visual in ({"type": []}, {"type": "none"}, {"type": "diagram", "source": "source:1"}):
            with self.subTest(visual=visual):
                result = checker.check_visuals({"slides": [slide(visual)]}, True, None, Path("."))
                self.assertFalse(result["ok"])
        self.assertFalse(any("icon" in error for error in result["errors"]))

    def test_asset_file_hash_slide_mapping_and_pinned_tabler(self):
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            icon = base / "assets" / "raw" / "shield.svg"
            icon.parent.mkdir(parents=True)
            icon.write_text("<svg/>", encoding="utf-8")
            sanitized = base / "assets" / "sanitized" / "shield.svg"
            sanitized.parent.mkdir(parents=True)
            sanitized.write_bytes(sanitizer.sanitize(icon.read_bytes()))
            rendered = base / "assets" / "rendered" / "shield.png"
            rendered.parent.mkdir(parents=True)
            rendered.write_bytes(b"PNG fixture")
            digest = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
            plan = {"slides": [slide({"type": "icon", "purpose": "Identify the trust boundary",
                                      "source": "source-ledger:5", "asset_ids": ["shield"]})]}
            asset = {
                "asset_id": "shield", "slide_numbers": [1],
                "source_url": "https://cdn.jsdelivr.net/npm/@tabler/icons@3.40.0/icons/outline/shield.svg",
                "creator": "Tabler Icons", "license": "MIT", "license_url": "https://tabler.io/license",
                "version_or_accessed": "3.40.0", "changes": "none", "credit_line": "Shield: Tabler Icons, MIT",
                "local_path": "assets/raw/shield.svg", "sha256": digest(icon), "format": "svg",
                "derivatives": [
                    {"role": "sanitized", "local_path": "assets/sanitized/shield.svg", "sha256": digest(sanitized)},
                    {"role": "rendered", "local_path": "assets/rendered/shield.png", "sha256": digest(rendered),
                     "renderer": "fixture 1.0"},
                ],
            }
            self.assertTrue(checker.check_visuals(plan, True, {"assets": [asset]}, base)["ok"])
            asset["slide_numbers"] = [2]
            self.assertTrue(any("slide_numbers" in e for e in checker.check_visuals(plan, True, {"assets": [asset]}, base)["errors"]))
            asset["slide_numbers"] = [1]
            asset["source_url"] = asset["source_url"].replace("3.40.0", "latest")
            self.assertTrue(any("pin a numeric release" in e for e in checker.check_visuals(plan, True, {"assets": [asset]}, base)["errors"]))
            asset["source_url"] = asset["source_url"].replace("latest", "3.40.0")
            sanitized.write_text("<svg><script>alert(1)</script></svg>", encoding="utf-8")
            asset["derivatives"][0]["sha256"] = digest(sanitized)
            self.assertTrue(any("sanitized SVG is unsafe" in e for e in checker.check_visuals(plan, True, {"assets": [asset]}, base)["errors"]))
            sanitized.write_bytes(sanitizer.sanitize(icon.read_bytes()))
            asset["derivatives"][0]["sha256"] = digest(sanitized)
            icon.write_text("changed", encoding="utf-8")
            self.assertTrue(any("sha256 does not match" in e for e in checker.check_visuals(plan, True, {"assets": [asset]}, base)["errors"]))

    def test_unreadable_asset_is_reported_without_traceback(self):
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            asset = base / "asset.png"
            asset.write_bytes(b"fixture")
            entry = {"local_path": asset.name, "sha256": hashlib.sha256(b"fixture").hexdigest()}
            errors = []
            with mock.patch.object(Path, "read_bytes", side_effect=OSError("permission denied")):
                checker.check_file(base, entry, "Asset 'fixture'", errors)
        self.assertEqual(1, len(errors))
        self.assertIn("cannot be read", errors[0])

    def test_cli_json_has_errors_and_warnings_separate(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "slide-plan.json"
            path.write_text(json.dumps({"slides": [slide({"type": "none", "reason": "Precise caveat"})]}), encoding="utf-8")
            result = subprocess.run([sys.executable, str(SCRIPT), str(path), "--require-visual", "--json"],
                                    capture_output=True, text=True, check=False)
            self.assertEqual(0, result.returncode)
            output = json.loads(result.stdout)
            self.assertTrue(output["ok"])
            self.assertEqual([], output["errors"])
            self.assertEqual(1, len(output["warnings"]))


if __name__ == "__main__":
    unittest.main()
