# Verifiable Science Protocol

A public protocol and reference implementation for turning scientific questions into **funded, reproducible, attributable, verifiable computational work**.

> **One sentence:** A sponsor defines a research problem; the protocol turns it into precise tasks; independent machines perform and verify the work; every important step gets an auditable receipt; reproducible results graduate through a visible evidence ladder.

## Explain it to a 12-year-old

Imagine a giant science homework board.

Someone posts a hard question and says, “I will pay for useful computer work on this question.” The system breaks the computer part into smaller jobs. Different computers can help. They cannot just say “trust me”; they leave signed receipts showing what job they did, what program they ran, what information they used, and what answer they got. Other computers try the important parts again. If the result keeps working independently, it moves up a confidence ladder.

The system does **not** let people vote scientific facts into existence. It records evidence and makes it easier to check.

## Executive explanation

The protocol is a neutral coordination layer for outsourced scientific computation. It standardizes:

- research problem identity;
- computational task identity;
- program, data, and environment commitments;
- worker capability and scheduling;
- execution and verification receipts;
- independent reproduction;
- provenance and audit history;
- sponsor-funded settlement;
- contribution attribution.

The commercial control plane, customer information, proprietary adapters, private research pipelines, and internal risk intelligence are deliberately kept outside this public repository.

## Engineer explanation

The architecture is an **event-sourced scientific work graph** with a deterministic trusted core and a probabilistic/AI-assisted edge.

A canonical `ProblemPassport` compiles through an approved workload-specific `TaskAdapter` into a `WorkGraph`. Each immutable `TaskSpec` commits to program, input artifacts, execution environment, numerical/randomness semantics, verification policy, resources, dependencies, and acceptance rules. Workers execute tasks in constrained runtimes and emit signed `ExecutionReceipt`s. A pluggable `VerificationPolicy` emits verification evidence. Important results may require independent `ReproductionAttempt`s before an `AcceptanceReceipt` advances the result's reproducibility state.

AI agents may propose decompositions, code, tests, explanations, or anomaly hypotheses. They cannot directly alter canonical task commitments, release money, change verification results, or silently rewrite policy.

## Scientist explanation

This system does not equate computation with scientific truth. It tracks separate states for:

1. **Execution:** was a defined computation run?
2. **Computational verification:** is the output consistent with the declared program and inputs?
3. **Reproduction:** can independent parties obtain compatible results?
4. **Scientific review:** does the evidence support the scientific claim under the domain's methodology?
5. **External validation:** where applicable, does experiment or real-world observation support it?

Failed reproductions and challenges are first-class evidence, not inconvenient data to hide.

## Operator explanation

The network is designed as a federation. Universities, labs, companies, cloud providers, and independent compute operators can retain their own hardware, access policies, data boundaries, and local infrastructure while speaking the same task/receipt/provenance protocol.

## The system you are building

```text
QUESTION / PROBLEM PASSPORT
           │
           ▼
WORK GRAPH + TASK ADAPTER
           │
           ▼
COMPUTE EXCHANGE ───────────────┐
           │                    │
           ▼                    │
SECURE WORKER RUNTIMES          │
           │                    │
           ▼                    │
EXECUTION RECEIPTS              │
           │                    │
           ▼                    │
VERIFICATION MESH               │
           │                    │
           ▼                    │
REPRODUCTION NETWORK ◄──────────┘
           │
           ▼
EVIDENCE / PROVENANCE GRAPH
           │
           ▼
ACCEPTANCE + SPONSOR SETTLEMENT
```

## The self-improving harness

The platform improves through a bounded engineering loop:

```text
OBSERVE
  ↓
RECORD EPISODE
  ↓
UPDATE EVIDENCE / FAILURE GRAPH
  ↓
PROPOSE CHANGE
  ↓
RUN EVALS + TESTS + SECURITY GATES
  ↓
COMPARE AGAINST BASELINE
  ↓
APPROVE / REJECT
  ↓
CANARY / RELEASE
  ↓
OBSERVE AGAIN
```

The loop learns from:

- failed builds;
- failed tasks;
- verifier disagreements;
- reproductions that fail;
- security findings;
- performance regressions;
- inaccurate AI proposals;
- operator incidents;
- user-interface friction;
- scientific review outcomes.

**Important:** “self-learning” means structured memory + measured improvement. It does not mean an unrestricted agent can rewrite production rules whenever it wants.

## The single most important addition: Scientific Continuous Verification

Every meaningful system event becomes a replayable `LearningEpisode` linked to the evidence graph.

The system gradually learns which combinations of:

- TaskAdapter;
- solver;
- compiler/runtime;
- hardware class;
- verification policy;
- tolerance policy;
- dataset lineage;
- scheduler strategy

produce reliable outcomes for each workload family.

Changes must beat the current baseline on explicit evals before they are eligible for promotion.

This turns the network from a job marketplace into a **research reliability engine**.


## Reliability and falsification are explicit subsystems

Two required protocol subsystems have dedicated specifications:

- `docs/RESEARCH_RELIABILITY_GRAPH.md` — reliability memory across adapters, solvers, environments, datasets, verifiers, reproductions, incidents, and releases.
- `docs/COUNTEREXAMPLE_TRACK.md` — first-class falsification/challenge workflow for discovering where a result fails or must be narrowed.

