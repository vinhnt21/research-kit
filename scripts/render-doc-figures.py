#!/usr/bin/env python3
"""Render the public documentation figures using LaTeX (TikZ).

Generates concise, publication-grade academic paper figures for Research Kit
in English and Vietnamese using XeLaTeX and Ghostscript.

Requirements:
    - XeLaTeX (TeX Live / MacTeX)
    - Ghostscript (`gs`)

Regenerate with:
    python3 scripts/render-doc-figures.py

Output files:
    - figures/{workflow,papers,context}-{en,vi}.png
    - Source TeX files are preserved in scripts/tex/
"""

from __future__ import annotations

import base64
import math
import os
import shutil
import struct
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "figures"
TEX_DIR = ROOT / "scripts" / "tex"


def find_binary(names: list[str]) -> str:
    for name in names:
        p = shutil.which(name)
        if p and os.path.isfile(p) and os.access(p, os.X_OK):
            return p
        if os.path.isfile(name) and os.access(name, os.X_OK):
            return name
    return ""


XELATEX = find_binary([
    "/Library/TeX/texbin/xelatex",
    "/usr/local/bin/xelatex",
    "/usr/bin/xelatex",
    "xelatex",
])

GS = find_binary([
    "/opt/homebrew/bin/gs",
    "/usr/local/bin/gs",
    "/usr/bin/gs",
    "gs",
])


# ======================================================================
# LaTeX / TikZ Templates (Minimalist Academic Paper Style)
# ======================================================================

