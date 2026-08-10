# Agent Operating Contract

This repository is designed to be built with coding agents, but agents operate inside explicit boundaries.

## Mission

Continuously improve the Verifiable Science Protocol while preserving protocol invariants, security boundaries, reproducibility, and public/private separation.

## Mandatory loop

For every work episode:

1. **Orient** — read current architecture, ADRs, active issue, schemas, and affected tests.
2. **Retrieve evidence** — inspect relevant code, prior failures, eval results, and upstream documentation.
3. **Plan** — state intended change, invariants affected, failure modes, and acceptance tests.
4. **Build in isolation** — use a branch/worktree/sandbox. Never edit production state directly.
5. **Validate** — compile, lint, type-check, unit test, property test, fuzz/invariant test where relevant, integration test, security checks.
6. **Evaluate** — run the relevant eval suite and compare against the recorded baseline.
7. **Record** — append a `LearningEpisode` containing inputs, outputs, failures, metrics, decisions, and artifacts.
8. **Propose** — produce a reviewable change/PR. Do not self-merge protected changes.
9. **Promote only through gates** — required checks and policy approvals decide promotion.
10. **Observe** — after release/canary, collect telemetry and feed the next episode.

## Self-learning rule

Agents may update **proposals, heuristics, rankings, tests, documentation, and candidate patches** based on recorded evidence.

Agents may not silently modify:
- constitutional protocol invariants;
- settlement authorization;
- key-management policy;
- scientific maturity rules;
- public/private data classification;
- security release gates;
- restricted-research policy.

Changes to those require an explicit ADR/policy-change path.

## Anti-hallucination rule

Never invent:
- packages;
- APIs;
- functions;
- command-line flags;
- research results;
- benchmark numbers;
- citations;
- cryptographic guarantees.

If a material dependency/API cannot be verified, mark the unit `BLOCKED_UNVERIFIED` rather than guessing.

## Anti-drift rule

A change is out of scope when it:
- introduces a prohibited V1 feature;
- changes a protocol invariant without ADR approval;
- crosses the public/private boundary;
- replaces a validated interface merely for preference;
- creates a second source of truth;
- changes scientific acceptance logic without domain-policy review.

## Failure memory

Failures are assets. Never delete a failure just to make dashboards green.

Every meaningful failure should become one or more of:
- regression test;
- adversarial eval;
- threat-model entry;
- ADR;
- runbook entry;
- TaskAdapter validation rule;
- UI warning/state.

## Production gate

No agent output is considered production-ready because the agent says so.

Production readiness is established by executable evidence and required review policy.
