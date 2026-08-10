# Counterparty Onboarding Architecture

## Goal

Make the safest path the shortest path. Every counterparty should reach one useful, low-risk outcome before being asked for production data, broad permissions, infrastructure changes, or a long compliance questionnaire.

## Shared onboarding spine

1. **Choose the intended outcome:** fund a problem, contribute a method, run compute, verify, reproduce, review, provide data, operate, or audit.
2. **Establish identity and delegation:** verify the person/service and the organization or principal they represent.
3. **Declare purpose and classification:** show what data and research class is involved before upload or connection.
4. **Generate a least-privilege plan:** preview the exact data, network, execution, and approval permissions requested.
5. **Run a Synthetic Twin:** execute the same interface against safe fixtures in a sandbox.
6. **Issue a scoped Trust Passport:** record verified role, capabilities, controls, limitations, owners, evidence, and expiry.
7. **Complete a first useful task:** produce an inspectable receipt or review outcome.
8. **Expand only on evidence:** request additional privileges when a real workflow requires them.

## First win by counterparty

| Counterparty | First useful outcome | Friction removed | Security boundary |
|---|---|---|---|
| Sponsor / problem owner | A scoped ProblemPassport with budget and evidence requirements previewed. | Guided language; reusable templates; no protocol jargon required. | Cannot authorize methods or data use it does not own. |
| Scientist / PI | A reviewable method/assumption card and synthetic WorkGraph preview. | Domain-facing fields and cited rationale instead of raw manifests. | Scientific review is distinct from execution acceptance. |
| Research software engineer | Adapter contract tests pass against golden fixtures. | Local CLI/SDK preflight; actionable diff for failures. | No production credentials in the adapter environment. |
| Compute provider | Capability probe and synthetic task succeed. | Outbound-only connector; no inbound firewall change for the first integration. | Resource/network/filesystem envelope is explicit and revocable. |
| Verifier | Receives a compact evidence diff and produces a VerificationReceipt. | Only relevant artifacts and policy are presented. | Cannot rewrite execution evidence or self-approve policy changes. |
| Independent reproducer | Re-runs an evidence bundle and sees compatibility differences. | One reproducibility command plus environment explanation. | Independence conflicts are disclosed and evaluated. |
| Domain reviewer | Reviews claim, uncertainty, counterexamples, and limitations together. | Supporting and challenging evidence share one view. | Reviewer decision and conflicts are attributable. |
| Institutional IT/security | Downloads a current trust packet and integration data-flow map. | Reuses security evidence instead of restarting questionnaires. | Claims are scoped, evidence-backed, expiring, and never include secrets. |
| Data owner | Approves a purpose, processing boundary, retention, and revocation path. | Visual data journey and reusable policy profile. | Raw protected data is not copied into public evidence. |
| Auditor | Exports a signed/attested evidence bundle with known limitations. | No manual screenshot scavenger hunt. | Export respects classification and redaction policy. |
| Commercialization/IP team | Receives contribution, rights, and disclosure records. | Clear distinction between attribution, ownership, and publication. | Public verification does not publish confidential IP. |

## Trust Passport

A Trust Passport is not a universal badge. It is a time-bounded collection of claims such as:

- verified identity and accountable organization;
- permitted roles and delegated authority;
- data classifications and purposes;
- worker/verifier capability evidence;
- required controls and completed checks;
- independence/conflict disclosures;
- incident/revocation contacts;
- evidence references, issuer, scope, and expiry.

Access decisions evaluate the passport **and** the requested action. A passport cannot elevate itself, bypass classification, or substitute for a missing scientific review.

## Low-friction security patterns

- **Proof before privilege:** complete a safe task before production access.
- **Progressive assurance:** ask only questions needed for the next risk boundary.
- **Policy preview:** show the human-readable permission/data-flow diff before approval.
- **Outbound connectivity first:** early workers poll for authorized tasks rather than exposing inbound infrastructure.
- **Reusable evidence:** generate procurement-ready control evidence from actual configuration and tests.
- **Delegated administration:** organizations appoint role/data owners without sharing root credentials.
- **Expiry by default:** temporary integrations, exceptions, and elevated roles expire unless renewed.
- **Recovery as onboarding:** require owner, revocation, and recovery contacts before privileged activation.

## Onboarding metrics with guardrails

Track time to synthetic first success, completion rate, manual-review time, policy exceptions, access expansion, first real receipt, support requests, and security findings. Do not optimize conversion by hiding limitations, weakening checks, or treating incomplete security review as success.
