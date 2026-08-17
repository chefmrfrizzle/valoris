# Vercel Deployment Record

- **Stable URL:** https://valoris-reviewer-sandbox.vercel.app
- **Deployment ID:** `dpl_Ff6fq9pDQx5LyAiPi8QKKxVvkMqi`
- **Vercel project:** `halalmfs-projects/valoris-reviewer-sandbox`
- **Target:** Production — Vercel assigned the first project deployment to production automatically.
- **Source commit:** `52893ee`
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
