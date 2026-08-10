# Prompt 2 Benchmark Selection

- **Status:** Recommendation complete; adoption remains blocked pending the owners in the decision register.
- **Research date:** 2026-08-10
- **Scope:** Public or synthetic computational-materials workloads only.
- **Recommendation:** One pinned `spglib` wurtzite symmetry-identification benchmark.

This document compares four candidates and recommends exactly one. It does not
implement a schema, adapter, worker, signature, payment mechanism, or production
service. A benchmark result would establish deterministic execution under a
declared numerical policy; it would not establish that a real material is
scientifically correct, useful, or accepted.

## Evidence labels

- **SOURCED:** directly supported by a linked primary project source, package
  registry, specification, or paper.
- **MEASURED-LOCAL:** observed on the named local machine during Prompt 2; not
  yet reproduced elsewhere.
- **ASSUMPTION:** a product or scientific premise that still needs a reviewer or
  design partner.
- **ESTIMATE:** a proposed engineering budget or forecast that must be measured
  before implementation is accepted.
- **BLOCKED:** no reliable conclusion is authorized until the named evidence or
  authority is supplied.

## Decision method

Scores use a 1–5 scale, where 5 is best for the first bounded Valoris slice.
The weighted total is `sum(weight × score / 5)`. A rights/access score below 3
is a stop condition regardless of total. Customer-pain scores are deliberately
conservative because no design-partner interview evidence exists yet.

| Criterion | Weight | What a 5 means |
|---|---:|---|
| Rights and access | 15 | Code and all benchmark inputs have clear reuse terms; no account, secret, or restricted data is required. |
| Customer pain | 10 | The workload tests a costly, observed counterparty problem. |
| Reproducibility | 20 | Inputs, parameters, environment, and discrete outputs can be pinned with little hidden state. |
| Cost, runtime, and hardware | 15 | CPU-only, small memory/disk, fast execution, and no specialist hardware. |
| Low scientific ambiguity | 10 | The benchmark makes a narrow claim with few policy-dependent interpretations. |
| Verification clarity | 15 | Independent code can decide pass/fail from explicit outputs and tolerances. |
| Counterexample potential | 5 | Safe perturbations expose meaningful failure modes. |
| Second-machine feasibility | 10 | Common platforms have supported packages and can repeat the work cheaply. |

## Weighted scorecard

| Candidate | Rights /15 | Pain /10 | Repro. /20 | Cost /15 | Ambiguity /10 | Verify /15 | Counterexample /5 | Second machine /10 | Total /100 | Disposition |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| A. Pinned `spglib` wurtzite symmetry classification | 15 | 6 | 20 | 15 | 8 | 15 | 5 | 10 | **94** | **Recommend** |
| B. ASE EMT equation of state for synthetic FCC Cu | 12 | 6 | 16 | 15 | 6 | 12 | 4 | 10 | **81** | Reject for first slice |
| C. Phonopy NaCl post-processing with example force data | 9 | 8 | 12 | 6 | 4 | 9 | 4 | 6 | **58** | Reject for first slice |
| D. Matbench `matbench_log_gvrh` regression | 6 | 8 | 16 | 6 | 4 | 9 | 4 | 4 | **57** | Rights stop; reject |

### Score interpretation

- Candidate A wins on boundedness, explicit upstream expected output, supported
  wheels, and useful coordinate/tolerance counterexamples. Its customer-pain
  score is only 3/5 because interoperability pain is an **ASSUMPTION**, not a
  validated customer fact.
- Candidate B is also synthetic and cheap, but an equation-of-state result
  depends on potential parameters, sampled volumes, and fit form. That makes
  the scientific claim less crisp than a discrete symmetry classification.
- Candidate C represents a more valuable scientific workflow, but force data,
  calculator provenance, unit conversion, supercell selection, symmetrization,
  and non-analytical corrections expand the first trust boundary.
- Candidate D has a published reproducibility protocol, but the released Python
  package is old, model runtime is not bounded without selecting an algorithm,
  and the adapted dataset metadata does not provide a clear standalone license
  grant. The code license cannot be treated as the dataset license.

## Candidate evidence

### A. `spglib` wurtzite symmetry classification

**SOURCED facts**

