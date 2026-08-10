# Security Policy

Report suspected vulnerabilities through the repository's private vulnerability-reporting/security-advisory mechanism.

Do not publish unpatched exploit details, credentials, customer data, private research data, or restricted security information in public issues.

## Baseline

- least privilege;
- protected `main`;
- required review for protected paths;
- secret scanning / push protection where available;
- code/dependency scanning;
- dependency pinning;
- isolated untrusted workloads;
- explicit classification;
- canonicalization tests;
- replay/duplicate-protection tests;
- release provenance;
- incident-to-regression-test discipline.

## Never commit

Passwords, API keys, private keys, seed phrases, cloud/database credentials, customer secrets, or confidential datasets.

See:
- `docs/SECURITY_ARCHITECTURE.md`
- `docs/PUBLIC_PRIVATE_BOUNDARY.md`
- `policies/RELEASE_GATES.md`
