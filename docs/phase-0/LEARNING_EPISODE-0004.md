# LearningEpisode 0004 — Benchmark Selection and Convention Counterexample

- **Trigger:** Prompt 1 was approved from the separate `@11BUSD` account under
  the disclosed solo-maintainer exception, merged without administrator bypass,
  and Prompt 2 was authorized to compare safe computational-materials
  benchmarks. This was account separation, not independent-person assurance.
- **Inputs:** Current primary project sources for `spglib`, ASE, phonopy,
  Matbench, matminer, and Materials Project; the Phase 0 decision criteria; and
  a disposable local measurement environment.
- **Observation:** A literal Python copy of `spglib`'s upstream C wurtzite
  lattice returned space group 4 (`P2_1`) instead of the upstream expected 186
  (`P6_3mc`). The Python API documents basis vectors as rows, so the C lattice
  must be transposed. With the transpose, the expected result returned and was
  stable for 1,000 local repetitions.
- **Failure evidence preserved:** The untransposed input is retained as a required
  negative fixture. It demonstrates a realistic interface-convention failure
  that returns a plausible result instead of an exception.
- **Decision:** Recommend exactly one first workload: pinned `spglib` wurtzite
  symmetry classification with invariance, tolerance-boundary, and convention
  challenges. Keep adoption, environment freezing, scientific acceptance, and
  independent reproduction blocked under D-021, D-022, D-018, and D-019.
- **Rejected shortcuts:** Treating a code license as a dataset license; claiming
  model runtime without choosing a model; bundling external force generation
  into a phonopy post-processing estimate; or calling one-machine stability
  independent reproduction.
- **Validation required next:** Domain review of the exact fixture and claim;
  hashed environment lock; second-machine evidence; and review/merge of the
  proposed ADR before any implementation prompt starts.
- **Promotion decision:** Prompt 2 documentation may be reviewed. Prompt 3 and
  all implementation remain gated; ADR-0009 does not automatically authorize
  them.
