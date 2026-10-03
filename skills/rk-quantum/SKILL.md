---
name: rk-quantum
description: "Check a local quantum model (circuits, dynamics, variational algorithms, simulator versus hardware). For entanglement distribution, repeaters, memory, routing, or scheduling use rk-quantum-network. For tables already computed use rk-data."
license: Apache-2.0
---

# Check a local quantum model

Judge whether a quantum calculation is a well-posed model, and whether its evidence is a local simulation or a hardware observation. Start from the physical question and the observable. Keep an analytic expectation, a simulation, and a device result as separate evidence. This skill does not require a particular software stack.

## Active paper

Resolve the paper from the request, the working directory, or that project's own instructions, such as an `AGENTS.md` beside the work. Read that paper's scientific notes before changing its files or stating its results. If several papers fit and the task would write, run, or make a paper-specific claim, ask which paper applies.

Leave sibling papers untouched. A sibling draft, bibliography, figure, codebase, or unpublished result is not a citation, a baseline, or reusable text. A shared read-only literature collection may be consulted after each source is checked for this paper. Put new files where this paper already stores that kind of artifact. Do not impose a directory layout, venue name, or tool.

## Working language

These instructions stay in English. The reply does not.

Write the chat reply, questions, and internal notes in the language the user is writing in. If this paper already keeps those notes in one language, continue in that language. If the request has no clear language, or the user's language and those notes disagree, ask which language to use before writing the note.

Write that language as an original note to a colleague. Do not translate these instructions sentence by sentence. Keep this skill's field names, and terms this paper already uses, as they already appear. In Vietnamese, use a short sentence a lab mate would say, and leave a research term in English when the Vietnamese word would be unclear or mean something else. For example, write "Số này lấy từ file vừa mở lại. Chưa kết luận nguyên nhân." Do not write "Bản ghi này bảo đảm tính liêm chính của đầu ra đã được mở lại."

A manuscript, a figure label, and a slide use the language of that artifact. If the task would write the artifact and that language is not already clear, ask before drafting it.

## Route

Entanglement distribution, repeaters, memory, routing, or scheduling belongs to rk-quantum-network. A numeric table that is already computed belongs to rk-data.

Open one of these only for the branch in front of you:

- Model validity, idealization, and invariants: [model checks](references/model-checks.md).
- Local simulator versus paid or remote hardware, and what the run can prove: [execution boundary](references/execution-boundary.md).
- After any run that will be cited: [quantum run record](assets/quantum-run-record.md).

## Procedure

1. Resolve the active paper and read its scientific notes before editing its files or stating a quantum result.
2. Name the system, the observable, and what the model idealizes. Separate classical data and any optimization loop from the quantum subroutine.
3. Follow the model checks. Pass a tiny solvable case and the invariants that apply before a large run. A broken invariant is a model or calculation warning, not a discovery.
4. Follow the execution boundary before leaving a local simulator. Credentials and hardware spend require explicit authorization.
5. When a shot count, a seed, or a noise option is not already settled here, read the current official documentation of the library this project uses. Keep the dependency versions the project already has.
6. Fill the run record with the model, the backend, the seed, the shots or trajectories, and the observable. Report those fields, the invariant checks, the uncertainty, failed runs, and whether the evidence is local simulation or hardware. A simulation supports the declared model only. It does not establish unconditional quantum advantage.
