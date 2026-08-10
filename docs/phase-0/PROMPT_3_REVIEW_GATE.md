# Prompt 3 Independent-Review Gate

- **Gate status:** `BLOCKED_OWNER`; no independent approval exists
- **Audit date:** 2026-08-10
- **PR:** [#4](https://github.com/chefmrfrizzle/valoris/pull/4)
- **Audited head:** `47439b5d311eb30ac5db59be05f8b6696f093620`
- **Audit role:** Maintainer-side preparation by Codex; not independent review
- **Implementation authority:** None

## Exact-head evidence before corrections

The GitHub connector and authenticated CLI agreed that, at the start of this
gate:

- `chefmrfrizzle/valoris` had `visibility: public`;
- PR #4 was open and draft on exact head
  `47439b5d311eb30ac5db59be05f8b6696f093620`;
- the `Repository baseline` check had completed successfully;
- `reviewDecision` was `REVIEW_REQUIRED`;
- no reviewer was requested and no review had been submitted; and
- the thread-aware GraphQL read returned zero conversation comments and zero
  review threads.

The audit below therefore targets the requested exact head, but it cannot pass
the independent-review gate. Documentation corrections create a new head that
must receive fresh, exact-head review from every required independent seat.

## Primary-source claim audit

| Source cited by Prompt 3 | Verification result | Qualification or correction |
|---|---|---|
| [RFC 8785](https://www.rfc-editor.org/rfc/rfc8785.html) | Confirmed: I-JSON input, ECMAScript number serialization, recursive UTF-16 property ordering, preserved array order, and UTF-8 output. | It is Informational, not Standards Track. The ADR already discloses that status. |
| [Verified erratum 7920](https://www.rfc-editor.org/errata/eid7920) | Confirmed: `-0` serializes as `0`; a parser should error and stop. | Rejecting negative zero is a justified proposed narrowing. |
| [RFC 7493](https://www.rfc-editor.org/rfc/rfc7493.html) | Confirmed: UTF-8, no surrogate/noncharacter strings, unique decoded member names, and binary64 interoperability limits. | It recommends a general must-ignore evolution pattern, while ADR-0011 intentionally proposes stricter fail-closed behavior for hash-critical objects. The divergence is explicit and needs reviewer approval. |
| [JSON Schema Draft 2020-12 Core](https://json-schema.org/draft/2020-12/json-schema-core.html) | Confirmed: `$schema` identifies the dialect/meta-schema and `$id` identifies a schema resource by canonical URI. | The published core page is an informational Internet-Draft snapshot; it must not be described as an IETF RFC. |
| [Semantic Versioning 2.0.0](https://semver.org/) | Confirmed: major/minor/patch meanings depend on a defined public API and released contents are immutable. | Corrected ADR-0011: SemVer labels are not wire-compatibility proof and an older verifier does not infer acceptance of a newer minor version. |
| [RFC 7696 / BCP 201](https://www.rfc-editor.org/rfc/rfc7696.html) | Confirmed: protocols using cryptography need a mechanism to identify suites, identifiers alone are insufficient, selection must resist downgrade, registries retain/deprecate entries, and mandatory sets should stay small. | Corrected ADR-0012 to bind policy/suite selection and stripping-resistant transition rules. |
| [RFC 9864](https://www.rfc-editor.org/rfc/rfc9864.html) | Confirmed: it deprecates polymorphic JOSE/COSE registrations, creates fully specified identifiers, and requires single-algorithm key use unless multi-use is proven secure. | Scope is JOSE/COSE algorithms. Valoris uses the principle as design evidence and does not claim RFC 9864 standardizes a Valoris suite or digest identifier. |
| [RFC 6920](https://www.rfc-editor.org/rfc/rfc6920.html) | Confirmed: named-information identifiers include hash-algorithm context and do not prove authority or confidentiality. | It is architectural precedent, not adoption of its URI/wire format. |
| [RFC 9421](https://www.rfc-editor.org/rfc/rfc9421.html) | Confirmed with qualification: signature parameters are covered by the signature base; algorithms may be resolved from several sources; disagreement must fail; runtime `alg` signaling is specifically cautioned. | Corrected the research summary so it does not imply `alg` is always present or always the preferred signal. |
| [NIST SP 800-57 Part 1 Rev. 5](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final) | Confirmed current final general key-management guidance as of the audit date. | It supplies review criteria, not a suite choice. |
| [NIST SP 800-131A Rev. 2](https://csrc.nist.gov/pubs/sp/800/131/a/r2/final) and [Rev. 3 initial public draft](https://csrc.nist.gov/pubs/sp/800/131/a/r3/ipd) | Confirmed: Rev. 2 remains the final publication; Rev. 3 remains an initial public draft with the comment period closed. | Rev. 3 is only a watch item. Every concrete choice remains `BLOCKED_UNVERIFIED`. |
| [CloudEvents 1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md) | Confirmed: `source` plus `id` is unique for each distinct event; a resent duplicate may reuse the ID. | Corrected ADR-0013 so retransmission identity is a producer declaration, not an inference from byte equality, and added source-rebinding controls. |
| [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562.html) | Confirmed: UUIDv7 is time ordered and generators must handle entropy, batches, counters, monotonicity, and rollover. | UUIDv7 remains only a candidate; timestamp/activity leakage and source privacy were added to the blocked review. |
| [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html) | Confirmed: delegation keeps actor and principal distinct; token exchange does not create automatic lifecycle linkage and revocation propagation is optional policy. | OAuth/token exchange is vocabulary evidence only, not an adopted credential format. |
| [RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html) and [RFC 7662](https://www.rfc-editor.org/rfc/rfc7662.html) | Confirmed: revocation can invalidate related tokens under policy; active status combines issuance, expiry, revocation, and context validity. | Corrected ADR-0013 to distinguish issuance, effective, observed, and audit times and to require revocation authority. |
| [RFC 9700 / BCP 240](https://www.rfc-editor.org/rfc/rfc9700.html) | Confirmed: sender constraint, audience restriction, resource validation, and replay resistance reduce token misuse. | Used as security guidance only; OAuth is not selected. |
| [W3C Controlled Identifiers 1.0](https://www.w3.org/TR/controller-document/) | Confirmed current W3C Recommendation: verification methods have purpose relationships, and controller assertions are not automatically true. | Corrected ADR-0013 to require policy authorization beyond key possession and to treat source/controller assertions as claims requiring validation. |
| [National Academies 2019](https://nap.nationalacademies.org/catalog/25303/reproducibility-and-replicability-in-science) | Confirmed: computational reproducibility uses the same input data, computational steps, methods, code, and conditions; replicability uses new studies/data addressing the same question. | Valoris profiles must declare local vocabulary and cannot collapse computational reproduction into scientific acceptance. |
| [ACM Artifact Review and Badging v1.1](https://www.acm.org/publications/policies/artifact-review-and-badging-current) | Confirmed: Results Reproduced can use author artifacts; Results Replicated does not use author-supplied artifacts; both require a person/team other than the authors. | Corrected ADR-0014: an external operator or independent implementation does not establish organizational, funding, or full independence. |

## Findings resolved in the proposal text

1. **P1 — Untestable numeric intent:** Replaced “intended value” with a
   specified token-to-binary64 boundary, explicit lexical-fidelity limitations,
   and required rounding-alias vectors.
2. **P1 — Overstated independence:** Removed the proposal that I2 could support
   the unqualified phrase “independently reproduced.” Renamed it
   external-operator reproduction and preserved organization/funding/control as
   separate evidence.
3. **P1 — Revocation-time ambiguity:** Separated issuance, effective,
   observation, decision, execution, and audit perspectives; added authority,
   backdating, and time-of-check/time-of-use requirements.
4. **P1 — Source-rebinding and delegation escalation:** Added governed source
   namespaces and fail-closed subset comparison across wildcard, exclusion,
   case, Unicode, URI, time, purpose, and audience dimensions.
5. **P1 — Downgrade and stripping:** Added fixed digest-profile lengths,
   duplicate/ambiguous envelope rejection, exact signature-set policy,
   external policy binding, and stripping-resistant dual-suite transitions.
6. **P2 — Version overclaim:** Clarified that SemVer is release metadata and the
   explicit compatibility matrix controls security-verifier acceptance.
7. **P2 — Privacy gaps:** Added identifier timestamp/activity leakage,
   actor/delegation correlation, conflict-evidence minimization, restricted
   audit access, retention, and appeal requirements.
8. **P2 — RFC 9421 overgeneralization:** Clarified that `alg` may be resolved in
   several ways and runtime signaling is a documented confusion risk.

These corrections make the proposals safer to review; they do not accept any
decision or satisfy any independent-review requirement.

## Required independent reviewer seats

All seats are unfilled. They must be held by separate qualified people outside
the maintainer's control, with conflicts disclosed. One person cannot approve
multiple seats for this gate.

| Seat | Minimum qualification | Decisions/ADRs | Required review evidence |
|---|---|---|---|
| R1 — Interoperability/security | Demonstrated cross-language JSON/parser/canonicalization and protocol-versioning experience, including security-bound serialization. | ADR-0011; D-023 | Exact-head approval; source audit; numeric/parser vectors and compatibility-matrix review. |
| R2 — Cryptography | Professional protocol-cryptography, algorithm-agility, signature, and key-lifecycle expertise independent of the author. | ADR-0012; D-007/D-017 | Exact-head approval; threat model; construction and transition review. No algorithm selection is authorized by this PR. |
| R3 — Identity/institutional IT | Identity, authorization/delegation, revocation/status, privacy, and institutional integration experience. If no one person covers both identity security and institutional operations, split this seat into two reviewers. | ADR-0013; D-024 | Exact-head approval; delegation matrix; time/revocation, availability, privacy, and operational review. |
| R4 — Computational-materials methodology | Independent computational crystallographer/materials scientist able to assess the proposed `spglib` workload and scientific-claim boundary. | ADR-0014; D-018/D-019/D-021/D-022 | Exact-head approval of terminology only, plus later benchmark evidence. This PR cannot approve scientific acceptance. |

`@11BUSD` is the same disclosed human operator as the repository owner. That
account may provide GitHub account separation only where ADR-0009 permits it;
it is not eligible for R1–R4 and supplies no independent-person evidence.

## Unresolved decisions

- **D-023:** no reviewer, strict-parser implementation, two-language golden
  vectors, immutable schema archive, or compatibility matrix.
- **D-007/D-017:** no threat model, suite/hash/encoding selection, key lifecycle,
  transition policy, test vectors, or cryptography reviewer. All choices remain
  `BLOCKED_UNVERIFIED`.
- **D-024:** no accepted event source/ID, identity provider, delegation/status
  representation, time authority, offline/freshness policy, privacy mechanism,
  or identity/institutional reviewer.
- **D-019:** independence labels remain proposed; no accepted common-control,
  funding, conflict, privacy, or product-language rule and no domain reviewer.
- **D-018/D-021/D-022:** benchmark adoption, scientific acceptance, frozen
  environment, Linux-x86_64 evidence, and second-machine classification remain
  blocked.

## Safe prerequisites for Prompt 4

Prompt 4 must not begin schema or cryptographic implementation. The safe next
gate is:

1. publish the corrected documentation-only head and obtain a green baseline;
2. assign R1–R4 to named, distinct, qualified people with conflict disclosures;
3. obtain reviews anchored to that exact final head and resolve every thread;
4. keep PR #4 draft and do not merge policy merely because documentation review
   is green;
5. have R1 approve a non-executable golden-vector **plan** and compatibility-
   matrix **plan**;
6. have R2 approve a threat-model **plan** while every suite choice stays
   `BLOCKED_UNVERIFIED`;
7. have R3 approve delegation/revocation/time/privacy test matrices; and
8. have R4 approve only the benchmark terminology and domain-review plan, not
   scientific acceptance.

Only after those prerequisites may a later prompt propose a tightly scoped,
non-production conformance-fixture phase. Production schemas, signing, auth,
workers, payments, and infrastructure remain out of scope.
