# Power and precision

Set the precision target after the design and the planned analysis are named. Sample size, effect size, false-positive level, and power are tied together: fix three and the fourth follows. This note says how to choose the effect and when that calculation has to be a simulation. It does not list solver arguments or formulas. Those stay outside this skill.

Match the method to the analysis that will actually be used. A formula for a difference of means does not justify a logistic model, a clustered design, or a sequence of interim looks.

## Effect size

The effect size is the input that makes the sample-size claim true or decorative. A precise calculation on an invented or inflated effect carries false authority.

Prefer, in this order:

1. The smallest effect of interest, defined below.
2. An estimate from a pilot or from prior work, shrunk because those estimates run high. Publication favors large results, and a small pilot that looks strong is the one that gets followed. Use a lower confidence bound, or another explicit shrink, and do not rest the full study on one small pilot point.
3. A field convention such as small, medium, or large, only when nothing better exists. Say that the label is a convention. Those labels are not measurements, and they ignore the domain.

Whatever is chosen, show how the required sample moves across a plausible range of effects. One sample size hides the largest uncertainty in the calculation.

Do not report power computed from the effect just observed in the same data. That number restates the test already performed. If the sample is already fixed, state the smallest effect this sample could have detected at the planned power, or report the interval around the estimate.

## Smallest effect of interest

The smallest effect of interest is the smallest effect that would change a decision or matter for the scientific claim. Power the study to detect that effect, not the effect you hope to see.

Ways to set it:

- A difference a user or a domain threshold would treat as real.
- The smallest effect that would justify adopting the condition, given what it costs in units, risk, or time.
- A bound below which you would treat the result as practically null.

If the true effect is larger, the study is in a stronger position. If the true effect is smaller, you have already decided it does not matter.

Say the units of the effect (a raw difference, a standardized difference, a change in rate, a coefficient) and the false-positive level and target power. Common planning choices are a two-sided false-positive level of 0.05 and power of 0.80, with higher power when a confirmatory claim has to be harder to miss. A one-sided test buys power by refusing to notice an effect in the unexpected direction. Use it only with a reason written in advance.

The target sample is the number analyzed. If some units will be missing or unusable, the number enrolled is larger. State the allowance.

If several confirmatory tests share one error budget, the precision target uses the corrected threshold, or the simulation below includes the correction. Ignoring the other tests makes every one of them look more precise than the family of claims allows.

If the achievable sample cannot support the smallest effect of interest, say so. The honest alternative is to reframe the study as estimation with an interval, and to keep the hypothesis-test claim out of the frozen plan.

## When a closed form is enough

A closed form is appropriate when the planned analysis is a simple test that has a standard formula: a comparison of means, a one-way comparison across groups, a comparison of proportions, a correlation, a chi-square test, or an increment in a linear regression. The design must actually be that test. Equal or stated unequal allocation, a two-sided or justified one-sided test, and the chosen effect size are part of the inputs.

State every input so a reader could repeat the calculation. Then show the sensitivity range, not a single sample size.

## When simulation is required

Simulation is required when no formula matches the planned analysis. That includes:

- logistic or Poisson regression, because precision depends on the covariate distribution and the base rate, not only on a single coefficient
- mixed-effects or repeated-measures models, because observations inside a unit are correlated
- cluster-randomized designs, because the cluster is the unit and members inside it are correlated
- survival analysis, because event times and censoring both shape precision
- mediation, because the indirect path is not a standard single-test effect
- interactions, because an interaction is harder to detect than the main effects around it
- an adaptive or group-sequential procedure, because the error rate belongs to the whole sequence of looks
- any other analysis that the study will actually run and that has no matching formula

Simulation here means: create data at the planned size under the effect you claim, analyze each dataset with the same model the study will use, and repeat. Precision is the fraction of repeats that meet the pre-stated decision rule. Use enough repeats that a small wobble in that fraction would not change the go decision, and report the uncertainty of the fraction itself.

Build the simulated world the way the study will be run. Include covariates if the analysis adjusts for them. Include dropout, unequal allocation, and clustering if the study will have them. A fit that fails to converge counts as a miss, not as a quiet success; many failures are a warning about the design. As a check, repeat the same procedure with the effect set to zero. The false-positive rate should sit near the level you declared. If it sits higher, the analysis is anti-conservative and the precision number is not usable until the analysis is fixed.

A closed-form shortcut that ignores clustering overstates precision. People or runs inside a cluster resemble each other, so the effective sample is closer to the number of clusters than to the number of members.

Record the data-generating assumptions, the analysis that was applied, the number of repeats, and the uncertainty of the estimate. Do not copy a formula sheet or an argument table into the method plan. Point to the assumptions in words.
