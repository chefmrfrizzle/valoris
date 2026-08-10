# Phase 0 Risk Register

Scales: likelihood and impact are `LOW`, `MEDIUM`, `HIGH`, or `CRITICAL`.

| ID | Risk | Likelihood | Impact | Current control | Required next action |
|---|---|---:|---:|---|---|
| R-001 | Scientific claims are overstated from computational evidence. | HIGH | CRITICAL | Evidence ladder and Counterexample Track. | Label every state and demo metric; require workload-specific domain review. |
| R-002 | Canonicalization differs across languages and invalidates hashes/signatures. | HIGH | CRITICAL | RFC 8785 direction. | Define numeric constraints and cross-language golden/property tests before signatures. |
| R-003 | A malicious workload escapes or abuses worker resources. | MEDIUM | CRITICAL | Bounded-execution invariant; restricted-work policy. | Threat-model sandbox, network, filesystem, resource, and termination controls before remote workers. |
| R-004 | Public/private data crosses repository or output boundaries. | MEDIUM | CRITICAL | Three-zone architecture, secret scanning, PR checklist. | Add synthetic fixtures, classification metadata, leak tests, and output redaction review. |
| R-005 | Workers/verifiers collude or fake independence. | MEDIUM | HIGH | Separate receipts and role model. | Define independence policy and conflict disclosure; diversify operator/implementation evidence. |
| R-006 | A compromised maintainer or CI dependency ships malicious changes. | MEDIUM | CRITICAL | Protected public main, CODEOWNERS, pinned GitHub-owned Actions, read-only workflow token. | Add release attestations/SBOM only after a build exists; move to multi-person review before production. |
| R-007 | A solo founder becomes the only approval/recovery path. | HIGH | HIGH | Admin bypass limited to bootstrap. | Establish an organization, second trusted maintainer, recovery keys, and documented emergency process. |
| R-008 | Private `main` remains unenforced because the current GitHub plan blocks protection. | HIGH | HIGH | CI, CODEOWNERS, PR template, no force pushes by convention. | Upgrade to GitHub Pro/Team before protected customer or production work. |
| R-009 | The first benchmark is too expensive, ambiguous, or legally encumbered. | MEDIUM | HIGH | Public/synthetic-first decision. | Score candidate benchmarks on rights, cost, reproducibility, scientific value, and buyer pain. |
| R-010 | Product onboarding becomes a compliance form instead of a first success. | HIGH | HIGH | Progressive-disclosure UI principle. | Use sandbox-first role journeys and collect only data needed for the next privilege. |
| R-011 | The UI displays synthetic numbers as real operational evidence. | HIGH | HIGH | No-fabricated-evidence invariant. | Add visible `DEMO / SYNTHETIC` labels and provenance links before public promotion. |
| R-012 | Mobile and assistive-technology users cannot navigate evidence. | HIGH | MEDIUM | Screenshot audit captured. | Replace generic div controls with semantic interactive elements and test responsive/accessibility behavior. |
| R-013 | Reliability metrics collapse into a misleading universal score. | MEDIUM | HIGH | RRG explicitly forbids a truth score. | Keep workload/policy cohorts and expose sample size, uncertainty, and failure evidence. |
| R-014 | The graph becomes an expensive, irrecoverable system of record. | MEDIUM | HIGH | Append-only canonical history decision. | Test projection rebuild and consistency before graph-specific optimization. |
| R-015 | Procurement and security review delay institutional onboarding. | HIGH | HIGH | Proposed Trust Passport. | Produce a reusable machine/human-readable trust packet and evidence expiry model. |
| R-016 | Funding pressure causes premature token, settlement, or broad marketplace work. | MEDIUM | HIGH | Explicit deferred decisions and release gates. | Tie capital milestones to reproduction, design partners, and paid pilots—not speculative rails. |

## Stop-ship risks for the first vertical slice

R-001 through R-005 and R-009 must have explicit test evidence and owners before any external scientific-result claim. R-006 through R-008 must be resolved before production credentials or customer-confidential work enter the system.
