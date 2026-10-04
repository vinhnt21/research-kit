# Academic visualization guide

Use these rules for publication-grade illustrations (LaTeX TikZ, Mermaid, SVG, and flow architectures) in papers, reports, and talks. Preserve the source algorithm while budgeting the geometry, then render and inspect the actual output before delivery.

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
- **Keep the connection readable**:
  - Place short labels above or beside a continuous stem with a clear gap.
  - Use a white badge for a long inter-container transition only under the corridor rules below. Keep its endpoints and arrowhead visible; a badge must not leave a detached arrowhead or hide a branch/junction.

## 4. Semantic color and grayscale QA
- **Color by role**: Assign color to an information role (for example warning or failure, a neutral module, or success and verification).
- **Grayscale check**:
  - Never encode a state with color alone.
  - Pair color with an independent mark (an icon, a distinct node shape, or a solid versus dashed stroke) so the figure keeps its meaning in black-and-white print and on an e-ink screen.

## 5. Rebuild from source
- Prefer a source that can be edited and compiled again (XeLaTeX TikZ, a Mermaid script, or vector SVG).
- Keep that source in version control with the paper so later edits stay reproducible.

---

# Part II: Math-heavy flows and parallel passes

## 1. Budget node height before choosing coordinates

Count actual wrapped lines, explicit breaks, display operators, fractions, and subscripts. Include both inner padding and stroke width in the node bounds; `text width` is not the outer node width. Prefer explicit `\\[2pt]` breaks between a heading, formula, and parenthetical explanation. Break long math at meaningful operators rather than squeezing the type.

Use `h = content height + 2 × inner sep` as the starting budget. A conservative planning estimate for a dense box is `h ≈ 20pt + n × 13pt + 2 × inner sep`, where `n` counts rendered lines. This estimate can exceed the often quoted 1.0–1.2cm for a short box or 1.4–1.6cm for a math box; those ranges are starting examples, not measured guarantees. Display math can grow well beyond them.

For vertically stacked nodes A and B, require:

`center distance ≥ (height(A) + height(B)) / 2 + clear gap`.

Keep a clear edge-to-edge gap of at least 14pt (about 5mm), increasing it when a branch label needs more room. A 1.8–2.0cm center spacing is only an initial guess: two 1.6cm-high nodes need about 2.1cm for this gap. In TikZ, `below=14pt of A` with the `positioning` library places B relative to A's edge; explicit center coordinates must satisfy the height inequality. For aligned parallel tiers, use the larger node height in each tier to set both columns' next centers. Recompute spacing after editing text or formulas.

Apply these dimensions at the intended output size. Shrinking the whole canvas can make labels and gaps unreadable; split the figure or shorten supported wording if the publication width cannot accommodate it.

## 2. Reserve wire and label corridors

- Route orthogonally with the bends needed to avoid nodes, headers, equations, and other labels. Treat container headers and label badges as obstacles, not empty space. Attach entry/return wires to distinct ports when they meet the same node.
- Label vertical return wires with `sloped` and an offset such as `above=3pt`; the long text then runs along the wire. Allocate separate lanes for failure and next-request returns. Stagger their labels, for example at `pos=0.30` and `pos=0.70`; keep their actual label bounds apart, aiming for at least 3cm vertical separation in a tall flow. These positions apply to the vertical segment, not to the whole polyline.
- Reserve at least 2.0cm between adjacent containers for an inter-pass transfer. Increase the corridor when the label's measured width plus padding does not fit. Put the short condition at the source port and the long explanation in the corridor, using explicit line breaks.
- A white, padded badge can mask the transition stem behind its own text. Keep the rest of the stem continuous and visible on both sides, with an identifiable destination arrowhead. Keep the badge clear of container borders, headers, parallel wires, and junctions. For a short comparative pipeline, keep the label fully off the stem as in Part IV.
- Route a global exit through an outer lane at least 0.6cm beyond the container border. Put `No` at the decision port and a longer explanation along the outer vertical segment (`right=4pt, align=left`) only if its full bounds fit. Expand the canvas margin or use a sloped label if horizontal text would reach another wire or the export edge.

TikZ segment pattern (illustrative node names and coordinates):

