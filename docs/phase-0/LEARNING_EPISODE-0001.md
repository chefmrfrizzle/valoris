# LearningEpisode 0001 — Phase 0 and Repository Security Bootstrap

- **Trigger:** Founder requested secure repository controls and a stepwise build of the full system.
- **Inputs:** Public protocol specifications, private control-plane boundary, local restricted security policies, live GitHub settings, and desktop/mobile prototype captures.
- **Baseline:** No branch protection; placeholder CODEOWNERS; no CI; public secret scanning/push protection enabled; private branch protection unavailable on the current plan; static non-interactive prototype.
- **Change proposal:** Establish enforceable repository controls and produce the Phase 0 decision package before production code.
- **Evidence:** Repository-baseline workflows passed in public and private repositories; GitHub API state verified; prototype screenshots and DOM snapshots retained under `audit/`.
- **Failures observed:** GitHub API rejected string-encoded booleans; branch-protection request rejected organization-only dismissal restrictions; mobile prototype layout collapsed; demo metrics lacked provenance labels.
- **Corrective actions:** Reissued typed API requests and verified output; removed unsupported restriction field; recorded mobile/demo risks and acceptance tests.
- **Security findings:** Private branch protection is blocked by the current GitHub plan; public Actions were initially unrestricted; public vulnerability reporting was disabled.
- **Result:** Public `main` protected with required review/checks; Actions limited to SHA-pinned GitHub-owned actions; dependency alerts/fixes and public private-vulnerability reporting enabled; Phase 0 package proposed for review.
- **Promotion decision:** Documentation proposal only. No production implementation or scientific claim is promoted by this episode.
