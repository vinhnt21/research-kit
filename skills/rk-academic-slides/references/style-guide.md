# Slide style and visual QA

The bundled academic-template.pptx is a neutral layout gallery adapted from the author's preferred style. Reuse its geometry and rhythm, not its placeholder words. Text, tables, panels, and callouts should remain editable where practical.

## Canvas and type

- 16:9, 13.333 × 7.5 inches (960 × 540 point equivalents); white background.
- Arial throughout. Black or near-black body text (#111111 to #191C20), dark navy titles (#123B70), restrained gray supporting text (#444444 or #666666), light gray borders (#C7C7C7). Use at most two further accents for scientific graphics.
- Main slide title about 27 pt bold. Body about 18–20 pt when possible. Panel headings about 15–19 pt. Footer and brief source label about 9–10 pt. If content needs smaller type, split it.
- Text, diagrams, and charts stay inside generous margins. Avoid colored background blocks, drop shadows, heavy gradients, and decorative icons.

## Layout gallery

Template slide numbers below are one-based. Select by content, then duplicate and reorder as needed. Do not ship the gallery itself as a finished deck.

| Template slide | Layout and use |
| --- | --- |
| 1 · Cover | Centered navy title, thin gray rule, presenter and affiliation. Meeting/date comes from the current request. |
| 2 · TOC | Ordered section names with light outlines. The final entry names the closing section; omit Q&A. |
| 3 · Divider | One large centered navy section name on white. |
| 4 · Overview | Three grouped rows for an idea, evidence, and implication; adapt labels to the content. |
| 5 · Flow | Editable shapes for a few simple steps or branches. Adapt the step count to the source; keep object identities and positions stable across a multislide sequence. |
| 6 · Three-way comparison | Three equally weighted alternatives. Use only when the source truly has three comparable items. |
| 7 · Result with numeric callouts | Chart or figure at left, one or two sourced numerical callouts at right. |
| 8 · Table | Editable three-column table, up to three body rows, and one takeaway. Add or remove rows and columns to fit the material rather than shrinking type. |
| 9 · Two-way comparison | Two aligned cards with the same criteria, useful for methods, concepts, or decisions. |
| 10 · Result with short takeaways | Chart or figure at left and one or two short findings at right. Use when metrics alone would obscure the message. |
| 11 · Full-width figure | Wide chart, code-rendered flow or topology, or image with one short caption when labels need room. |
| 12 · Equation with explanation | Rendered LaTeX equation, definitions, and one worked implication or example. |
| 13 · Closing | One to three short source-supported takeaways, adapted to conclusion, lecture recap, or report next steps. |
| 14 · Q&A | Only “Q&A”, centered in navy; use when appropriate to the delivery. |

Content slides use a small uppercase kicker, bold navy takeaway title, and thin gray rule. Use a small footer on TOC/content slides only when it helps identify the current deck. Never hardcode an old conference, institution, date, or author. No visible slide numbers.

The TOC's five entries and the closing slide's two bullets are examples. Add or remove them to match the actual sections and supported takeaways; never leave an empty placeholder or shrink text to preserve the example count.

## Content density and flow choice

- Give each content slide one clear takeaway and one to three main ideas. Select the layout and amount of detail for a projected slide: readable at presentation size, with enough context to understand the visual and no redundant filler. A divider or Q&A slide is intentionally sparse.
- For a short, simple flow, use editable shapes from layout 5 and adjust the number of steps. For a topology or process with many branches, crossings, repeated states, or tight geometry, draw the diagram in Python or JavaScript and insert it into layout 11; use layout 10 when one or two takeaways need to sit beside it. Choose by whether labels and relationships remain clear, not by a fixed step count.
- If a flow or table cannot fit with readable labels, split it into a sequence of slides. Preserve positions and visual encodings between states, then add a brief recap at the end. If a content slide feels empty, combine closely related supported ideas or add a useful visual; do not add prose solely to occupy space.

## Figures, equations, citations

- Diagram nodes, edges, flow arrows, and labels must represent the actual model. For a graph, distinguish logical requested connections from physical links and show only the construction claimed by the source.
- Use color sparingly and encode every series or edge class with a second cue: square/triangle/circle markers, solid/dashed lines, or patterns. Test a grayscale rendering. Legends must match the marks drawn in the plot.
- Save the plotting/diagram script beside the delivered deck and make its inputs traceable. Use vector output when supported or high-resolution raster. Ordinary text remains editable; an embedded technical figure is reproducible from its script. Inspect exported PDF, where label clipping or line overlaps can differ from the editor.
- Insert formulas as rendered LaTeX (native equation or clean image). Compare the PDF result with the LaTeX source.
- Brief attribution sits near each sourced figure, number, or claim; full citation or document/code location and caveat go into speaker notes. Do not allow notes to carry the only explanation needed to read a slide.

## Final visual inspection

Render the whole deck as a PDF and review every page at fit-to-screen and at actual size. Check title and body hierarchy, text wrapping, margins, cropped elements, missing glyphs, graph topology, legend symbols, grayscale discrimination, readable axes, source labels, and accidental carry-over from the template. Verify that the TOC wording and divider wording agree exactly.
