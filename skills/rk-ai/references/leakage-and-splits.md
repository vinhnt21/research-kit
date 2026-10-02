# Leakage and splits

Use this guide before trusting a score. Answer each decision from the active paper's data definition. Record the answers in the evaluation record. A failing check means the score does not support the claim until the split or the features are rebuilt.

## Independence unit

The independence unit is the entity the claim treats as a new case: a person, site, document, account, session, device, or time window. The row is the unit only when each row is an independent draw of that entity.

- If the claim is about a new person, site, or time, the split unit is that person, site, or time.
- If several rows share the unit, assign the whole unit to one partition.
- If a random row split places the same unit on both sides, that split does not support the claim. Rebuild the split or narrow the claim to row-level interpolation.
- If the claim is about a later time, training rows must end before the prediction time. A shuffle across time does not answer that claim.

## Duplicates

Exact copies and near copies both inflate a score when the claim is about unseen cases. Near copies include the same subject, overlapping windows, repeated measurements, and light paraphrases of one source text.

- If an exact copy or a near copy of a held-out row appears in training, group every copy of that unit onto one side or drop the copies, then recompute.
- If an identifier that is not the label still determines the label, treat it as a duplicate channel and remove it from the inputs.
- If deduplication was not checked, the score is not ready to report.

## Future information

A column is future information when it would be unavailable at the decision time. That includes the label, a post-event aggregate, a later timestamp, and any statistic computed with rows that sit outside the current training fold.

- If a column uses the label, a later event, or rows outside the training fold, drop it or rebuild it from information known at decision time on the training fold only.
- If target statistics, encodings, or thresholds were computed on the full sample, they leak. Recompute them inside each training fold.
- If you cannot show that every input was knowable at decision time, do not report the score as a prospective prediction.

## Transforms fit only on training folds

Scaling, imputation, feature selection, encoding, vocabulary choices, and learned representations are fits. They must be estimated on the training rows of the current fold and then applied to the held-out rows. Refit them for every training fold.

Fitting any of those steps on the full matrix, and only afterward partitioning, copies held-out information into the training representation. Imputing or rescaling before the split is the same failure.

- If a transform was fit with any held-out row, the full matrix, or the label, the fit leaked. Discard that score, refit on the training fold only, and apply the frozen transform to the held-out rows.
- If a resampled evaluation reused one fit across folds, refit inside each training fold.
- Leave the held-out partition untouched until the split rule, the metric, and the baseline are fixed. Using those scores to choose the split or the features makes the result exploratory.

## Pass rule

Pass only when the independence unit is named, duplicates of that unit stay inside one partition, no input uses future or held-out information, and every fitted transform was estimated on training rows alone. Otherwise change the data construction. Do not interpret the current accuracy.
