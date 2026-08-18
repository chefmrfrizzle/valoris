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

## Mobile overlap correction — 2026-08-17

- **Validated source commit:** `048828823e91d83b882cdf54fe47a6cd5a90e7cd`.
- **Validated preview:** `dpl_Ao99wJAbqzMKBquVr61X1oCvhKFn` at `https://valoris-reviewer-sandbox-jiuzsae9m-halalmfs-projects.vercel.app`, target `preview`, status `READY`.
- **Resulting production deployment:** `dpl_D9U1SqbUZN7ZXLyfJjzezcJtANic` at `https://valoris-reviewer-sandbox-eabn3anzq-halalmfs-projects.vercel.app`, target `production`, status `READY`.
- **Stable public alias:** https://valoris-reviewer-sandbox.vercel.app returned HTTP 200 and resolved to the resulting production deployment.
- **Artifact identity:** preview and production serve `index-FM-UCdAY.js` and `index-BXtRsd-W.css`. Downloaded production assets exactly matched the promoted prebuilt artifact: JS SHA-256 `4f8b86f503be6fe91370dd4fc93ad9ec5ab99439af054c4768479fad8baf5f69`; CSS SHA-256 `60d5630b783cddb11b1cea98246111dbb3ac4aac7521e42c940121c54333e280`.
- **Regression gate:** 8/8 sandbox and review-packet tests passed, 4/4 static-host packaging tests passed, the Vite static build passed, and the repository baseline passed.
- **Responsive gate:** all four roles passed at 390 × 844; Materials Science passed at 320 × 800; desktop passed at 1440 × 1024. The brand, perspective control, global warning, and active walkthrough step remained contained with no document overflow or console warnings/errors.
- **Reported-versus-fixed evidence:** `qa/mobile-overlap-source-vs-fixed.png`; focused corrected captures are in `qa/mobile-header-fixed-390x844.png`, `qa/mobile-header-fixed-320x800.png`, and `qa/desktop-header-fixed-1440x1024.png`.
- **Headers and observability:** restrictive CSP, framing denial, disabled camera/microphone/geolocation, no-referrer, MIME-sniffing protection, HSTS, and `noindex` remained active. The post-deploy runtime error scan returned no logs, expected for this static deployment.
- **Boundary confirmation:** the promoted artifact remains static and synthetic, keeps cryptography `BLOCKED_UNVERIFIED`, and introduces no backend, authentication, uploads, API routes, Vercel Functions, private materials, or scientific/independence claims.

## Functional perspective selector — 2026-08-17

- **Validated source commit:** `32f7e3047c20ba2b0806c1386b0ad7b359d401f2`.
- **Validated preview:** `dpl_BXDijKNvLS87RM7nzXuuCdUnmbXV` at `https://valoris-reviewer-sandbox-cy1ipox2b-halalmfs-projects.vercel.app`, target `preview`, status `READY`. Browser access remained deployment-protected; Vercel-authenticated retrieval verified the exact artifact before promotion.
- **Resulting production deployment:** `dpl_HtfKgVR5R9pvhjbxmYm5xkSWrWJK` at `https://valoris-reviewer-sandbox-p9rm6in6v-halalmfs-projects.vercel.app`, target `production`, status `READY`.
- **Stable public alias:** https://valoris-reviewer-sandbox.vercel.app returned HTTP 200 and resolved to the resulting production deployment.
- **Artifact identity:** production serves `index-_9axtI6i.js` and `index-D7JI5rEz.css`, exactly matching the promoted prebuilt preview. JS SHA-256: `221cd60bef6f62a405c964cafc260ab2a6c311fd827fcc0396c94613527c6a04`; CSS SHA-256: `3bc359bbf0e6d5f722474672dd4ff332f0439e19c61c3a31fafae7ccb455f816`.
- **Interaction gate:** on the public alias at 390 × 844, the top selector changed to Cryptography and synchronized the lower active role plus ADR-0012 packet; the lower Materials Science role then synchronized the top selector plus ADR-0010/ADR-0014 packet. `DEMO / SYNTHETIC` and `BLOCKED_UNVERIFIED` remained visible, with no horizontal overflow or runtime errors.
- **Regression and accessibility gate:** 9/9 sandbox and review-packet tests passed, 4/4 static-host packaging tests passed, the Vite static build and repository baseline passed, and the final automated WCAG A/AA scan reported zero violations.
- **Headers and observability:** restrictive CSP, framing denial, disabled camera/microphone/geolocation, no-referrer, MIME-sniffing protection, HSTS, and `noindex` remained active. The post-deploy runtime error scan returned no logs, expected for this static deployment.
- **Boundary confirmation:** this interaction correction adds no backend, authentication, uploads, persistence, API routes, Vercel Functions, private materials, or scientific/independence claims; cryptography remains `BLOCKED_UNVERIFIED`.
