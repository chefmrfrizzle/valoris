# Phase 0 Acceptance-Test Plan

Status: Proposed. Test fixtures must be public or synthetic unless an approved private test environment is explicitly in scope.

| Test ID | Gate | Required evidence |
|---|---|---|
| AT-001 | Schema validity | Every canonical object accepts valid fixtures and rejects unknown/invalid required fields under its declared version. |
| AT-002 | Canonical bytes | Independent implementations produce identical bytes for every golden vector. |
| AT-003 | Numeric boundaries | Unsupported, ambiguous, non-finite, or lossy numbers fail before hashing. |
| AT-004 | Content identity | Any committed-field change changes the object identifier; field order does not. |
| AT-005 | Signature integrity | Valid signatures verify; tampered object, wrong signer, expired/revoked key, and wrong suite fail closed. |
| AT-006 | Version interpretation | Old receipts remain interpretable after a compatible protocol release; incompatible changes require migration/version boundaries. |
| AT-007 | Task immutability | A scheduled TaskSpec cannot be mutated without receiving a new identifier and authorization. |
| AT-008 | Capability match | Scheduler refuses incompatible hardware, runtime, resource, data, or policy capability. |
| AT-009 | Bounded execution | Worker denies undeclared network/filesystem access, enforces resource ceilings, and records timeout/termination. |
| AT-010 | Receipt chain | Execution, verification, reproduction, and acceptance receipts resolve every required input, policy, actor, and prior object. |
| AT-011 | Replay/duplicate safety | Re-submitting a receipt or authorized accounting event is idempotent or rejected without duplicate credit. |
| AT-012 | Verifier disagreement | Conflicting verification results remain visible and block acceptance when policy requires agreement. |
| AT-013 | Reproduction independence | A reproduction controlled by the same prohibited party/environment fails independence qualification. |
| AT-014 | Counterexample permanence | An accepted counterexample narrows/disputes the claim through a state transition without deleting supporting history. |
| AT-015 | Projection rebuild | Evidence and reliability projections rebuild from canonical history to the same logical result. |
| AT-016 | Failure memory | A deliberate adapter or environment failure produces a LearningEpisode and durable regression test. |
| AT-017 | Public/private leak | Public build and logs reject configured private classifications, credential patterns, and restricted filenames. |
| AT-018 | Role isolation | Sponsor, scientist, worker, verifier, reviewer, operator, and auditor cannot exercise undeclared privileges. |
| AT-019 | Sandbox onboarding | A new counterparty completes a synthetic dry run without receiving production data or credentials. |
| AT-020 | Trust Passport scope | Expired, revoked, out-of-scope, or wrong-purpose claims cannot grant access. |
| AT-021 | Demo labeling | Synthetic metrics and claims are visibly labeled in UI, exports, screenshots, and metadata. |
| AT-022 | Accessible core journey | Keyboard and screen-reader users can identify state, navigate perspectives, open evidence, and understand errors. |
| AT-023 | Responsive core journey | Sponsor, scientist, and operator first-success flows work at supported desktop and mobile widths without horizontal loss. |
| AT-024 | Release evidence | Release candidate includes test results, dependency inventory, provenance, known limitations, and approval record. |

## First-slice pass condition

The first vertical slice cannot be called complete until AT-001 through AT-004, AT-007 through AT-017, AT-019, AT-021, and AT-024 pass. Signature-dependent AT-005 is mandatory before receipts are represented as cryptographically signed. Accessibility and responsive tests are mandatory before public onboarding is promoted.
