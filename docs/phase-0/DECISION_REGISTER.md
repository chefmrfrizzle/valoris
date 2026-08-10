# Phase 0 Decision Register

Status values: `ACCEPTED`, `PROPOSED`, `DEFERRED`, `BLOCKED`

| ID | Status | Decision | Rationale / exit condition |
|---|---|---|---|
| D-001 | ACCEPTED | Use public, private control-plane, restricted security/ops, and outside-Git trust zones. | ADR-0008. |
| D-002 | ACCEPTED | Preserve a first-class Research Reliability Graph. | ADR-0006; advisory memory, not authority. |
| D-003 | ACCEPTED | Give every important claim a Counterexample Track. | ADR-0007; failure evidence remains permanent. |
| D-004 | ACCEPTED | Use an append-only event/receipt record as canonical history; treat graphs and dashboards as rebuildable projections. | Prevents a graph database or dashboard from becoming an unverifiable single source of truth. |
| D-005 | ACCEPTED | Keep deterministic protocol validation in the core and probabilistic/AI assistance at the edge. | Agents propose; policy and executable gates decide. |
| D-006 | PROPOSED | Constrain hash-critical JSON to RFC 8785-compatible I-JSON and ship cross-language golden vectors before signatures. | Resolve numeric-domain restrictions and implementation availability in Phase 1. |
| D-007 | PROPOSED | Use algorithm-prefixed content identifiers and signature-suite identifiers to preserve cryptographic agility. | Exact hash/signature suite is `BLOCKED_UNVERIFIED` pending security review and test vectors. |
| D-008 | ACCEPTED | Map exported provenance to W3C PROV-DM while keeping protocol events as the internal transaction model. | Supports interoperability without forcing RDF/PROV into the trusted execution path. |
| D-009 | ACCEPTED | Start with one safe public/synthetic computational-materials benchmark. | Final benchmark choice requires sourced comparison, rights review, and a reproducibility budget. |
| D-010 | ACCEPTED | Use risk-adaptive, sandbox-first onboarding. | Participants earn only the permissions needed for a verified first task. |
| D-011 | PROPOSED | Create a reusable Counterparty Trust Passport containing verified identity, role, data boundary, capabilities, approvals, and expiry. | Reduces repetitive procurement/onboarding while keeping claims scoped and time-bound. |
| D-012 | ACCEPTED | Require a Synthetic Twin dry run before confidential data or production compute is attached. | Finds adapter, policy, and environment failures without exposing protected inputs. |
| D-013 | ACCEPTED | Use an outbound-only worker connector for early bring-your-own-compute integrations. | Avoids inbound firewall changes and central custody of institutional compute credentials. |
| D-014 | DEFERRED | Sponsor accounting and contribution attribution. | Model off-chain only after receipt and replay invariants pass. |
| D-015 | DEFERRED | Any settlement rail. | Requires accepted accounting, duplicate protection, refunds, budget ceilings, and legal review. |
| D-016 | DEFERRED | Confidential-computing attestations and zero-knowledge techniques. | Add only for a demonstrated threat/customer requirement; do not use cryptography as decoration. |
| D-017 | BLOCKED | Production signature suite and key lifecycle. | Requires threat-model review, rotation/revocation design, test vectors, and multi-language implementation evidence. |
| D-018 | BLOCKED | Scientific acceptance policy for the first workload. | Requires the selected benchmark and a named domain reviewer. |
| D-019 | BLOCKED | Independence policy for reproduction. | Must define organizational, operator, implementation, environment, and data independence for the first workload. |
| D-020 | BLOCKED | Production retention periods. | Requires data owners, customer obligations, legal review, and storage architecture. |

## Decision ownership

| Decision | Accountable owner | Required independent authority | Ownership state |
|---|---|---|---|
| D-001–D-008, D-010, D-012–D-016 | Protocol maintainer (`@chefmrfrizzle`) | Security or domain review when the affected ADR/policy requires it. | ASSIGNED |
| D-009 | Protocol maintainer (`@chefmrfrizzle`) | Computational-materials domain reviewer. | `BLOCKED_OWNER`: domain reviewer not assigned; Prompt 2 must identify the required expertise without inventing a person. |
| D-011 | Protocol maintainer (`@chefmrfrizzle`) | Institutional security/IT design partner. | `BLOCKED_OWNER`: design-partner reviewer not assigned. |
| D-017 | Protocol maintainer (`@chefmrfrizzle`) | Independent security/cryptography reviewer. | `BLOCKED_OWNER`: reviewer not assigned; no production signature suite may be selected. |
| D-018 | Protocol maintainer (`@chefmrfrizzle`) | Named computational-materials domain reviewer. | `BLOCKED_OWNER`: reviewer not assigned and benchmark not selected. |
| D-019 | Protocol maintainer (`@chefmrfrizzle`) | Independent security reviewer and institutional IT reviewer. | `BLOCKED_OWNER`: both reviewer roles are unassigned. |
| D-020 | Protocol maintainer (`@chefmrfrizzle`) | Data owner and qualified legal/privacy reviewer. | `BLOCKED_OWNER`: both decision authorities are unassigned. |

The protocol maintainer owns assignment and evidence collection but cannot substitute for a required independent authority.

## Required next ADRs

1. Canonical serialization, identifier, and cryptographic agility profile.
2. First benchmark and domain acceptance policy.
3. Identity, delegation, and independence model.
4. Canonical event log and projection consistency model.
