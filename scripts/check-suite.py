#!/usr/bin/env python3
"""Check the suite inventory, metadata, links, and pinned package hashes."""

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

NETWORK_HASH = "06278251b844b94cb2f46a431bccd22256966c9959f62c4f1f838e1eab72e531"
VISUALIZE = {
    "skills/rk-academic-visualize/SKILL.md": "e7e6d06d5b89a95be9cd0832fdb736702518a342e007265dc2aef6b539851302",
    "skills/rk-academic-visualize/assets/academic-template.pptx": "de9ed2b7b8fd2e7adf54daa98eccbf2140fa7ff7cde010b9208500515f3229f1",
    "skills/rk-academic-visualize/assets/two-pass-flow.tex": "5cefa1ce2ee72c353f00d24c24d3c690180913d2d0d2b732be561378a4e37853",
    "skills/rk-academic-visualize/evals/evals.json": "739bcefa33081a745a7c4d71cebb3b65f1c7ae5ef49ab8fb1b7ca0a7ac106bd7",
    "skills/rk-academic-visualize/references/illustration-guide.md": "1599e010df6cd9f0b66fe52d47b714610a1683756a6a49a374c4fc6d9db0fc91",
    "skills/rk-academic-visualize/references/slide-plan.md": "8c1d704108bfa90518ddcf3df9a025a805eddd16955c1249e7b0c82cd3b9c366",
    "skills/rk-academic-visualize/references/style-guide.md": "e1380e38124a21a17addfa0b4ef42107d69a2cfbcc4a5b673472ea9c2bbc7a74",
    "skills/rk-academic-visualize/references/visual-assets.md": "eb5013f9ad481392611d6b43203c3941fe217fe9f7000178c62b6e0c797b0e63",
    "skills/rk-academic-visualize/scripts/check-deck.py": "2beea0d467d308d1a18abf07e391cd155a7196affacc2ac9f7cfeafeb7e985a8",
    "skills/rk-academic-visualize/scripts/check-visual-plan.py": "13243bcb00c9bf886e3d3818161a007759bf4ff77527b2fe0e4396e42730cc1b",
    "skills/rk-academic-visualize/scripts/inject-math.py": "72926ce1ac9cf2cc4b3b2bcfb1d3f249ffe76bc9d97c4c5769e055b7c9a4b700",
    "skills/rk-academic-visualize/scripts/sanitize-svg.py": "fb80c545ec6b0316e3829879a593e4f59bc97eb3c77ad6ff56fc336ff05f8e8e",
    "skills/rk-academic-visualize/scripts/tests/test_check_deck.py": "b9956010370cfbcc704884b13f702bf5922d31561bc0c58012bfbbebd596bf28",
    "skills/rk-academic-visualize/scripts/tests/test_check_visual_plan.py": "88e3ab6bd00829c076fdccf1ffc7c7099255b4ba440a0f585a39ebfb171df20f",
    "skills/rk-academic-visualize/scripts/tests/test_inject_math.py": "d4747ab35381f588afa1dda9c26152c6a076bbe44c3f473b7a0e7804b20f0f40",
    "skills/rk-academic-visualize/scripts/tests/test_sanitize_svg.py": "d9a65c999920a82ee06dadc6be9780d054f3c3442fa7a512474b5eb733716b15",
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
