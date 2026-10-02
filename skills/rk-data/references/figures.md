# Figures

Read this when a figure is about to be drawn. The figure shows the same estimand as the analysis record. Put the file where this paper already stores figures.

## Required marks

Every quantitative panel needs:

- axes labeled with the quantity and the unit
- the denominator (per design unit, per trial, per run) and the count of those units
- the uncertainty, named as standard deviation, standard error, an interval with its level, or a posterior interval
- a second encoding besides color: marker shape, line pattern, hatch, a direct label, or a separate panel

Color may still distinguish series. It cannot be the only cue. Check that the labels remain readable at the size the paper will use.

## Scales

Bars and filled areas are lengths from a baseline. Show the zero baseline, or mark a different reference the science actually uses. Points and lines may use a nonzero limit; show enough context that a small difference is not an artifact of the crop. Panels that the reader is meant to compare share limits, or the difference in limits is obvious.

A log axis states the base and the rule for zeros and negatives. Equal distances on that axis are ratios. Record bin edges, smoothing window, and normalization formula, including the reference level. Fit a normalization only on the partition the design allows. Do not draw a smooth curve through missing times in a way that invents observations.

## What stays visible

Missing values, zeros, values below detection, excluded points, and failed or sparse runs stay distinct in the legend or as gaps. Show the observations when that is feasible. Keep a model curve visually distinct from the observations, and say which is which.

For an image, keep the original, apply comparable adjustments to images that are compared, and mark splices or omitted regions. A scale comes from calibration. Upsampling does not add detail.

A simulation trace uses the recorded seed and configuration. Do not hide a failed run by smoothing it into the successful ones.

## After export

Reopen the exported file. Confirm the axes, units, denominator, uncertainty, and the second encoding survived export. Record the output path and the uncertainty definition in `assets/analysis-record.md`.
