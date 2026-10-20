#!/usr/bin/env python3
"""Reject active/external SVG content and write a deterministic presentation-only copy."""

from __future__ import annotations

import argparse
import hashlib
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


SVG_NS = "http://www.w3.org/2000/svg"
XLINK_NS = "http://www.w3.org/1999/xlink"
XML_NS = "http://www.w3.org/XML/1998/namespace"
MAX_BYTES = 2 * 1024 * 1024
MAX_ELEMENTS = 10000
ELEMENTS = {
    "svg", "g", "defs", "clipPath", "path", "rect", "circle", "ellipse", "line",
    "polyline", "polygon", "use", "title", "desc", "text", "tspan",
}
ATTRIBUTES = {
    "id", "class", "role", "aria-hidden", "focusable", "width", "height", "viewBox",
    "x", "y", "x1", "x2", "y1", "y2", "cx", "cy", "r", "rx", "ry",
    "points", "d", "transform", "fill", "fill-rule", "clip-rule", "clip-path",
    "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit",
    "stroke-dasharray", "stroke-dashoffset", "opacity", "fill-opacity", "stroke-opacity",
    "vector-effect", "font-size", "font-family", "font-weight", "text-anchor",
    "dominant-baseline", "href",
}
FORBIDDEN_DECLARATION = re.compile(rb"<!\s*(?:DOCTYPE|ENTITY)\b", re.IGNORECASE)
PROCESSING_INSTRUCTION = re.compile(rb"<\?(?!xml(?:\s|\?>))", re.IGNORECASE)
EXTERNAL_SCHEME = re.compile(r"(?:https?://|data:|file:|javascript:|ftp://)", re.IGNORECASE)
URL_REFERENCE = re.compile(r"url\(\s*(['\"]?)(.*?)\1\s*\)", re.IGNORECASE)
ID_VALUE = re.compile(r"[A-Za-z_][A-Za-z0-9_.:-]*\Z")


def split_name(name: str) -> tuple[str, str]:
    if name.startswith("{"):
        return tuple(name[1:].split("}", 1))
    return "", name


def sanitize(raw: bytes) -> bytes:
    if len(raw) > MAX_BYTES:
        raise ValueError(f"SVG exceeds {MAX_BYTES} bytes")
    if FORBIDDEN_DECLARATION.search(raw) or PROCESSING_INSTRUCTION.search(raw):
        raise ValueError("DTD, entity, or processing instruction is not allowed")
    try:
        root = ET.fromstring(raw)
    except ET.ParseError as exc:
        raise ValueError(f"malformed XML: {exc}") from exc
    namespace, local = split_name(root.tag)
    if local != "svg" or namespace not in {"", SVG_NS}:
        raise ValueError("root must be an SVG element")
    elements = list(root.iter())
    if len(elements) > MAX_ELEMENTS:
        raise ValueError("SVG has too many elements")
    ids: set[str] = set()
    references: set[str] = set()
    for element in elements:
        namespace, local = split_name(element.tag)
        if namespace not in {"", SVG_NS} or local not in ELEMENTS:
            raise ValueError(f"unsupported SVG element {local!r}")
        for key, value in element.attrib.items():
            attr_namespace, attr = split_name(key)
            lower_value = value.lower()
            if attr.lower().startswith("on"):
                raise ValueError(f"event handler {attr!r} is not allowed")
            if attr_namespace not in {"", XLINK_NS, XML_NS} or attr not in ATTRIBUTES | {"space"}:
                raise ValueError(f"unsupported SVG attribute {attr!r}")
            if attr_namespace == XLINK_NS and attr != "href":
                raise ValueError(f"unsupported XLink attribute {attr!r}")
            if attr_namespace == XML_NS and attr != "space":
                raise ValueError(f"unsupported XML attribute {attr!r}")
            if EXTERNAL_SCHEME.search(value) or "@import" in lower_value:
                raise ValueError(f"external content in {attr!r} is not allowed")
            if "url(" in lower_value:
                matches = list(URL_REFERENCE.finditer(value))
                if not matches or len(matches) != lower_value.count("url("):
                    raise ValueError(f"invalid URL reference in {attr!r}")
                for match in matches:
                    target = match.group(2).strip()
                    if not target.startswith("#") or not ID_VALUE.fullmatch(target[1:]):
                        raise ValueError(f"external URL reference in {attr!r} is not allowed")
                    references.add(target[1:])
            if attr == "href":
                if not value.startswith("#") or not ID_VALUE.fullmatch(value[1:]):
                    raise ValueError("href must be a local fragment reference")
                references.add(value[1:])
            if attr == "id":
                if not ID_VALUE.fullmatch(value) or value in ids:
                    raise ValueError("SVG ids must be unique valid identifiers")
                ids.add(value)
        if local not in {"title", "desc", "text", "tspan"} and element.text and element.text.strip():
            raise ValueError(f"unexpected text in {local!r}")
    missing = references - ids
    if missing:
        raise ValueError(f"unresolved local references: {', '.join(sorted(missing))}")
    ET.register_namespace("", SVG_NS)
    ET.register_namespace("xlink", XLINK_NS)
    return ET.tostring(root, encoding="utf-8", xml_declaration=True)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path, help="Raw SVG file")
    parser.add_argument("output", type=Path, help="Sanitized SVG file")
    args = parser.parse_args(argv)
    try:
        if args.input.resolve() == args.output.resolve():
            raise ValueError("output must differ from raw input")
        sanitized = sanitize(args.input.read_bytes())
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_bytes(sanitized)
    except (OSError, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1
    print(f"ok {hashlib.sha256(sanitized).hexdigest()} {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
