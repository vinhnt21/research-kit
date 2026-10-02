# Model checks

Use this when the quantum model itself must be judged, before interpreting a large run. Record the answers in the active paper's own notes. Fill `assets/quantum-run-record.md` once a run is kept.

## System

State the Hilbert space, the dimension of each factor, the basis, and the initial state. State the controls, the Hamiltonian, or the circuit, and any environment or noise assumption that is part of the model. For a variational algorithm, state which data and which optimizer updates stay classical, and which subroutine is quantum.

If the equations set the reduced Planck constant to one, Hamiltonian entries are angular frequencies and rates use reciprocal time. A frequency quoted in hertz must be converted with a factor of two pi before it enters those equations. Do not mix hertz with radians per second.

Tensor order is part of the system definition. The left-to-right order of a tensor product assigns subsystem indices from the first factor onward. Keep that order in every state, operator, dissipative channel, and partial trace. Retaining a listed subset of subsystems is the opposite of tracing those subsystems out.

## Observable

Name the operator, probability, or circuit outcome the question asks for, including units and the subsystem it acts on. An expectation value, a sampled bitstring, and a reduced state are different observables. Say which one the claim uses.

A speedup or advantage claim also needs a cost model and a named comparator. Circuit output alone does not carry that claim.

## Idealization

List the approximations that are actually in force. Typical ones are the rotating-wave approximation, Born-Markov and secular assumptions, weak coupling, a bath that stays in equilibrium, a truncated space, a symmetry reduction, and an initially factorized system and bath. Say which of these were not used.

For a dissipative channel, define what each rate measures. The jump operator is scaled by the square root of the rate, not by the rate itself. As a check on that convention, pure dephasing that multiplies a Pauli Z operator by the square root of half the dephasing rate makes coherences decay as an exponential of minus that rate times time. A different scaling is a different physical model and must be stated.

## Tiny solvable case

Before a large run, compute a small case with a known closed form or with few enough dimensions to check by hand. Match the observable, not only the absence of an error message. If the tiny case disagrees with the analytic expectation, stop and repair the model or the setup. Do not promote that disagreement into a physical finding.

## Invariants

Check every item that the model makes meaningful. Skip an item only by saying why it does not apply.

- Normalization. A pure state has unit norm. Outcome probabilities for one measurement sum to one, within a stated numerical tolerance.
- Hermiticity. A Hamiltonian or a density operator that the model treats as Hermitian stays Hermitian within that tolerance.
- Trace and positivity. A density operator has trace one. Its eigenvalues stay above a stated negative tolerance. A tiny negative eigenvalue can be roundoff. A clearly negative eigenvalue means the object is not a valid state.
- Dimensions. Operators and unitary maps are sized for the space they act on. The product of subsystem dimensions equals the full space. A partial trace lands in the retained subsystems only.
- Probability conservation. The measurement operators for a complete measurement resolve the identity. A closed unitary evolution preserves the norm. A reported probability outside the unit interval is a failure of the calculation.
- Tensor order. Reordering subsystems without a matching permutation of every state and operator is an error, even when the numerics run.
- Step size. If time or another parameter is discretized, compare a coarser step with a finer one. Keep the finer setting when the observable moves by more than the tolerance.
- Truncation. Justify any cutoff on the Hilbert space, a mode number, a time or frequency window, an output grid, or a bath expansion. Record the integrator tolerances, the trajectory count, and the seeds.
- Convergence. Sweep each artificial cutoff the result depends on, including grid spacing, integrator tolerances, trajectory count, and harmonic content. The reported value is the one that has settled under that sweep, together with the range still seen. When the library records integrator statistics, include them.

A failed invariant invalidates the claimed state or the claimed observable. It is not a new effect.
