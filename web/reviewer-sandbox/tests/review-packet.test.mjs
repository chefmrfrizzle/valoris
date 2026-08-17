import assert from "node:assert/strict";
import test from "node:test";

import { createReviewPacket, formatReviewPacket, REVIEW_FIXTURE_VERSION } from "../src/reviewPacket.js";

const role = { label: "Cryptography" };
const feedback = {
  recommendation: "Revise the packet",
  clear: "The downgrade boundary is visible.",
  concerns: "Suite selection is unresolved.",
  blocked: "Cryptographic suite selection remains BLOCKED_UNVERIFIED.",
  conflictDisclosed: true,
};

test("creates a role-aware synthetic handoff packet", () => {
  const packet = createReviewPacket(role, feedback);

  assert.equal(packet.classification, "DEMO/SYNTHETIC");
  assert.equal(packet.fixtureVersion, `${REVIEW_FIXTURE_VERSION} (DEMO)`);
  assert.equal(packet.reviewerPerspective, "Cryptography (DEMO)");
  assert.equal(packet.conflictDisclosure, "Reviewed (DEMO)");
  assert.match(packet.blockedDecisions, /BLOCKED_UNVERIFIED/);
});

test("preserves the non-approval boundaries in text output", () => {
  const summary = formatReviewPacket(createReviewPacket(role, feedback));

  assert.match(summary, /DEMO \/ SYNTHETIC/);
  assert.match(summary, /BLOCKED_UNVERIFIED/);
  assert.match(summary, /No scientific, security, production-readiness, or independence approval/);
});

test("does not introduce a timestamp or persistent identity", () => {
  const packet = createReviewPacket(role, feedback);

  assert.equal("generatedAt" in packet, false);
  assert.equal("reviewerId" in packet, false);
  assert.equal("email" in packet, false);
});
