# Phase 0 Decision Package

Status: Proposed for maintainer review

Phase 0 turns the original architecture ideas into a buildable decision boundary. It intentionally contains no production implementation.

## Deliverables

- `ARCHITECTURE_REVIEW.md` — readiness assessment and contradictions.
- `TERMINOLOGY_AND_INVARIANTS.md` — shared language and non-negotiable rules.
- `DECISION_REGISTER.md` — accepted, proposed, deferred, and blocked decisions.
- `RISK_REGISTER.md` — top technical, scientific, product, security, and governance risks.
- `ACCEPTANCE_TEST_PLAN.md` — tests required before a first release candidate.
- `COUNTERPARTY_ONBOARDING.md` — low-friction, risk-adaptive onboarding model.
- `INNOVATION_BACKLOG.md` — realistic ideas ordered by evidence and dependency.
- `NEXT_BUILD_PROMPTS.md` — copy-ready prompts sequenced behind explicit gates.
- `LEARNING_EPISODE-0001.md` — evidence record for this work episode.
- `audit/UX_AUDIT.md` — screenshot-backed review of the existing prototype.

## Exit criteria

Phase 0 is complete when maintainers:

1. accept or revise the terminology and invariants;
2. resolve every `BLOCKED` decision needed by the first schema release;
3. select one safe benchmark through a sourced comparison;
4. approve the first-slice acceptance tests;
5. confirm the public/private/restricted boundary;
6. approve a scoped Phase 1 issue without adding token, settlement, or unrestricted execution work.

Until those criteria are reviewed, production code remains premature.
