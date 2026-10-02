# Execution boundary

Use this when choosing where a quantum calculation runs, or when stating what that run proves. Model validity is settled in [model checks](model-checks.md) first. Record the kept run in `assets/quantum-run-record.md`.

## Local simulator versus paid or remote hardware

A local simulator evaluates the declared model on a machine the project already uses. A paid or remote hardware run submits work to a device or a hosted service and can spend money or consume a quota.

Stay on the local simulator unless the task authorizes both credentials and the spend. Read no credential and submit no hardware job before that authorization. Do not infer an account, a token, or a budget from another paper or from an unnamed default.

The backend field must say which of the two this run was. An ideal local simulator and a device are not interchangeable labels for the same evidence.

## Shots

Shots are repeated executions used to estimate a probability or an expectation. State the shot count with the observable. Sampling uncertainty is separate from discretization and truncation error. One shot is one outcome, not a probability. If the estimate is still moving at the chosen shot count, say so.

## Seeds

Record every seed that can change the initial state, the measurement record, the noise draws, or the trajectory sample. If the observable moves across seeds, report that spread. Choosing the most favorable seed after the fact is not a result.

## Noise model

If noise is present, name the channel, the rates, and whether those rates come from a model inside the simulator or from a device calibration. Compare an ideal case and a noisy case only when both answer a question that was stated beforehand. Keep sampling error, numerical error, calibration drift, and a misspecified model as separate contributions. Do not fold them into one unspecified uncertainty.

Shot counts, seeds, and noise options that this note does not fix belong to the current official documentation of the library the project uses.

## What a simulation does not prove

A simulation supports the system, the idealization, the noise model, and the numerical settings that were recorded. It does not prove that hardware will reproduce those numbers. It does not prove unconditional quantum advantage. Device behavior requires an authorized hardware run, reported with its own backend, shots, and calibration, kept distinct from the ideal simulation.

Analytic agreement on the tiny solvable case checks the model. It still does not certify a device.