WORKFLOW_TEX = {
    "en": r"""\documentclass[tikz,border=10pt]{standalone}
\usepackage{fontspec}
\setmainfont{Arial}
\usetikzlibrary{shapes,arrows.meta,positioning,fit,calc}

\definecolor{navy}{RGB}{20, 45, 80}
\definecolor{paperblue}{RGB}{2, 132, 199}
\definecolor{lightfill}{RGB}{250, 252, 255}
\definecolor{boxborder}{RGB}{186, 210, 235}
\definecolor{gatecolor}{RGB}{5, 150, 105}
\definecolor{gatebg}{RGB}{236, 253, 245}
\definecolor{specfill}{RGB}{245, 248, 252}
\definecolor{specborder}{RGB}{199, 210, 230}

\begin{document}
\begin{tikzpicture}[
  >=stealth,
  node distance=0.6cm and 0.5cm,
  stage/.style={
    draw=boxborder,
    fill=lightfill,
    rounded corners=4pt,
    thick,
    minimum width=2.75cm,
    minimum height=2.05cm,
    align=center,
    font=\small
  },
  specialist/.style={
    draw=specborder,
    fill=specfill,
    dashed,
    rounded corners=4pt,
    thick,
    minimum width=2.75cm,
    minimum height=1.55cm,
    align=center,
    font=\small
  }
]

  % Core Pipeline
  \node[stage] (s1) at (0, 0) {\textbf{01. Literature}\\[-1pt]\textbf{Survey}\\\texttt{\footnotesize rk-survey}\\[3pt]\colorbox{gatebg}{\textcolor{gatecolor}{\scriptsize\bfseries [Sources verified]}}};
  \node[stage, right=of s1] (s2) {\textbf{02. Questions \&}\\[-1pt]\textbf{Hypotheses}\\\texttt{\footnotesize rk-idea}\\[3pt]\colorbox{gatebg}{\textcolor{gatecolor}{\scriptsize\bfseries [Rivals are testable]}}};
  \node[stage, right=of s2] (s3) {\textbf{03. Method}\\[-1pt]\textbf{Design}\\\texttt{\footnotesize rk-method}\\[3pt]\colorbox{gatebg}{\textcolor{gatecolor}{\scriptsize\bfseries [Method recorded]}}};
  \node[stage, right=of s3] (s4) {\textbf{04. Data Processing}\\[-1pt]\textbf{\& Verification}\\\texttt{\footnotesize rk-data}\\[3pt]\colorbox{gatebg}{\textcolor{gatecolor}{\scriptsize\bfseries [Data rerun]}}};
  \node[stage, right=of s4] (s5) {\textbf{05. Manuscript}\\[-1pt]\textbf{Drafting}\\\texttt{\footnotesize rk-write}\\[3pt]\colorbox{gatebg}{\textcolor{gatecolor}{\scriptsize\bfseries [Claims match evidence]}}};
  \node[stage, right=of s5] (s6) {\textbf{06. Results}\\[-1pt]\textbf{Reporting}\\\texttt{\footnotesize rk-report}\\[3pt]\colorbox{gatebg}{\textcolor{gatecolor}{\scriptsize\bfseries [Results verified]}}};

  \draw[->, very thick, paperblue] (s1) -- (s2);
  \draw[->, very thick, paperblue] (s2) -- (s3);
  \draw[->, very thick, paperblue] (s3) -- (s4);
  \draw[->, very thick, paperblue] (s4) -- (s5);
  \draw[->, very thick, paperblue] (s5) -- (s6);

  % 4 Specialist modules placed under s2, s3, s4, s6
  \node[specialist, below=1.2cm of s2] (e1) {\textbf{Quantum Computing}\\\texttt{\footnotesize rk-quantum}\\[2pt]\tiny Local simulation; QPU by approval};
  \node[specialist, below=1.2cm of s3] (e2) {\textbf{Quantum Networks}\\\texttt{\footnotesize rk-quantum-network}\\[2pt]\tiny Entanglement routing checks};
  \node[specialist, below=1.2cm of s4] (e3) {\textbf{AI / ML Evaluation}\\\texttt{\footnotesize rk-ai}\\[2pt]\tiny Leakage and baseline checks};
  \node[specialist, below=1.2cm of s6] (e4) {\textbf{Academic Slides}\\\texttt{\footnotesize rk-academic-slides}\\[2pt]\tiny Source and structure checks};

  \draw[->, thick, dashed, draw=navy!60] (e1.north) to[out=60, in=-120] (s3.south west);
  \draw[->, thick, dashed, draw=navy!60] (e2.north) -- (s3.south);
  \draw[->, thick, dashed, draw=navy!60] (e3.north) -- (s4.south);
  \draw[->, thick, dashed, draw=navy!60] (e4.north) -- (s6.south);

  % Side Labels
  \node[font=\scriptsize\bfseries, text=navy!80, anchor=east, align=right] at ($(s1.west)+(-0.3,0)$) {Core Research\\Workflow};
  \node[font=\scriptsize\bfseries, text=navy!80, anchor=east, align=right] at ($(s1.west)+(-0.3,-3.05)$) {Domain\\Modules};

\end{tikzpicture}
\end{document}
""",
    "vi": r"""\documentclass[tikz,border=10pt]{standalone}
\usepackage{fontspec}
\setmainfont{Arial}
\usetikzlibrary{shapes,arrows.meta,positioning,fit,calc}

\definecolor{navy}{RGB}{20, 45, 80}
\definecolor{paperblue}{RGB}{2, 132, 199}
\definecolor{lightfill}{RGB}{250, 252, 255}
\definecolor{boxborder}{RGB}{186, 210, 235}
\definecolor{gatecolor}{RGB}{5, 150, 105}
\definecolor{gatebg}{RGB}{236, 253, 245}
\definecolor{specfill}{RGB}{245, 248, 252}
\definecolor{specborder}{RGB}{199, 210, 230}

\begin{document}
\begin{tikzpicture}[
  >=stealth,
  node distance=0.6cm and 0.5cm,
  stage/.style={
    draw=boxborder,
    fill=lightfill,
    rounded corners=4pt,
    thick,
    minimum width=2.75cm,
    minimum height=2.05cm,
    align=center,
    font=\small
  },
  specialist/.style={
    draw=specborder,
    fill=specfill,
    dashed,
    rounded corners=4pt,
    thick,
    minimum width=2.75cm,
    minimum height=1.55cm,
    align=center,
    font=\small
  }
]

  % Core Pipeline
  \node[stage] (s1) at (0, 0) {\textbf{01. Khảo sát}\\[-1pt]\textbf{tài liệu}\\\texttt{\footnotesize rk-survey}\\[3pt]\colorbox{gatebg}{\textcolor{gatecolor}{\scriptsize\bfseries [Nguồn đã kiểm tra]}}};
  \node[stage, right=of s1] (s2) {\textbf{02. Câu hỏi \&}\\[-1pt]\textbf{giả thuyết}\\\texttt{\footnotesize rk-idea}\\[3pt]\colorbox{gatebg}{\textcolor{gatecolor}{\scriptsize\bfseries [Giả thuyết có thể bác bỏ]}}};
  \node[stage, right=of s2] (s3) {\textbf{03. Thiết kế}\\[-1pt]\textbf{phương pháp}\\\texttt{\footnotesize rk-method}\\[3pt]\colorbox{gatebg}{\textcolor{gatecolor}{\scriptsize\bfseries [Phương pháp đã ghi nhận]}}};
  \node[stage, right=of s3] (s4) {\textbf{04. Xử lý \&}\\[-1pt]\textbf{kiểm chứng dữ liệu}\\\texttt{\footnotesize rk-data}\\[3pt]\colorbox{gatebg}{\textcolor{gatecolor}{\scriptsize\bfseries [Dữ liệu đã chạy lại]}}};
  \node[stage, right=of s4] (s5) {\textbf{05. Soạn thảo}\\[-1pt]\textbf{bài báo}\\\texttt{\footnotesize rk-write}\\[3pt]\colorbox{gatebg}{\textcolor{gatecolor}{\scriptsize\bfseries [Luận điểm khớp bằng chứng]}}};
  \node[stage, right=of s5] (s6) {\textbf{06. Báo cáo}\\[-1pt]\textbf{kết quả}\\\texttt{\footnotesize rk-report}\\[3pt]\colorbox{gatebg}{\textcolor{gatecolor}{\scriptsize\bfseries [Kết quả đã kiểm chứng]}}};

  \draw[->, very thick, paperblue] (s1) -- (s2);
  \draw[->, very thick, paperblue] (s2) -- (s3);
  \draw[->, very thick, paperblue] (s3) -- (s4);
  \draw[->, very thick, paperblue] (s4) -- (s5);
  \draw[->, very thick, paperblue] (s5) -- (s6);

  % 4 Specialist modules placed under s2, s3, s4, s6
  \node[specialist, below=1.2cm of s2] (e1) {\textbf{Tính toán lượng tử}\\\texttt{\footnotesize rk-quantum}\\[2pt]\tiny Mô phỏng cục bộ; QPU cần duyệt};
  \node[specialist, below=1.2cm of s3] (e2) {\textbf{Mạng lượng tử}\\\texttt{\footnotesize rk-quantum-network}\\[2pt]\tiny Kiểm tra định tuyến liên đới};
  \node[specialist, below=1.2cm of s4] (e3) {\textbf{Đánh giá AI/ML}\\\texttt{\footnotesize rk-ai}\\[2pt]\tiny Kiểm tra rò rỉ và baseline};
  \node[specialist, below=1.2cm of s6] (e4) {\textbf{Slide học thuật}\\\texttt{\footnotesize rk-academic-slides}\\[2pt]\tiny Kiểm tra nguồn và cấu trúc};

  \draw[->, thick, dashed, draw=navy!60] (e1.north) to[out=60, in=-120] (s3.south west);
  \draw[->, thick, dashed, draw=navy!60] (e2.north) -- (s3.south);
  \draw[->, thick, dashed, draw=navy!60] (e3.north) -- (s4.south);
  \draw[->, thick, dashed, draw=navy!60] (e4.north) -- (s6.south);

  % Side Labels
  \node[font=\scriptsize\bfseries, text=navy!80, anchor=east, align=right] at ($(s1.west)+(-0.3,0)$) {Quy trình nghiên cứu\\cốt lõi};
  \node[font=\scriptsize\bfseries, text=navy!80, anchor=east, align=right] at ($(s1.west)+(-0.3,-3.05)$) {Module\\chuyên ngành};

\end{tikzpicture}
\end{document}
""",
}

