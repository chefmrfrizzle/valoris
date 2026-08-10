# LearningEpisode 0002 — Prompt 1 Readiness Review

- **Trigger:** Read-only review found that the declared architecture review was absent and the required repository check could report a false green.
- **Inputs:** Public and private pull-request diffs, repository workflows, baseline scripts, Phase 0 decision package, and live GitHub review state.
- **Baseline:** Both required checks passed, but they inspected only `HEAD`; forbidden credential checks matched only repository-root paths; signed-receipt sequencing was ambiguous; no eligible independent reviewer was assigned.
- **Failure evidence:** `ARCHITECTURE_REVIEW.md` was missing; a nested tracked credential basename was not rejected; the workflow did not provide base/head revisions; the local-slice architecture conflicted with the unsigned Prompt 5 gate.
- **Change:** Add the missing review and ownership table, clarify receipt sequencing, compare the full base/head diff, scan tracked basenames at every depth, and add executable regressions for the two false-green cases.
- **Validation:** Shell syntax, regression tests, repository baseline, full branch diff whitespace check, and GitHub Actions are required before promotion.
- **Unresolved dependency:** Independent approval remains `BLOCKED_OWNER` until a trusted reviewer other than the author receives least-privilege access and approves the public pull request.
- **Promotion decision:** Do not enter Prompt 2 and do not merge through the owner bypass until all required checks pass and independent approval is recorded.
