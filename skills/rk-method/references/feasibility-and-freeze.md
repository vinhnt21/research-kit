# Feasibility and freeze

Two different gates sit in front of a full run. A pilot answers whether the work can execute. A freeze answers whether a confirmatory claim was specified before the target outcome was seen. Mixing them produces either a confirmatory label on a pilot, or a frozen plan for a run that cannot happen.

This skill writes the rule. It does not launch the pilot, spend money, or submit external jobs.

## Pilot stop and go

Offer a pilot when the full configuration has never run, when a solver or pipeline is untried, or when a memory or time ceiling is estimated rather than measured. Only the human partner opts in. Silence is not opt-in. A wish to avoid a freeze is not opt-in. If the partner declines, stay on the confirmatory path in the next section.

The feasibility question is a measurable threshold: the real path finishes, within a stated resource bound, at a size that informs the full run. Keep that question separate from the scientific question the full run would answer. Agree the abandonment condition before any probe. It is a judgment made before the measurement, so revise it freely until the first probe reports, and leave it alone after that.

Run the smallest version that still uses the real path end to end, including a case whose answer is already known. A stub, or a toy problem that finishes in the same few steps at every size, does not measure the path. A tidy number still has to be checked against an independent reference. A large disagreement is a fault to trace, not an offset to absorb.

Then take a few measured points spaced toward the target size, inside a budget written first. A limit counts only after a run has been seen to hit it and to record the stop, rather than hang, crash, or report success. An untested timeout or memory cap is a sentence, not a bound.

Go only if the real path has produced a checked result, the stop rules have been seen to fire, and the largest measured size is close enough to the target that the remaining scale-up is modest. A hop far beyond the largest measured point is a hope. Say so, or measure higher.

Stop if the abandonment condition is met. If a probe looks impossible, test the obvious mitigation before accepting the ceiling. A ceiling that has not met its own mitigation is not yet a ceiling. When a mitigation works, measure again: the limit usually moves to the next stage.

The partner owns any larger resource envelope. This plan does not approve extra spending or an external job. Ask, in one line, and record the answer.

One exploratory campaign may follow, inside the same budget, wide enough to tell competing behaviors apart. Label every result from it exploratory. A clean pattern in that campaign is a lead for a later freeze. It is not a confirmatory finding. Adding configurations until the campaign becomes the study skips the freeze.

The partner chooses the exit: freeze a confirmatory study now that the runnable size is known, run another exploratory campaign, or abandon. Do not start the freeze because the pilot looked promising.

## Freeze only before the target outcome is seen

A confirmatory claim needs the prediction and the decision rule written before the target outcome is seen. If that outcome has already been inspected, plotted, or used to pick the analysis, the plan is exploratory. A plan written after results is exploratory. Do not call it a prior freeze or preregistered.

Lock, while the outcome is still unseen:

- the estimand, the unit, and the comparator
- the primary metric, the exclusions, and the covariates
- the analysis that will be treated as primary
- the uncertainty statement and how many confirmatory tests share the error budget
- the sample or the stopping rule, including any interim looks from [design choice](design-choice.md)
- a result that would count against the claim

If no result would count against the claim, the prediction is not falsifiable. Rewrite it before freezing.

The sample is fixed in advance, or the interim rule is the one already written. Peeking and adding units until a threshold is crossed inflates false positives. Trying many analyses and reporting the one that crosses a threshold does the same. A hypothesis suggested by the outcome has to be tested on data that did not suggest it. Reasonable choices that would have been different had the data looked different are still forks; make them before the outcome, or decide them on a split that is not the confirmatory sample.

Freeze only configurations that have already run, or that sit close to a measured point. A freeze over a layout that has never executed is a plan for a study that may not exist. When runnability is unknown, return to the pilot gate. The partner's opt-in defers the freeze. It does not cancel it.

Anything outside the frozen primary analysis is exploratory, including a subgroup, a different model, or a cutoff moved after the result. Report it as exploratory. A deviation from the frozen plan is documented, and the affected analysis loses the confirmatory label.

A purely descriptive report with no inferential claim, or method work on simulated data that is not offered as evidence about the target system, does not need this freeze. Say which of those it is.

Do not authorize spending money or submitting external jobs as part of the freeze. The method plan records the rule. It does not start the run.
