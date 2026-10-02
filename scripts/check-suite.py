#!/usr/bin/env python3
"""Check the eight rewritten suite skills and the two frozen packages."""

import hashlib
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent

ACTIVE_PAPER = """## Active paper

Resolve the paper from the request, the working directory, or that project's own instructions, such as an `AGENTS.md` beside the work. Read that paper's scientific notes before changing its files or stating its results. If several papers fit and the task would write, run, or make a paper-specific claim, ask which paper applies.

Leave sibling papers untouched. A sibling draft, bibliography, figure, codebase, or unpublished result is not a citation, a baseline, or reusable text. A shared read-only literature collection may be consulted after each source is checked for this paper. Put new files where this paper already stores that kind of artifact. Do not impose a directory layout, venue name, or tool.
"""

ALLOWED = {
    "rk-survey": [
        "SKILL.md",
        "references/search-boundary.md",
        "references/citation-check.md",
        "references/evidence-map.md",
        "assets/search-record.md",
        "assets/citation-checklist.md",
    ],
    "rk-idea": [
        "SKILL.md",
        "references/framing.md",
        "references/hypothesis-quality.md",
        "references/rivals-and-falsification.md",
        "references/biases-and-fallacies.md",
        "assets/hypothesis-record.md",
        "assets/rival-matrix.md",
    ],
    "rk-method": [
        "SKILL.md",
        "references/design-choice.md",
        "references/power-and-precision.md",
        "references/feasibility-and-freeze.md",
        "assets/method-plan.md",
    ],
    "rk-data": [
        "SKILL.md",
        "references/inspect.md",
        "references/test-choice.md",
        "references/figures.md",
        "references/anomalies-and-rerun.md",
        "assets/analysis-record.md",
    ],
    "rk-write": [
        "SKILL.md",
        "references/claim-evidence.md",
        "references/section-roles.md",
        "references/paragraph-flow.md",
        "references/review-and-response.md",
        "assets/claim-evidence.md",
    ],
    "rk-report": [
        "SKILL.md",
        "references/report-gate.md",
        "assets/report-record.md",
    ],
    "rk-quantum": [
        "SKILL.md",
        "references/model-checks.md",
        "references/execution-boundary.md",
        "assets/quantum-run-record.md",
    ],
    "rk-ai": [
        "SKILL.md",
        "references/leakage-and-splits.md",
        "references/evaluation.md",
        "assets/ml-eval-record.md",
    ],
}

BANNED = (
    "API_KEY",
    "x-api-key",
    ".env",
    "inspect_runtime",
    "QiskitRuntimeService",
    "rk-scikit-learn",
    "sequence_inspector",
    "image_inspector",
    "h5py",
    "mpl.colors",
    "import matplotlib",
    "QuantumCircuit",
    "RandomForestClassifier",
)

RUN_LINE = re.compile(
    r"(?<![\w-])(?:curl|wget|git|gh)(?![\w-])|pip install|uv pip install|uv tool install|Task\("
)
LINK = re.compile(r"\]\(([^)]+)\)")
NAME_FIELD = re.compile(r"^name:\s*(\S+)\s*$", re.M)
DESCRIPTION = re.compile(r'^description:\s*"(.*)"\s*$', re.M)

NETWORK_HASH = "9847d5dbbc0691ae4949381aff996a79985aae7cdffd5b8498feacf60de54cf1"
VISUALIZE = {
    "skills/rk-academic-visualize/SKILL.md": "5fbb0d3d0bd02b855154fd1e31e86223fe1071be94d10f377312decc6f45cf63",
    "skills/rk-academic-visualize/assets/academic-template.pptx": "de9ed2b7b8fd2e7adf54daa98eccbf2140fa7ff7cde010b9208500515f3229f1",
    "skills/rk-academic-visualize/references/illustration-guide.md": "a37deecdde1a6944bdc20c7053968433e7c72c6e9e0cc036131a3b3a05190103",
    "skills/rk-academic-visualize/references/slide-plan.md": "348843e01a1bb964474448803a745abc24d81de93addae72fcc5f4578ceda78a",
    "skills/rk-academic-visualize/references/style-guide.md": "6d2725b166795b9b3b20136e3cfe25b74cad8e13d511cfcd85cf048cba02e222",
    "skills/rk-academic-visualize/scripts/check-deck.py": "25c2a6dd395535fcc9c710e10f5d85780f8aa0275cec2dc624d7c7bed3ca2f34",
    "skills/rk-academic-visualize/scripts/tests/test_check_deck.py": "4844451c7675a7b7448719741026a08cdfddf07b5d72936f1af0221ab76fae1f",
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    errors = []
    for name, expected in ALLOWED.items():
        directory = ROOT / "skills" / name
        actual = sorted(
            path.relative_to(directory).as_posix()
            for path in directory.rglob("*")
            if path.is_file()
        )
        if actual != sorted(expected):
            errors.append(f"{name}: files {actual}")
            continue
        skill = (directory / "SKILL.md").read_text()
        frontmatter = skill.split("---", 2)[1]
        found = NAME_FIELD.search(frontmatter)
        if found is None or found.group(1) != name:
            errors.append(f"{name}: name field {found.group(1) if found else None}")
        if "license: Apache-2.0" not in frontmatter:
            errors.append(f"{name}: license")
        description = DESCRIPTION.search(frontmatter)
        if description is None or not 1 <= len(description.group(1)) <= 1024:
            errors.append(f"{name}: description length")
        if ACTIVE_PAPER not in skill:
            errors.append(f"{name}: Active paper block")
        blob = "\n".join((directory / rel).read_text() for rel in expected)
        for token in BANNED:
            if token in blob:
                errors.append(f"{name}: banned {token}")
        for line in blob.splitlines():
            stripped = line.strip()
            if stripped.startswith(("Do not", "Never", "Drop")):
                continue
            if RUN_LINE.search(line):
                errors.append(f"{name}: run instruction: {stripped[:120]}")
                break
        for path in directory.rglob("*.md"):
            for match in LINK.findall(path.read_text()):
                target = match.split()[0].split("#", 1)[0]
                if target.startswith(("http://", "https://", "mailto:")):
                    continue
                if ".." in Path(target).parts:
                    errors.append(f"{path}: parent link {target}")
                    continue
                if not (path.parent / target).is_file():
                    errors.append(f"{path}: missing link {target}")

    network = ROOT / "skills" / "rk-quantum-network"
    network_files = [path for path in network.rglob("*") if path.is_file()]
    if [path.name for path in network_files] != ["SKILL.md"]:
        errors.append("rk-quantum-network: expected only SKILL.md")
    elif sha256(network / "SKILL.md") != NETWORK_HASH:
        errors.append("rk-quantum-network: hash mismatch")

    visualize = ROOT / "skills" / "rk-academic-visualize"
    found_visualize = {
        path.relative_to(ROOT).as_posix()
        for path in visualize.rglob("*")
        if path.is_file()
    }
    if found_visualize != set(VISUALIZE):
        errors.append(f"academic visualize files: {sorted(found_visualize)}")
    for rel, digest in VISUALIZE.items():
        path = ROOT / rel
        if path.is_file() and sha256(path) != digest:
            errors.append(f"hash mismatch {rel}")

    for document in (ROOT / "README.md", ROOT / "README.vi.md"):
        text = document.read_text()
        for token in (*ALLOWED, "rk-quantum-network", "skills/rk-academic-visualize"):
            if token not in text:
                errors.append(f"{document.name}: missing {token}")

    if errors:
        for error in errors:
            print("ERROR:", error, file=sys.stderr)
        return 1
    print("ok")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
