# ADR-0014 — Reproduction Independence Profiles

- **Status:** Proposed; policy adoption remains `BLOCKED_OWNER` under D-019
- **Date:** 2026-08-10
- **Decision owner:** Protocol maintainer (`@chefmrfrizzle`)
- **Required reviewers:** Independent security reviewer, institutional IT reviewer, and workload-domain reviewer

## Context

"Ran twice" is not the same as independently reproduced. Independence can vary
by person, organization, implementation, environment, hardware, and data. A
single label that hides those dimensions would overstate scientific evidence.

The [National Academies](https://nap.nationalacademies.org/catalog/25303/reproducibility-and-replicability-in-science)
and [ACM artifact-review policy](https://www.acm.org/publications/policies/artifact-review-and-badging-current)
use carefully defined but not identical reproduction/replication vocabulary.
Valoris therefore needs explicit local terms and a mapping to external claims.

## Proposed decision

Every reproduction assertion would record, rather than infer:

- human operator identity and conflict disclosure;
- controlling organization and common-control relationship;
- sponsor, funding, employment, and supervision relationships relevant to
  independence;
- implementation provenance and whether code was independently written;
- execution environment, operating system, architecture, and dependency lock;
- physical/virtual hardware and infrastructure operator;
- data/input source and whether it was independently acquired;
- verification policy, reviewer identity, and domain qualifications; and
- communications or assistance received from the original authors.

The evidence would then report each dimension plus one of these proposed local
profiles:

| Profile | Minimum claim |
|---|---|
| **I0 — Replay** | Same controlling party may reuse the same implementation, data, and environment. Demonstrates repeat execution only. |
| **I1 — Second-environment confirmation** | Same controlling party and artifacts run in a materially different declared machine/environment. Useful portability evidence, but not independent-person reproduction. |
| **I2 — External-operator reproduction** | A different qualified human outside the original author's direct control uses separate credentials and environment. Author implementation and data may be used and must be disclosed. Organizational, funding, and common-control independence remain separate dimensions. |
| **I3 — Independent-implementation reproduction** | I2 plus an independently developed implementation of the declared method, with provenance showing it was not a repackaging of author code. This label establishes implementation independence only; it does not by itself establish organizational or funding independence. |
| **I4 — External replication/validation** | An independent team uses independently acquired data, experiment, or study design to address the same scientific question under domain-specific policy. Outside the first technical slice. |

These labels are proposals, not adopted policy. A result receives only the
highest profile for which every required dimension has evidence. Missing or
conflicting evidence lowers the claim or leaves it unclassified; it never
defaults upward.

A second GitHub account, process, agent, container, or machine under the same
human or organizational control does not establish independent-person or
independent-organization review. Account separation can satisfy a repository
workflow control while remaining I0 or I1 scientific evidence.

No proposed profile currently authorizes the unqualified product claim
"independently reproduced." I1 must be described only as second-environment
confirmation. I2 establishes an external operator but can still involve shared
organizational control, funding, supervision, or conflicts. I3 adds
implementation independence but can retain those same conflicts. D-019 must
define the minimum dimensional evidence for any unqualified independence claim.
Scientific acceptance and external validation remain separate decisions even
after I2 or I3 succeeds.

The profile label is never a substitute for its dimension vector. Interfaces
and receipts must display material common-control and conflict disclosures next
to the label and must not hide a failed dimension behind an aggregate score.

Independence evidence can itself be sensitive. The future policy must minimize
personal data, prefer scoped attestations over publishing raw identity or
employment records, separate public claims from restricted conflict evidence,
and define access, retention, appeal, and correction paths. Those mechanisms are
not selected here.

## Benchmark application

For the proposed `spglib` benchmark:

- the existing one-machine repeated runs are I0 evidence;
- a run by the maintainer on Linux-x86_64 would be I1 if the environment is
  materially different and fully recorded;
- I2 requires a qualified person outside the maintainer's direct control, but
  does not by itself establish organizational or funding independence;
- I3 additionally requires an independently developed implementation or
  independently justified equivalent method; and
- I4 is not claimed by a synthetic symmetry-classification fixture.

D-019 still decides the accepted definitions and D-018 still decides scientific
acceptance. This ADR does not resolve either decision.

## Required evidence before acceptance

1. Independent reviewers test the profiles against university, contract lab,
   cloud, sponsor-funded, open-source, and solo-founder scenarios.
2. Conflict-of-interest and common-control rules have objective disclosure and
   escalation paths without collecting unnecessary personal data or exposing
   restricted relationship evidence publicly.
3. The selected benchmark is executed on the approved second-machine matrix and
   reviewed by a named domain expert.
4. UI and receipts expose dimensional evidence and never compress an I0/I1 run
   into an independence claim.
5. Appeals, disputes, compromised identities, and undisclosed relationships
   create append-only counterevidence rather than deleting earlier receipts.

## Alternatives not selected

- **Binary independent/not-independent field:** conceals which dimensions
  actually changed.
- **Different machine equals independent:** confuses portability with human and
  organizational independence.
- **Different account equals independent:** account separation does not prove a
  different controller.
- **External operator equals fully independent:** the operator can still share
  employer, funding, supervision, infrastructure, or implementation dependence.
- **Successful reproduction equals scientific acceptance:** computational
  consistency is necessary evidence, not a vote that makes a claim true.

## Non-goals

This ADR does not approve independence policy, scientific-acceptance policy,
identity verification, a benchmark, payment eligibility, or production
implementation.
