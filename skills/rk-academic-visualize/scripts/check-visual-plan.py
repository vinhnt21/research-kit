#!/usr/bin/env python3
"""Check slide visual decisions and external-asset provenance without judging visual quality."""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse


VISUAL_TYPES = {"diagram", "chart", "table", "icon", "image", "illustration", "equation", "none"}
BODY_KINDS = {"content", "recap"}
REQUIRED_ASSET_FIELDS = (
    "source_url", "creator", "license", "license_url", "version_or_accessed",
    "changes", "credit_line", "local_path", "sha256", "format",
)
HEX_SHA256 = re.compile(r"[0-9a-f]{64}\Z")


def check_sanitized_svg(path: Path, label: str, errors: list[str]) -> None:
    spec = importlib.util.spec_from_file_location("sanitize_svg", Path(__file__).with_name("sanitize-svg.py"))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    try:
        raw = path.read_bytes()
        canonical = module.sanitize(raw)
    except (OSError, ValueError) as exc:
        errors.append(f"{label}: sanitized SVG is unsafe or unreadable: {exc}.")
        return
    if canonical != raw:
        errors.append(f"{label}: sanitized SVG is not the canonical sanitizer output.")


def nonempty(value: object) -> bool:
    return isinstance(value, str) and bool(value.strip())


def local_file(base: Path, value: object) -> Path | None:
    if not nonempty(value):
        return None
    relative = Path(value)
    if relative.is_absolute() or ".." in relative.parts:
        return None
    path = (base / relative).resolve()
    try:
        path.relative_to(base.resolve())
    except ValueError:
        return None
    return path


def check_file(base: Path, entry: dict, label: str, errors: list[str]) -> None:
    path = local_file(base, entry.get("local_path"))
    if path is None:
        errors.append(f"{label}: local_path must stay inside the ledger directory.")
        return
    if not path.is_file():
        errors.append(f"{label}: file {entry['local_path']!r} is missing.")
        return
    digest = entry.get("sha256")
    if not isinstance(digest, str) or not HEX_SHA256.fullmatch(digest):
        errors.append(f"{label}: sha256 must be 64 lowercase hexadecimal characters.")
        return
    try:
        actual_digest = hashlib.sha256(path.read_bytes()).hexdigest()
    except OSError as exc:
        errors.append(f"{label}: file {entry['local_path']!r} cannot be read: {exc}.")
        return
    if actual_digest != digest:
        errors.append(f"{label}: sha256 does not match {entry['local_path']!r}.")


def https_url(value: object) -> bool:
    if not nonempty(value):
        return False
    parsed = urlparse(value)
    return parsed.scheme == "https" and bool(parsed.netloc) and not parsed.username and not parsed.password


def check_svg_derivatives(base: Path, asset: dict, label: str, errors: list[str]) -> None:
    derivatives = asset.get("derivatives")
    if not isinstance(derivatives, list):
        errors.append(f"{label}: SVG needs sanitized and rendered derivatives.")
        return
    roles: set[str] = set()
    for item in derivatives:
        if not isinstance(item, dict) or item.get("role") not in {"sanitized", "rendered"}:
            errors.append(f"{label}: derivative needs role sanitized or rendered.")
            continue
        role = item["role"]
        if role in roles:
            errors.append(f"{label}: duplicate {role} derivative.")
        roles.add(role)
        check_file(base, item, f"{label} {role}", errors)
        if role == "sanitized":
            sanitized_path = local_file(base, item.get("local_path"))
            if sanitized_path is not None and sanitized_path.is_file():
                check_sanitized_svg(sanitized_path, label, errors)
        elif not nonempty(item.get("renderer")):
            errors.append(f"{label}: rendered derivative needs renderer and version.")
        if role == "rendered" and not str(item.get("local_path", "")).lower().endswith(".png"):
            errors.append(f"{label}: rendered derivative must be PNG.")
    if roles != {"sanitized", "rendered"}:
        errors.append(f"{label}: SVG needs one sanitized and one rendered derivative.")


def check_ledger(ledger: object, base: Path, refs: dict[str, set[int]], errors: list[str]) -> None:
    if not isinstance(ledger, dict) or not isinstance(ledger.get("assets"), list):
        errors.append("Visual ledger must be an object with an assets array.")
        return
    found: set[str] = set()
    for number, asset in enumerate(ledger["assets"], 1):
        label = f"Asset {number}"
        if not isinstance(asset, dict):
            errors.append(f"{label} must be an object.")
            continue
        asset_id = asset.get("asset_id")
        if not nonempty(asset_id):
            errors.append(f"{label}: asset_id is required.")
            continue
        label = f"Asset {asset_id!r}"
        if asset_id in found:
            errors.append(f"{label}: duplicate asset_id.")
        found.add(asset_id)
        for field in REQUIRED_ASSET_FIELDS:
            if not nonempty(asset.get(field)):
                errors.append(f"{label}: {field} is required.")
        for field in ("source_url", "license_url"):
            if not https_url(asset.get(field)):
                errors.append(f"{label}: {field} must be an HTTPS URL without credentials.")
        source_url = str(asset.get("source_url", ""))
        if "@tabler/icons@" in source_url:
            version = source_url.split("@tabler/icons@", 1)[1].split("/", 1)[0]
            if not re.fullmatch(r"v?\d+(?:\.\d+){1,2}(?:-[A-Za-z0-9.]+)?", version):
                errors.append(f"{label}: Tabler package URL must pin a numeric release.")
        elif "tabler-icons" in source_url and ("latest" in source_url or "main" in source_url):
            errors.append(f"{label}: Tabler source URL must pin a release, not latest/main.")
        slides = asset.get("slide_numbers")
        if not isinstance(slides, list) or not slides or any(type(s) is not int or s < 1 for s in slides):
            errors.append(f"{label}: slide_numbers must be a nonempty array of one-based integers.")
        else:
            expected = refs.get(asset_id, set())
            if set(slides) != expected or len(slides) != len(set(slides)):
                errors.append(f"{label}: slide_numbers must equal plan references {sorted(expected)}.")
        check_file(base, asset, label, errors)
        if str(asset.get("format", "")).lower() == "svg":
            check_svg_derivatives(base, asset, label, errors)
    for asset_id, slides in refs.items():
        if asset_id not in found:
            errors.append(f"Asset {asset_id!r} is referenced on slides {sorted(slides)} but absent from the ledger.")


