# Phase 0 Decision Register

Status values: `ACCEPTED`, `PROPOSED`, `DEFERRED`, `BLOCKED`

| ID | Status | Decision | Rationale / exit condition |
|---|---|---|---|
| D-001 | ACCEPTED | Use public, private control-plane, restricted security/ops, and outside-Git trust zones. | ADR-0008. |
| D-002 | ACCEPTED | Preserve a first-class Research Reliability Graph. | ADR-0006; advisory memory, not authority. |
| D-003 | ACCEPTED | Give every important claim a Counterexample Track. | ADR-0007; failure evidence remains permanent. |
| D-004 | ACCEPTED | Use an append-only event/receipt record as canonical history; treat graphs and dashboards as rebuildable projections. | Prevents a graph database or dashboard from becoming an unverifiable single source of truth. |
| D-005 | ACCEPTED | Keep deterministic protocol validation in the core and probabilistic/AI assistance at the edge. | Agents propose; policy and executable gates decide. |
| D-006 | PROPOSED | Constrain hash-critical JSON to RFC 8785-compatible I-JSON and ship cross-language golden vectors before signatures. | ADR-0011 proposes strict input constraints, including rejection of negative zero under verified RFC 8785 erratum 7920. Acceptance awaits D-023. |
| D-007 | PROPOSED | Use algorithm-prefixed content identifiers and fully specified signature-suite identifiers to preserve cryptographic agility. | ADR-0012 is proposed. Exact identifier grammar, hash, signature suite, envelope, and key format remain `BLOCKED_UNVERIFIED` pending D-017 security review and test vectors. |
| D-008 | ACCEPTED | Map exported provenance to W3C PROV-DM while keeping protocol events as the internal transaction model. | Supports interoperability without forcing RDF/PROV into the trusted execution path. |
| D-009 | ACCEPTED | Start with one safe public/synthetic computational-materials benchmark. | Final benchmark choice requires sourced comparison, rights review, and a reproducibility budget. |
| D-010 | ACCEPTED | Use risk-adaptive, sandbox-first onboarding. | Participants earn only the permissions needed for a verified first task. |
| D-011 | PROPOSED | Create a reusable Counterparty Trust Passport containing verified identity, role, data boundary, capabilities, approvals, and expiry. | Reduces repetitive procurement/onboarding while keeping claims scoped and time-bound. |
| D-012 | ACCEPTED | Require a Synthetic Twin dry run before confidential data or production compute is attached. | Finds adapter, policy, and environment failures without exposing protected inputs. |
| D-013 | ACCEPTED | Use an outbound-only worker connector for early bring-your-own-compute integrations. | Avoids inbound firewall changes and central custody of institutional compute credentials. |
| D-014 | DEFERRED | Sponsor accounting and contribution attribution. | Model off-chain only after receipt and replay invariants pass. |
| D-015 | DEFERRED | Any settlement rail. | Requires accepted accounting, duplicate protection, refunds, budget ceilings, and legal review. |
| D-016 | DEFERRED | Confidential-computing attestations and zero-knowledge techniques. | Add only for a demonstrated threat/customer requirement; do not use cryptography as decoration. |
| D-017 | BLOCKED | Production signature suite and key lifecycle. | ADR-0012 and ADR-0013 define proposal boundaries only. Every concrete cryptographic choice remains `BLOCKED_UNVERIFIED`; acceptance requires threat-model review, rotation/revocation design, test vectors, and multi-language implementation evidence. |
| D-018 | BLOCKED | Scientific acceptance policy for the first workload. | Requires the selected benchmark and a named domain reviewer. |
| D-019 | BLOCKED | Independence policy for reproduction. | ADR-0014 proposes dimensional evidence and I0–I4 labels, but no profile is accepted. Must define organizational, operator, implementation, environment, hardware, control/funding, and data independence for the first workload. |
| D-020 | BLOCKED | Production retention periods. | Requires data owners, customer obligations, legal review, and storage architecture. |
| D-021 | BLOCKED | Adopt the pinned `spglib` wurtzite workload as the first technical benchmark. | ADR-0010 is proposed. Requires a named computational-crystallography reviewer to approve the exact input convention, tolerance/challenge suite, discrete outputs, and technical claim boundary. |
| D-022 | BLOCKED | Freeze the first benchmark environment and second-machine matrix. | Requires exact runtime/dependency/artifact hashes plus successful macOS-arm64 and Linux-x86_64 evidence; D-019 must decide whether that evidence is independently reproduced. |
| D-023 | BLOCKED | Adopt the canonical JSON and protocol/schema compatibility profile. | ADR-0011 is proposed. Requires strict-parser and compatibility tests, immutable historical resolution, identical golden-vector results from two independent language implementations, and interoperability/security review. |
| D-024 | BLOCKED | Adopt the event identity, delegation, and revocation model. | ADR-0013 is proposed. Event-ID format, identity stack, delegation/status representation, offline/freshness behavior, and all cryptographic mechanisms remain `BLOCKED_UNVERIFIED` pending security/identity and institutional IT review. |

