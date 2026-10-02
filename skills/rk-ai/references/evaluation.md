# Evaluation

Use this guide after the split and leakage checks pass. Choose the comparison the decision needs, then record it. A higher score is not a mechanism and not a causal effect.

## Metric and uncertainty

Match the metric to the decision, the class balance or score distribution, and the cost of each kind of error. State the denominator: which rows, users, or items count.

- If the classes are uneven or the errors have unequal cost, do not use accuracy alone.
- Report uncertainty as a spread across seeds or folds, or as an interval declared before looking at the held-out scores.
- If only one point estimate is available, say that uncertainty was not estimated. Do not treat that point as a stable gain.

## Baseline and matched budget

A baseline is a comparison this paper can defend. A simple valid rule counts: predict the majority outcome, predict the last observed value, or apply a fixed rule written down before scoring. A stronger published method counts only when its inputs, split, and budget match this run.

- If the comparison used the same training rows, the same split, and the same tuning and compute limit, call the budget matched.
- If the other method received a larger search or more compute, report the mismatch. Do not call the gain matched.
- If the only comparison is a sibling draft, an unpublished score, or a number whose source was not checked for this paper, it is not a baseline. Choose another comparison or report none.

## Ablations

- If the claim credits one component, remove or replace that component, keep the remaining budget the same, and compare the difference with the uncertainty.
- If the difference sits inside the seed or fold spread, do not credit the component.
- If the claim does not name a component, skip ablations and say so.

## Seeds

- If initialization, sampling, data order, or split assignment uses randomness, run more than one seed and report the spread.
- If one seed is an outlier, the headline is the spread, not that seed.
- One unstable run is not a benchmark gain. Selected examples are illustrations, not a metric.

## Calibration and robustness

Add calibration only when it can change the decision.

- If a probability threshold or an expected cost would change the action after the scores are rescaled, check calibration and record the threshold rule.
- If the decision is a fixed hard label and rescaling would not change it, skip calibration and write why.

Add a subgroup, shift, or error analysis only when that slice could change the interpretation.

- If a relevant slice moves the decision, report the slice and the observed shift.
- If the claim does not depend on a shift, say that behavior outside the evaluation distribution was not tested.

## Generative evaluation

A claim about generated text, images, audio, or another sampled artifact needs a record before any gain is stated. The record includes the prompt, the checkpoint, the rubric, and the contamination check. Also record sampling settings, evaluation-set provenance, and the rater process.

- If the prompt, checkpoint, rubric, or contamination status is missing, the generative claim is not ready.
- Keep model-graded scores and human-graded scores in separate fields. Do not average them into one unlabeled number.
- If the evaluation material may have appeared in training, say the contamination status is unresolved and do not claim a clean benchmark gain.

## Result status

- Exploratory: the split, metric, or model family was chosen after seeing the scores.
- Prospectively tested: the split rule, metric, and comparison were fixed before the held-out scores were computed.
- Replicated: an independent rerun under that same fixed rule.

State which one applies. Do not relabel an exploratory result as prospectively tested after seeing the number. Predictive accuracy remains a predictive summary, not a causal effect.
