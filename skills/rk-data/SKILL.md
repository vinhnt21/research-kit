---
name: rk-data
description: "Inspect, transform, analyze, plot, and verify data or simulation outputs for one paper. Point quantum-model validity to rk-quantum and learned-model leakage to rk-ai. Not for choosing the question (rk-idea), locking a protocol (rk-method), or drafting the manuscript (rk-write)."
license: Apache-2.0
---

# Inspect, analyze, and verify

Produce a number, table, or figure that can be reopened. This skill does not choose the research question, lock a protocol, or draft the manuscript. It does not delegate.

## Active paper

Resolve the paper from the request, the working directory, or that project's own instructions, such as an `AGENTS.md` beside the work. Read that paper's scientific notes before changing its files or stating its results. If several papers fit and the task would write, run, or make a paper-specific claim, ask which paper applies.

Leave sibling papers untouched. A sibling draft, bibliography, figure, codebase, or unpublished result is not a citation, a baseline, or reusable text. A shared read-only literature collection may be consulted after each source is checked for this paper. Put new files where this paper already stores that kind of artifact. Do not impose a directory layout, venue name, or tool.

Preserve raw inputs. Match test and uncertainty to the design unit. Figures need axes, units, denominators, uncertainty, and a second encoding besides color. Before a claim, reopen the output. Do not infer causality from association.

## Working language

These instructions stay in English. The reply does not.

Write the chat reply, questions, and internal notes in the language the user is writing in. If this paper already keeps those notes in one language, continue in that language. If the request has no clear language, or the user's language and those notes disagree, ask which language to use before writing the note.

Write that language as an original note to a colleague. Do not translate these instructions sentence by sentence. Keep this skill's field names, and terms this paper already uses, as they already appear. In Vietnamese, use a short sentence a lab mate would say, and leave a research term in English when the Vietnamese word would be unclear or mean something else. For example, write "Số này lấy từ file vừa mở lại. Chưa kết luận nguyên nhân." Do not write "Bản ghi này bảo đảm tính liêm chính của đầu ra đã được mở lại."

A manuscript, a figure label, and a slide use the language of that artifact. If the task would write the artifact and that language is not already clear, ask before drafting it.

## Route

Open one reference for the branch in front of you.

- Before changing any value, read [references/inspect.md](references/inspect.md).
- When a comparison, association, or uncertainty statement is about to be computed, read [references/test-choice.md](references/test-choice.md).
- When a figure is about to be drawn, read [references/figures.md](references/figures.md).
- When a result is surprising, impossible, or about to be claimed, read [references/anomalies-and-rerun.md](references/anomalies-and-rerun.md).
- When a number will be stated, fill [assets/analysis-record.md](assets/analysis-record.md).

A quantum-model question — whether a state, operator, circuit, or open-system equation is valid — belongs to `rk-quantum`. A table that is already computed stays here. Splits, leakage, and baselines for a learned model belong to `rk-ai`.

## Procedure

Stay inside the active paper's data permissions. Use its existing environment and run entry points. Do not upload raw data.

Read the locked design if one exists. Say whether this pass is exploratory or locked. A choice made after seeing the outcome is a deviation, and that part of the pass is exploratory. This skill does not freeze a new protocol.

Preserve raw inputs. Write every transform to a new artifact. Record the code revision or a hash of the analysis files, the library versions that produced the number, the seeds, the configuration, the input identifiers, and the output path.

Start with a case small enough to expose a wrong dimension, a broken join, or an impossible value. Expand to the requested run only inside the approved budget.

Before stating a result, ask:

- Did this run follow the declared inputs, seeds, and exclusions?
- Do the estimator, the design unit, and the uncertainty match the design?

Reopen the output file and read the estimate and the uncertainty from it. Then fill the analysis record. The claimed number points at those inputs, that code, and that reopened output.

## Deliver

Return the completed analysis record: the pass label, the estimator, the input identifiers, the seeds and configuration, the output path, the number and its uncertainty, negative and indeterminate runs, deviations, and the file that was reopened. Association is not a causal effect. A simulator result describes the declared model.
