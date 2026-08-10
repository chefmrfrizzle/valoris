# ADR-0012 — Content Identifiers and Signature-Suite Agility

- **Status:** Proposed; every cryptographic choice is `BLOCKED_UNVERIFIED` under D-007 and D-017
- **Date:** 2026-08-10
- **Decision owner:** Protocol maintainer (`@chefmrfrizzle`)
- **Required reviewer:** Independent cryptography reviewer

## Context

Valoris must avoid identifiers whose algorithm or canonicalization assumptions
are implicit, and signatures whose names omit security-relevant parameters.
Content identity, event identity, signer identity, and authorization are
different claims.

The proposal follows the agility principles in
[RFC 7696 / BCP 201](https://www.rfc-editor.org/rfc/rfc7696.html), the move to
fully specified algorithm identifiers in
[RFC 9864](https://www.rfc-editor.org/rfc/rfc9864.html), the named-information
model and limitations in [RFC 6920](https://www.rfc-editor.org/rfc/rfc6920.html),
and the protected-metadata pattern in
[RFC 9421](https://www.rfc-editor.org/rfc/rfc9421.html). It does not adopt any
one of those wire formats.

## Proposed decision

### Distinct identifier classes

The protocol would assign different types and namespaces to:

- **content identifier:** commitment to canonical object content;
- **event identifier:** identity of an occurrence in an event source;
- **key identifier:** lookup hint for a specific verification key;
- **actor/controller identifier:** identity used in authorization policy;
- **delegation identifier:** immutable reference to an authority grant.

Software must not compare, substitute, or infer authority across these classes.
A content identifier demonstrates only a digest relationship to declared bytes;
it is not proof of authorship, permission, freshness, or confidentiality.

### Self-describing content commitment

A content identifier's interpreted structure would bind, without ambiguous
concatenation:

1. a Valoris content-identifier profile and version;
2. an object domain/type and schema version;
3. a canonicalization profile;
4. a fully specified digest algorithm identifier;
5. digest length and encoding; and
6. the digest value.

The digest preimage would use explicit domain separation for the Valoris
protocol, object type, schema version, and canonicalization profile. The exact
framing, wire grammar, digest algorithm, digest length, and text/binary encoding
are all `BLOCKED_UNVERIFIED`. They must be frozen by golden vectors and reviewed
before an identifier is emitted.

Objects cannot contain their own content identifier inside the bytes used to
derive that identifier. References, signatures, and envelope fields require an
explicit commitment-scope table so there is no circular or accidental omission.

### Fully specified signature suites

A signature-suite identifier would identify every security-relevant choice,
including algorithm parameters and the signature-envelope profile. It may not
be a generic label whose concrete operation is inferred from key type. A key is
bound to its permitted suite, controller, purpose, and lifecycle state.

Verification-affecting metadata—including suite, key identifier, signer or
controller, content identifier, canonicalization profile, protocol context,
creation time, expiry when present, nonce when present, and purpose—must be
inside the protected commitment. The exact envelope remains
`BLOCKED_UNVERIFIED`.

Verifiers use an application policy allowlist. Unknown, ambiguous, deprecated
for the relevant time, or context-incompatible suites fail closed. There is no
opportunistic negotiation or fallback to a weaker algorithm.

### Transition and deprecation

Algorithm registry entries are immutable. A policy may stop new signing with a
suite while retaining historical verification long enough to interpret existing
evidence. A transition may require dual signatures or dual content commitments,
but the acceptance rule, cutover times, and downgrade protections must be
explicit. Two digests do not become the same identifier merely because a
migration relates them.

Emergency deprecation, key rotation, compromise handling, cryptoperiods,
retention, and verification after retirement belong to the key-lifecycle policy
required by D-017. [NIST SP 800-57 Part 1 Rev. 5](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final)
and the current final [SP 800-131A Rev. 2](https://csrc.nist.gov/pubs/sp/800/131/a/r2/final)
must be considered at decision time. The draft Rev. 3 is a watch item, not an
accepted basis.

## `BLOCKED_UNVERIFIED` choices

No choice is made for:

- digest algorithm, output length, multihash/CID use, identifier encoding, or
  wire grammar;
- signature algorithm, parameter set, key format, key identifier derivation,
  random-number requirements, or hardware-key policy;
- signature envelope, countersignature, timestamp authority, nonce strategy,
  transparency mechanism, or revocation-status format;
- mandatory-to-implement suite set, transition window, dual-signature rule, or
  historical-verification lifetime.

## Required evidence before acceptance

1. A threat model covers collision, second-preimage, algorithm confusion,
   downgrade, key substitution, parser differential, replay, and compromised
   key scenarios.
2. Cross-language vectors cover domain separation, every committed field,
   malformed prefixes, wrong lengths, unknown suites, and transition cases.
3. Independent cryptography review approves the exact constructions and key
   lifecycle.
4. At least two implementations verify the same positive and negative vectors.
5. Deprecation and emergency-rotation exercises preserve historical evidence
   without permitting new use of a retired suite.

## Alternatives not selected

- **Bare hex digest:** omits algorithm, profile, type, and encoding context.
- **Algorithm inferred from digest length:** ambiguous and unsafe for migration.
- **Generic algorithm names interpreted from the key:** creates algorithm
  confusion and prevents precise policy.
- **Single forever algorithm:** removes a safe migration path.
- **Runtime algorithm negotiation:** adds downgrade risk to deterministic
  verification.

## Non-goals

This ADR authorizes no cryptographic implementation, production key, signing
service, schema, worker, payment mechanism, or accepted security policy.
