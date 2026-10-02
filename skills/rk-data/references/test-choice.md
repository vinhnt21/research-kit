# Match the test to the design unit

Read this when a comparison, association, or uncertainty statement is about to be computed. Start from the estimand and the unit the design named. Do not start from a favorite test.

The tree below is the choice. The assumption on each branch is what blocks it. Report that check. Switching branches after seeing which one is significant is a deviation.

## Decision tree

1. **What is the question?**
   - A difference across levels of a factor.
   - An association between predictors and an outcome.
   - Agreement between raters or methods.
   - A description with no locked comparison. Stop at summaries and label the pass exploratory.

2. **Are the rows the design unit?**
   - Repeats, pairs, clusters, sites, or time order mean the rows are dependent.
   - **Blocked:** any test that treats those rows as independent. Aggregate to the unit, or use an estimator that carries the cluster, the pair, or the time dependence. The uncertainty has to use that same unit.

3. **Difference across levels.** Stay on this branch only if step 2 is satisfied.
   - Continuous outcome, and the design uses a normal-theory mean.
     - **Blocked by unequal spread** when the estimator pools a single variance: use the unequal-variance mean difference the design allows.
     - **Blocked by a poor normal approximation** in a small sample: use the rank or exact comparison the design allows. In a large sample, a mild departure does not by itself force a new test; report the check and keep the locked estimator.
   - Ordinal outcome. **Blocked:** a normal-theory mean. Use a rank comparison.
   - Binary or unordered categories. **Blocked:** a normal mean. Use a contingency comparison. **Blocked by a sparse expected count:** the chi-square approximation. Use an exact test.
   - Time-to-event. **Blocked:** a test that ignores censoring. A hazards model is **blocked** when proportional hazards fail.
   - More than one factor: same gates, and only the interaction the design named. A search over interactions is exploratory.

4. **Association.** Stay here only if step 2 is satisfied.
   - Continuous outcome. A linear estimator is **blocked** by a curved mean, dependent residuals, or residual spread that changes with the fitted value. Use the form the design named, or record a deviation.
   - Binary outcome. A logistic model is **blocked** when the design's event count cannot support the number of predictors, or when the log-odds form is not the estimand.
   - Counts. A Poisson mean is **blocked** by overdispersion or by extra zeros the Poisson cannot represent.
   - Time-to-event with covariates. **Blocked** when the hazards assumption fails.
   - Two measurements and no covariates: a linear correlation is **blocked** when the relationship is not linear or the scales are ranks. Rank association is then the branch. Agreement is the next branch, not this one.

5. **Agreement.** A correlation is not agreement between methods or raters. Use the coefficient the design named for categorical ratings or for continuous measurements. Do not turn an agreement question into a group test.

6. **Several planned comparisons.** Report the whole family the design named, including the quiet ones. Picking a multiplicity rule after seeing the small results is a deviation.

## Uncertainty

The interval, standard error, or posterior spread uses the same unit as the estimator. A row-wise error is blocked when the design unit is a cluster, a pair, or a series. Name the interval: standard deviation, standard error, confidence interval and its level, bootstrap interval and its seed, or a posterior interval. A star on a plot is not that interval.

Report the magnitude on the scale of the estimand — a difference, a ratio, a rank association, or a share of variance — with an interval. A conventional size label is not the result. A non-significant test does not show that the effect is absent. Equivalence requires a margin the design already named. Power computed from the observed effect restates the test; do not report it as new evidence. Sample-size planning belongs to `rk-method`.

## When the report is Bayesian

Use a Bayesian report only when the locked design asked for a posterior, a prior, or a Bayes factor. Then state the prior, the likelihood, the interval definition, the convergence checks, and a prior-sensitivity check. A frequentist design stays frequentist. Moving to a posterior after seeing a p-value is a deviation, and that number is exploratory.

## Fields to record

- design unit and the count of those units, plus the row count if it differs
- outcome definition and denominator
- estimator, and the assumption that left this branch open
- point estimate and the uncertainty definition
- magnitude and interval
- missingness rule and how many units it removed
- exclusions, and whether they were declared before the outcome was seen
- multiplicity family
- seed and software versions when the procedure is stochastic
- exploratory or locked

A simulator coefficient is a property of the declared model. It does not by itself establish a device or a causal effect.
