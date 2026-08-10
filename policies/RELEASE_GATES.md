# Release Gates

A release is blocked if required gates fail.

Gate classes:
- schema/canonicalization conformance;
- unit/integration tests;
- regression/adversarial evals;
- security checks;
- dependency review;
- public/private leak checks;
- code-owner review;
- release provenance/attestation policy.

Agent confidence is not a release gate.