```latex
\draw[arr, rounded corners=6pt] (sample.west) -- (-9.4,-1.3)
  -- node[pos=0.30, above=3pt, sloped, font=\scriptsize]
     {No (failure)} (-9.4,6.06) -- ([yshift=-4pt]check.west);
\draw[arr, rounded corners=6pt] (done.west) -- (-10.1,-3.1)
  -- node[pos=0.70, above=3pt, sloped, font=\scriptsize]
     {Next request} (-10.1,6.34) -- ([yshift=4pt]check.west);
```

## 3. Align functional tiers and enclose their full bounds

Use equal card widths/heights and align corresponding tiers when the source describes comparable passes. A common six-tier flow is condition check, request selection, tree refinement, resource/effort update, physical success sampling, and completion/queue update. Preserve real differences: if a pass omits a stage, retain aligned whitespace or a source-supported grouping rather than inventing a computation to fill a box. State the difference where the reader needs it.

For complex return routes, draw the main container using explicit coordinates on a background layer after planning all bounds. A `fit` node is suitable only when its set includes every intended member and its padding accounts for the header and routing lanes. Neither `fit` nor a hand-written rectangle guarantees containment.

Calculate the container from the union of local node, label, and route bounds:

- `top ≥ highest node's north edge + header/entry-route clearance`. A first-node center plus 1.2–1.4cm is a starting estimate only; grow it for a tall node or header.
- `bottom ≤ lowest node's south edge − bottom padding`. A last-node center minus 0.7–0.8cm may fail for a tall node; use its actual south edge.
- `left/right` include half the full node width (text plus padding), return-wire lanes, sloped label thickness, and border clearance.

Keep the header in its own band. Route initialization through a planned port below/beside that band so its arrow never crosses the title. Match both cards to the larger required bounds after layout. A shared end-of-slot/state update belongs centered below both containers, with at least 20pt (about 7mm) from their bottom border to its north edge. Route the exit to that block outside the cards.

Read the runnable [two-pass TikZ example](../assets/two-pass-flow.tex) for a complete source with all referenced nodes and edges. Its six tiers illustrate geometry, not a domain algorithm or experimental result.

---

# Part III: Render–inspect–repair gate

Compile/export with the format's native renderer, then open the actual preview image. For a runtime with a built-in LaTeX editor/compiler, use it when appropriate and inspect its diagnostics; exporting a PDF/PNG may still require the figure toolchain. Discover executables from the environment rather than assuming a Homebrew path. Do not install a renderer without authorization for that setup change.

For the bundled example, run from this skill directory with TeX and Ghostscript on PATH:

```bash
command -v pdflatex gs
mkdir -p figure-build
pdflatex -interaction=nonstopmode -halt-on-error -output-directory figure-build assets/two-pass-flow.tex
gs -dSAFER -dNOPAUSE -dBATCH -sDEVICE=pngalpha -r300 -sOutputFile=figure-build/two-pass-flow.png figure-build/two-pass-flow.pdf
```

XeLaTeX is an alternative when the source needs it. If Ghostscript is unavailable, an available `pdftoppm` can rasterize the PDF at 300 dpi. For Mermaid, export the actual `.mmd` through an available Mermaid renderer (for example `mmdc`); for SVG, use an available SVG-capable browser or rasterizer. Preserve source and vector output. A screenshot of the code, an unrelated preview, or successful compilation is not visual QA.

Open the raster through the runtime's image-viewing capability and inspect the whole image plus crowded details at readable resolution. Check these five criteria:

1. **Node gaps:** No touching/overlapping blocks, clipped math, or text outside its box; vertical edge gaps meet the height budget.
2. **Wire/text clearance:** No wire crosses a formula, body text, header, or another wire's label; branch direction and arrowheads remain clear.
3. **Label/border clearance:** No label is cut by a container border or sits on an adjacent lane; each label belongs to an identifiable segment.
4. **Container bounds:** Every local node and label fits fully inside its intended card; comparable cards align, and shared termination sits below both.
5. **Outer margins:** Entry/exit lanes, long labels, and the termination block fit without clipping and leave usable breathing room.

Mark nonapplicable card/loop checks as such for a simple diagram. Also compare every branch/stage with the source algorithm, view the figure at its intended publication size, and check meaning in grayscale. Text labels and line/shape differences should carry meaning when color disappears.

Repair any defect, regenerate the export, and reopen the new image. Finish only after all applicable criteria pass on the latest output; do not delegate this check to the user. If rendering or vision is missing, preserve the source and give reproducible render instructions, but state that the visual gate remains unverified. Deliver editable source, requested exports, the inspected preview, and a brief verification status with any remaining limitation.

---

# Part IV: Worked case study

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