PAPERS_TEX = {
    "en": r"""\documentclass[tikz,border=10pt]{standalone}
\usepackage{fontspec}
\setmainfont{Arial}
\usetikzlibrary{shapes,arrows.meta,positioning,fit,calc}

\definecolor{navy}{RGB}{20, 45, 80}
\definecolor{barrierred}{RGB}{185, 28, 28}
\definecolor{paperbg}{RGB}{250, 252, 255}
\definecolor{paperborder}{RGB}{147, 197, 253}
\definecolor{shelfbg}{RGB}{248, 250, 252}
\definecolor{shelfborder}{RGB}{203, 213, 225}

\begin{document}
\begin{tikzpicture}[
  >=stealth,
  node distance=0.8cm and 0.6cm,
  paper/.style={
    draw=paperborder,
    fill=paperbg,
    rounded corners=4pt,
    thick,
    minimum width=4.3cm,
    minimum height=3.8cm,
    align=center,
    font=\small
  },
  shelf/.style={
    draw=shelfborder,
    fill=shelfbg,
    rounded corners=4pt,
    thick,
    minimum width=14.4cm,
    minimum height=1.4cm,
    align=center,
    font=\small
  }
]

  % 3 Generic Paper Workspaces
  \node[paper] (p1) {
    \textbf{\textcolor{navy}{paper-1/}}\\\scriptsize Workspace for Paper 1\\[5pt]
    \footnotesize
    \begin{tabular}{l}
      $\bullet$ \texttt{AGENTS.md} -- Scope and research questions\\
      $\bullet$ \texttt{references/} -- Verified citation sources\\
      $\bullet$ \texttt{src/} -- Experiment code\\
      $\bullet$ \texttt{results/} -- Stored data and outputs\\
      $\bullet$ \texttt{figures/} -- Publication figures\\
      $\bullet$ \texttt{draft/} -- Current manuscript
    \end{tabular}
  };

  \node[paper, right=of p1] (p2) {
    \textbf{\textcolor{navy}{paper-2/}}\\\scriptsize Workspace for Paper 2\\[5pt]
    \footnotesize
    \begin{tabular}{l}
      $\bullet$ \texttt{AGENTS.md} -- Scope and research questions\\
      $\bullet$ \texttt{references/} -- Verified citation sources\\
      $\bullet$ \texttt{src/} -- Experiment code\\
      $\bullet$ \texttt{results/} -- Stored data and outputs\\
      $\bullet$ \texttt{figures/} -- Publication figures\\
      $\bullet$ \texttt{draft/} -- Current manuscript
    \end{tabular}
  };

  \node[paper, right=of p2] (p3) {
    \textbf{\textcolor{navy}{paper-n/}}\\\scriptsize Workspace for Paper n\\[5pt]
    \footnotesize
    \begin{tabular}{l}
      $\bullet$ \texttt{AGENTS.md} -- Scope and research questions\\
      $\bullet$ \texttt{references/} -- Verified citation sources\\
      $\bullet$ \texttt{src/} -- Experiment code\\
      $\bullet$ \texttt{results/} -- Stored data and outputs\\
      $\bullet$ \texttt{figures/} -- Publication figures\\
      $\bullet$ \texttt{draft/} -- Current manuscript
    \end{tabular}
  };

  % Barrier Box
  \node[draw=barrierred, dashed, thick, rounded corners=6pt, inner sep=10pt, fit=(p1) (p2) (p3)] (barrier) {};
  \node[fill=white, draw=barrierred, rounded corners=3pt, font=\footnotesize\bfseries, text=barrierred] at (barrier.north) {\quad Each paper keeps its own data, code, results, and manuscript \quad};

  % Shared Shelf Below
  \node[shelf, below=0.9cm of barrier] (shelf) {
    \textbf{\textcolor{navy}{references/ -- Shared Literature Library (Read Only)}}\\[2pt]
    \footnotesize Contains checked PDFs, survey notes, and the shared BibTeX library; each citation is rechecked for the active paper
  };

  \draw[->, thick, dashed, draw=navy!60] (shelf.north -| p1.south) -- (p1.south) node[midway, right, font=\tiny, text=navy] {read};
  \draw[->, thick, dashed, draw=navy!60] (shelf.north -| p2.south) -- (p2.south) node[midway, right, font=\tiny, text=navy] {read};
  \draw[->, thick, dashed, draw=navy!60] (shelf.north -| p3.south) -- (p3.south) node[midway, right, font=\tiny, text=navy] {read};

\end{tikzpicture}
\end{document}
""",
    "vi": r"""\documentclass[tikz,border=10pt]{standalone}
\usepackage{fontspec}
\setmainfont{Arial}
\usetikzlibrary{shapes,arrows.meta,positioning,fit,calc}

\definecolor{navy}{RGB}{20, 45, 80}
\definecolor{barrierred}{RGB}{185, 28, 28}
\definecolor{paperbg}{RGB}{250, 252, 255}
\definecolor{paperborder}{RGB}{147, 197, 253}
\definecolor{shelfbg}{RGB}{248, 250, 252}
\definecolor{shelfborder}{RGB}{203, 213, 225}

\begin{document}
\begin{tikzpicture}[
  >=stealth,
  node distance=0.8cm and 0.6cm,
  paper/.style={
    draw=paperborder,
    fill=paperbg,
    rounded corners=4pt,
    thick,
    minimum width=4.3cm,
    minimum height=3.8cm,
    align=center,
    font=\small
  },
  shelf/.style={
    draw=shelfborder,
    fill=shelfbg,
    rounded corners=4pt,
    thick,
    minimum width=14.4cm,
    minimum height=1.4cm,
    align=center,
    font=\small
  }
]

  % 3 Generic Paper Workspaces
  \node[paper] (p1) {
    \textbf{\textcolor{navy}{paper-1/}}\\\scriptsize Không gian làm việc riêng cho Bài 1\\[5pt]
    \footnotesize
    \begin{tabular}{l}
      $\bullet$ \texttt{AGENTS.md} -- Phạm vi và câu hỏi nghiên cứu\\
      $\bullet$ \texttt{references/} -- Nguồn trích dẫn đã kiểm tra\\
      $\bullet$ \texttt{src/} -- Mã thực nghiệm\\
      $\bullet$ \texttt{results/} -- Dữ liệu và kết quả đã lưu\\
      $\bullet$ \texttt{figures/} -- Hình và đồ thị xuất bản\\
      $\bullet$ \texttt{draft/} -- Bản thảo hiện hành
    \end{tabular}
  };

  \node[paper, right=of p1] (p2) {
    \textbf{\textcolor{navy}{paper-2/}}\\\scriptsize Không gian làm việc riêng cho Bài 2\\[5pt]
    \footnotesize
    \begin{tabular}{l}
      $\bullet$ \texttt{AGENTS.md} -- Phạm vi và câu hỏi nghiên cứu\\
      $\bullet$ \texttt{references/} -- Nguồn trích dẫn đã kiểm tra\\
      $\bullet$ \texttt{src/} -- Mã thực nghiệm\\
      $\bullet$ \texttt{results/} -- Dữ liệu và kết quả đã lưu\\
      $\bullet$ \texttt{figures/} -- Hình và đồ thị xuất bản\\
      $\bullet$ \texttt{draft/} -- Bản thảo hiện hành
    \end{tabular}
  };

  \node[paper, right=of p2] (p3) {
    \textbf{\textcolor{navy}{paper-n/}}\\\scriptsize Không gian làm việc riêng cho Bài n\\[5pt]
    \footnotesize
    \begin{tabular}{l}
      $\bullet$ \texttt{AGENTS.md} -- Phạm vi và câu hỏi nghiên cứu\\
      $\bullet$ \texttt{references/} -- Nguồn trích dẫn đã kiểm tra\\
      $\bullet$ \texttt{src/} -- Mã thực nghiệm\\
      $\bullet$ \texttt{results/} -- Dữ liệu và kết quả đã lưu\\
      $\bullet$ \texttt{figures/} -- Hình và đồ thị xuất bản\\
      $\bullet$ \texttt{draft/} -- Bản thảo hiện hành
    \end{tabular}
  };

  % Barrier Box
  \node[draw=barrierred, dashed, thick, rounded corners=6pt, inner sep=10pt, fit=(p1) (p2) (p3)] (barrier) {};
  \node[fill=white, draw=barrierred, rounded corners=3pt, font=\footnotesize\bfseries, text=barrierred] at (barrier.north) {\quad Mỗi bài báo sử dụng dữ liệu, mã nguồn, kết quả và bản thảo riêng \quad};

  % Shared Shelf Below
  \node[shelf, below=0.9cm of barrier] (shelf) {
    \textbf{\textcolor{navy}{references/ -- Thư viện tài liệu dùng chung (Chỉ đọc)}}\\[2pt]
    \footnotesize Lưu PDF, ghi chú khảo sát và BibTeX dùng chung; mỗi trích dẫn được kiểm tra lại theo bài báo hiện hành
  };

  \draw[->, thick, dashed, draw=navy!60] (shelf.north -| p1.south) -- (p1.south) node[midway, right, font=\tiny, text=navy] {đọc};
  \draw[->, thick, dashed, draw=navy!60] (shelf.north -| p2.south) -- (p2.south) node[midway, right, font=\tiny, text=navy] {đọc};
  \draw[->, thick, dashed, draw=navy!60] (shelf.north -| p3.south) -- (p3.south) node[midway, right, font=\tiny, text=navy] {đọc};

\end{tikzpicture}
\end{document}
""",
}

