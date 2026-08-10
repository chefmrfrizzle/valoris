# ADR-0009 — Research-Only Solo-Maintainer Review Exception

- **Status:** Accepted
- **Date:** 2026-08-10
- **Decision owner:** Protocol maintainer (`@chefmrfrizzle`)
- **Applies to:** Research-gate merges containing public research/planning documentation and bounded repository-only guardrails

## Context

The repository requires review before merge, but the project currently has one human operator. The operator controls `@chefmrfrizzle`, which authors and administers the repository, and `@11BUSD`, which can submit a separately authenticated GitHub review. Account separation is useful audit evidence but is not independent-person assurance.

Blocking all public research documentation until a second person joins would prevent low-risk evidence gathering while adding no independent judgment. Treating the second account as genuinely independent would misrepresent the control. The exception therefore has to be narrow, disclosed, auditable, and incapable of promoting executable or high-impact behavior.

## Decision

`@11BUSD` may satisfy GitHub's required-review mechanism for a pull request authored by `@chefmrfrizzle` only when the merge unlocks a research-only gate and every changed artifact is either public research/planning documentation or repository-only guardrail automation that cannot write repository contents, access secrets, publish artifacts, deploy, or execute protocol/customer workloads. All conditions below must hold:

1. the pull request explicitly discloses that both accounts share one operator;
2. required checks pass on the final reviewed commit;
3. every review conversation is resolved with a documented disposition;
4. the review is submitted after the final substantive change;
5. changed guardrail automation only narrows permissions, rejects unsafe changes, or tests those controls;
6. no administrator or branch-protection bypass is used; and
7. the merge method retains GitHub review and CI evidence.

The exception may unblock Prompt 2 benchmark research because Prompt 2 is limited to sourced comparison and a proposed ADR. It does not itself accept scientific criteria or authorize implementation.

## Prohibited uses

The exception cannot approve or merge:

- application or protocol implementation;
- executable schemas, adapters, workers, tests that exercise production behavior, or build/deployment configuration;
- security, identity, cryptographic, key-lifecycle, or scientific-acceptance policy;
- confidential or restricted data handling;
- production configuration, releases, deployment, or incident-policy changes;
- payment, settlement, or contribution-accounting authority; or
- constitutional protocol-invariant changes.

Those changes remain `BLOCKED_OWNER` until a genuinely independent, appropriately qualified person reviews them.

## Consequences

- Research planning can progress without disguising a second account as a second person.
- GitHub retains an explicit approval event and passing checks for the research-only merge.
- The approval provides operator-attestation evidence, not independent-person assurance.
- Every later prompt must re-evaluate whether its artifacts remain inside this exception; Prompt 3 and implementation prompts are outside it by default.

## Expiration

This exception expires when an eligible independent maintainer is available. At that point, remove the same-operator account from required CODEOWNER duties and require independent review for all protected changes.