- `spglib` 2.7.0 is BSD-3-Clause, requires Python 3.9 or newer, and declares
  NumPy `>=1.20,<3`. The release was published 2025-12-29. The repository was
  not archived and remained active when checked on 2026-08-10.
- The 2.7.0 upstream README includes a four-site synthetic wurtzite C example,
  sets `symprec=1e-5`, and asserts space-group number 186 (`P6_3mc`). No
  external scientific dataset is needed.
- The Python interface defines lattice basis vectors as rows. The C example's
  array uses the C convention, so a Python port must transpose that lattice.
- `symprec` is a Cartesian distance tolerance. A negative `angle_tolerance`
  invokes the library's internally optimized angle decision.
- The 2.7.0 PyPI release publishes wheels for CPython 3.9–3.14 across macOS
  arm64, Linux x86_64/aarch64, and supported Windows architectures. The
  upstream CI tests Linux, macOS, and Windows toolchains and multiple Python and
  NumPy combinations.
- The dataset API returns discrete space-group identifiers, Hall identifiers,
  symmetry operations, and atomic equivalence mappings. These are clear raw
  materials for deterministic verification.

**MEASURED-LOCAL evidence**

On macOS 26.2 arm64 with CPython 3.9.6, `spglib==2.7.0`, and
`numpy==2.0.2`:

- the correctly transposed Python input returned `(186, P6_3mc, Hall 480,
  12 operations)`;
- 1,000 in-process classifications produced one unique result in 0.170 seconds;
- peak resident memory for the Python process was about 25 MB and the disposable
  virtual environment occupied 36 MB;
- adding `1e-7` to one fractional coordinate preserved number 186;
- adding `1e-3` changed the result to number 156 (`P3m1`), Hall 446, with six
  operations;
- permuting the sites and applying a uniform fractional origin shift preserved
  the baseline discrete classification; and
- copying the C lattice directly into the Python API, without transposing it,
  changed the result to number 4 (`P2_1`), Hall 6, with two operations.

These are discovery measurements, not cross-platform evidence. The untransposed
failure is particularly valuable: it proves that a plausible interface mistake
can produce a valid-looking but wrong answer.

**ASSUMPTIONS and ambiguity**

- Counterparties have meaningful pain around crystallographic format,
  convention, tolerance, and provenance mismatches. This must be validated in
  interviews.
- Space-group classification under a declared tolerance is useful as a
  protocol-verification workload, even though it is not a claim about a newly
  discovered material.
- A computational crystallographer must confirm that the proposed perturbation
  suite is scientifically defensible and not merely software-specific.

### B. ASE EMT equation of state for synthetic FCC Cu

**SOURCED facts**

- ASE 3.29.0 was released 2026-06-21, requires Python 3.10 or newer, and uses
  LGPL-2.1-or-later. Its GitLab project remained active on the research date.
- ASE's EMT implementation lists Cu among the standard supported metals and
  warns that its H/C/N/O parameters are not for serious use.
- EMT's `asap_cutoff` option changes cutoff behavior, and the source warns that
  older/ASAP behavior is not bitwise identical.
- ASE exposes nine equation-of-state fit names, including Birch-Murnaghan and
  Vinet. A result is therefore incomplete unless the fit form and sampled
  volumes are pinned.
- A synthetic Cu cell needs no external dataset or proprietary calculator.

**ESTIMATES and ambiguity**

- A seven-volume EMT curve should run in seconds on one CPU and fit comfortably
  within the selected benchmark's proposed resource budget, but Prompt 2 did
  not measure it.
- The fitted equilibrium volume, energy, and bulk modulus are continuous values
  whose tolerances must be justified. Potential validity and fit choice create
  more scientific ambiguity than Candidate A.
- LGPL obligations are manageable but add redistribution review that BSD does
  not require for this first public slice.

### C. Phonopy NaCl post-processing

**SOURCED facts**

- Phonopy 4.4.0 was published 2026-07-17, is BSD-3-Clause, requires Python 3.10
  or newer, and depends on NumPy, PyYAML, Matplotlib, h5py, spglib, symfc, and a
  Rust backend. Its repository remained active on the research date.
- The official workflow requires a unit cell plus forces or force constants.
  Those quantities are produced by an external calculator before phonopy
  post-processing.
- Calculator interfaces use different physical unit systems. Current phonopy
  behavior can automatically enable non-analytical corrections and has changed
  force-constant symmetrization behavior across releases.