CONTEXT_TEX = {
    "en": r"""\documentclass[tikz,border=10pt]{standalone}
\usepackage{fontspec}
\setmainfont{Arial}
\usetikzlibrary{shapes,arrows.meta,positioning,calc}

\definecolor{navy}{RGB}{20, 45, 80}
\definecolor{tealblue}{RGB}{2, 132, 199}
\definecolor{tableborder}{RGB}{203, 213, 225}
\definecolor{axiscolor}{RGB}{100, 116, 139}

\begin{document}
\begin{tikzpicture}[>=stealth]

  % Bar Chart (Scale 0 to 8%)
  \def\xscale{1.2}
  \def\trackw{9.6}

  % Axis
  \draw[thick, draw=tableborder] (0, 0) -- (\trackw, 0);
  \foreach \x/\label in {0/0\%, 1/1\%, 2/2\%, 3/3\%, 4/4\%, 5/5\%, 6/6\%, 7/7\%, 8/8\%} {
    \draw[draw=tableborder] ({\x*\xscale}, 0) -- ({\x*\xscale}, -0.15) node[below, font=\footnotesize, text=axiscolor] {\label};
    \draw[dashed, draw=tableborder!60] ({\x*\xscale}, 0) -- ({\x*\xscale}, 2.4);
  }
  \node[font=\footnotesize\bfseries, text=axiscolor, anchor=north] at ({\trackw/2}, -0.65) {Persistent skill context in a 200,000-token window (\%)};

  % Bar 1: Monolithic (7.12%)
  \node[anchor=east, font=\small\bfseries, text=navy] at (-0.35, 1.8) {Scientific Agent Skills -- 163-skill catalog};
  \fill[navy, rounded corners=3pt] (0, 1.45) rectangle ({7.123*\xscale}, 2.15);
  \node[anchor=west, font=\footnotesize\bfseries, text=navy] at ({7.123*\xscale + 0.2}, 1.8) {Uses 7.12\% of context (14,246 tokens)};

  % Bar 2: Research Kit (0.49%)
  \node[anchor=east, font=\small\bfseries, text=tealblue] at (-0.35, 0.7) {Research Kit -- 10 research skills};
  \fill[tealblue!85, rounded corners=3pt] (0, 0.35) rectangle ({0.49*\xscale}, 1.05);
  \node[anchor=west, font=\footnotesize\bfseries, text=tealblue] at ({0.49*\xscale + 0.2}, 0.7) {Uses $<$0.50\% of context ($\sim$1,000 tokens)};

\end{tikzpicture}
\end{document}
""",
    "vi": r"""\documentclass[tikz,border=10pt]{standalone}
\usepackage{fontspec}
\setmainfont{Arial}
\usetikzlibrary{shapes,arrows.meta,positioning,calc}

\definecolor{navy}{RGB}{20, 45, 80}
\definecolor{tealblue}{RGB}{2, 132, 199}
\definecolor{tableborder}{RGB}{203, 213, 225}
\definecolor{axiscolor}{RGB}{100, 116, 139}

\begin{document}
\begin{tikzpicture}[>=stealth]

  % Bar Chart (Scale 0 to 8%)
  \def\xscale{1.2}
  \def\trackw{9.6}

  % Axis
  \draw[thick, draw=tableborder] (0, 0) -- (\trackw, 0);
  \foreach \x/\label in {0/0\%, 1/1\%, 2/2\%, 3/3\%, 4/4\%, 5/5\%, 6/6\%, 7/7\%, 8/8\%} {
    \draw[draw=tableborder] ({\x*\xscale}, 0) -- ({\x*\xscale}, -0.15) node[below, font=\footnotesize, text=axiscolor] {\label};
    \draw[dashed, draw=tableborder!60] ({\x*\xscale}, 0) -- ({\x*\xscale}, 2.4);
  }
  \node[font=\footnotesize\bfseries, text=axiscolor, anchor=north] at ({\trackw/2}, -0.65) {Phần context thường trực trong cửa sổ 200.000 token (\%)};

  % Bar 1: Monolithic (7.12%)
  \node[anchor=east, font=\small\bfseries, text=navy] at (-0.35, 1.8) {Scientific Agent Skills -- Danh mục 163 skill};
  \fill[navy, rounded corners=3pt] (0, 1.45) rectangle ({7.123*\xscale}, 2.15);
  \node[anchor=west, font=\footnotesize\bfseries, text=navy] at ({7.123*\xscale + 0.2}, 1.8) {Chiếm 7,12\% context (14.246 token)};

  % Bar 2: Research Kit (0.49%)
  \node[anchor=east, font=\small\bfseries, text=tealblue] at (-0.35, 0.7) {Research Kit -- 10 skill nghiên cứu};
  \fill[tealblue!85, rounded corners=3pt] (0, 0.35) rectangle ({0.49*\xscale}, 1.05);
  \node[anchor=west, font=\footnotesize\bfseries, text=tealblue] at ({0.49*\xscale + 0.2}, 0.7) {Chiếm $<$0,50\% context ($\sim$1.000 token)};

\end{tikzpicture}
\end{document}
""",
}


