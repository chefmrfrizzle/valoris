# LearningEpisode 0005 — Canonicalization, Identity, and Independence Review

- **Trigger:** Prompt 2 PR #3 was approved by `@11BUSD` on exact head
  `f657bd11a713999fb0e667a14284f9810c620bba`, had no review conversations,
  passed the required repository-baseline check, remained public, and merged
  without administrator bypass as main commit
  `d379b76e29c453ad514141a28029e821be89c16e`.
- **Inputs:** Current primary RFC, NIST, W3C, JSON Schema, CloudEvents,
  National Academies, and ACM specifications and policies recorded in
  `PROMPT_3_SPECIFICATION_REVIEW.md`; existing Phase 0 invariants and blocked
  decisions.
- **Observation:** A canonicalizer is unsafe without a strict input boundary.
  Verified RFC 8785 erratum 7920 identifies negative zero as an ambiguity because
  `-0` canonicalizes as `0`. Duplicate members, invalid Unicode, and lossy
  numbers create additional parser-differential risks.
- **Observation:** Current RFC 9864 guidance favors fully specified algorithm
  identifiers over generic identifiers interpreted from key context. Algorithm
  labels alone do not supply safe agility, key lifecycle, or downgrade policy.
- **Observation:** Event occurrence identity, payload content identity, actor,
  subject, key, and authorization are different concepts. Delegation must remain
  visible, and standards do not make revocation propagation automatic.
- **Observation:** External authorities use related but non-identical meanings
  for reproduction and replication. Scientific claims therefore need
  dimensional evidence, not a binary label.
- **Failure evidence preserved:** Negative zero collapsing to zero; duplicate
  names interpreted differently; unsafe integers rounded before hashing;
  algorithm confusion or downgrade; content hash treated as authority; retries
  double-counted as new events; delegation escalation; revocation rewriting
  history; and same-controller accounts or machines presented as independent.
- **Decision:** Draft ADR-0011 through ADR-0014 and add D-023/D-024. Keep every
  concrete cryptographic choice `BLOCKED_UNVERIFIED`, keep D-019 blocked, and
  make no schema or implementation change.
- **Rejected shortcuts:** Selecting a familiar signature suite without a threat
  model; inferring an algorithm from key or digest length; treating UUID time as
  causal truth; assuming authentication grants authorization; or treating
  repository account separation as scientific independence.
- **Validation required next:** Independent owners, strict-parser and
  cross-language golden vectors, a compatibility matrix, cryptographic threat
  model and lifecycle review, delegation/revocation test matrices, and
  benchmark-specific independent reproduction evidence.
- **Promotion decision:** Prompt 3 documentation may be reviewed in a draft PR.
  No security, scientific-acceptance, or independence policy is accepted or
  eligible to merge under the solo-maintainer exception.