- The repository and documentation contain examples, including NaCl, and the
  method has a current open-access implementation paper.

**BLOCKED and estimated items**

- The repository license covers phonopy code, but the scientific provenance and
  reuse terms for any selected precomputed forces, pseudopotentials, and
  calculator outputs must be verified file by file before redistribution.
- Post-processing an already prepared tiny example is likely CPU-feasible in
  seconds or minutes. Generating first-principles forces may require licensed
  software and HPC. Combining those two paths would make the resource claim
  misleading.
- Domain choices around force source, units, supercell, symmetrization, acoustic
  sum rules, non-analytical correction, and frequency tolerances are too broad
  for the first protocol slice.

### D. Matbench `matbench_log_gvrh`

**SOURCED facts**

- Matbench v0.1 defines 13 materials-ML tasks. `matbench_log_gvrh` contains
  10,987 structures and targets `log10(G_VRH)` in `log10(GPa)`.
- The paper defines nested five-fold cross-validation and says the outer splits
  use scikit-learn KFold with random seed `18012019`.
- The task metadata says the dataset was adapted from Materials Project data
  retrieved on 2019-04-02 and records a SHA-256 download hash.
- The GitHub repository declares MIT for the code, while the 0.6 PyPI metadata
  says “modified BSD.” The latest package release was 2022-07-27 and pins
  `matminer==0.7.4`, `scipy==1.7.3`, and `scikit-learn==1.0.1`. The repository's
  latest push observed during research was 2024-08-20.
- Current Materials Project documentation describes the resource as freely
  available but requires an API key for its current supported API client.

**BLOCKED and estimated items**

- Neither the Matbench task metadata nor code license is a clear license grant
  for the adapted dataset payload. The underlying publication and current
  Materials Project access statements do not remove the need for an explicit
  redistribution determination. Rights score: 2/5, which is a stop condition.
- Runtime and hardware depend primarily on the model and featurizer. Without
  choosing those, “run Matbench” is not a bounded benchmark. A modest classical
  baseline may take minutes to hours and hundreds of MB; this is an **ESTIMATE**,
  not a measured requirement.
- Fixed folds make metric verification possible, but data cleaning, structure
  featurization, model selection, hyperparameters, and dependency age create a
  much larger acceptance surface than Candidate A.

## Recommended benchmark contract

### Name and claim boundary

**Pinned spglib wurtzite symmetry-identification and tolerance-boundary
benchmark.**

Permitted claim:

> Under the declared input convention, dependency versions, parameters, and
> resource limits, the runner reproduced the expected discrete `spglib`
> classification and the declared metamorphic/counterexample results.

Prohibited claim:

> This proves a real sample is wurtzite, validates a scientific discovery, or
> establishes scientific acceptance.

### Deterministic baseline input

The first implementation must use the Python API and binary64 values equivalent
to the following logical input. No external file, database, account, API key,
network call, randomness, date, locale, or environment-dependent path may affect
the calculation.

```text
lattice rows (Python convention):
  [ 3.111,   0.0,                0.0 ]
  [-1.5555,  2.6942050311733885, 0.0 ]
  [ 0.0,     0.0,                4.988 ]

fractional positions:
  [0.3333333333333333, 0.6666666666666666, 0.0]
  [0.6666666666666666, 0.3333333333333333, 0.5]
  [0.3333333333333333, 0.6666666666666666, 0.6181]
  [0.6666666666666666, 0.3333333333333333, 0.1181]

species labels: [1, 1, 2, 2]
symprec: 1.0e-5
angle_tolerance: -1.0
spglib: 2.7.0
```

The lattice is the transpose required to port the upstream C example to the
documented Python row-vector convention. The eventual fixture must preserve
binary64 values explicitly and include a digest, but Prompt 2 does not create a
schema or canonicalization rule.

### Required logical outputs

The initial benchmark compares only discrete results:

| Output | Baseline expectation |
|---|---|
| Space-group number | `186` |
| International symbol | `P6_3mc` |
| Hall number | `480` |
| Symmetry-operation count | `12` |
| Atomic equivalence partition | two pairs corresponding to input sites `(0,1)` and `(2,3)` |

Raw floating transformation matrices, standardized positions, and translations
may be retained as evidence later, but they are excluded from the first pass
decision until canonical numeric comparison is approved.

