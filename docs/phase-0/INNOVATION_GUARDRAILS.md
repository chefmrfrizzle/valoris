# Innovation Guardrails (Phase 0 / Prompt 2+)

Purpose: expand product scope only where trust increases faster than risk.

## Scoring rubric (0–3 each)

1. Trust gain (verifiability, auditability, reproducibility)
2. Evidence burden clarity (testable acceptance criteria)
3. Reversibility (can roll back without hidden coupling)
4. Security exposure delta (least-privilege preserved)
5. Operator burden (runbook/support complexity)

Any proposal with Security Exposure = 3 requires independent security review before implementation.

## Scope boundary matrix

### Allowed in Prompt 2 research
- Benchmark comparison, sourcing, licensing checks
- Decision options with explicit assumptions
- UX direction concepts for onboarding flows

### Requires Prompt 3+ ADR acceptance
- Canonicalization/identifier/signature architecture choices
- Identity/delegation/independence policy models
- Event-log/projection consistency models

### Blocked until independent authority is assigned
- Production signature suite selection (D-017)
- Scientific acceptance policy approval (D-018)
- Reproduction independence policy approval (D-019)
- Production retention/legal policy approval (D-020)

## Kill-switch criteria

Stop/narrow innovation if it:
- adds hidden correctness authority,
- weakens acceptance policy silently,
- requires long-lived new secrets,
- expands production access without evidence,
- blurs DEMO/SYNTHETIC vs production evidence labels.

## AI/no-hidden-authority rule

AI may propose; deterministic validation + named accountable reviewers decide.
No recommendation may auto-promote acceptance/security/scientific state.
