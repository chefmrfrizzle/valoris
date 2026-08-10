# LearningEpisode 0006 — Prompt 3 Independent-Review Gate Preparation

- **Trigger:** Audit Prompt 3 PR #4 on exact head
  `47439b5d311eb30ac5db59be05f8b6696f093620` without implementing or accepting
  policy.
- **Gate evidence:** Repository public; baseline green; PR draft and
  `REVIEW_REQUIRED`; zero requested reviewers, submitted reviews, conversation
  comments, or review threads.
- **Inputs:** Every primary source cited by ADR-0011 through ADR-0014, current
  NIST publication status, CloudEvents release status, repository governance,
  and the thread-aware GitHub review read.
- **Observation:** The sources supported the overall proposal direction, but the
  text left material ambiguity in numeric conversion, minor-version acceptance,
  algorithm transition stripping, event source authority, delegation subset
  comparison, revocation time perspectives, status TOCTOU, identifier privacy,
  and unqualified independence language.
- **Failure evidence preserved:** Different numeric tokens aliasing after
  binary64 conversion; a newer minor accepted by inference; a truncated digest
  or stripped transition signature; source rebinding; wildcard/normalization
  delegation escalation; backdated revocation; stale authorization at execution;
  timestamp/relationship correlation; and an external operator presented as
  fully independent despite shared control or funding.
- **Decision:** Correct documentation only; add a source-by-source audit and four
  distinct independent-review seats; keep D-017, D-019, D-023, and D-024
  blocked; keep every cryptographic selection `BLOCKED_UNVERIFIED`.
- **Independence disclosure:** This audit was performed by Codex for the
  maintainer and is not R1–R4 independent approval. `@11BUSD` is controlled by
  the same human as the owner and is ineligible for those seats.
- **Validation required next:** Green checks on the corrected head, named and
  conflict-checked R1–R4 reviewers, exact-head reviews, resolved threads, and
  review of plans rather than implementation.
- **Promotion decision:** The review gate remains `BLOCKED_OWNER`. Do not merge
  security, cryptographic, scientific-acceptance, or independence policy and do
  not begin Prompt 4 implementation.
