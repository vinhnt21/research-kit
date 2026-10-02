---
name: rk-ai
description: "Design or audit an AI or machine-learning experiment (splits, leakage, baselines, metrics, robustness, generative evaluation). Literature is rk-survey, prose is rk-write, circuits are rk-quantum."
license: Apache-2.0
---

# AI experiment

Use this skill when a claim depends on a learned model, a prediction, or a generated sample. Start from the question, who or what the claim covers, the moment the output is produced, and the decision that output would change. Accuracy is not a causal effect and does not establish a mechanism. This skill does not require a particular framework, model host, or accelerator.

Literature search and citation checks belong to rk-survey. Manuscript prose belongs to rk-write. Circuits, Hamiltonians, and simulator-versus-hardware evidence belong to rk-quantum.

## Active paper

Resolve the paper from the request, the working directory, or that project's own instructions, such as an `AGENTS.md` beside the work. Read that paper's scientific notes before changing its files or stating its results. If several papers fit and the task would write, run, or make a paper-specific claim, ask which paper applies.

Leave sibling papers untouched. A sibling draft, bibliography, figure, codebase, or unpublished result is not a citation, a baseline, or reusable text. A shared read-only literature collection may be consulted after each source is checked for this paper. Put new files where this paper already stores that kind of artifact. Do not impose a directory layout, venue name, or tool.

## Procedure

1. Read the active paper's scientific notes, data permissions, and evaluation rule before training, scoring, or stating a model result.
2. Name the source, collection period, unit of observation, label construction, inclusion rules, missingness, permissions, and known shifts.
3. When independence, copies, time order, or a fitted transform is in question, follow [Leakage and splits](references/leakage-and-splits.md) and finish it before any score is treated as evidence.
4. When the metric, baseline, budget, ablation, seed, calibration, shift, or generative record is in question, follow [Evaluation](references/evaluation.md).
5. Fill [the evaluation record](assets/ml-eval-record.md) and store it where this paper already keeps evaluation notes. The record states the split unit, the baseline, the uncertainty, and whether the result is exploratory or prospectively tested.
6. Read the current official documentation of the library actually used. Stay inside the project's existing environment. Do not upload a restricted dataset or spend external credits unless the task authorizes it.
7. Report the metric with its denominator and uncertainty, the matched baseline, failure modes, any observed shift, and the result status. Predictive accuracy is not a causal effect.

## Stop

Ask which paper applies when more than one paper fits and the task would write, run, or make a paper-specific claim. Stop the audit when the independence unit is unnamed, a transform was fit on rows outside the training fold, or the baseline and the compute budget are not both stated.
