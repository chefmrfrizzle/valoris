# ADR-0011 — Canonical JSON and Version Compatibility

- **Status:** Proposed; acceptance blocked by D-006 and D-023
- **Date:** 2026-08-10
- **Decision owner:** Protocol maintainer (`@chefmrfrizzle`)
- **Required reviewer:** Independent interoperability/security reviewer

## Context

Valoris needs stable bytes before it can safely define content identifiers or
signatures. Ordinary JSON is not stable enough: parsers can differ on duplicate
names, unsafe numbers, Unicode, and negative zero, and a schema's validator
dialect is not the same thing as a protocol release.

This proposal is based on [RFC 8785](https://www.rfc-editor.org/rfc/rfc8785.html),
its [verified errata](https://www.rfc-editor.org/errata/rfc8785),
[RFC 7493](https://www.rfc-editor.org/rfc/rfc7493.html),
[JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12/json-schema-core.html),
and [Semantic Versioning 2.0.0](https://semver.org/). RFC 8785 is informational,
so this ADR must identify the exact Valoris profile rather than imply standards
status it does not have.

## Proposed decision

### Strict input profile

A hash-critical Valoris JSON object would be eligible for canonicalization only
after a strict parser and the exact referenced schema establish all of the
following:

1. Input is UTF-8 JSON without a byte-order mark.
2. Object member names are unique. Duplicate-name rejection happens before a
   language runtime can overwrite or merge values.
3. Strings contain valid interoperable Unicode and are preserved as parsed;
   canonicalization performs no Unicode normalization.
4. A strict decoder maps each JSON number token to binary64 using the exact
   conversion and rounding behavior required by the canonicalization profile.
   The source number token is retained through validation so implementations
   can test boundary and alias cases before discarding it.
5. Negative zero is rejected, implementing verified RFC 8785 erratum 7920.
6. Exact integers outside `[-9007199254740991, 9007199254740991]`, quantities
   whose meaning depends on their source spelling, and decimal quantities whose
   domain cannot tolerate binary64 rounding use schema-defined strings, not
   JSON numbers.
7. The object conforms to an immutable, explicitly identified schema resource.
8. Unknown fields fail unless the schema defines an explicit extension point.
   Hash-critical processors do not silently drop or reinterpret extensions.

Canonical output would use the RFC 8785 transformation: ECMAScript-compatible
primitive serialization, recursive object-property sorting by UTF-16 code
units, array order preserved, no insignificant whitespace, and UTF-8 encoding.

Canonicalization commits to the parsed numeric value, not to the original JSON
number spelling. Equivalent spellings such as `1`, `1.0`, and `1e0` are therefore
expected to converge. The protocol cannot determine a sender's "intended"
value after parsing. Any domain that needs lexical fidelity, decimal arithmetic,
units-preserving quantities, or exact values outside the safe integer range must
use a schema-defined string form. Golden vectors must expose rounding aliases
on both sides of every admitted boundary.

The exact canonicalization-profile identifier is not selected by this ADR. It
must be carried in, or unambiguously bound by, any content-identifier or
signature context so the same bytes cannot be reinterpreted under another
profile.

### Version dimensions

Four values have different jobs and must not be conflated:

- `$schema` identifies the JSON Schema dialect used by a schema document;
- `$id` gives an immutable identity to a schema resource;
- `protocol_version` identifies the Valoris protocol interpretation;
- `schema_version` identifies the canonical object's schema release.

Those field names are conceptual until schemas are designed. No consumer may
resolve a floating `latest` schema when verifying historical evidence.

Valoris would apply Semantic Versioning to a documented public compatibility
surface with stricter hash-history rules:

- **Major:** any incompatible interpretation, required-field, canonical-byte,
  commitment-scope, or verification change.
- **Minor:** an explicitly backward-compatible capability added at a declared
  extension point. Existing canonical objects retain their original bytes and
  meaning, but an older verifier does not infer that it can accept a newer minor
  object.
- **Patch:** editorial clarification or correction that does not change the set
  of accepted instances, canonical bytes, field meaning, or verification
  result. A behavioral fix requires a new schema resource and non-patch release.

Every producer declares an exact emitted version. Every verifier declares the
exact versions it accepts. Compatibility is an explicit matrix, not lexical
version comparison or best-effort parsing. Unknown major versions, unknown
critical extensions, missing historical schemas, and ambiguous downgrades fail
closed.

Semantic Versioning labels are release metadata, not proof of wire
compatibility. The compatibility matrix is authoritative for each producer,
consumer, object type, extension point, and verification operation. A newer
minor release can be backward-compatible for producers while still requiring an
older security verifier to reject objects containing semantics it cannot
evaluate.

### Historical interpretation

Released schema resources and canonicalization profiles are immutable. A new
release may deprecate an old profile for new issuance while retaining a bounded,
auditable verifier capable of interpreting historical objects under their
original rules. Migration creates a new object and an explicit relationship to
its predecessor; it never changes the predecessor's bytes or identity.

Historical interpretability is not current acceptability. A verifier must
report separately that an old object parses and verifies under its original
profile and whether current policy still trusts that profile for the requested
operation. Deprecated code paths must be isolated and unavailable for new
issuance.

## Required evidence before acceptance

1. Golden vectors cover nested sorting, array preservation, escaping, UTF-8,
   UTF-16 ordering, duplicate names, invalid Unicode, negative zero, equivalent
   number spellings, binary64 rounding aliases, numeric boundaries, unsafe
   integers, and schema/version mismatches.
2. At least two independently maintained language implementations produce the
   same bytes or the same rejection for every vector.
3. A compatibility matrix demonstrates major, minor, patch, extension,
   downgrade, and historical-resolution behavior.
4. An independent reviewer approves the parser boundary, numeric domain,
   canonicalization profile, and denial-of-service limits.
5. ADR-0012 supplies non-ambiguous domain separation and commitment scope before
   any content identifier or signature is implemented.

## Consequences

- Hash-critical input becomes deliberately narrower than ordinary JSON.
- Some convenient native numeric values must be represented by typed strings.
- Implementations need a strict pre-parser rather than trusting default JSON
  decoding behavior.
- Historical verification requires an immutable schema/profile archive.
- Additive evolution is possible only through designed extension points.

## Alternatives not selected

- **Raw producer bytes:** preserves formatting accidents and does not give
  semantic interoperability.
- **Default language JSON serializer:** property order, number rendering, and
  invalid-input handling differ across runtimes.
- **Floating schema URLs:** make historical meaning depend on mutable state.
- **Normalize Unicode before hashing:** changes author-provided code points and
  can make distinct inputs collapse unexpectedly.
- **CBOR as an immediate replacement:** may be evaluated later, but would not
  remove the need to specify numeric, version, and commitment semantics.

## Non-goals

This ADR does not define JSON schemas, choose hash or signature algorithms,
define identifier wire syntax, implement canonicalization, or approve any
security or scientific policy.
