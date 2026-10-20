"""Untrusted SVGs cannot load active code or external resources before rasterization."""

import importlib.util
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "sanitize-svg.py"
spec = importlib.util.spec_from_file_location("sanitize_svg", SCRIPT)
sanitizer = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = sanitizer
spec.loader.exec_module(sanitizer)


SAFE = b'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12l6 6 12-12" stroke-width="2" stroke-linecap="round"/></svg>'


class SanitizeSvgTests(unittest.TestCase):
    def test_safe_svg_is_deterministic_and_keeps_shape(self):
        first = sanitizer.sanitize(SAFE)
        self.assertEqual(first, sanitizer.sanitize(SAFE))
        self.assertIn(b"<path", first)
        self.assertIn(b"viewBox", first)

    def test_local_clip_reference_is_allowed(self):
        raw = b'<svg xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="cut"><rect width="10" height="10"/></clipPath></defs><path d="M0 0" clip-path="url(#cut)"/></svg>'
        self.assertIn(b"clip-path", sanitizer.sanitize(raw))

    def test_active_and_external_content_is_rejected(self):
        unsafe = [
            b'<!DOCTYPE svg [<!ENTITY x "x">]><svg>&x;</svg>',
            b'<svg><script>alert(1)</script></svg>',
            b'<svg><foreignObject/></svg>',
            b'<svg onload="alert(1)"/>',
            b'<svg><use href="https://example.org/icon.svg#x"/></svg>',
            b'<svg><path style="fill:url(https://example.org/a)"/></svg>',
            b'<svg><style>@import url(https://example.org/a);</style></svg>',
            b'<?xml-stylesheet href="https://example.org/a"?><svg/>',
            b'<svg><path d="M0 0" fill="url(https://example.org/a)"/></svg>',
            b'<svg><use href="#missing"/></svg>',
            b'<svg><animate attributeName="x"/></svg>',
        ]
        for raw in unsafe:
            with self.subTest(raw=raw):
                with self.assertRaises(ValueError):
                    sanitizer.sanitize(raw)

    def test_cli_preserves_raw_and_rejects_in_place_output(self):
        with tempfile.TemporaryDirectory() as directory:
            raw = Path(directory) / "raw.svg"
            output = Path(directory) / "sanitized.svg"
            raw.write_bytes(SAFE)
            result = subprocess.run([sys.executable, str(SCRIPT), str(raw), str(output)],
                                    capture_output=True, text=True, check=False)
            self.assertEqual(0, result.returncode, result.stderr)
            self.assertEqual(SAFE, raw.read_bytes())
            self.assertEqual(sanitizer.sanitize(SAFE), output.read_bytes())
            result = subprocess.run([sys.executable, str(SCRIPT), str(raw), str(raw)],
                                    capture_output=True, text=True, check=False)
            self.assertNotEqual(0, result.returncode)
            self.assertEqual(SAFE, raw.read_bytes())


if __name__ == "__main__":
    unittest.main()