### Required challenge set

| Case | Transformation | Expected discrete result | Evidence status |
|---|---|---|---|
| Baseline repeat | Run unchanged input 100 times in one process. | Every selected output is identical. | MEASURED-LOCAL at 1,000 repeats. |
| Site permutation | Reorder positions and matching species labels `[2,0,3,1]`. | `186`, `P6_3mc`, Hall `480`, 12 operations; equivalence partition is compared semantically, not by raw indices. | MEASURED-LOCAL. |
| Origin shift | Add fractional `[0.123,0.234,0.345]` to every site modulo 1. | Same selected baseline result. | MEASURED-LOCAL. |
| Sub-tolerance displacement | Add `1e-7` to site 2 fractional z. | Same selected baseline result. | MEASURED-LOCAL; domain review required. |
| Symmetry-breaking displacement | Add `1e-3` to site 2 fractional z. | `156`, `P3m1`, Hall `446`, six operations. | MEASURED-LOCAL; cross-machine and domain review required. |
| Convention error | Pass the upstream C lattice array as Python rows without transposing. | `4`, `P2_1`, Hall `6`, two operations; it must not be accepted as baseline. | MEASURED-LOCAL. |

### Pass/fail criteria

The benchmark passes only if all of the following hold:

1. dependency artifacts and the eventual input fixture match approved hashes;
2. execution occurs with network access disabled and within the resource budget;
3. the baseline returns every required discrete output;
4. 100 baseline repeats produce the same selected outputs and no error;
5. both invariance transformations preserve the semantic baseline result;
6. both perturbation cases and the convention-error case return their approved
   non-baseline/baseline results exactly;
7. a second machine in the approved matrix returns the same selected outputs;
8. the evidence records versions, platform, CPU architecture, parameters,
   duration, peak memory, input digest, output digest, and failures; and
9. the result is labeled execution verification, not scientific acceptance.

Any missing output, unexpected classification, timeout, resource breach,
network attempt, non-finite value, dependency mismatch, or disagreement between
machines is a fail. Disagreement must be preserved as a LearningEpisode and may
not be averaged away or silently widened by changing `symprec`.

### Reproducibility budget

These are proposed **ESTIMATES**, deliberately loose relative to the local
measurement. They become gates only after review and second-machine evidence.

| Resource | Proposed hard ceiling |
|---|---:|
| Setup time from an approved CPython installation | 15 minutes |
| Dependency download | 100 MiB |
| Installed environment | 500 MiB |
| Compute | 1 general-purpose CPU core; no GPU |
| Peak resident memory | 512 MiB |
| Baseline execution | 5 seconds |
| Full repeat and challenge suite | 60 seconds |
| Network during execution | 0 requests; disabled |
| Second-machine setup plus run | 30 minutes |

Candidate platform matrix: macOS arm64 and Linux x86_64 using CPython 3.11 and
published wheels. Exact Python patch version, NumPy version, wheel hashes,
container/base-image digest if used, locale, and thread environment remain
`BLOCKED` under D-022 until frozen and tested.

## Failure cases to preserve

- C/Python lattice-convention confusion returns a plausible but incorrect space
  group.
- Atom positions and species labels are permuted independently.
- Lattice is singular, contains a non-finite value, or has incompatible shape.
- Sites collapse within tolerance or a malformed cell causes API failure.
- A boundary perturbation changes classification between platforms.
- A dependency upgrade changes the Hall setting, operation count, or symbol.
- A verifier compares raw equivalence indices after atom reordering instead of
  the semantic partition.
- An implementation silently changes tolerance to obtain the expected answer.
- Execution downloads an input or dependency at run time.
- A technically passing result is presented as scientific validation.

## Expertise required for scientific acceptance

A named reviewer is required with practical expertise in computational
crystallography/materials informatics, including:

- space groups, settings, Hall and Hermann–Mauguin notation;
- fractional/cartesian and row/column lattice conventions;
- numerical tolerance behavior in symmetry finding;
- primitive/standardized cells, site equivalence, and origin changes;
- `spglib` or an independently implemented crystallographic symmetry tool; and
- designing perturbations that distinguish interface correctness from a
  scientifically meaningful symmetry claim.

This person must review the exact fixture, tolerance policy, expected challenge
outputs, and claim wording. `@chefmrfrizzle` owns recruitment and evidence
collection but cannot substitute for that independent authority.