def check_visuals(plan: object, require_visual: bool, ledger: object | None, base: Path) -> dict:
    errors: list[str] = []
    warnings: list[str] = []
    if not isinstance(plan, dict) or not isinstance(plan.get("slides"), list):
        return {"ok": False, "slide_count": 0, "errors": ["Plan needs a slides array."], "warnings": []}
    refs: dict[str, set[int]] = {}
    consecutive_none = 0
    for number, slide in enumerate(plan["slides"], 1):
        label = f"Slide {number}"
        if not isinstance(slide, dict):
            errors.append(f"{label} must be an object.")
            consecutive_none = 0
            continue
        kind = slide.get("kind")
        visual = slide.get("visual")
        if visual is None:
            if require_visual and kind in BODY_KINDS:
                errors.append(f"{label} ({kind}): visual decision is required.")
            consecutive_none = 0
            continue
        if not isinstance(visual, dict):
            errors.append(f"{label}: visual must be an object.")
            consecutive_none = 0
            continue
        visual_type = visual.get("type")
        if not isinstance(visual_type, str) or visual_type not in VISUAL_TYPES:
            errors.append(f"{label}: invalid visual.type {visual_type!r}.")
            consecutive_none = 0
            continue
        if visual_type == "none":
            if not nonempty(visual.get("reason")):
                errors.append(f"{label}: visual.type none needs reason.")
            else:
                warnings.append(f"{label}: text-only decision; review reason and projection readability.")
            consecutive_none = consecutive_none + 1 if kind in BODY_KINDS else 0
            if consecutive_none == 2:
                warnings.append(f"{label}: two consecutive content slides are text-only; review pacing.")
        else:
            consecutive_none = 0
            for field in ("purpose", "source"):
                if not nonempty(visual.get(field)):
                    errors.append(f"{label}: visual.{field} is required for {visual_type}.")
        asset_ids = visual.get("asset_ids", [])
        if not isinstance(asset_ids, list) or any(not nonempty(a) for a in asset_ids):
            errors.append(f"{label}: visual.asset_ids must be an array of nonempty strings.")
        else:
            if len(asset_ids) != len(set(asset_ids)):
                errors.append(f"{label}: visual.asset_ids contains duplicates.")
            if visual_type == "none" and asset_ids:
                errors.append(f"{label}: text-only visual cannot reference assets.")
            for asset_id in asset_ids:
                refs.setdefault(asset_id, set()).add(number)
        ideas = slide.get("ideas")
        words = " ".join([str(slide.get("title", "")), *[x for x in ideas if isinstance(x, str)]]) if isinstance(ideas, list) else str(slide.get("title", ""))
        if kind in BODY_KINDS and len(words.split()) > 50:
            warnings.append(f"{label}: plan title and ideas exceed 50 words; review projected text density.")
    if refs and ledger is None:
        errors.append("Visual ledger is required when visual.asset_ids are used.")
    if ledger is not None:
        check_ledger(ledger, base, refs, errors)
    return {"ok": not errors, "slide_count": len(plan["slides"]), "errors": errors, "warnings": warnings}


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("plan", type=Path, help="Slide plan JSON")
    parser.add_argument("ledger", nargs="?", type=Path, help="Optional external-asset ledger JSON")
    parser.add_argument("--require-visual", action="store_true", help="Require visual decisions on new content/recap slides")
    parser.add_argument("--json", action="store_true", help="Print structured result")
    args = parser.parse_args(argv)
    try:
        plan = json.loads(args.plan.read_text(encoding="utf-8"))
        ledger = json.loads(args.ledger.read_text(encoding="utf-8")) if args.ledger else None
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        result = {"ok": False, "slide_count": 0, "errors": [f"Cannot read input JSON: {exc}."], "warnings": []}
    else:
        result = check_visuals(plan, args.require_visual, ledger, args.ledger.parent if args.ledger else args.plan.parent)
    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        for error in result["errors"]:
            print(f"ERROR: {error}", file=sys.stderr)
        for warning in result["warnings"]:
            print(f"WARN: {warning}", file=sys.stderr)
        if result["ok"]:
            print(f"PASS: {result['slide_count']} slide visual decisions checked.")
    return 0 if result["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
