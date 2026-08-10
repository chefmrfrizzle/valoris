# Public / Private / Restricted Boundary

## Public protocol

Open-source the components outsiders need to inspect to trust correctness:
- specifications;
- schemas/canonicalization;
- signing/hashing formats;
- TaskAdapter and VerificationPolicy interfaces;
- reproducibility states;
- Contribution Receipt format;
- Research Reliability Graph;
- Counterexample Track;
- reference components;
- SDKs;
- golden vectors;
- synthetic benchmarks;
- public threat model;
- ADRs.

## Private control plane

Keep private:
- customer/sponsor data;
- private research questions;
- protected datasets/connectors;
- proprietary adapters;
- enterprise connectors;
- private evaluation corpora;
- commercial analytics;
- internal research rankings.

## Restricted security/ops

More tightly controlled:
- access-control design;
- deployment topology;
- incident records;
- private vulnerability intelligence;
- security runbooks;
- key-management policy;
- backup/recovery policy.

## Outside Git

Never intentionally commit production:
- private keys;
- seed phrases;
- passwords;
- access tokens;
- database/cloud credentials;
- signing secrets.

Public verification MUST NOT depend on private source code.
