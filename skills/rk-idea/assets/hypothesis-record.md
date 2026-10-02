# Hypothesis record

Blank fields. Leave unknown items empty. Do not invent an observation, a source, a measurement, or a result.

## Identity

- record_id:
- status: candidate
- updated_on:
- human_owner:

## Observation

- statement:
- provenance:
- source_ids:
- uncertainties:
- pattern_origin: expected | exploratory | seen after the target result |

## Research question

- statement:
- framework:
- question_type:
- population_or_system:
- intervention_or_exposure:
- comparator:
- outcome:
- timeframe:

## Claim

- claim_type: descriptive | associational | predictive | causal | mechanistic | formal |
- provisional_contribution:
- novelty: unverified
- search_boundary_id:

## Hypotheses

Repeat the block. Do not add rows to reach a fixed count.

- hypothesis_id:
- statement:
- mechanism:
- status: candidate
- source_ids:
- assumptions:
- boundary_conditions:
- uncertainties:
- prediction_ids:
- rival_hypothesis_ids:

## Causal estimand

Fill only when claim_type is causal. Otherwise leave the block empty.

- estimand_id:
- linked_hypothesis_ids:
- population:
- intervention_or_exposure:
- comparator:
- outcome:
- time_horizon:
- population_summary:
- intercurrent_event_strategy:
- identification_assumptions:

## Operationalizations

Repeat per construct.

- measurement_id:
- construct:
- variable:
- role:
- operational_definition:
- instrument_or_method:
- unit:
- timing:
- population_or_system:
- validity_evidence_source_ids:
- reliability_plan:
- missingness_plan:
- blinding_or_masking:
- threshold_rationale:

## Risks that could mimic the pattern

- confounding:
- selection_bias:
- collider_bias:
- reverse_causation:
- measurement_bias:
- other:

## Ethics and feasibility

- human_subjects_gate:
- animal_research_gate:
- biosafety_gate:
- dual_use_gate:
- regulatory_gate:
- data_governance_gate:
- feasibility_status:
- feasibility_fact:
- required_reviews:
- unresolved_blocks:

## Judgment

- judgment: pursue | reframe | defer | reject |
- waits_on:
- reason:
- label: judgment, not a validated result
