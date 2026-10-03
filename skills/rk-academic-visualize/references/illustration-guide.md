# Academic visualization guide

General rules for scientific figures, plus one worked case study. Use them for publication-grade illustrations (LaTeX TikZ, Mermaid, SVG, and flow architectures) in papers, reports, and talks.

---

# Part I: General design rules

## 1. Cognitive clarity and filtering
- **Five-second rule**: Each figure carries one mechanism or one comparison. A reader should see that point in the first five seconds.
- **Drop secondary detail**: Do not pack implementation parameters, long definitions, or full numeric tables into the figure. Move them to the caption, the body text, or an appendix.
- **Match density to the frame**: Size the number of nodes, and the text on each node, to the frame. Keep the figure short enough to read without visual overload.

## 2. Spatial layout and visual hierarchy
- **Align and group**: Place entities that belong together near each other. Use consistent gaps and sizes so the hierarchy is visible without a legend.
- **Padding and margins**: Keep a minimum gap between text and the card border so type does not overflow or touch the edge.

## 3. Flow meaning and readable connectors
- **Match the interaction**:
  - Use a **one-way arrow** for sequential data, one-direction messages, or a linear state change.
  - Use a **two-way arrow** for feedback, negotiation, multi-party collaboration, or a human in the loop.
- **Do not cover the stem**:
  - A label on a connector must not sit on the arrow or cut it.
  - Place the label above or beside the stem, with a clear gap, so the connector stays continuous.

## 4. Semantic color and grayscale QA
- **Color by role**: Assign color to an information role (for example warning or failure, a neutral module, or success and verification).
- **Grayscale check**:
  - Never encode a state with color alone.
  - Pair color with an independent mark (an icon, a distinct node shape, or a solid versus dashed stroke) so the figure keeps its meaning in black-and-white print and on an e-ink screen.

## 5. Rebuild from source
- Prefer a source that can be edited and compiled again (XeLaTeX TikZ, a Mermaid script, or vector SVG).
- Keep that source in version control with the paper so later edits stay reproducible.

---

# Part II: Worked case study

This case is a real layout problem: **a side-by-side diagram of an AI-assisted research pipeline (comparative human–agent pipeline)**.

```
[Researcher] <=====> [Skills catalog] <=====> [Agent execution] <=====> [Results and review]
```

### 1. Brief
- **Goal**: Compare two approaches:
  - *Flow 1 (ad hoc)*: The researcher faces a large ungrouped skill list → the agent calls the wrong tool → the result is hard to check.
  - *Flow 2 (staged)*: The researcher picks a skill by stage → the agent stays inside that stage → the handoff cites its evidence.
- **Layout**: Stack the two flows (row 1 and row 2) on the same horizontal axis. Use the same number of cards and the same card size so each step can be compared directly.

### 2. Problem: a label hides the arrow stem
- **What happened**: Action labels were placed mid-connector with `node[midway, fill=white]`. The white label box covered most of the stem and left only the arrowhead, so the link looked broken.
- **Fix**:
  - Lift the label **fully above** the connector with a safe gap (for example `above=8pt` in TikZ).
  - Use a pill badge with a light fill (`dangerbg`, `greenbg`) and a thin rounded stroke.
  - Keep about $2\text{--}3\text{mm}$ of clear space between the bottom of the badge and the top of the stem. Draw the stem as one continuous line from card to card.

### 3. Problem: human–agent exchange needs two-way arrows
- **What happened**: The first drawing used one-way arrows ($A \rightarrow B \rightarrow C$). The real loop between a person and an agent is repeated feedback, not a one-way pipe.
- **Fix**:
  - Switch the connectors to **two-way arrows** (`<--->`, `{Stealth}-{Stealth}`).
  - Increase the gap between cards (for example from $1.6\text{cm}$ to $2.4\text{cm}$) so both heads and the stem stay readable.

### 4. Problem: centered text overflows a fixed card
- **What happened**: On a fixed-width card (for example $4.0\text{cm}$), `align=center` spreads a long or bold phrase (`\textbf{}`) to both edges until it touches the border.
- **Fix**:
  - Widen the card to a size that fits (for example $4.6\text{cm}$).
  - Break long sentences into bullets under about 26 characters.
  - Keep inner padding at least $4\text{mm}$.

### 5. Problem: clipped or machine-translated labels
- **What happened**: Over-short labels such as "Vague pick", "Off course", and "Raw log" were hard to read.
- **Fix**:
  - Use short, natural, paired phrases:
    - *Hard to choose the right skill* $\longleftrightarrow$ *Easy to choose by stage*
    - *Easy to call the wrong skill* $\longleftrightarrow$ *Right task, right skill*
    - *Raw log, missing source* $\longleftrightarrow$ *Evidence attached*
    - *Hard to check the log* $\longleftrightarrow$ *Easy to check the source*

---

### 6. Reference TikZ pattern

```latex
% Card style and a label that sits above the arrow
\tikzset{
  card/.style={
    draw=navy, rounded corners=6pt, fill=white,
    text width=4.6cm, minimum height=3.0cm, align=center, inner sep=10pt
  },
  arrowlabel/.style={
    above=8pt, font=\scriptsize\bfseries, rounded corners=3pt,
    inner sep=2.5pt, fill=greenbg, draw=green!40
  },
  twoway/.style={
    {Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, very thick, draw=navy!80
  }
}

% Two-way connector; the label does not cover the stem
\draw[twoway] (cardA.east) -- node[arrowlabel] {Easy to choose by stage} (cardB.west);
```
