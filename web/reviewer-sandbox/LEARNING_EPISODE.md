# LearningEpisode — Public Reviewer Sandbox

- **Trigger:** The founder selected visual direction 1 for a public, static, synthetic Reviewer Sandbox.
- **Inputs:** The selected 1487 × 1058 design image; the existing Valoris UI system; the onboarding architecture; the current UX audit; the public architecture; ADR-0006, ADR-0007, and proposed ADR-0010.
- **Invariants:** No backend, authentication, uploads, executable schemas, private materials, production components, scientific-acceptance claim, or independence claim. All fixture data is DEMO/SYNTHETIC. Cryptography stays BLOCKED_UNVERIFIED.
- **Output:** A five-step, ten-minute React walkthrough with four reviewer perspectives, side-by-side supporting and challenging evidence, bounded ADR packets, limitations, and structured local feedback.
- **Failure observed:** At 390 CSS pixels the horizontal walkthrough initially opened on steps 1–2 while active step 3 was offscreen.
- **Correction:** Center the active step on initial responsive render and after navigation; retain the current step in view without changing desktop layout.
- **Evidence:** Desktop and mobile browser captures, side-by-side design comparisons, interaction checks, zero console warnings/errors, passing static build, 4/4 sandbox-boundary tests, and 4/4 static-host packaging tests in `design-qa.md`.
- **Promotion decision:** The static prototype was published to a dedicated Vercel project for founder and reviewer inspection. Vercel assigned the first deployment to its production target automatically; this makes the static interface reachable but does not imply protocol production readiness, policy acceptance, scientific acceptance, or independence assurance.
