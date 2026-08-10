# Counterexample Track

## Purpose

Important scientific claims receive an explicit attempt to discover **how they could be wrong**.

```text
Primary Claim
   ├── Supporting Evidence Track
   └── Counterexample Track
```

## Questions the track asks

- Under which declared boundary conditions does the result fail?
- Can an independent implementation disagree?
- Does a different permitted dataset invalidate or narrow the result?
- Does numerical precision materially change the result?
- Does another runtime/hardware combination reproduce it?
- Are hidden assumptions required?
- Can a verifier pass something that domain review rejects?

## First-class objects

- Challenge
- ChallengeHypothesis
- CounterexampleCandidate
- BoundaryCondition
- ReproductionAttempt
- FailureEvidence
- ChallengeResolution
- ClaimStateTransition

## Possible outcomes

A valid challenge may:
- leave a claim unchanged;
- narrow the claim;
- require additional reproduction;
- mark the claim DISPUTED;
- invalidate an implementation;
- invalidate a verifier;
- create a TaskAdapter validation rule;
- create a permanent regression/adversarial test.

Historical evidence is never deleted.

## Incentives

Where challenge work is funded, payment is for accepted evidence work, not speculation on whether a claim succeeds or fails.
