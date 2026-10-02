---
name: rk-quantum-network
description: "Specify and evaluate a quantum-network service: entanglement requests, Bell or GHZ delivery, repeaters, memory, routing, and scheduling. Use when the claim is about protocol behavior under a network load. For a local circuit or open-system model with no network protocol, use rk-quantum."
license: Apache-2.0
---

# Quantum network

Define the service before the protocol. A network claim needs a quantum-resource model and a classical control model. This skill does not require a particular simulator, topology generator, or venue template.

## Active paper

Resolve the paper from the request, the working directory, or that project's own instructions, such as an `AGENTS.md` beside the work. Use only that paper's service contract, baselines, and ablations. If several papers fit and the task would edit protocol code or report a network result, ask which paper applies.

Leave sibling papers untouched. Do not import a sibling protocol, demand model, or unpublished metric. If shared simulator code is allowed by the project, copy it into the active paper and then treat the copy as owned there. A local circuit or master-equation check with no network protocol belongs to `rk-quantum`.

## Protocol contract

State who requests entanglement, between which endpoints, in what form, and with what fidelity, timing, and success rule. Specify topology, loss, per-attempt success and duration, memory capacity and decoherence, communication-qubit limits, local gate time and error, classical latency, contention, arrivals, and deadlines. Label measured parameters, literature parameters, and assumptions separately. Say whether fidelity comes from a state, a statistical estimate, or a proxy.

Trace a request from arrival to completion or failure: link generation, heralding, reservation, swapping, fusion or purification when used, classical acknowledgements, expiration, release, and retry. Name who owns each qubit or memory slot. Check that a resource is not consumed twice, leaked after failure, or delivered before the required quantum operation and classical message exist. Pair fidelity is not the fidelity of a delivered multipartite state.

## Fair comparison

Hold offered load, hardware budget, topology, noise, fidelity threshold, and simulator rules fixed across methods. If a baseline has different resources, normalize or disclose that. Include one simple baseline and the ablations that isolate the proposed mechanism. Start from a tiny deterministic trace, then stochastic replicates with independent seeds. Do not present a pilot as a confirmatory result.

Measure the requested service: completed requests, throughput, delay and tail, fidelity at delivery, expiry, memory occupancy and age, and control overhead when it matters. State denominators. Report uncertainty and sensitivity to load, decoherence, latency, success probability, and capacity. Check whether a gain comes from an unrealistic buffer, free entanglement, omitted classical delay, or a different demand model.

## Deliver

Return the service contract, baseline and ablation matrix, reproducible configuration, invariant checks, results with uncertainty, and the regime where the conclusion holds or fails. A simulator is evidence for its assumptions, not deployment performance.

[RFC 9340](https://www.rfc-editor.org/rfc/rfc9340.html) and [RFC 9583](https://www.rfc-editor.org/rfc/rfc9583.html) are useful architecture references. They are informational, not a required implementation. Verify current literature before a novelty claim.
