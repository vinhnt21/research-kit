# Anomalies and the rerun before a claim

Read this when a result is surprising, impossible, unstable, or about to be stated. This skill does not delegate. The same agent runs the checks and reads the outputs.

## Bug, data, or real effect

Do not adjust a filter, a seed, a transform, or a test until the class is known.

1. Read the value or the error, including shapes and counts.
2. Repeat it with the declared inputs and seed. If it does not repeat, collect that fact. Do not guess a cause.
3. Compare stages: raw, derived, then result. Note where the value changes.
4. Class the cause as a bug, a data problem, or a real effect. A convenient result needs the same classing as an inconvenient one.

Then compare with one case that behaves as expected, and list the differences. Test one candidate cause on the smallest slice that still shows the anomaly.

- **Bug:** fix the source, rerun the affected steps, and confirm other locked numbers stayed put.
- **Data:** apply a rule the design already named. A newly discovered invalid measurement can be removed only with the reason recorded, and the affected number is exploratory if that rule was not locked.
- **Real effect:** report it. If it was not the locked estimand, it is exploratory. Do not edit it away.

Stop after repeated failed adjustments that each reveal a new problem. The design may be wrong. Changing the design is outside this skill; record the block and ask.

Suspiciously strong prediction from a learned model is a leakage question. Hand that audit to `rk-ai`. An impossible quantum-model invariant belongs to `rk-quantum`.

## Independent checks

When the design named several checks that do not depend on one another, run each under its declared specification. Report every result, including those that disagree. Choosing the specification that looks best, and dropping the others, makes the pass exploratory.

After each check, ask:

- Did this run follow the declared inputs, seeds, and exclusions?
- Do the estimator, the design unit, and the uncertainty match the design?

A no on either question blocks the claim. Fix the run or label the number exploratory.

## Reopen the output

A claim waits until the output has been opened again in this pass.

1. Name the file that holds the number.
2. Run from the preserved raw inputs, with the declared seed and configuration, when a fresh run is required to trust the file.
3. Read the estimate, the uncertainty, the unit count, and the diagnostics from that output.
4. Confirm they match the locked estimator and the design unit.
5. Only then write the number into `assets/analysis-record.md`, with the output path.

"It was significant earlier" is not a read of the current file. A script that exits cleanly is not the estimate. A non-significant result is reported with its interval; it is not a demonstration that nothing happened. If the fresh number differs from the one previously quoted, report both and say which file was reopened.
