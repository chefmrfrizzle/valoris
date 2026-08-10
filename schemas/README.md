# Schemas

Planned canonical objects:
- ProblemPassport
- WorkRequest
- WorkGraph
- TaskSpec
- CapabilityManifest
- ExecutionReceipt
- VerificationReceipt
- ReproductionAttempt
- Challenge
- Counterexample
- AcceptanceReceipt
- ContributionReceipt
- LearningEpisode
- ChangeProposal

Phase 0 defines canonical serialization and golden cross-language vectors before hash-dependent production behavior.

Prompt 3 produced proposal-only design records:

- `docs/adr/ADR-0011-canonical-json-and-version-compatibility.md`
- `docs/adr/ADR-0012-content-identifiers-and-signature-suite-agility.md`
- `docs/adr/ADR-0013-event-identity-delegation-and-revocation.md`
- `docs/adr/ADR-0014-reproduction-independence-profiles.md`

They do not authorize schema implementation. D-023 and D-024 are blocked, and
every cryptographic mechanism remains `BLOCKED_UNVERIFIED` under D-017.
