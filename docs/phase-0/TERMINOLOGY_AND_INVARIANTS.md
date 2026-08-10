# Terminology and Invariants

Status: Proposed

## Canonical terms

- **ProblemPassport:** versioned statement of a scientific/computational problem, purpose, scope, inputs, assumptions, constraints, owner, classification, and success limits.
- **WorkRequest:** funded or authorized request to execute work under a ProblemPassport.
- **TaskAdapter:** versioned compiler from one supported workload family into protocol TaskSpecs. It is not a universal scientific reasoner.
- **WorkGraph:** immutable dependency graph of TaskSpecs produced for one WorkRequest.
- **TaskSpec:** hash-committed executable unit containing program, inputs, environment, resource bounds, randomness/numerical policy, verification policy, and dependencies.
- **CapabilityManifest:** signed, time-bounded declaration of what a worker or verifier can safely execute.
- **ExecutionReceipt:** attributable record of a TaskSpec execution and its committed outputs, environment, timing, and failure state.
- **VerificationReceipt:** result of applying a named, versioned VerificationPolicy to declared evidence.
- **ReproductionAttempt:** new execution intended to test whether a result can be obtained under an independence policy.
- **Challenge:** funded or authorized attempt to narrow, dispute, or invalidate a claim, implementation, dataset assumption, or verifier.
- **Counterexample:** accepted evidence that demonstrates a relevant failure or boundary condition.
- **AcceptanceReceipt:** protocol record that declared evidence gates were satisfied. It is not a declaration of scientific truth.
- **Claim:** human-meaningful assertion linked to supporting and challenging evidence.
- **ClaimStateTransition:** policy-governed change to a claim's evidence state without erasing history.
- **ContributionReceipt:** attribution/accounting record for accepted work. It is not ownership, equity, or a token.
- **LearningEpisode:** durable record of trigger, evidence, baseline, change proposal, tests, failures, decision, and observed result.

## Invariants

- **I-001 — Public verifiability:** A public protocol receipt can be verified without private source code.
- **I-002 — Evidence is not truth:** Execution, verification, reproduction, scientific review, and external validation remain distinct states.
- **I-003 — Immutable commitments:** A TaskSpec cannot change after its identifier is issued.
- **I-004 — Versioned interpretation:** Every canonical object declares the protocol/schema versions needed to interpret it.
- **I-005 — Append-only history:** Failed work, disputes, incidents, and superseded evidence are retained.
- **I-006 — Explicit policy:** Verification and acceptance refer to named, versioned policies.
- **I-007 — No silent threshold changes:** Agents and operators cannot lower acceptance or scientific-maturity rules to pass a result.
- **I-008 — Independent means independent:** Reproduction and verification independence is evaluated by declared organizational, implementation, data, and environment criteria—not account count alone.
- **I-009 — Replay safety:** A receipt or settlement instruction cannot be accepted twice for the same authorization.
- **I-010 — Least privilege:** Work execution, verification, review, policy change, release, and settlement authorities are separated.
- **I-011 — Classified data stays classified:** Public artifacts contain only approved public or synthetic inputs and redacted evidence.
- **I-012 — Secrets stay outside Git:** No trust zone stores production secrets or private keys in source control.
- **I-013 — Bounded execution:** Resource, network, filesystem, and runtime permissions are explicit before work starts.
- **I-014 — Deterministic identifiers:** Conforming implementations produce identical canonical bytes and identifiers for identical valid objects.
- **I-015 — Projection recoverability:** Graphs, indexes, and metrics can be rebuilt from canonical events/receipts.
- **I-016 — Failure memory:** A meaningful failure produces a durable test, risk entry, policy update, or recorded rationale.
- **I-017 — No hidden scientific authority:** Private ranking or scheduling may improve operations but cannot become a required hidden correctness oracle.
- **I-018 — No fabricated evidence:** Demo, synthetic, estimated, and production measurements are visibly distinguished.
- **I-019 — Consent and rights:** Data use records owner, rights basis, permitted purpose, retention, and processing boundary.
- **I-020 — Human accountability:** High-impact policy, security, release, and scientific-state decisions identify the accountable approver.
