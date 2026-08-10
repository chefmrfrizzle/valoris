# Phase 0 Architecture Review

Status: Ready for independent maintainer review after the changes recorded here

Review owner: Protocol maintainer (`@chefmrfrizzle`)

Independent approval owner: `BLOCKED_OWNER` — an eligible reviewer other than the pull-request author must be assigned in GitHub before merge.

## Scope and decision

This review covers the Phase 0 architecture, terminology, invariants, decision and risk registers, acceptance-test plan, onboarding model, gated build sequence, public/private/restricted boundary, and repository-baseline enforcement. It does not select or research a benchmark and does not approve production implementation.

The package is suitable to enter Prompt 2 only after:

1. the repository-baseline regression tests pass locally and in GitHub Actions;
2. an eligible independent reviewer approves the public pull request;
3. every review conversation is resolved; and
4. the Prompt 1 pull request is merged without bypassing the review gate.

## Findings and resolutions

| ID | Finding | Owner | Resolution | State |
|---|---|---|---|---|
| AR-001 | This architecture review was declared as a deliverable but absent. | Protocol maintainer (`@chefmrfrizzle`) | Add this review and retain it as the durable Prompt 1 decision record. | RESOLVED_IN_PR |
| AR-002 | The architecture required a signed receipt before the signature suite and key lifecycle were approved. | Protocol maintainer (`@chefmrfrizzle`) | Make Prompt 5 receipts explicitly unsigned; signatures enter only after D-017 and the Prompt 6 gate pass. | RESOLVED_IN_PR |
| AR-003 | The required repository check inspected only `HEAD`, so a pull-request merge ref or multi-commit diff could receive a false green result. | Protocol maintainer (`@chefmrfrizzle`) | Compare the event base and head revisions with full history available; retain a recursive fallback for local/new-root execution. | RESOLVED_IN_PR |
| AR-004 | Credential-path checks matched only repository-root paths. | Protocol maintainer (`@chefmrfrizzle`) | Inspect every tracked path and reject forbidden basenames at any depth. | RESOLVED_IN_PR |
| AR-005 | No second collaborator is currently eligible to approve the author’s pull request. | Protocol maintainer (`@chefmrfrizzle`) | Add a trusted reviewer with least-privilege repository access and obtain approval. The author must not self-approve or use the owner bypass. | BLOCKED_OWNER |

## Accepted architectural conclusions

- Canonical history is the append-only event and receipt record; graphs and dashboards remain rebuildable projections.
- The deterministic core validates identities, canonical bytes, receipts, policy versions, replay rules, and claim-state transitions; AI remains advisory.
- Public verification must not depend on private control-plane code or restricted operational material.
- Synthetic/public inputs and bounded local execution remain mandatory until later security and data gates pass.
- Computational verification and scientific acceptance remain distinct decisions.
- Prompt 2 is research and decision work only; it must not implement the benchmark.

## Blocked decisions and owners

| Decision | Accountable owner | Required authority/evidence | State |
|---|---|---|---|
| Select the first benchmark and define scientific acceptance (D-009, D-018). | Protocol maintainer (`@chefmrfrizzle`) | Named computational-materials domain reviewer plus sourced license, runtime, ambiguity, reproducibility, and pass/fail evidence. | BLOCKED_PENDING_PROMPT_2_AND_OWNER |
| Approve production signatures and key lifecycle (D-017). | Protocol maintainer (`@chefmrfrizzle`) | Independent security/cryptography reviewer, threat model, rotation/revocation behavior, test vectors, and multi-language evidence. | BLOCKED_OWNER_AND_EVIDENCE |
| Define reproduction independence (D-019). | Protocol maintainer (`@chefmrfrizzle`) | Independent security and institutional IT reviewers; organizational, operator, implementation, environment, and data independence criteria. | BLOCKED_OWNER_AND_POLICY |
| Set production retention periods (D-020). | Protocol maintainer (`@chefmrfrizzle`) | Named data owner, customer obligations, storage design, and qualified legal/privacy review. | BLOCKED_OWNER_AND_EVIDENCE |
| Approve reusable Counterparty Trust Passports (D-011). | Protocol maintainer (`@chefmrfrizzle`) | Institutional security/IT design partner, scoped claims, expiry, revocation, and audit requirements. | BLOCKED_OWNER_AND_DESIGN_EVIDENCE |

Unassigned roles are deliberate blockers, not permission for the protocol maintainer or an agent to assume independent authority.

## Prompt 2 entry gate

Prompt 2 may begin only when AR-001 through AR-004 are verified by executable checks, AR-005 is resolved by an independent approval, and the public Prompt 1 pull request is merged. Until then, the gate is `NO_GO`.
