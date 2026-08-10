# Prompt 3 Specification Review

- **Status:** Research complete; proposals remain unaccepted
- **Date:** 2026-08-10
- **Scope:** Canonical JSON, compatibility, identifiers, signature agility,
  event identity, delegation, revocation, and reproduction independence
- **Implementation authority:** None

## Boundary

This review prepares ADRs. It does not select a production hash or signature
suite, define schemas, implement a signing envelope, approve an identity
provider, or adopt scientific-acceptance or reproduction-independence policy.
All cryptographic choices remain `BLOCKED_UNVERIFIED` under D-017.

The statements below are deliberately separated into sourced facts, protocol
proposals, and unresolved decisions. A proposal is not an accepted protocol
rule until its ADR, compatibility evidence, and required independent reviews
are complete.

## Primary-source findings

### Canonical JSON and versioning

| Sourced fact | Protocol implication, not yet accepted |
|---|---|
| [RFC 8785](https://www.rfc-editor.org/rfc/rfc8785.html) builds JSON Canonicalization Scheme (JCS) on I-JSON, ECMAScript number serialization, recursive UTF-16 property ordering, preserved array order, and UTF-8 output. | A hash-critical JSON profile can be narrow and testable, but calling output "canonical" is unsafe until all input restrictions are enforced before hashing. |
| [RFC 8785 verified errata](https://www.rfc-editor.org/errata/rfc8785) clarify that negative zero is valid JSON but serializes as `0`, and recommend rejecting `-0` to prevent ambiguity. | The proposed profile rejects negative zero rather than allowing two parsed inputs to collapse to one canonical value. |
| [RFC 7493](https://www.rfc-editor.org/rfc/rfc7493.html) requires UTF-8, unique object names, interoperable Unicode, and a restricted numeric domain; it recommends strings for exact integers outside the binary64 interoperable range. | Duplicate names, invalid Unicode, non-finite numbers, lossy numbers, and unsafe integers must fail before canonicalization. Larger exact integers or decimals require schema-defined string representations. |
| [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12/json-schema-core.html) uses `$schema` to identify a dialect and `$id` to identify a schema resource. | Validator dialect, immutable schema-resource identity, protocol version, and instance schema version must be distinct concepts. |
| [Semantic Versioning 2.0.0](https://semver.org/) defines major, minor, and patch changes relative to a declared public API and says released versions must not be modified. | Valoris must first define the compatibility surface. Hash or interpretation changes cannot be smuggled into a patch release. |

### Identifiers and cryptographic agility

| Sourced fact | Protocol implication, not yet accepted |
|---|---|
| [RFC 7696 / BCP 201](https://www.rfc-editor.org/rfc/rfc7696.html) requires explicit algorithm or suite identifiers for agility, cautions that identifiers alone are insufficient, and recommends small, changeable mandatory-to-implement sets. | Every digest and signature must be interpreted through an allowlisted, versioned profile; an algorithm label alone does not make a construction safe. |
| [RFC 9864](https://www.rfc-editor.org/rfc/rfc9864.html) deprecates polymorphic JOSE/COSE algorithm identifiers in favor of fully specified identifiers and recommends single-algorithm keys. | Signature-suite identifiers must bind all security-relevant parameters. Generic names that change meaning from key context are not acceptable. No concrete suite is selected here. |
| [RFC 6920](https://www.rfc-editor.org/rfc/rfc6920.html) includes the hash algorithm in a named-information identifier and warns that a content digest provides integrity, not authority or confidentiality. | Content identifiers need algorithm and profile context and must never be treated as signatures, permissions, or secrecy controls. |
| [RFC 9421](https://www.rfc-editor.org/rfc/rfc9421.html) covers verification-affecting signature metadata such as algorithm, creation, expiry, key identifier, nonce, and application tag. | Any comparable Valoris metadata must be integrity-protected and checked against an application allowlist. This is design guidance, not adoption of HTTP Message Signatures. |
| [NIST SP 800-57 Part 1 Rev. 5](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final) covers key lifecycle and compromise handling. [SP 800-131A Rev. 2](https://csrc.nist.gov/pubs/sp/800/131/a/r2/final) remains the current final transition guidance; [Rev. 3](https://csrc.nist.gov/pubs/sp/800/131/a/r3/ipd) is an initial public draft. | Algorithm selection cannot precede a key lifecycle, transition plan, threat model, and current standards review. Draft guidance is tracked but not represented as final. |

### Event identity, delegation, and revocation

| Sourced fact | Protocol implication, not yet accepted |
|---|---|
| [CloudEvents 1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md) defines an event by the combination of `source` and `id`; a retransmission may reuse that identity. | Event occurrence identity must be separate from payload content identity. A retry is not automatically a new scientific occurrence. |
| [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562.html) standardizes UUIDs, including time-ordered UUIDv7, while requiring generators to address randomness, counters, clocks, and rollback. | UUIDv7 is only a candidate. Event-ID syntax remains blocked until collision, privacy, concurrency, and clock-rollback behavior is tested. |
| [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html) distinguishes delegation from impersonation, represents current and prior actors, and notes that revocation propagation is not automatic. | Subject authority and executing actor must be recorded separately; every delegation hop needs explicit scope and revocation semantics. OAuth/JWT is not selected as the wire format. |
| [RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html) defines revocation and possible cascading invalidation; [RFC 7662](https://www.rfc-editor.org/rfc/rfc7662.html) defines an active-state query; [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html) recommends audience restriction, least privilege, replay protection, and sender-constrained credentials. | Revocation is an explicit state transition, status availability is security-relevant, and authorization must be bounded to audience, purpose, resources, and time. |
| [W3C Controlled Identifiers 1.0](https://www.w3.org/TR/controller-document/) separates verification methods from purpose-specific verification relationships. | Possessing a key is not sufficient authority for every event type; key purpose and controller authorization must both be evaluated. |

### Reproduction independence

| Sourced fact | Protocol implication, not yet accepted |
|---|---|
| The [National Academies report](https://nap.nationalacademies.org/catalog/25303/reproducibility-and-replicability-in-science) defines computational reproducibility around the same data, methods, code, and conditions, while replicability addresses a new study aimed at the same question. | Valoris must state its local vocabulary and independently record changes in operator, organization, implementation, environment, hardware, and data. |
| The [ACM artifact-review policy](https://www.acm.org/publications/policies/artifact-review-and-badging-current) distinguishes results reproduced by another team using author artifacts from results replicated using independently developed artifacts. | A single word cannot carry every independence claim. The evidence must identify who reproduced what, using whose implementation and data. |

## Proposed decision map

| Topic | Proposed ADR | Current disposition | Acceptance evidence |
|---|---|---|---|
| Canonical JSON constraints | ADR-0011 | `PROPOSED`; D-006 and D-023 remain open | Strict-parser tests and identical golden bytes in at least two independent language implementations, including verified errata cases. |
| Version compatibility | ADR-0011 | `BLOCKED` under D-023 | Explicit compatibility matrix, historical resolver, downgrade tests, and protocol/security review. |
| Algorithm-prefixed identifiers | ADR-0012 | `BLOCKED_UNVERIFIED` under D-007 | Threat model, domain-separated preimage vectors, collision analysis, parsing tests, and cross-language evidence. |
| Signature-suite agility | ADR-0012 | `BLOCKED_UNVERIFIED` under D-017 | Independent cryptography review, key lifecycle, fully specified suites, transition vectors, and implementation evidence. |
| Event identity | ADR-0013 | `BLOCKED` under D-024 | Collision/privacy/retry/correction tests and projection-rebuild evidence. |
| Delegation and revocation | ADR-0013 | `BLOCKED_UNVERIFIED` under D-024 and D-017 | Independent security/identity review, explicit actor-chain tests, compromise-time tests, and status-availability policy. |
| Reproduction independence | ADR-0014 | `BLOCKED_OWNER` under D-019 | Independent security, institutional IT, and domain review; benchmark-specific second-machine evidence. |

## Cross-cutting failure cases to preserve

1. `-0` and `0` collapsing to identical bytes without rejection.
2. Duplicate JSON member names interpreted differently by two parsers.
3. An unsafe integer rounded before hashing.
4. A producer relabeling canonical bytes under another schema or
   canonicalization profile.
5. A generic signature algorithm interpreted differently from key context.
6. Algorithm downgrade or an unknown suite accepted by fallback behavior.
7. A content digest accepted as proof that an authorized actor produced it.
8. A retry counted as a distinct event or a correction overwriting history.
9. A delegate obtaining wider authority than its parent.
10. Revocation silently rewriting the historical record rather than expressing
    signing-time validity and current trust separately.
11. A second account, process, or machine under the same control presented as an
    independent reproducer.

## Unresolved decisions and owners

- **D-023 — Canonicalization and version compatibility:** protocol maintainer;
  requires an independent interoperability/security reviewer and two-language
  golden-vector evidence.
- **D-007 / D-017 — Content identifiers and signatures:** protocol maintainer;
  requires an independent cryptography reviewer. Exact algorithms, encodings,
  key formats, signature envelopes, and transition schedules are
  `BLOCKED_UNVERIFIED`.
- **D-024 — Event identity, delegation, and revocation:** protocol maintainer;
  requires an independent security/identity reviewer and an institutional IT
  reviewer.
- **D-019 — Reproduction independence:** protocol maintainer; requires the
  independent reviewers already named in the decision register plus a domain
  reviewer for the selected workload.

No solo-maintainer exception converts any of these into accepted policy.
