# Public Security Architecture

## Trust zones

```text
PUBLIC PROTOCOL
  schemas / canonicalization / receipts / interfaces / conformance
                │
                ▼
PRIVATE CONTROL PLANE
  confidential research / commercial logic / proprietary adapters
                │
                ▼
RESTRICTED SECURITY & OPS
  deployment policy / incident response / private threat intelligence

ACTUAL SECRETS + PRIVATE KEYS
  stored outside Git
```

## Public security objectives

- public verification does not require closed source;
- historical protocol evidence cannot be silently rewritten;
- untrusted workloads are isolated;
- agents do not receive privileged authority from untrusted content;
- releases are reviewable and reproducible;
- public/private data leakage is treated as a security failure.

## Threat categories

- forged receipts;
- replay/double settlement;
- malicious or colluding workers;
- compromised verifier;
- malicious workload;
- resource exhaustion;
- canonicalization disagreement;
- dependency/supply-chain compromise;
- data-integrity failure;
- governance capture;
- prompt injection;
- public/private data leakage.

## Baseline

- least privilege;
- protected branches;
- canonical serialization tests;
- dependency pinning;
- no production secrets in Git;
- security review for privileged changes;
- release provenance/attestation where configured;
- meaningful incidents become regression tests or policy changes.