## Decision ownership

| Decision | Accountable owner | Required independent authority | Ownership state |
|---|---|---|---|
| D-001–D-008, D-010, D-012–D-016 | Protocol maintainer (`@chefmrfrizzle`) | Security or domain review when the affected ADR/policy requires it. | ASSIGNED |
| D-009 | Protocol maintainer (`@chefmrfrizzle`) | Computational-materials domain reviewer. | `BLOCKED_OWNER`: Prompt 2 identified the required expertise, but a named reviewer is not assigned. |
| D-011 | Protocol maintainer (`@chefmrfrizzle`) | Institutional security/IT design partner. | `BLOCKED_OWNER`: design-partner reviewer not assigned. |
| D-017 | Protocol maintainer (`@chefmrfrizzle`) | Independent security/cryptography reviewer. | `BLOCKED_OWNER`: reviewer not assigned; no production signature suite may be selected. |
| D-018 | Protocol maintainer (`@chefmrfrizzle`) | Named computational-materials domain reviewer. | `BLOCKED_OWNER`: reviewer not assigned and the proposed benchmark is not adopted. |
| D-019 | Protocol maintainer (`@chefmrfrizzle`) | Independent security reviewer and institutional IT reviewer. | `BLOCKED_OWNER`: both reviewer roles are unassigned. |
| D-020 | Protocol maintainer (`@chefmrfrizzle`) | Data owner and qualified legal/privacy reviewer. | `BLOCKED_OWNER`: both decision authorities are unassigned. |
| D-021 | Protocol maintainer (`@chefmrfrizzle`) | Independent computational-crystallography reviewer. | `BLOCKED_OWNER`: reviewer not assigned; see ADR-0010 and `BENCHMARK_SELECTION.md`. |
| D-022 | Protocol maintainer (`@chefmrfrizzle`) | Reproduction reviewer under the future D-019 policy. | `BLOCKED_EVIDENCE`: reviewer/matrix not approved and no Linux-x86_64 run exists. |
| D-023 | Protocol maintainer (`@chefmrfrizzle`) | Independent interoperability/security reviewer. | `BLOCKED_OWNER` and `BLOCKED_EVIDENCE`: reviewer is unassigned and two-language golden-vector/compatibility evidence does not exist. |
| D-024 | Protocol maintainer (`@chefmrfrizzle`) | Independent security/identity reviewer and institutional IT reviewer. | `BLOCKED_OWNER`: both reviewer roles are unassigned; all concrete identity, status, and cryptographic mechanisms remain `BLOCKED_UNVERIFIED`. |

The protocol maintainer owns assignment and evidence collection but cannot substitute for a required independent authority.

## Solo-maintainer governance exception (Prompt 1 / Prompt 2 only)

`@11BUSD` approval can satisfy GitHub's separate-account enforcement for repository workflow gating, but it does **not** constitute independent-person assurance.

Allowed with this exception:
- Prompt 2 research and decision preparation only (no production implementation).

Not allowed with this exception:
- approving production signature suite and key lifecycle (D-017),
- approving scientific acceptance policy (D-018),
- approving reproduction independence policy (D-019),
- approving production retention/legal gates (D-020),
- authorizing confidential customer/production workload promotion.

## Required next ADR actions

1. Review ADR-0011 and ADR-0012 without selecting cryptographic suites or
   implementing schemas.
2. Assign the independent owners and produce evidence required by D-023 and
   D-017.
3. Review ADR-0013 and ADR-0014 without adopting security, scientific-
   acceptance, or reproduction-independence policy.
4. Draft the canonical event-log and projection-consistency ADR only after the
   event-identity model has independent review.
