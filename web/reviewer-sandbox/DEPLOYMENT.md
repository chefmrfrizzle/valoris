# Vercel Deployment Record

- **Stable URL:** https://valoris-reviewer-sandbox.vercel.app
- **Deployment ID:** `dpl_5vv3pjqr7D8Gr4jcmrdjZ7kWT8fY`
- **Vercel project:** `halalmfs-projects/valoris-reviewer-sandbox`
- **Target:** Production — promoted from validated preview `dpl_3YjYLjAWMLs5aEN8DUAjwP46JqYj`.
- **Source commit:** `2abf130c878875ca7a51cd6d1dd61efded7c15fd`
- **Status:** `READY`
- **Artifact:** Prebuilt static Vite output from `dist/client`; no functions, API routes, backend, authentication, or upload endpoints.

## Verification

- Stable alias returned HTTP 200 without an authentication bypass.
- Deployed HTML title and metadata match the Reviewer Sandbox build.
- Security headers are active: restrictive Content Security Policy, denied framing, disabled camera/microphone/geolocation, no-referrer policy, MIME sniffing disabled, and Vercel HSTS.
- Vercel marks the deployment `noindex`, appropriate for a reviewer demonstration.
- Browser-rendered mobile verification passed at 390 × 844 CSS pixels: document width 390, no horizontal page overflow, single-column evidence layout, static task panel, active step visible, and zero console warnings/errors.
- Browser evidence: `qa/deployed-mobile-390x844.png`.
- Mobile interaction checks passed for role switching, the ADR dialog, `BLOCKED_UNVERIFIED` cryptography, and step navigation.
- Vercel runtime error scan returned no logs; this is expected for a static deployment with no functions.

## Boundaries

The deployment remains DEMO/SYNTHETIC. It makes no scientific, security, cryptographic, production-readiness, or independence claim. Local Vercel link metadata and environment files are ignored and are not committed.

## Reviewer handoff preview — 2026-08-17

- **Preview URL:** https://valoris-reviewer-sandbox-aeybsb0lk-halalmfs-projects.vercel.app
- **Deployment ID:** `dpl_3YjYLjAWMLs5aEN8DUAjwP46JqYj`
- **Target:** Preview; the stable production alias was not promoted or changed.
- **Source commit:** `2abf130c878875ca7a51cd6d1dd61efded7c15fd`
- **Status:** `READY`
- **Build artifact:** `index-CAorDIqP.js` and `index-wMgKUQ3e.css` from the static Vite output.
- **Live verification:** Exact deployed title and synthetic boundaries rendered successfully. At 390 × 844 CSS pixels, the role-aware step-5 handoff generated for Materials Science, all three handoff actions remained reachable, document width stayed 390 with no horizontal overflow, and the console had zero warnings or errors.
- **Production check after preview:** `https://valoris-reviewer-sandbox.vercel.app` remained deployment `dpl_Ff6fq9pDQx5LyAiPi8QKKxVvkMqi`, target `production`, status `READY`, and returned HTTP 200.

## Production promotion — 2026-08-17

- **Promoted preview:** `dpl_3YjYLjAWMLs5aEN8DUAjwP46JqYj`.
- **Resulting production deployment:** `dpl_5vv3pjqr7D8Gr4jcmrdjZ7kWT8fY` at `https://valoris-reviewer-sandbox-fv1mxtivr-halalmfs-projects.vercel.app`.
- **Stable public alias:** https://valoris-reviewer-sandbox.vercel.app returned HTTP 200 and resolved to the resulting production deployment with status `READY`.
- **Artifact identity:** production served `index-CAorDIqP.js` and `index-wMgKUQ3e.css`, matching the validated preview artifact.
- **Pre-promotion regression gate:** 7/7 sandbox and review-packet tests passed, 4/4 static-host packaging tests passed, and the Vite static build completed successfully.
- **Desktop gate:** 1440 × 1024 CSS pixels, no horizontal overflow, exact DEMO/SYNTHETIC and BLOCKED_UNVERIFIED boundaries present, and zero console warnings/errors.
- **Mobile gate:** 390 × 844 CSS pixels, no horizontal overflow, role-aware Cryptography handoff generated, all three handoff actions reachable, and zero console warnings/errors.
- **Static boundary:** no backend, authentication, uploads, production components, file inputs, form targets, or Vercel Functions were present. The deployed artifact remained a static Vite bundle.
- **Security headers:** restrictive Content Security Policy, framing denied, camera/microphone/geolocation disabled, no-referrer, MIME sniffing disabled, and HSTS remained active.
- **Post-deploy error scan:** Vercel returned no runtime logs, expected for this static deployment.
- **Promotion boundary:** the deployment remains a DEMO/SYNTHETIC reviewer interface and does not accept scientific, security, cryptographic, production-readiness, or independence policy.