def compile_latex_to_png(tex_source: str, stem: str) -> None:
    if not XELATEX or not GS:
        sys.stderr.write("XeLaTeX or Ghostscript not found. Ensure TeX Live and gs are installed.\n")
        sys.exit(1)

    TEX_DIR.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)

    tex_file = TEX_DIR / f"{stem}.tex"
    tex_file.write_text(tex_source, encoding="utf-8")

    with tempfile.TemporaryDirectory() as tmpdir:
        cmd_latex = [
            XELATEX,
            "-interaction=nonstopmode",
            f"-output-directory={tmpdir}",
            str(tex_file),
        ]
        res = subprocess.run(cmd_latex, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if res.returncode != 0:
            print(f"Error compiling {tex_file.name}:", file=sys.stderr)
            print(res.stdout[-1500:], file=sys.stderr)
            sys.exit(1)

        pdf_file = Path(tmpdir) / f"{stem}.pdf"
        out_png = OUT / f"{stem}.png"

        cmd_gs = [
            GS,
            "-sDEVICE=pngalpha",
            "-r300",
            "-dDownScaleFactor=1",
            f"-sOutputFile={out_png}",
            "-dBATCH",
            "-dNOPAUSE",
            str(pdf_file),
        ]
        res_gs = subprocess.run(cmd_gs, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if res_gs.returncode != 0:
            print(f"Error rasterizing {pdf_file.name}:", file=sys.stderr)
            print(res_gs.stderr, file=sys.stderr)
            sys.exit(1)

        print(f"figures/{out_png.name}  {out_png.stat().st_size} bytes (LaTeX render)")
        out_svg = OUT / f"{stem}.svg"
        generate_animated_svg(out_png, out_svg)


def generate_animated_svg(png_path: Path, svg_path: Path) -> None:
    png_bytes = png_path.read_bytes()
    b64_data = base64.b64encode(png_bytes).decode("utf-8")
    w0, h0 = struct.unpack(">LL", png_bytes[16:24])

    scale = w0 / 920.0
    pad = round(12 * scale)
    rx = round(10 * scale)
    stroke_base = max(1, round(1.0 * scale))
    stroke_running = max(2, round(2.0 * scale))

    W = w0 + 2 * pad
    H = h0 + 2 * pad

    bx = round(stroke_running / 2) + 2
    by = round(stroke_running / 2) + 2
    bw = W - 2 * bx
    bh = H - 2 * by

    P = 2 * ((bw - 2 * rx) + (bh - 2 * rx)) + 2 * math.pi * rx

    # Single running light-blue segment (no neon, thin and clean)
    dash = round(P * 0.22)
    gap = round(P - dash)
    dash_arr = f"{dash} {gap}"

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="100%" height="auto">
  <defs>
    <linearGradient id="card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>
  </defs>

  <!-- Modern Card Background with rounded corners -->
  <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="{rx}" fill="url(#card-bg)" />

  <!-- Base Inactive Ambient Border (Subtle) -->
  <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="{rx}" fill="none" stroke="#e2e8f0" stroke-width="{stroke_base}" />

  <!-- The Figure Graphic -->
  <image href="data:image/png;base64,{b64_data}" x="{pad}" y="{pad}" width="{w0}" height="{h0}" />

  <!-- Single Clean, Thin Light-Blue Running Border -->
  <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="{rx}" fill="none" stroke="#38bdf8" stroke-width="{stroke_running}" stroke-linecap="round" stroke-dasharray="{dash_arr}">
    <animate attributeName="stroke-dashoffset" from="0" to="{-P:.1f}" dur="5s" repeatCount="indefinite" />
  </rect>
</svg>"""

    svg_path.write_text(svg)
    print(f"figures/{svg_path.name}  {len(svg)} bytes (Clean single light-blue border)")


def main() -> None:
    for lang in ("en", "vi"):
        compile_latex_to_png(WORKFLOW_TEX[lang], f"workflow-{lang}")
        compile_latex_to_png(PAPERS_TEX[lang], f"papers-{lang}")
        compile_latex_to_png(CONTEXT_TEX[lang], f"context-{lang}")


if __name__ == "__main__":
    main()