They are protocol components, not optional UI ideas.

## Public vs private boundary

### Public / open-source

Open the things that users must be able to inspect to trust protocol correctness:

- protocol specification;
- schemas and canonicalization rules;
- hashing/signing rules;
- TaskAdapter interfaces;
- VerificationPolicy interfaces;
- reproducibility ladder;
- contribution-receipt format;
- reference worker;
- reference scheduler;
- SDKs;
- conformance tests and golden vectors;
- synthetic benchmark workloads;
- public threat model;
- public UI/UX specification;
- architecture decision records.

### Private / closed-source

Keep private things whose secrecy is legitimate and not required to trust protocol correctness:

- customer and sponsor data;
- private research questions and datasets;
- proprietary commercial TaskAdapters;
- enterprise connectors;
- advanced scheduling/risk optimizations;
- fraud/abuse intelligence;
- private security incident details;
- pricing and commercial analytics;
- internal evaluation corpora containing confidential data;
- proprietary research candidate rankings;
- credentials, keys, secrets, infrastructure internals.

See `docs/PUBLIC_PRIVATE_BOUNDARY.md`.

## Repository map

```text
.
├── README.md
├── AGENTS.md
├── SECURITY.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── BUILD_ENVIRONMENT.md
│   ├── EVIDENCE_GRAPH.md
│   ├── SCIENTIFIC_CONTINUOUS_VERIFICATION.md
│   ├── PUBLIC_PRIVATE_BOUNDARY.md
│   ├── RESEARCH_DOMAIN_MAP.md
│   ├── VALUE_ROUTING.md
│   ├── UI_SYSTEM.md
│   ├── COUNTERPARTY_CLASSES.md
│   ├── AI_SAFETY_AND_AGENT_BOUNDARIES.md
│   └── adr/
├── schemas/
├── policies/
├── evals/
├── reference/
│   ├── orchestrator/
│   ├── worker/
│   ├── verification/
│   └── adapters/
├── sdk/
├── web/
│   └── ui-prototype.html
└── .github/
    ├── CODEOWNERS
    └── workflows/
```

## Recommended machine setup

### Mac: primary control/development machine

Use the Mac for:

- Git/GitHub;
- architecture and documentation;
- TypeScript/web interface;
- Rust control-plane development;
- local PostgreSQL;
- contracts and schemas;
- AI coding agents;
- local tests;
- Apple-Metal-specific experiments if useful.

### Linux + NVIDIA GPU: compute/reference worker

Use a Linux workstation/server with an NVIDIA GPU for:

- CUDA workloads;
- GPU worker development;
- CUDA/Triton kernels;
- performance benchmarks;
- GPU sandbox testing;
- serious scientific compute.

Do not force the entire project to run on one laptop. The protocol is supposed to be heterogeneous.

## Recommended architecture stack

Pin exact versions during implementation after verifying current upstream releases.

### Control plane
- Rust
- Tokio
- Axum
- PostgreSQL
- object storage with content-addressed artifacts
- OpenTelemetry-compatible tracing/metrics/logs

### Scientific workload adapters
- Python where the scientific ecosystem requires it
- Rust/C++ where determinism/performance warrants it
- CUDA/Triton only for explicitly supported GPU workloads
- containerized execution contracts

### Web application
- TypeScript
- React / Next.js-style application architecture
- server-rendered public discovery pages
- authenticated workbench for engineering/scientific views

### EVM settlement (later)
- Solidity
- Foundry
- OpenZeppelin primitives where appropriate
- Alloy for Rust/EVM interaction

### Identity and provenance
- canonical JSON for hash-critical manifests
- separate transport encodings as needed
- signed receipts
- W3C-PROV-compatible provenance mapping
- append-only event ledger

### CI/CD
- GitHub Actions
- minimal permissions
- protected branches
- reproducible release process
- build provenance / artifact attestations where available
- no long-lived cloud credentials in CI when federation/OIDC is available

## Hash-critical data rule

Transport formats and canonical signing formats are different concerns.

For hash-critical JSON manifests, use a documented canonicalization profile. Do not assume ordinary JSON serialization, map ordering, or generic Protobuf encoding will produce a universal stable hash across languages.

## Start order

Do **not** start by building a token or blockchain.

1. Lock terminology and invariants.
2. Implement canonical schemas.
3. Select exactly one first workload.
4. Build its TaskAdapter.
5. Build a local deterministic vertical slice.
6. Produce signed execution receipts.
7. Add independent verification/reproduction.
8. Build the evidence graph.
9. Add the self-improving harness and eval ledger.
10. Add multi-worker scheduling.
11. Add sponsor accounting.
12. Add testnet settlement only after the off-chain invariants are proven.
13. Expand workloads one adapter at a time.

## What not to build yet

- native protocol token;
- speculative problem markets;
- tokenized company ownership;
- universal scientific task decomposer;
- independent blockchain consensus;
- unrestricted autonomous self-modification;
- permissionless arbitrary code execution;
- restricted/dual-use workload marketplace.

## First command for an AI coding system

Read `AGENTS.md`, every root architecture document, every ADR, every schema, and every policy file. Produce the Phase 0 architecture review and decision register **before writing production code**.

## License

The public protocol, documentation, and reference tooling in this repository are licensed under the [Apache License 2.0](LICENSE).
