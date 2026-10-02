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
WEB_PUBLIC_FIG = ROOT / "web" / "public" / "figures"
WEB_DIST_FIG = ROOT / "web" / "dist" / "figures"



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
  \node[specialist, below=1.2cm of s6] (e4) {\textbf{Academic Visualization}\\\texttt{\footnotesize rk-academic-visualize}\\[2pt]\tiny Diagrams \& deck checks};

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
  \node[specialist, below=1.2cm of s6] (e4) {\textbf{Trực quan \& Slide}\\\texttt{\footnotesize rk-academic-visualize}\\[2pt]\tiny Hình minh họa \& cấu trúc slide};

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


HUMAN_AGENT_PIPELINE_TEX = {
    "en": r"""\documentclass[tikz,border=18pt]{standalone}
\usepackage{fontspec}
\setmainfont{Arial}
\usetikzlibrary{arrows.meta,positioning,calc}

\definecolor{navy}{RGB}{15,23,42}
\definecolor{slate}{RGB}{71,85,105}
\definecolor{line}{RGB}{203,213,225}
\definecolor{danger}{RGB}{220,38,38}
\definecolor{dangerbg}{RGB}{254,242,242}
\definecolor{blue}{RGB}{2,132,199}
\definecolor{bluebg}{RGB}{240,249,255}
\definecolor{green}{RGB}{5,150,105}
\definecolor{greenbg}{RGB}{236,253,245}

\begin{document}
\begin{tikzpicture}[
  >=Stealth,
  % Row 1 styles (Bloated / Problematic)
  card1/.style={draw=slate!70, fill=white, rounded corners=7pt, line width=1.1pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  skillcard1/.style={draw=danger, fill=dangerbg, rounded corners=7pt, line width=1.3pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  agentcard1/.style={draw=slate!70, fill=white, rounded corners=7pt, line width=1.1pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  reviewcard1/.style={draw=danger, fill=dangerbg, rounded corners=7pt, line width=1.3pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  % Row 2 styles (Research Kit / Standardized)
  card2/.style={draw=navy!70, fill=white, rounded corners=7pt, line width=1.1pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  skillcard2/.style={draw=blue, fill=bluebg, rounded corners=7pt, line width=1.3pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  agentcard2/.style={draw=blue, fill=bluebg, rounded corners=7pt, line width=1.1pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  reviewcard2/.style={draw=green!80!black, fill=greenbg, rounded corners=7pt, line width=1.3pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy}
]

  % Top Main Title
  \node[anchor=west, font=\large\bfseries, text=navy] at (-12.8, 6.7)
    {COMPARISON OF TWO COLLABORATIVE PIPELINES: BLOATED CATALOG vs. RESEARCH KIT};

  % =========================================================================
  % ROW 1: BLOATED OPEN CATALOG (>150 SKILLS) - BOTTLENECK & HARD TO REVIEW
  % =========================================================================
  \node[anchor=west, font=\footnotesize\bfseries, fill=dangerbg, draw=danger!60, rounded corners=4pt, inner sep=4pt, text=danger] at (-12.8, 5.9)
    {[X] PIPELINE 1: BLOATED OPEN CATALOG ($>$150 SKILLS) $\rightarrow$ ROUTING AMBIGUITY \& REVIEW BOTTLENECK};

  % 1.1 Researcher 1
  \node[card1] (human1) at (-10.5, 3.6) {};
  \begin{scope}[shift={($(human1.north)+(0, -0.52)$)}]
    \fill[slate] (0, 0.22) circle (0.16cm);
    \draw[fill=slate, draw=slate, rounded corners=1.5pt] (-0.26, -0.22) .. controls (-0.26, 0.04) and (0.26, 0.04) .. (0.26, -0.22) -- cycle;
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(human1.north)+(0, -0.98)$) {
    \textbf{\small RESEARCHER}\\[6pt]
    \footnotesize $\bullet$ Defines initial research topic\\[3pt]
    \footnotesize $\bullet$ Lacks stage-boundary rules\\[3pt]
    \footnotesize $\bullet$ No explicit audit criteria
  };

  % 1.2 Skill 1
  \node[skillcard1] (skill1) at (-3.5, 3.6) {};
  \begin{scope}[shift={($(skill1.north)+(0, -0.52)$)}]
    \draw[draw=danger, fill=danger!20, line width=1pt] (-0.28, 0.20) -- (0.28, 0.20) -- (0.08, -0.06) -- (0.08, -0.22) -- (-0.08, -0.22) -- (-0.08, -0.06) -- cycle;
    \fill[danger] (0, 0.04) circle (0.04cm);
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(skill1.north)+(0, -0.98)$) {
    \textbf{\small BLOATED CATALOG ($>$150)}\\[6pt]
    \footnotesize $\bullet$ Overwhelming skill options\\[3pt]
    \footnotesize $\bullet$ Misrouting \& tool hallucination\\[3pt]
    \footnotesize $\bullet$ \textcolor{danger}{\textbf{Burns 7--10\% context}} ($\sim$14k tok)
  };

  % 1.3 Agent 1
  \node[agentcard1] (agent1) at (3.5, 3.6) {};
  \begin{scope}[shift={($(agent1.north)+(0, -0.52)$)}]
    \draw[draw=slate!80, fill=slate!15, rounded corners=2pt, line width=1pt] (-0.24, -0.18) rectangle (0.24, 0.18);
    \fill[slate!80] (-0.09, 0.03) circle (0.04cm);
    \fill[slate!80] (0.09, 0.03) circle (0.04cm);
    \draw[draw=danger, line width=1pt] (-0.10, -0.08) .. controls (0, -0.02) .. (0.10, -0.08);
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(agent1.north)+(0, -0.98)$) {
    \textbf{\small AGENT EXECUTION}\\[6pt]
    \footnotesize $\bullet$ Runs without strict anchors\\[3pt]
    \footnotesize $\bullet$ Drifted scope \& speculation\\[3pt]
    \footnotesize $\bullet$ Emits verbose untraceable logs
  };

  % 1.4 Review 1
  \node[reviewcard1] (review1) at (10.5, 3.6) {};
  \begin{scope}[shift={($(review1.north)+(0, -0.52)$)}]
    \draw[draw=danger, fill=danger!20, line width=1.1pt, line join=round] (0, 0.22) -- (0.26, -0.20) -- (-0.26, -0.20) -- cycle;
    \draw[draw=danger, line width=1.1pt, line cap=round] (0, 0.08) -- (0, -0.04);
    \fill[danger] (0, -0.13) circle (0.035cm);
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(review1.north)+(0, -0.98)$) {
    \textbf{\small HARD-TO-AUDIT RESULTS}\\[6pt]
    \footnotesize $\bullet$ Hard to trace claims vs logs\\[3pt]
    \footnotesize $\bullet$ Hours wasted digging citations\\[3pt]
    \footnotesize $\bullet$ \textcolor{danger}{\textbf{High academic error risk}}
  };

  % Row 1 Arrows
  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=danger] 
    (human1.east) -- (skill1.west)
    node[midway, above=8pt, fill=dangerbg, draw=danger!40, rounded corners=3pt, inner sep=2.5pt, font=\scriptsize\bfseries, text=danger] {Hard to pick right skill};

  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=danger] 
    (skill1.east) -- (agent1.west)
    node[midway, above=8pt, fill=dangerbg, draw=danger!40, rounded corners=3pt, inner sep=2.5pt, font=\scriptsize\bfseries, text=danger] {Calls wrong skills};

  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=danger] 
    (agent1.east) -- (review1.west)
    node[midway, above=8pt, fill=dangerbg, draw=danger!40, rounded corners=3pt, inner sep=2.5pt, font=\scriptsize\bfseries, text=danger] {Raw, unverified logs};

  % Row 1 Feedback Loop
  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.2pt, draw=danger!80, dashed] (review1.south) to[out=-145, in=-35, looseness=0.30] 
    node[midway, below, font=\scriptsize\bfseries, text=danger, fill=white, inner sep=3.5pt, rounded corners=4pt, draw=danger!50] 
    {Audit overload $\rightarrow$ Time wasted digging logs \& redoing work (Bottleneck loop)}
    (human1.south);


  % =========================================================================
  % ROW 2: RESEARCH KIT (10 SKILLS) - LEAN, STAGE-BASED & EASY TO AUDIT
  % =========================================================================
  \node[anchor=west, font=\footnotesize\bfseries, fill=greenbg, draw=green!60, rounded corners=4pt, inner sep=4pt, text=green!80!black] at (-12.8, -0.9)
    {[V] PIPELINE 2: RESEARCH KIT (10 SKILLS) $\rightarrow$ STAGE-GATED ROUTING \& EASY VERIFICATION};

  % 2.1 Researcher 2
  \node[card2] (human2) at (-10.5, -3.2) {};
  \begin{scope}[shift={($(human2.north)+(0, -0.52)$)}]
    \fill[navy] (0, 0.22) circle (0.16cm);
    \draw[fill=navy, draw=navy, rounded corners=1.5pt] (-0.26, -0.22) .. controls (-0.26, 0.04) and (0.26, 0.04) .. (0.26, -0.22) -- cycle;
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(human2.north)+(0, -0.98)$) {
    \textbf{\small RESEARCHER}\\[6pt]
    \footnotesize $\bullet$ Sets questions \& hypotheses\\[3pt]
    \footnotesize $\bullet$ Bounds scope per research stage\\[3pt]
    \footnotesize $\bullet$ Clear verification standards
  };

  % 2.2 Skill 2
  \node[skillcard2] (skill2) at (-3.5, -3.2) {};
  \begin{scope}[shift={($(skill2.north)+(0, -0.52)$)}]
    \draw[draw=blue, fill=blue!20, rounded corners=1.5pt, line width=0.9pt] (-0.26, -0.18) rectangle (0.26, -0.06);
    \draw[draw=blue, fill=blue!30, rounded corners=1.5pt, line width=0.9pt] (-0.26, -0.02) rectangle (0.26, 0.10);
    \draw[draw=blue, fill=blue!40, rounded corners=1.5pt, line width=0.9pt] (-0.26, 0.14) rectangle (0.26, 0.26);
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(skill2.north)+(0, -0.98)$) {
    \textbf{\small RESEARCH KIT (10 SKILLS)}\\[6pt]
    \footnotesize $\bullet$ 10 skills mapped to 6 stages\\[3pt]
    \footnotesize $\bullet$ Strict bounds: Survey $\rightarrow$ Report\\[3pt]
    \footnotesize $\bullet$ \textcolor{green!80!black}{\textbf{Lean: consumes $<$0.5\% context}}
  };

  % 2.3 Agent 2
  \node[agentcard2] (agent2) at (3.5, -3.2) {};
  \begin{scope}[shift={($(agent2.north)+(0, -0.52)$)}]
    \draw[draw=blue, fill=blue!20, rounded corners=2pt, line width=1pt] (-0.24, -0.18) rectangle (0.24, 0.18);
    \draw[draw=blue, line width=0.9pt] (0, 0.18) -- (0, 0.26);
    \fill[blue] (0, 0.26) circle (0.04cm);
    \fill[blue] (-0.09, 0.03) circle (0.04cm);
    \fill[blue] (0.09, 0.03) circle (0.04cm);
    \draw[draw=blue, line width=0.9pt, line cap=round] (-0.10, -0.08) .. controls (0, -0.14) .. (0.10, -0.08);
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(agent2.north)+(0, -0.98)$) {
    \textbf{\small AGENT EXECUTION}\\[6pt]
    \footnotesize $\bullet$ Scoped execution, zero drift\\[3pt]
    \footnotesize $\bullet$ Reproducible simulation \& code\\[3pt]
    \footnotesize $\bullet$ Structured evidence \& artifacts
  };

  % 2.4 Review 2
  \node[reviewcard2] (review2) at (10.5, -3.2) {};
  \begin{scope}[shift={($(review2.north)+(0, -0.52)$)}]
    \draw[draw=green!80!black, fill=green!20, line width=1.1pt, line join=round] 
      (-0.25, 0.22) -- (0.25, 0.22) .. controls (0.25, -0.04) and (0, -0.20) .. (0, -0.28) .. controls (0, -0.20) and (-0.25, -0.04) .. (-0.25, 0.22) -- cycle;
    \draw[draw=green!80!black, line width=1.2pt, line cap=round, line join=round] 
      (-0.10, -0.03) -- (-0.03, -0.10) -- (0.11, 0.08);
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(review2.north)+(0, -0.98)$) {
    \textbf{\small EASY-TO-AUDIT RESULTS}\\[6pt]
    \footnotesize $\bullet$ Direct claim $\leftrightarrow$ evidence match\\[3pt]
    \footnotesize $\bullet$ Pre-verified sources \& baselines\\[3pt]
    \footnotesize $\bullet$ \textcolor{green!80!black}{\textbf{Fast decision: Approve / Iterate}}
  };

  % Row 2 Arrows
  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=green!80!black] 
    (human2.east) -- (skill2.west)
    node[midway, above=8pt, fill=greenbg, draw=green!40, rounded corners=3pt, inner sep=2.5pt, font=\scriptsize\bfseries, text=green!80!black] {Easy stage-based pick};

  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=blue] 
    (skill2.east) -- (agent2.west)
    node[midway, above=8pt, fill=bluebg, draw=blue!40, rounded corners=3pt, inner sep=2.5pt, font=\scriptsize\bfseries, text=blue] {Right task, right skill};

  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=green!80!black] 
    (agent2.east) -- (review2.west)
    node[midway, above=8pt, fill=greenbg, draw=green!40, rounded corners=3pt, inner sep=2.5pt, font=\scriptsize\bfseries, text=green!80!black] {Evidence-backed results};

  % Row 2 Feedback Loop
  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=green!80!black, dashed] (review2.south) to[out=-145, in=-35, looseness=0.30] 
    node[midway, below, font=\scriptsize\bfseries, text=green!80!black, fill=white, inner sep=3.5pt, rounded corners=4pt, draw=green!60] 
    {Fast source audit $\rightarrow$ Confident approval or targeted iteration}
    (human2.south);

\end{tikzpicture}
\end{document}
""",
    "vi": r"""\documentclass[tikz,border=18pt]{standalone}
\usepackage{fontspec}
\setmainfont{Arial}
\usetikzlibrary{arrows.meta,positioning,calc}

\definecolor{navy}{RGB}{15,23,42}
\definecolor{slate}{RGB}{71,85,105}
\definecolor{line}{RGB}{203,213,225}
\definecolor{danger}{RGB}{220,38,38}
\definecolor{dangerbg}{RGB}{254,242,242}
\definecolor{blue}{RGB}{2,132,199}
\definecolor{bluebg}{RGB}{240,249,255}
\definecolor{green}{RGB}{5,150,105}
\definecolor{greenbg}{RGB}{236,253,245}

\begin{document}
\begin{tikzpicture}[
  >=Stealth,
  % Row 1 styles (Bloated / Problematic)
  card1/.style={draw=slate!70, fill=white, rounded corners=7pt, line width=1.1pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  skillcard1/.style={draw=danger, fill=dangerbg, rounded corners=7pt, line width=1.3pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  agentcard1/.style={draw=slate!70, fill=white, rounded corners=7pt, line width=1.1pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  reviewcard1/.style={draw=danger, fill=dangerbg, rounded corners=7pt, line width=1.3pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  % Row 2 styles (Research Kit / Standardized)
  card2/.style={draw=navy!70, fill=white, rounded corners=7pt, line width=1.1pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  skillcard2/.style={draw=blue, fill=bluebg, rounded corners=7pt, line width=1.3pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  agentcard2/.style={draw=blue, fill=bluebg, rounded corners=7pt, line width=1.1pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy},
  reviewcard2/.style={draw=green!80!black, fill=greenbg, rounded corners=7pt, line width=1.3pt,
    minimum width=4.6cm, minimum height=3.8cm, align=center, text=navy}
]

  % Top Main Title
  \node[anchor=west, font=\large\bfseries, text=navy] at (-12.8, 6.7)
    {SO SÁNH 2 QUY TRÌNH PHỐI HỢP: CATALOG MỞ vs. RESEARCH KIT};

  % =========================================================================
  % ROW 1: CATALOG MỞ LỚN (>150 SKILL) - RỐI ĐỊNH TUYẾN & KHÓ KIỂM SOÁT
  % =========================================================================
  \node[anchor=west, font=\footnotesize\bfseries, fill=dangerbg, draw=danger!60, rounded corners=4pt, inner sep=4pt, text=danger] at (-12.8, 5.9)
    {[X] QUY TRÌNH 1: CATALOG MỞ LỚN ($>$150 SKILL) $\rightarrow$ RỐI ĐỊNH TUYẾN \& KHÓ KIỂM SOÁT};

  % 1.1 Researcher 1
  \node[card1] (human1) at (-10.5, 3.6) {};
  \begin{scope}[shift={($(human1.north)+(0, -0.52)$)}]
    \fill[slate] (0, 0.22) circle (0.16cm);
    \draw[fill=slate, draw=slate, rounded corners=1.5pt] (-0.26, -0.22) .. controls (-0.26, 0.04) and (0.26, 0.04) .. (0.26, -0.22) -- cycle;
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(human1.north)+(0, -0.98)$) {
    \textbf{\small NHÀ NGHIÊN CỨU}\\[6pt]
    \footnotesize $\bullet$ Đặt bài toán nghiên cứu\\[3pt]
    \footnotesize $\bullet$ Thiếu khung phân tách chặng\\[3pt]
    \footnotesize $\bullet$ Không có chuẩn kiểm chứng
  };

  % 1.2 Skill 1
  \node[skillcard1] (skill1) at (-3.5, 3.6) {};
  \begin{scope}[shift={($(skill1.north)+(0, -0.52)$)}]
    \draw[draw=danger, fill=danger!20, line width=1pt] (-0.28, 0.20) -- (0.28, 0.20) -- (0.08, -0.06) -- (0.08, -0.22) -- (-0.08, -0.22) -- (-0.08, -0.06) -- cycle;
    \fill[danger] (0, 0.04) circle (0.04cm);
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(skill1.north)+(0, -0.98)$) {
    \textbf{\small NHIỀU SKILL ($>$150 - RỐI)}\\[6pt]
    \footnotesize $\bullet$ Quá nhiều lựa chọn, dễ nhầm\\[3pt]
    \footnotesize $\bullet$ Mơ hồ chọn, định tuyến sai\\[3pt]
    \footnotesize $\bullet$ \textcolor{danger}{\textbf{Tốn 7--10\% context}} ($\sim$14k tok)
  };

  % 1.3 Agent 1
  \node[agentcard1] (agent1) at (3.5, 3.6) {};
  \begin{scope}[shift={($(agent1.north)+(0, -0.52)$)}]
    \draw[draw=slate!80, fill=slate!15, rounded corners=2pt, line width=1pt] (-0.24, -0.18) rectangle (0.24, 0.18);
    \fill[slate!80] (-0.09, 0.03) circle (0.04cm);
    \fill[slate!80] (0.09, 0.03) circle (0.04cm);
    \draw[draw=danger, line width=1pt] (-0.10, -0.08) .. controls (0, -0.02) .. (0.10, -0.08);
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(agent1.north)+(0, -0.98)$) {
    \textbf{\small AGENT THỰC THI}\\[6pt]
    \footnotesize $\bullet$ Chạy thiếu neo kiểm soát\\[3pt]
    \footnotesize $\bullet$ Dễ ảo giác (hallucination)\\[3pt]
    \footnotesize $\bullet$ Sinh log dài, khó lần vết
  };

  % 1.4 Review 1
  \node[reviewcard1] (review1) at (10.5, 3.6) {};
  \begin{scope}[shift={($(review1.north)+(0, -0.52)$)}]
    \draw[draw=danger, fill=danger!20, line width=1.1pt, line join=round] (0, 0.22) -- (0.26, -0.20) -- (-0.26, -0.20) -- cycle;
    \draw[draw=danger, line width=1.1pt, line cap=round] (0, 0.08) -- (0, -0.04);
    \fill[danger] (0, -0.13) circle (0.035cm);
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(review1.north)+(0, -0.98)$) {
    \textbf{\small KẾT QUẢ KHÓ KIỂM SOÁT}\\[6pt]
    \footnotesize $\bullet$ Khó đối chiếu claim vs log\\[3pt]
    \footnotesize $\bullet$ Mất hàng giờ mò tìm nguồn\\[3pt]
    \footnotesize $\bullet$ \textcolor{danger}{\textbf{Rủi ro sai lệch học thuật cao}}
  };

  % Row 1 Arrows
  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=danger] 
    (human1.east) -- (skill1.west)
    node[midway, above=8pt, fill=dangerbg, draw=danger!40, rounded corners=3pt, inner sep=2.5pt, font=\scriptsize\bfseries, text=danger] {Khó chọn đúng skill};

  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=danger] 
    (skill1.east) -- (agent1.west)
    node[midway, above=8pt, fill=dangerbg, draw=danger!40, rounded corners=3pt, inner sep=2.5pt, font=\scriptsize\bfseries, text=danger] {Dễ gọi nhầm skill};

  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=danger] 
    (agent1.east) -- (review1.west)
    node[midway, above=8pt, fill=dangerbg, draw=danger!40, rounded corners=3pt, inner sep=2.5pt, font=\scriptsize\bfseries, text=danger] {Log thô, thiếu nguồn};

  % Row 1 Feedback Loop
  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.2pt, draw=danger!80, dashed] (review1.south) to[out=-145, in=-35, looseness=0.30] 
    node[midway, below, font=\scriptsize\bfseries, text=danger, fill=white, inner sep=3.5pt, rounded corners=4pt, draw=danger!50] 
    {Quá tải đối chiếu log $\rightarrow$ Mất thời gian làm lại từ đầu (Vòng lặp bế tắc)}
    (human1.south);


  % =========================================================================
  % ROW 2: RESEARCH KIT (10 SKILL) - TINH GỌN, THEO GIAI ĐOẠN & DỄ REVIEW
  % =========================================================================
  \node[anchor=west, font=\footnotesize\bfseries, fill=greenbg, draw=green!60, rounded corners=4pt, inner sep=4pt, text=green!80!black] at (-12.8, -0.9)
    {[V] QUY TRÌNH 2: RESEARCH KIT (10 SKILL) $\rightarrow$ CHỌN THEO GIAI ĐOẠN \& DỄ DÀNG REVIEW};

  % 2.1 Researcher 2
  \node[card2] (human2) at (-10.5, -3.2) {};
  \begin{scope}[shift={($(human2.north)+(0, -0.52)$)}]
    \fill[navy] (0, 0.22) circle (0.16cm);
    \draw[fill=navy, draw=navy, rounded corners=1.5pt] (-0.26, -0.22) .. controls (-0.26, 0.04) and (0.26, 0.04) .. (0.26, -0.22) -- cycle;
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(human2.north)+(0, -0.98)$) {
    \textbf{\small NHÀ NGHIÊN CỨU}\\[6pt]
    \footnotesize $\bullet$ Đặt câu hỏi \& giả thuyết\\[3pt]
    \footnotesize $\bullet$ Giới hạn scope từng chặng\\[3pt]
    \footnotesize $\bullet$ Chuẩn kiểm chứng rõ ràng
  };

  % 2.2 Skill 2
  \node[skillcard2] (skill2) at (-3.5, -3.2) {};
  \begin{scope}[shift={($(skill2.north)+(0, -0.52)$)}]
    \draw[draw=blue, fill=blue!20, rounded corners=1.5pt, line width=0.9pt] (-0.26, -0.18) rectangle (0.26, -0.06);
    \draw[draw=blue, fill=blue!30, rounded corners=1.5pt, line width=0.9pt] (-0.26, -0.02) rectangle (0.26, 0.10);
    \draw[draw=blue, fill=blue!40, rounded corners=1.5pt, line width=0.9pt] (-0.26, 0.14) rectangle (0.26, 0.26);
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(skill2.north)+(0, -0.98)$) {
    \textbf{\small RESEARCH KIT (10 SKILL)}\\[6pt]
    \footnotesize $\bullet$ 10 skill chia theo 6 giai đoạn\\[3pt]
    \footnotesize $\bullet$ Ranh giới rõ: Survey $\rightarrow$ Report\\[3pt]
    \footnotesize $\bullet$ \textcolor{green!80!black}{\textbf{Tiết kiệm: tốn $<$0,5\% context}}
  };

  % 2.3 Agent 2
  \node[agentcard2] (agent2) at (3.5, -3.2) {};
  \begin{scope}[shift={($(agent2.north)+(0, -0.52)$)}]
    \draw[draw=blue, fill=blue!20, rounded corners=2pt, line width=1pt] (-0.24, -0.18) rectangle (0.24, 0.18);
    \draw[draw=blue, line width=0.9pt] (0, 0.18) -- (0, 0.26);
    \fill[blue] (0, 0.26) circle (0.04cm);
    \fill[blue] (-0.09, 0.03) circle (0.04cm);
    \fill[blue] (0.09, 0.03) circle (0.04cm);
    \draw[draw=blue, line width=0.9pt, line cap=round] (-0.10, -0.08) .. controls (0, -0.14) .. (0.10, -0.08);
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(agent2.north)+(0, -0.98)$) {
    \textbf{\small AGENT THỰC THI}\\[6pt]
    \footnotesize $\bullet$ Tập trung đúng phạm vi\\[3pt]
    \footnotesize $\bullet$ Thực nghiệm có thể tái lập\\[3pt]
    \footnotesize $\bullet$ Xuất log \& artifact chuẩn hóa
  };

  % 2.4 Review 2
  \node[reviewcard2] (review2) at (10.5, -3.2) {};
  \begin{scope}[shift={($(review2.north)+(0, -0.52)$)}]
    \draw[draw=green!80!black, fill=green!20, line width=1.1pt, line join=round] 
      (-0.25, 0.22) -- (0.25, 0.22) .. controls (0.25, -0.04) and (0, -0.20) .. (0, -0.28) .. controls (0, -0.20) and (-0.25, -0.04) .. (-0.25, 0.22) -- cycle;
    \draw[draw=green!80!black, line width=1.2pt, line cap=round, line join=round] 
      (-0.10, -0.03) -- (-0.03, -0.10) -- (0.11, 0.08);
  \end{scope}
  \node[anchor=north, align=center, text=navy] at ($(review2.north)+(0, -0.98)$) {
    \textbf{\small KẾT QUẢ DỄ REVIEW}\\[6pt]
    \footnotesize $\bullet$ Đối chiếu claim $\leftrightarrow$ evidence\\[3pt]
    \footnotesize $\bullet$ Nguồn trích dẫn đã xác thực\\[3pt]
    \footnotesize $\bullet$ \textcolor{green!80!black}{\textbf{Duyệt / Lặp lại nhanh chóng}}
  };

  % Row 2 Arrows
  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=green!80!black] 
    (human2.east) -- (skill2.west)
    node[midway, above=8pt, fill=greenbg, draw=green!40, rounded corners=3pt, inner sep=2.5pt, font=\scriptsize\bfseries, text=green!80!black] {Dễ chọn theo chặng};

  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=blue] 
    (skill2.east) -- (agent2.west)
    node[midway, above=8pt, fill=bluebg, draw=blue!40, rounded corners=3pt, inner sep=2.5pt, font=\scriptsize\bfseries, text=blue] {Đúng việc, đúng skill};

  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=green!80!black] 
    (agent2.east) -- (review2.west)
    node[midway, above=8pt, fill=greenbg, draw=green!40, rounded corners=3pt, inner sep=2.5pt, font=\scriptsize\bfseries, text=green!80!black] {Kèm minh chứng rõ};

  % Row 2 Feedback Loop
  \draw[{Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, line width=1.3pt, draw=green!80!black, dashed] (review2.south) to[out=-145, in=-35, looseness=0.30] 
    node[midway, below, font=\scriptsize\bfseries, text=green!80!black, fill=white, inner sep=3.5pt, rounded corners=4pt, draw=green!60] 
    {Dễ đối chiếu nguồn $\rightarrow$ Duyệt nhanh hoặc điều chỉnh trúng đích}
    (human2.south);

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

        if WEB_PUBLIC_FIG.is_dir():
            shutil.copy2(out_png, WEB_PUBLIC_FIG / out_png.name)
            shutil.copy2(out_svg, WEB_PUBLIC_FIG / out_svg.name)
        if WEB_DIST_FIG.is_dir():
            shutil.copy2(out_svg, WEB_DIST_FIG / out_svg.name)


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

    gw = round(48 * scale)
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="100%" height="auto">
  <defs>
    <pattern id="scientific-grid" width="{gw}" height="{gw}" patternUnits="userSpaceOnUse">
      <path d="M {gw} 0 L 0 0 0 {gw}" fill="none" stroke="#e2e8f0" stroke-width="1.2" stroke-opacity="0.8" />
    </pattern>
    <linearGradient id="card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#f8fafc" stop-opacity="0.95" />
    </linearGradient>
  </defs>

  <!-- Modern Card Background with rounded corners -->
  <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="{rx}" fill="url(#card-bg)" />

  <!-- Consistent Scientific Grid Pattern -->
  <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="{rx}" fill="url(#scientific-grid)" />

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
        compile_latex_to_png(HUMAN_AGENT_PIPELINE_TEX[lang], f"human-agent-pipeline-{lang}")


if __name__ == "__main__":
    main()