## Blocked decisions and owners

| Decision | State | Accountable owner | Required authority/evidence |
|---|---|---|---|
| Adopt this exact workload as the first technical benchmark (D-021). | `BLOCKED_OWNER` | Protocol maintainer (`@chefmrfrizzle`) | Named computational-crystallography reviewer accepts the input convention, tolerance/challenge suite, discrete outputs, and claim boundary. |
| Freeze the executable environment and second-machine matrix (D-022). | `BLOCKED_EVIDENCE` | Protocol maintainer (`@chefmrfrizzle`) | Exact runtime/dependency/artifact hashes plus successful macOS-arm64 and Linux-x86_64 evidence; D-019 must define what counts as independent reproduction. |
| Approve scientific acceptance policy (D-018). | `BLOCKED_OWNER` | Protocol maintainer (`@chefmrfrizzle`) | Named domain reviewer and a versioned policy separating technical verification from scientific acceptance. |
| Approve reproduction independence (D-019). | `BLOCKED_OWNER` | Protocol maintainer (`@chefmrfrizzle`) | Independent security reviewer and institutional IT reviewer define operator, organization, implementation, environment, hardware, and data independence. |

## Primary source register

All web sources were checked on 2026-08-10.

### `spglib`

- [v2.7.0 README and wurtzite C example](https://github.com/spglib/spglib/blob/v2.7.0/README.md)
- [v2.7.0 BSD-3-Clause license](https://github.com/spglib/spglib/blob/v2.7.0/COPYING)
- [Python interface and tolerance definitions](https://spglib.readthedocs.io/en/v2.7.0/api/autodoc/spglib.spg.html)
- [Dataset field definitions](https://spglib.readthedocs.io/en/v2.7.0/dataset.html)
- [PyPI 2.7.0 package metadata and wheels](https://pypi.org/project/spglib/2.7.0/)
- [v2.7.0 CI workflow](https://github.com/spglib/spglib/blob/v2.7.0/.github/workflows/step_test.yaml)
- [Open-access implementation paper](https://doi.org/10.1080/27660400.2024.2384822)

### ASE

- [ASE 3.29.0 release source](https://gitlab.com/ase/ase/-/tree/3.29.0)
- [EMT implementation and limitations](https://gitlab.com/ase/ase/-/blob/3.29.0/ase/calculators/emt.py)
- [Equation-of-state implementations](https://gitlab.com/ase/ase/-/blob/3.29.0/ase/eos.py)
- [ASE 3.29.0 package metadata](https://pypi.org/project/ase/3.29.0/)
- [LGPL-2.1 license](https://gitlab.com/ase/ase/-/blob/3.29.0/COPYING.LESSER)

### Phonopy

- [Phonopy workflow](https://phonopy.github.io/phonopy/workflow.html)
- [Phonopy command behavior](https://phonopy.github.io/phonopy/phonopy.html)
- [Calculator interfaces and unit systems](https://phonopy.github.io/phonopy/interfaces.html)
- [v4.4.0 package metadata and wheels](https://pypi.org/project/phonopy/4.4.0/)
- [BSD-3-Clause license](https://github.com/phonopy/phonopy/blob/v4.4.0/LICENSE)
- [Open-access implementation paper](https://doi.org/10.1088/1361-648X/acd831)

### Matbench and Materials Project

- [Matbench v0.1 task metadata](https://github.com/materialsproject/matbench/blob/main/matbench/matbench_v0.1_dataset_metadata.json)
- [Matminer dataset provenance metadata](https://github.com/hackingmaterials/matminer/blob/main/src/matminer/datasets/dataset_metadata.json)
- [Matbench code license](https://github.com/materialsproject/matbench/blob/main/LICENSE)
- [Matbench 0.6 package metadata](https://pypi.org/project/matbench/0.6/)
- [Matbench methods paper](https://doi.org/10.1038/s41524-020-00406-3)
- [Original elastic-properties data descriptor](https://doi.org/10.1038/sdata.2015.9)
- [Current Materials Project download/access documentation](https://docs.materialsproject.org/downloading-data/how-do-i-download-the-materials-project-database)
- [Current API authentication documentation](https://docs.materialsproject.org/downloading-data/using-the-api/getting-started)

