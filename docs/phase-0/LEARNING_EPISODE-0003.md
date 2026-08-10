# LearningEpisode 0003 — Review Feedback and Solo-Maintainer Gate

- **Trigger:** GitHub review found missing authorization and claim-state objects, an incomplete package index, and a conflict between the no-self-merge contract and a same-operator reviewer account.
- **Inputs:** Five unresolved review threads, the canonical terminology, architecture flow, gated prompts, CODEOWNERS, and live GitHub review state.
- **Failure evidence:** `WorkRequest` was absent from the architecture path; `Claim` and `ClaimStateTransition` were absent from the schema gate; LearningEpisode 0002 was absent from the index; a same-operator account was presented without an explicit policy path.
- **Decision:** Correct the object flow and index. Adopt ADR-0009 as a narrow, disclosed exception for a research-gate merge containing public research/planning documentation and bounded repository-only guardrails.
- **Hard stops:** The exception cannot approve implementation, executable schemas, security/cryptographic policy, scientific acceptance, confidential/restricted data, production behavior, releases, settlement, or invariant changes.
- **Validation required:** Repository regression tests, full-diff whitespace check, GitHub Actions on the final commit, resolved review conversations, and a fresh `@11BUSD` review.
- **Promotion decision:** Prompt 2 may begin only after PR #2 is approved and merged without administrator bypass. Independent-person review remains blocked for every excluded decision.
