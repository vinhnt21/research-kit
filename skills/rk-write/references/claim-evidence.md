# Claim and source

One substantive claim takes one opened source. A substantive claim states a fact, a number, a procedure detail, a result, or an interpretation. A heading, a notation definition, or a transition is not a row.

Record claims with the blank rows in `assets/claim-evidence.md`. Put that table where this paper already keeps drafting notes. Add a row for each further claim.

## Fields

| Field | What to enter |
| --- | --- |
| claim | The sentence as it will appear, or a tighter sentence if the source supports less. |
| source | One opened page, table, figure, protocol line, or run identifier for this paper. |
| status | `supported` only after that source has been opened and it matches the sentence. Otherwise leave the cell empty. |

A source counts when it was opened for this paper and the supporting place can be named. Memory, a search snippet, another paper's bibliography, and a sibling draft leave `source` and `status` empty.

When a row would help a later revision, note beside it, in the paper's own notes: where the sentence sits, the kind of claim, the uncertainty, and whether the analysis was confirmatory, exploratory, or descriptive. Those notes do not replace `source`.

## Decide

1. Write the claim in one sentence. Split a sentence that asserts two results.
2. Open one source that could support it. Record that place in `source`.
3. Check direction, the system or population, the comparator, the time or condition, and the uncertainty. On a match, set `status` to `supported`.
4. If the source supports a weaker sentence, rewrite the claim and leave `status` empty until that weaker sentence is checked.
5. If the needed source is missing, or two opened sources disagree, leave `source` and `status` empty. Keep the claim out of submission prose.
6. An interpretation stays no stronger than the result row it cites. Association stays association. A non-significant result stays a non-significant result.

Numbers in the claim use the unit, denominator or sample size, and uncertainty stated by the source. If the source does not give a value the sentence needs, leave the row blank rather than completing the value.

Abstract and conclusion rows use sources that already appear in the results. A row with an empty source is an unresolved claim: report it with the draft, and do not let the sentence stand as established.
