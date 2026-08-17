export const REVIEW_FIXTURE_VERSION = "reviewer-sandbox-demo-v1";

function demoValue(value, fallback = "Not provided") {
  const normalized = typeof value === "string" ? value.trim() : "";
  return `${normalized || fallback} (DEMO)`;
}

export function createReviewPacket(role, feedback) {
  return {
    classification: "DEMO/SYNTHETIC",
    fixtureVersion: `${REVIEW_FIXTURE_VERSION} (DEMO)`,
    reviewerPerspective: demoValue(role?.label, "Reviewer"),
    recommendation: demoValue(feedback.recommendation),
    clearEvidence: demoValue(feedback.clear),
    concerns: demoValue(feedback.concerns),
    blockedDecisions: demoValue(feedback.blocked),
    conflictDisclosure: feedback.conflictDisclosed ? "Reviewed (DEMO)" : "Not reviewed (DEMO)",
    boundaries: [
      "Training feedback only (DEMO)",
      "Cryptographic suite selection remains BLOCKED_UNVERIFIED",
      "No scientific, security, production-readiness, or independence approval",
    ],
  };
}

export function formatReviewPacket(packet) {
  return [
    "VALORIS REVIEW HANDOFF — DEMO / SYNTHETIC",
    `Fixture: ${packet.fixtureVersion}`,
    `Perspective: ${packet.reviewerPerspective}`,
    `Recommendation: ${packet.recommendation}`,
    "",
    `Clear evidence: ${packet.clearEvidence}`,
    `Concerns: ${packet.concerns}`,
    `Blocked decisions: ${packet.blockedDecisions}`,
    `Conflict disclosure: ${packet.conflictDisclosure}`,
    "",
    "Boundaries:",
    ...packet.boundaries.map((boundary) => `- ${boundary}`),
  ].join("\n");
}
