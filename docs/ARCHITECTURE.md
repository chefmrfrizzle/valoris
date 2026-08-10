# Protocol Architecture

Status: Phase 0 baseline — proposed for review

## Mission

The Verifiable Science Protocol coordinates computational scientific work so that a third party can inspect what was requested, what ran, which inputs and environment were used, who verified or reproduced it, which challenges remain, and what the evidence does **not** establish.

The protocol records evidence. It does not turn computation, consensus, payment, or model confidence into scientific truth.

## Trust zones

1. **Public protocol:** canonical objects, interfaces, verification rules, conformance tests, public threat model, reference components, and synthetic demonstrations.
2. **Private control plane:** customer workspaces, proprietary adapters, enterprise integrations, commercial workflows, and protected research metadata.
3. **Restricted security and operations:** incident handling, access policy, key-management design, deployment security, recovery, and private threat intelligence.
4. **Outside Git:** secrets, production private keys, sensitive datasets, production backups, and privileged credentials.

Public receipt verification must remain possible without access to zones 2–4.

## Architectural shape

```text
ProblemPassport
    ↓ compiled by a versioned TaskAdapter
WorkGraph
    ↓ immutable task commitments
TaskSpec(s)
    ↓ scheduled only to compatible, authorized workers
ExecutionReceipt(s)
    ↓ evaluated by an explicit policy
VerificationReceipt(s)
    ↓ independently repeated where required
ReproductionAttempt(s)
    ↓ challenge and domain-review tracks remain visible
AcceptanceReceipt + ClaimStateTransition
    ↓ projects into
Evidence Graph + Research Reliability Graph
```

## Deterministic core and advisory edge

The deterministic core owns:

- canonical serialization and identifiers;
- object and protocol-version validation;
- immutable task commitments;
- receipt verification;
- replay and duplicate protection;
- policy-version selection;
- claim-state transitions;
- accounting invariants;
- append-only evidence history.

The advisory edge may propose decompositions, adapters, solvers, schedules, explanations, tests, counterexamples, and UI guidance. Advisory output has no authority until deterministic validation and required human/policy review succeed.

## Sources of truth

The canonical source of truth is an append-only event and receipt record. The Evidence Graph, Research Reliability Graph, search indexes, dashboards, and aggregate metrics are rebuildable projections. A graph database may be used as a projection, but it must not become the only copy of canonical history.

## Canonical data direction

Hash-critical JSON is constrained to the I-JSON-compatible domain required by [RFC 8785 JSON Canonicalization Scheme](https://datatracker.ietf.org/doc/html/rfc8785). Exact schemas, golden vectors, identifier formats, signature suites, and compatibility rules remain release-blocking Phase 1 work.

Provenance exports should map protocol entities, activities, agents, derivations, and responsibility to [W3C PROV-DM](https://www.w3.org/TR/prov-dm/) without forcing W3C PROV to become the internal transaction model.

## Identity and authorization

- Humans, organizations, services, workers, verifiers, and agents have separate identities.
- Authentication does not imply authorization.
- Workload execution, verification, scientific review, policy approval, and settlement are separate capabilities.
- A participant cannot satisfy an independence requirement merely by using a second account it controls.
- New counterparties begin in a synthetic-data sandbox and gain privileges only after explicit checks.

## First vertical slice

The first slice must use safe public or synthetic data and one narrowly defined computational-materials benchmark. It must demonstrate:

1. a valid ProblemPassport;
2. deterministic compilation to a WorkGraph;
3. one locally executable TaskSpec;
4. an execution receipt whose unsigned structure is validated before signature work;
5. verification against a declared policy;
6. reproduction on a genuinely separate environment;
7. one deliberate counterexample or failure case;
8. a browsable evidence path;
9. a LearningEpisode that converts the failure into a durable test.

No payment rail, native token, anonymous arbitrary-code marketplace, restricted workload, or autonomous policy change is part of this slice.

The deterministic local slice through Prompt 5 uses an unsigned receipt structure. A cryptographic signature becomes part of the vertical slice only after D-017 is accepted and Prompt 6 supplies approved key identifiers, lifecycle behavior, verification, and test vectors.

## Release boundary

Production readiness requires executable evidence and the gates in `policies/RELEASE_GATES.md`. A successful demo is not itself a production release or a scientifically validated claim.
