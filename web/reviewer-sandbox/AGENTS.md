# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Selected Valoris direction

- The approved Reviewer Sandbox direction is Option 1: a guided, five-step desktop review workspace with a persistent task sidebar, role switcher, explicit orange DEMO/SYNTHETIC warning, and supporting/challenging evidence presented side by side.
- Keep the visual language restrained and institutional: white and pale-gray surfaces, dark navy type, vivid blue actions, orange warning states, compact data density, subtle borders, and small radii.
- Preserve the public-static boundary: no backend, authentication, uploads, private materials, production components, scientific-acceptance claims, or independence claims. Every fixture datum must carry a DEMO or SYNTHETIC label, and cryptography remains BLOCKED_UNVERIFIED.
- The top Perspective control and the four “I’m reviewing as” buttons are two synchronized inputs for the same active reviewer role. The top control must be a functional selector on mobile and desktop, not a focus-only shortcut.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
