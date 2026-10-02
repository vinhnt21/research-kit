# Design choice

Pick the design from the question and from how units are actually assigned. A preferred layout that does not match the unit, the estimand, or the comparator answers a different question than the one the paper will claim.

Write the choice into the method plan. Generating an assignment schedule or a run matrix is later work.

## Unit

The unit is the smallest entity that receives a condition independently. Repeats inside that entity sharpen one measurement. They do not multiply the number of independent assignments.

This fails when nested measurements are treated as independent replicates. Cells inside one preparation, time points inside one series, or members inside one group that was assigned together are not extra units for a condition applied above them. The analysis then invents precision, and a claim can look settled when only a handful of real assignments exist.

If the condition is delivered to a whole group, the group is the unit. Adding members inside an existing group buys less than adding groups, because members of a group resemble one another.

If one unit receives several conditions in sequence, that unit is its own comparison, and the observations are dependent. The failure is carry-over from the previous condition, or a time trend (learning, fatigue, drift) read as a condition effect. Separate those only when order is balanced and the gap between conditions is long enough for the previous condition to clear.

## Estimand

The estimand is the quantity the study is built to produce: a difference, a ratio, a contrast under stated assumptions, a predictive error, or a formal statement inside a model. Name the population or system, the condition, the outcome, and the assumptions the interpretation needs.

This fails when the reported claim is a different contrast than the one the design identifies. An association is not yet a causal effect. A result inside a stated simulator is not yet a result about an unmodeled device. A proof under its axioms is not yet a physical claim. Changing the contrast, the population, or the handling of missing units after seeing the outcome moves the estimand.

Pooling across a factor that tracks both the condition and the outcome can reverse the contrast. If that factor is known, the estimand has to say whether the claim is within levels of the factor or across them.

## Comparator

The comparator is the baseline the claim is judged against. Match it to the alternative the claim must rule out.

- A concurrent untreated or standard condition separates the contrast from calendar time.
- A sham or vehicle separates the active piece from the act of delivery.
- A positive control shows that the measurement can register an effect that is already known.
- A published or historical series reintroduces time, handling, and selection unless those are part of the estimand and stated as such.

This fails when there is no concurrent baseline, when the baseline is weaker than the claim implies, or when extreme units are selected and later look improved only because extreme measurements tend to move inward on their own. It also fails when the person recording the outcome can see the assignment and expectation can create the difference. Conceal the assignment from whoever measures the outcome whenever that is possible. Concealment of the next assignment from whoever enrolls units is a separate protection: a schedule that can be guessed is not a protected comparison.

## Randomization

Random assignment gives every confounder, known or unknown, the same expected balance across conditions. That expectation is what lets a difference support a causal reading. Record the rule and follow it. An informal shuffle that cannot be repeated is not an auditable assignment.

Independent chance assignment is reasonable when the number of units is large and a modest imbalance is acceptable. With few units it can leave the arms far from the intended ratio. Assignment inside successive blocks keeps the ratio steady as units arrive. A very short block is easier to predict if the allocator can see the pattern; conceal the schedule, or vary the block length, when prediction would bias who enters or how the outcome is read.

A known prognostic factor can be balanced by assigning inside its levels. Too many factors at once leave those levels too thin to balance. When the condition is applied to a whole group, randomize the groups. Labeling individuals inside a group that was already treated is not randomization of the condition.

This fails when assignment follows convenience (first arrivals, one day, one batch, one operator). The contrast then tracks whatever followed that convenience, and no later model can invent the assignment that did not happen.

## Blocking

A block is a set of units expected to be similar for a reason you can name before the run: day, batch, site, instrument, operator, position. Assign conditions inside the block so that nuisance is removed from the comparison instead of inflating it. Block what you can name. Randomize across what you cannot block, and record it.

A complete block gives every condition once in every block. The later analysis has to include the block. Leaving it out spends the design and puts the nuisance back into the error.

This fails when the condition lines up with the nuisance: all of one condition in one batch, all of another on the edge of a plate, all of a third on one day. The condition and the nuisance are then the same contrast. It also fails when so many blocking factors are crossed that some combinations are empty and balance was never achieved.

Some factors are hard to reset and are applied to a large unit, while others change inside it. Those two factors do not share one error term. Treating every small unit as an independent replicate overstates precision for the hard-to-change factor.

## Factorial

Vary factors together when the question is about more than one factor. Changing one factor while holding the others fixed spends runs and cannot see an interaction, the case where the effect of one factor depends on another.

A full two-level design runs every combination of a few factors and can estimate main effects and interactions. It grows quickly. A fraction runs a designed subset and aliases some effects: two different effects share one contrast, so the data cannot separate them. Say which effects share contrasts before interpreting a fraction.

- If a main effect shares its contrast with a two-factor interaction, a large estimate may be the interaction. That design can only screen.
- If main effects are clear of two-factor interactions, but those interactions share contrasts with each other, the main effects are the trustworthy part.
- If main effects and two-factor interactions are clear of each other, the design can support that richer reading.

A screening layout for many factors estimates main effects cheaply and tangles them with interactions. Keep the few large factors and study those in a clearer design. Do not claim an interaction from a screening layout.

Two levels fit a flat surface. They miss a bend, so they miss an optimum that sits inside the range. Locating that optimum needs a design that can see curvature, and every point in that design has to be feasible to run. A midpoint on a two-level design is only a check that the surface is not flat.

Randomize run order. Otherwise a factor that marches with time is confounded with drift.

For a deterministic computer model, extra repeats at the same input do not create new noise information. Spread the inputs across the ranges. The failure is a design that leaves large empty regions and is then read as if it had covered the space.

## Adaptive

A fixed sample and one analysis at the end is the default when interim looks are unnecessary. The analysis is then unambiguous.

An adaptive design looks during the study and may stop early or change a pre-stated feature: the remaining sample, which arms continue, or who is still enrolled. Every look is another chance to cross a threshold by luck. The false-positive budget has to be spent across the looks. Stopping at the first conventional threshold spends that budget many times.

Boundaries can be strict early and looser at the end, or they can follow a spending rule tied to how much information has arrived. The maximum sample is larger than a one-look design; the expected sample is often smaller because some studies stop early. Report both if both are part of the plan.

Updating the sample from a nuisance such as variance or a base rate, without seeing the condition contrast, is a different adaptation from one that uses the contrast itself. Any rule that sees the contrast can inflate false positives and pull the final estimate unless the whole procedure corrects for the looks.

This fails when the interim rule is invented after a promising look, when an unblinded contrast changes the design without a correction, or when a fixed-sample formula is used for a procedure that has several looks. The error rate belongs to the whole sequence. Judge that sequence by simulating the looks, the stopping rule, and the final analysis together, as [power and precision](power-and-precision.md) requires for procedures without a matching one-look formula.

The freeze for an adaptive plan is the rule, the looks, and the decision at each look, written before any target outcome from the full run is seen. See [feasibility and freeze](feasibility-and-freeze.md).
