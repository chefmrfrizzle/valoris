# Valoris Reviewer Sandbox

A public-safe, static, synthetic walkthrough for evaluating the Valoris reviewer experience.

## Boundaries

- Every fixture datum is labeled `DEMO` or `SYNTHETIC`.
- Cryptographic choices remain `BLOCKED_UNVERIFIED`.
- The sandbox makes no scientific, security, production, or independence claim.
- It has no backend, authentication, uploads, executable schemas, private materials, workers, payments, or production infrastructure.
- Feedback remains in browser memory unless the reviewer explicitly downloads the DEMO JSON file.

## Local commands

```bash
npm install
npm run dev
npm run build
npm run test:sandbox
npm run test:sites
```

The selected design direction and implementation constraints are recorded in `AGENTS.md`. Visual verification is recorded in `design-qa.md`.
