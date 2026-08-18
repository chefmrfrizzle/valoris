# LearningEpisode — Public Reviewer Sandbox

- **Trigger:** The founder selected visual direction 1 for a public, static, synthetic Reviewer Sandbox.
- **Inputs:** The selected 1487 × 1058 design image; the existing Valoris UI system; the onboarding architecture; the current UX audit; the public architecture; ADR-0006, ADR-0007, and proposed ADR-0010.
- **Invariants:** No backend, authentication, uploads, executable schemas, private materials, production components, scientific-acceptance claim, or independence claim. All fixture data is DEMO/SYNTHETIC. Cryptography stays BLOCKED_UNVERIFIED.
- **Output:** A five-step, ten-minute React walkthrough with four reviewer perspectives, side-by-side supporting and challenging evidence, bounded ADR packets, limitations, and structured local feedback.
- **Failure observed:** At 390 CSS pixels the horizontal walkthrough initially opened on steps 1–2 while active step 3 was offscreen.
- **Correction:** Center the active step on initial responsive render and after navigation; retain the current step in view without changing desktop layout.
- **Handoff extension:** Added a role-aware, session-only review summary with explicit conflict and blocked-decision fields, copy and JSON download actions, and a clean-session reset. No timestamp, reviewer identity, transport, or storage was introduced.
- **Failure observed during extension:** The download action revoked its temporary object URL immediately after the synthetic link click, creating a race for slower browser download handlers.
- **Correction during extension:** Attach the download link to the document, remove it after activation, and defer URL revocation to the next task so the browser can consume the synthetic JSON reliably.
- **Reported-device failure:** User-supplied iOS captures showed the mobile perspective control obscuring the product name and the horizontally centered walkthrough clipping the previous step label.
- **Reported-device correction:** At ≤600 CSS pixels, place the brand, perspective control, and warning in explicit grid rows; show one complete active walkthrough step; reserve automatic horizontal centering for the 601–860-pixel tablet layout.
- **Regression protection:** A source-level test now requires the mobile single-column header, contained perspective control, and active-only phone walkthrough rules.
- **Interaction failure:** The top Perspective affordance visually implied a dropdown but only moved keyboard focus to the first lower role button, so it could not change reviewer viewpoint.
- **Interaction correction:** Replace the focus shortcut with a native controlled selector that shares `roleId` with the lower role buttons. Both entry points now update the selected label, active role, task language, and ADR packet.
- **Accessibility correction:** The interaction audit exposed a serious automated contrast violation in the orange warning and evidence metadata. Darker semantic tokens reduced the follow-up WCAG A/AA result to zero violations; gradient-backed contrast checks remain machine-incomplete and were visually reviewed.
- **Evidence:** Desktop and mobile browser captures, a combined reported-versus-corrected comparison, synchronized selector/button checks at 320, 390, and 1440 CSS pixels, zero runtime errors, passing static build, 9/9 sandbox and review-packet tests, and 4/4 static-host packaging tests in `design-qa.md`.
- **Promotion decision:** The static prototype was published to a dedicated Vercel project for founder and reviewer inspection. Vercel assigned the first deployment to its production target automatically; this makes the static interface reachable but does not imply protocol production readiness, policy acceptance, scientific acceptance, or independence assurance.
