# ADR-0008: Three Repository Trust Zones
Status: Accepted

Use:
1. public protocol repo;
2. private control-plane repo;
3. more restricted security/operations repo.

Production secrets and private keys are outside Git.

Public verification does not depend on private repositories.
