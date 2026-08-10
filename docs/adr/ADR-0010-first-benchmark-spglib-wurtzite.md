# ADR-0010 — First Benchmark: Pinned spglib Wurtzite Classification

- **Status:** Proposed; adoption blocked by D-021 and D-022
- **Date:** 2026-08-10
- **Decision owner:** Protocol maintainer (`@chefmrfrizzle`)
- **Required reviewer:** Named independent computational-crystallography reviewer

## Context

Phase 0 requires one safe public or synthetic computational-materials workload
before schema or worker implementation. The workload must be cheap enough for a
second machine, precise enough for deterministic pass/fail, useful for
counterexamples, and legally safe to publish.

Prompt 2 compared four candidates in
`docs/phase-0/BENCHMARK_SELECTION.md`: `spglib` symmetry classification, an ASE
EMT equation-of-state curve, phonopy post-processing, and Matbench regression.
The `spglib` candidate scored 94/100 and was the only option with a small
synthetic input, explicit upstream expected answer, permissive code license,
clear discrete verification fields, supported common-platform wheels, and no
external dataset or force calculator.

Research also found a high-value failure mode. The upstream wurtzite example is
written for the C API. Passing its lattice array directly as Python rows returns
a plausible but incorrect lower-symmetry result. The documented Python port must
transpose the lattice.

## Proposed decision

Adopt the pinned `spglib` 2.7.0 four-site synthetic wurtzite classification as
the first Valoris technical benchmark, subject to D-021 and D-022.

The baseline uses the Python row-vector lattice convention, `symprec=1e-5`,
`angle_tolerance=-1`, and expects space-group number 186, international symbol
`P6_3mc`, Hall number 480, 12 symmetry operations, and two site-equivalence
pairs. It also requires site-permutation, origin-shift, sub-tolerance,
symmetry-breaking, and untransposed-lattice challenges as specified in the
selection document.

The benchmark verifies only this claim:

> A declared runner reproduced the expected discrete classification and
> challenge behavior under pinned inputs, dependencies, and resource limits.

It does not verify a physical sample, a new scientific claim, or scientific
acceptance. No result may advance beyond technical execution verification until
D-018 has an independently approved policy.

## Conditions before acceptance

1. A named independent computational crystallographer reviews the exact fixture,
   conventions, tolerance, perturbations, expected outputs, and claim wording.
2. Exact Python, NumPy, wheel/source artifacts, and hashes are frozen.
3. The full challenge suite reproduces on approved macOS-arm64 and Linux-x86_64
   environments within the proposed budget.
4. D-019 defines whether that evidence qualifies as independent reproduction;
   otherwise it is labeled only second-environment confirmation.
5. Any disagreement becomes permanent failure evidence; tolerances may not be
   widened merely to obtain a pass.

## Consequences

- The first implementation can exercise authorization, deterministic execution,
  evidence capture, verification, replay, and counterexamples without customer
  data, a GPU, HPC, an API credential, or a proprietary simulator.
- The C/Python convention trap gives the demonstration a realistic failure that
  produces a valid-looking answer, rather than a contrived crash.
- The workload is intentionally too small to prove product-market fit or broad
  scientific value. Design-partner interviews must validate the assumed
  crystallographic interoperability pain.
- Floating standardization matrices and positions are evidence but not initial
  pass criteria; their canonical numeric policy belongs behind the Prompt 3/4
  gates.
- A future workload may supersede this benchmark, but the original result and
  failure evidence remain addressable and append-only.

## Alternatives rejected

- **ASE EMT FCC-Cu equation of state:** cheap and synthetic, but continuous fit
  outputs depend on potential, volume grid, and equation-of-state choice.
- **Phonopy NaCl post-processing:** scientifically richer, but expands the trust
  boundary to force provenance, unit conversion, supercells, symmetrization, and
  calculator-dependent choices.
- **Matbench `matbench_log_gvrh`:** fixed folds are useful, but dataset licensing
  is not clear enough for redistribution, dependency pins are old, and runtime
  is undefined without selecting a model.

## Non-goals

This ADR does not authorize schemas, adapters, workers, signing, payment,
settlement, production infrastructure, confidential data, or scientific
acceptance policy.
