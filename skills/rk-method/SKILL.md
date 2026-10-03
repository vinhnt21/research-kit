---
name: rk-method
description: "Choose a design, comparator, precision target, and feasibility or freeze rule before a full run. Not for executing analysis, surveying literature, or drafting the paper."
license: Apache-2.0
---

# Choose the method

Settle the design, the comparator, the precision target, and either a pilot stop/go rule or a confirmatory freeze before any full run. Record that choice in a method plan. This skill does not execute the analysis, survey the literature, or draft the paper.

## Active paper

Resolve the paper from the request, the working directory, or that project's own instructions, such as an `AGENTS.md` beside the work. Read that paper's scientific notes before changing its files or stating its results. If several papers fit and the task would write, run, or make a paper-specific claim, ask which paper applies.

Leave sibling papers untouched. A sibling draft, bibliography, figure, codebase, or unpublished result is not a citation, a baseline, or reusable text. A shared read-only literature collection may be consulted after each source is checked for this paper. Put new files where this paper already stores that kind of artifact. Do not impose a directory layout, venue name, or tool.

## Working language

These instructions stay in English. The reply does not.

Write the chat reply, questions, and internal notes in the language the user is writing in. If this paper already keeps those notes in one language, continue in that language. If the request has no clear language, or the user's language and those notes disagree, ask which language to use before writing the note.

Write that language as an original note to a colleague. Do not translate these instructions sentence by sentence. Keep this skill's field names, and terms this paper already uses, as they already appear. In Vietnamese, use a short sentence a lab mate would say, and leave a research term in English when the Vietnamese word would be unclear or mean something else. For example, write "Số này lấy từ file vừa mở lại. Chưa kết luận nguyên nhân." Do not write "Bản ghi này bảo đảm tính liêm chính của đầu ra đã được mở lại."

A manuscript, a figure label, and a slide use the language of that artifact. If the task would write the artifact and that language is not already clear, ask before drafting it.

## Route

1. [Design choice](references/design-choice.md) — unit, estimand, comparator, randomization, blocking, factorial, and adaptive designs, each with the failure it invites.
2. [Power and precision](references/power-and-precision.md) — effect size, smallest effect of interest, and when a simulation is required.
3. [Feasibility and freeze](references/feasibility-and-freeze.md) — pilot stop/go, and freezing only before the target outcome is seen.

Fill [the method plan](assets/method-plan.md). It names the estimand, the baseline, what is fixed, and what stays exploratory.

## After the results exist

A plan written after results is exploratory. Do not call it a prior freeze or preregistered, and do not require `prereg.sh`.

## Limits

Do not authorize spending money or submitting external jobs. A completed plan is not permission to collect restricted data or to start the full run.
