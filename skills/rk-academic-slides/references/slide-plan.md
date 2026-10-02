# Slide plan contract

Draft a slide-plan JSON before making slides. Save it next to the PPTX so the deck can be checked and revised without rebuilding the content outline. The plan represents the visible slide sequence; it is not a substitute for the source ledger or speaker notes.

## JSON shape

The top level has a deck_type of research_talk, lecture, or internal_report, and one slides array. Older plans without deck_type are treated as research_talk. Each slide item uses:

| Key | Meaning |
| --- | --- |
| kind | One of cover, toc, section, content, recap, conclusion, qa. The conclusion kind means the final closing slide even when its visible title is “Key takeaways” or “Next steps”. |
| title | Exact visible slide title or takeaway. For Q&A, use Q&A. |
| section | Exact TOC section name for section/content/recap/conclusion slides; null for cover, TOC, Q&A. |
| ideas | Zero to three main visible idea phrases. Content and recap slides have one to three. The closing slide has one or two for a research talk and one to three for a lecture or internal report. |
| sections | On the TOC item only, ordered section names ending with the closing section in the chosen language. Omit on other items. |

Example (replace every phrase with source-backed talk content):

    {
      "deck_type": "research_talk",
      "slides": [
        {"kind":"cover","title":"Study title","section":null,"ideas":[]},
        {"kind":"toc","title":"Outline","section":null,"ideas":[],"sections":["Context and gap","Method","Conclusion"]},
        {"kind":"section","title":"Context and gap","section":"Context and gap","ideas":[]},
        {"kind":"content","title":"A measured constraint motivates the study","section":"Context and gap","ideas":["Observed constraint","Open question"]},
        {"kind":"section","title":"Method","section":"Method","ideas":[]},
        {"kind":"content","title":"The model makes resource limits explicit","section":"Method","ideas":["Input and assumptions","Decision rule"]},
        {"kind":"section","title":"Conclusion","section":"Conclusion","ideas":[]},
        {"kind":"conclusion","title":"Conclusion","section":"Conclusion","ideas":["Supported finding"]},
        {"kind":"qa","title":"Q&A","section":null,"ideas":[]}
      ]
    }

Use the exact visible title and idea wording in both plan and PPTX. Do not add a claim to the plan until the source ledger identifies its support. TOC entries each have one matching divider, in order; a Roman ordinal may be added to the divider and recorded in its visible title. Place a recap after a long sequence within its section. The final TOC section ends with exactly one closing slide (kind conclusion). A research talk uses a short closing section with only that slide. A lecture or internal report may put other content slides in its final section before the closing slide. If present, Q&A is the last slide and contains only Q&A.

For example, a lecture can set deck_type to lecture, name its final TOC section “Key takeaways”, end with a conclusion-kind slide titled “Key takeaways” containing up to three ideas, and omit Q&A. An internal report can set deck_type to internal_report and use “Next steps” as its final section, with documented action content before its closing slide.

## Planning decisions

- Time budget governs content count, never font shrinkage. Adjust for speaking pace and technical density.
- A research talk may follow context → gap → contribution → model → method → evidence → conclusion. Use only sections supported by the source. A lecture may follow objectives → concepts → worked example → practice → recap. An internal report may follow purpose → status/evidence → risks/decisions → next steps. Adapt names and section count to the material.
- Give each content slide a claim-bearing title. The 1–3 ideas should support that title, not compete with it.
- Pick the layout by content: a table for aligned values, two/three-column comparison for matched alternatives, chart or figure plus numeric callouts or one/two short findings for results, a full-width visual for dense labels, and equation plus explanation for teaching. A visual must have verified source data or definitions.
- Put material caveats adjacent to the associated claim and in notes; do not save an essential qualifier for Q&A.

Run python3 scripts/check-deck.py <deck.pptx> <slide-plan.json> after building. Follow with visual and source review; a structural pass does not prove that the content is correct.
