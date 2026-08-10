# Gated Next-Build Prompts

## Known limitations of this Phase 0 package

- Independent security/cryptography reviewer is not yet assigned for D-017.
- Computational-materials domain reviewer is not yet assigned for benchmark acceptance decisions.
- Institutional IT/security and legal/privacy decision authorities are not yet assigned for D-019/D-020.
- Current UX evidence is from static prototype audit; onboarding and accessibility flows are not production-validated.
- `BLOCKED` decisions are explicit stop-gates and may not be bypassed for speed/funding pressure.

Run one prompt at a time. Do not start a later prompt until the prior gate is reviewed and merged. Never invent packages, APIs, citations, research results, customer demand, benchmark numbers, or security guarantees.

## Prompt 1 — Resolve the Phase 0 gate

> Review the Phase 0 package in `docs/phase-0/` as a protocol maintainer, domain scientist, security reviewer, institutional IT reviewer, and skeptical design partner. Identify contradictions, unsafe assumptions, unverifiable claims, and missing owners. Propose precise edits. Do not write production code. Mark unresolved decisions `BLOCKED` with the evidence or person required to unblock them.

## Prompt 2 — Select one benchmark

> Research 3–5 safe public or synthetic computational-materials benchmarks using current primary sources. Verify dataset/code licenses and access terms. Score customer pain, reproducibility, cost, runtime, scientific ambiguity, verification clarity, counterexample potential, and second-machine feasibility. Recommend exactly one narrow benchmark and define pass/fail criteria. Separate sourced facts, assumptions, and estimates. Do not implement it.

## Prompt 3 — Approve canonicalization and identity ADRs

> Draft ADRs for canonical JSON constraints, schema/version compatibility, algorithm-prefixed identifiers, signature-suite agility, event identity, delegation, revocation, and reproduction independence. Use current primary specifications and explicit test vectors. Keep the cryptographic suite `BLOCKED_UNVERIFIED` unless the threat model, key lifecycle, and multi-language evidence are sufficient. Do not add payment or settlement work.

## Prompt 4 — Implement canonical schemas and golden vectors

> Implement the smallest canonical schemas required for ProblemPassport, WorkRequest, WorkGraph, TaskSpec, CapabilityManifest, ExecutionReceipt, VerificationReceipt, ReproductionAttempt, Challenge, Counterexample, AcceptanceReceipt, Claim, ClaimStateTransition, and LearningEpisode. Add valid/invalid fixtures, canonical-byte golden vectors, property tests, numeric-boundary tests, compatibility tests, and public/private leak checks. Use public or synthetic data only. Record failures as LearningEpisodes.

## Prompt 5 — Build one deterministic local slice

> Implement the selected benchmark from ProblemPassport through an authorized WorkRequest, TaskAdapter, WorkGraph, one bounded local worker, output commitment, unsigned receipt structure, Claim, and append-only ClaimStateTransition. Pin and record the execution environment. Enforce resource/network/filesystem limits. Prove deterministic identifiers and replay safety. Do not advance scientific acceptance or call receipts cryptographically signed until their respective policy and signature gates pass.

## Prompt 6 — Add verification and signed receipts

> After the signature ADR is accepted, implement key IDs, signing, verification, expiry/revocation behavior, tamper tests, and a versioned VerificationPolicy for the first benchmark. Keep execution verification distinct from scientific acceptance. Add release evidence and a failure case that becomes a permanent regression test.

## Prompt 7 — Add independent reproduction and counterexamples

> Reproduce the first result on a genuinely separate environment under the accepted independence policy. Build the evidence diff across program, data, environment, hardware, numerical settings, and outputs. Run one deliberate counterexample/boundary challenge. Preserve disagreement and show the resulting claim-state transition without deleting history.

## Prompt 8 — Design onboarding before production UI

> Using `COUNTERPARTY_ONBOARDING.md` and the current UX audit, create three visual onboarding directions for the role-selection, permission/data-flow preview, Synthetic Twin run, evidence review, and scoped activation journey. Make demo/synthetic status unmistakable. Include sponsor, scientist, compute provider, verifier, reproducer, institutional security, data owner, and auditor needs. Select a direction through review before implementing it.

## Prompt 9 — Build the synthetic private control-plane slice

> In the private repository, consume the pinned public protocol release and build a synthetic-only organization/workspace flow, least-privilege roles, classification/purpose selection, permission preview, Synthetic Twin adapter check, evidence inbox, redacted export, revocation, and audit events. Do not duplicate canonical public schemas or introduce customer data, production credentials, or hidden correctness logic.

## Prompt 10 — Prepare a design-partner security gate

> Evaluate the public, private, and device-only security roadmaps against the actual implementation. Require private branch protection, organization/team separation, a second recovery path, workspace isolation, short-lived workload identity, connector threat models, audit logs, tested revocation, backup restoration, incident tabletop evidence, and a shared-responsibility statement. Return a red/yellow/green gate and block customer-confidential data until every critical item is green.

## Prompt 11 — Prove the learning loop

> Demonstrate one end-to-end LearningEpisode: observe a real failure, link evidence, retrieve comparable history, propose a bounded change, run old and new tests/evals, compare to baseline, reject or approve through review, canary locally, and observe the result. Show that the system improved without deleting failure evidence or changing acceptance policy.

## Prompt 12 — Prepare the first investable demonstration

> Package the verified vertical slice into a concise demo: the problem, why existing workflows are painful, exact computation, evidence path, independent reproduction, counterexample, known limitations, counterparty onboarding, security boundary, design-partner offer, and next de-risking milestones. Use only measured evidence. Label every synthetic/demo element and never imply computational verification equals scientific validation.
