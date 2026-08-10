# GitHub Repository Settings — Public Protocol

Visibility: PUBLIC
Default branch: `main`

## Verified bootstrap state — 2026-08-10

- `main` requires the `Repository baseline` status check;
- pull request and one approval required;
- CODEOWNER review required;
- stale approvals dismissed;
- conversations must be resolved;
- linear history required;
- force pushes and branch deletion disabled;
- secret scanning and push protection enabled;
- dependency alerts and automated security fixes enabled;
- private vulnerability reporting enabled;
- Actions limited to GitHub-owned actions pinned to full commit SHAs;
- default workflow token is read-only and cannot approve pull requests.

The repository owner retains emergency/bootstrap bypass while the project has a single maintainer. Remove that bypass once a second trusted maintainer and recovery path exist.

Recommended main ruleset:
- pull request required;
- required status checks;
- code-owner review on protected paths;
- no force push;
- no branch deletion;
- conversation resolution;
- small emergency bypass group.

Security features to enable where available:
- private vulnerability reporting;
- secret scanning;
- push protection;
- code scanning / CodeQL;
- dependency alerts/updates.

CodeQL is deferred until supported source code exists and its language/build can be configured without a misleading empty scan.

Actions:
- read-only token by default;
- write permission only for jobs that need it;
- prefer OIDC/workload identity for cloud access;
- do not expose privileged secrets to untrusted PR code;
- review/pin third-party Actions under dependency policy.

Releases:
- protect important tags;
- retain build provenance/attestations and SBOM metadata where supported.
