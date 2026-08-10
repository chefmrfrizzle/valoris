# Research Reliability Graph

## Purpose

The Research Reliability Graph (RRG) is structured memory of **how reliably scientific work has been produced** across many executions, reproductions, failures, environments, and releases.

The Evidence Graph answers: **Where did this result come from?**

The RRG answers: **Under which combinations of method, data, software, hardware, verifier, and operating conditions has this type of work been reliable before?**

## Core nodes

- WorkloadFamily
- ProblemPassport
- TaskAdapterVersion
- SolverImplementation
- ProgramBuild
- DatasetVersion / DatasetLineage
- ExecutionEnvironment
- CompilerToolchain
- HardwareClass
- VerificationPolicyVersion
- TolerancePolicyVersion
- SchedulerPolicyVersion
- ExecutionReceipt
- VerificationReceipt
- ReproductionAttempt
- Challenge
- Counterexample
- SecurityFinding
- OperatorIncident
- LearningEpisode
- ChangeProposal
- Release

## Core edges

- DERIVED_FROM
- EXECUTED_WITH
- VERIFIED_BY
- REPRODUCED_BY
- FAILED_UNDER
- CHALLENGED_BY
- INVALIDATED_BY
- IMPROVED_BY
- REGRESSED_FROM
- SUPERSEDES
- DEPENDS_ON
- OBSERVED_IN
- RELEASED_AS

## What it learns

The graph may record measured evidence such as:
- completion rate;
- verification disagreement;
- reproduction rate;
- numerical-instability events;
- runtime variance;
- resource failures;
- security-incident linkage;
- regression-test linkage.

Do not collapse these into one universal "truth score."

## Agent rule

Agents may use the RRG to propose:
- safer TaskAdapters;
- additional tests;
- better solver/environment choices;
- scheduler improvements;
- UI warnings;
- additional reproduction requirements.

Agents may not:
- delete failures;
- rewrite historical receipts;
- lower acceptance thresholds just to make results pass;
- change scientific maturity without required evidence;
- bypass policy/ADR gates.

The RRG is **memory for improvement, not autonomous authority**.
