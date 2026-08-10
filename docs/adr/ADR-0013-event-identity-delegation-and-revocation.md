# ADR-0013 — Event Identity, Delegation, and Revocation

- **Status:** Proposed; identity and cryptographic mechanisms are `BLOCKED_UNVERIFIED` under D-024 and D-017
- **Date:** 2026-08-10
- **Decision owner:** Protocol maintainer (`@chefmrfrizzle`)
- **Required reviewers:** Independent security/identity reviewer and institutional IT reviewer

## Context

An append-only protocol needs to distinguish an occurrence from its payload, an
executing actor from the authority on whose behalf it acts, and cryptographic
validity from authorization. It also needs revocation without rewriting old
evidence.

This proposal draws event-identity semantics from
[CloudEvents 1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md),
UUID constraints from [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562.html),
delegation concepts from [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html),
revocation/status concepts from [RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html)
and [RFC 7662](https://www.rfc-editor.org/rfc/rfc7662.html), and authorization
hardening from [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html). It does
not adopt OAuth, JWT, CloudEvents, UUIDv7, or a W3C credential format.

## Proposed decision

### Event identity

An event occurrence is uniquely identified within its source by the pair
`event_source` and `event_id`. These names are conceptual until schemas exist.
Event identity is independent of the event payload's content identifier.

- A byte-for-byte retransmission of the same occurrence retains the same event
  identity and is deduplicated.
- A new attempt, observation, decision, correction, or transformation receives
  a new event identity and references its cause or predecessor.
- A correction never overwrites the earlier event. It appends a superseding or
  corrective event and preserves both.
- Event identifiers are opaque. Timestamp ordering, if encoded, is not trusted
  as causal or authorization evidence.

An event would declare its source, identifier, type/version, data-schema
identity, subject, actor, content commitment, occurrence time, recording time,
and applicable causation/correlation/predecessor links. Exact fields and schema
are not decided here.

UUIDv7 is only a candidate. The identifier format remains blocked until
collision, privacy leakage, concurrency, monotonicity, and clock-rollback tests
are complete.

### Authority and delegation

The protocol would record separately:

- **subject/principal:** whose authority or resource is affected;
- **actor/delegate:** who or what executed the action;
- **issuer/delegator:** authority granting the delegation;
- **controller/key:** evidence used to authenticate the actor; and
- **policy decision:** why the authenticated actor was authorized for this
  action at this time.

Delegation and impersonation are distinct. An actor chain remains visible; a
system may not erase the delegate and represent the action as if the subject
performed it directly.

Every delegation hop would explicitly bind a delegator, delegate, permitted
capabilities/actions, resource constraints, audience, purpose, not-before and
expiry bounds, parent delegation, maximum depth, and further-delegation rule.
Child authority must be a subset of valid parent authority. No delegation is
implicit, transitive by default, perpetual by omission, or widened by an
unrecognized field.

Authentication is never sufficient authorization. Verification must establish
the key's allowed purpose, actor/controller relationship, complete delegation
chain, audience, scope, time, resource, replay status, and revocation state.

### Revocation and historical trust

Revocation is an append-only event targeting an exact key, delegation, or
capability identifier. It records issuer, authority, effective time or interval,
reason class, and predecessor where applicable. A revocation may cascade only
when the governing policy says exactly which descendants become invalid.

Verification reports at least two separate conclusions:

1. **cryptographic validity:** whether the evidence verifies under the declared
   suite and key material; and
2. **authorization/trust status:** whether the key, delegation, purpose, and
   policy were acceptable at the relevant event or execution time, including
   any later compromise determination.

A later revocation does not silently mutate an old event. A compromise policy
may declare a key untrusted for an explicit earlier interval, but that is a new,
auditable policy conclusion linked to the preserved cryptographic evidence.

High-risk operations fail closed when required status or delegation evidence is
unavailable. Exact caching, offline operation, freshness, availability, privacy,
and recovery behavior remain blocked.

## `BLOCKED_UNVERIFIED` choices

No choice is made for identity provider, actor identifier, key/controller
document, credential/token format, event-ID format, delegation wire format,
status list or introspection service, hardware authenticator, recovery process,
or cryptographic suite.

## Required evidence before acceptance

1. Tests cover retry deduplication, concurrent creation, corrections,
   transformations, clock rollback, ID collisions, and privacy leakage.
2. Authorization matrices cover subject/actor separation, nested delegation,
   audience and purpose mismatch, expiry, parent narrowing, forbidden
   escalation, replay, and incomplete chains.
3. Revocation tests cover prospective revocation, compromise intervals,
   cascading policy, stale/unavailable status, recovery, and historical replay.
4. Projection rebuilds reproduce the same state solely from append-only events.
5. Independent security/identity and institutional IT reviewers approve the
   model and operational failure behavior.

## Alternatives not selected

- **Content hash as event ID:** collapses distinct occurrences with identical
  payloads.
- **Account ID as actor, subject, and key:** hides delegation and prevents safe
  rotation.
- **Implicit role inheritance:** creates invisible privilege escalation.
- **Delete revoked records:** destroys auditability and historical explanation.
- **Assume token revocation cascades automatically:** external standards do not
  provide that guarantee without explicit policy.

## Non-goals

This ADR does not define schemas, adopt an identity stack, implement auth,
select cryptography, approve security policy, or authorize production events.
