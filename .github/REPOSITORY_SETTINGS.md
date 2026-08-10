# GitHub Repository Settings — Public Protocol

Visibility: PUBLIC
Default branch: `main`

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

Actions:
- read-only token by default;
- write permission only for jobs that need it;
- prefer OIDC/workload identity for cloud access;
- do not expose privileged secrets to untrusted PR code;
- review/pin third-party Actions under dependency policy.

Releases:
- protect important tags;
- retain build provenance/attestations and SBOM metadata where supported.
