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

The source is a security boundary, not a producer-chosen free-form collision
escape. A future policy must authorize stable source namespaces, canonicalize
their identifiers, bind a producer to its permitted source, and reject source
rebinding. Otherwise, the same producer could evade deduplication by changing
`event_source`, or another producer could impersonate a trusted namespace.

- A retransmission that the producer declares to be the same occurrence retains
  the same event identity and is deduplicated. Payload equality alone does not
  prove that two deliveries represent the same occurrence.
- A new attempt, observation, decision, correction, or transformation receives
  a new event identity and references its cause or predecessor.
- A correction never overwrites the earlier event. It appends a superseding or
  corrective event and preserves both.
- Event identifiers are opaque. Timestamp ordering, if encoded, is not trusted
  as causal or authorization evidence.

Source and event identifiers must not contain secrets or unnecessary personal,
tenant, host, network, or laboratory information. Time-ordered identifiers can
leak creation time and activity volume; that privacy tradeoff is part of the
blocked identifier decision.

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

"Subset" requires a formal, canonical comparison for action, resource, audience,
purpose, time, and delegation depth. Wildcards, exclusions, case differences,
Unicode aliases, URI normalization, and incomparable constraint languages are
common escalation paths. A verifier that cannot prove every child dimension is
no broader than its parent fails closed. The absence of an explicit
further-delegation grant means redelegation is forbidden.

Authentication is never sufficient authorization. Verification must establish
the key's allowed purpose, actor/controller relationship, complete delegation
chain, audience, scope, time, resource, replay status, and revocation state.

Authorization is bound to the exact event, operation, policy version, delegation
chain, and evaluated status evidence. If authorization and execution are
separated, the policy must define whether status is rechecked at execution and
how a stale authorization decision expires; otherwise revocation races create a
time-of-check/time-of-use bypass.

### Revocation and historical trust

Revocation is an append-only event targeting an exact key, delegation, or
capability identifier. It records issuer, authority, effective time or interval,
reason class, and predecessor where applicable. A revocation may cascade only
when the governing policy says exactly which descendants become invalid.

The revocation issuer must prove authority over the target and revocation
purpose. The event separately records issuance time, claimed effective time,
observation/recording time, and the time authority or evidence used for each.
Backdated, future-dated, or late-observed revocations are not silently trusted;
policy must state how they affect decisions made before the revocation was
observable.

Verification reports at least two separate conclusions:

1. **cryptographic validity:** whether the evidence verifies under the declared
   suite and key material; and
2. **authorization/trust status:** whether the key, delegation, purpose, and
   policy were acceptable at the relevant event or execution time, including
   any later compromise determination.

A later revocation does not silently mutate an old event. A compromise policy
may declare a key untrusted for an explicit earlier interval, but that is a new,
auditable policy conclusion linked to the preserved cryptographic evidence.

Historical reports must identify the query perspective: trust as known at the
original decision time, trust as known at a later audit time, and current trust
can differ. `occurred_at`, signer creation time, recording time, revocation
effective time, and verifier observation time are not interchangeable, and no
one of them is trusted merely because it is signed.

High-risk operations fail closed when required status or delegation evidence is
unavailable. Exact caching, offline operation, freshness, availability, privacy,
and recovery behavior remain blocked.

Actor and delegation chains can expose employment, collaboration, funding, and
institutional relationships. The future model must minimize public identifiers,
separate public proof from restricted audit evidence, define retention and
access, and prevent status lookups from becoming a correlation channel. No
selective-disclosure or status mechanism is selected here.

## `BLOCKED_UNVERIFIED` choices

No choice is made for identity provider, actor identifier, key/controller
document, credential/token format, event-ID format, delegation wire format,
status list or introspection service, hardware authenticator, recovery process,
or cryptographic suite.

## Required evidence before acceptance

1. Tests cover retry deduplication, source rebinding, concurrent creation,
   corrections, transformations, clock rollback, ID collisions, timestamp and
   volume leakage, and identifier correlation.
2. Authorization matrices cover subject/actor separation, nested delegation,
   audience and purpose mismatch, expiry, parent narrowing, forbidden
   escalation, wildcard/normalization ambiguity, incomparable constraints,
   redelegation, replay, and incomplete chains.
3. Revocation tests cover prospective revocation, compromise intervals,
   cascading policy, stale/unavailable status, backdating, future dating,
   time-of-check/time-of-use races, recovery, and historical replay from each
   declared query perspective.
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
