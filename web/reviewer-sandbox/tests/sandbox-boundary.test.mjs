import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

test("keeps the global synthetic warning and blocked cryptography state", () => {
  assert.match(appSource, /DEMO \/ SYNTHETIC — NO SCIENTIFIC OR INDEPENDENCE CLAIMS/);
  assert.match(appSource, /Cryptography: BLOCKED_UNVERIFIED/);
  assert.match(appSource, /All cryptographic choices remain BLOCKED_UNVERIFIED/);
});

test("does not add transport, uploads, or browser persistence", () => {
  const forbiddenPatterns = [
    /\bfetch\s*\(/,
    /\bXMLHttpRequest\b/,
    /\bWebSocket\b/,
    /type=["']file["']/,
    /\blocalStorage\b/,
    /\bsessionStorage\b/,
  ];

  for (const pattern of forbiddenPatterns) {
    assert.doesNotMatch(appSource, pattern);
  }
});

test("limits runtime dependencies to static interface libraries", () => {
  assert.deepEqual(
    Object.keys(packageJson.dependencies).sort(),
    ["@phosphor-icons/react", "@vitejs/plugin-react", "react", "react-dom", "vite"].sort(),
  );
});

test("keeps structured feedback local until an explicit download", () => {
  assert.match(appSource, /Nothing was sent or uploaded/);
  assert.match(appSource, /URL\.createObjectURL/);
  assert.match(appSource, /link\.download = "valoris-demo-review-handoff\.json"/);
  assert.match(appSource, /setTimeout\(\(\) => URL\.revokeObjectURL\(href\), 0\)/);
  assert.match(appSource, /Reset DEMO session/);
  assert.match(appSource, /Copy DEMO handoff/);
  assert.doesNotMatch(appSource, /<form[^>]+action=/);
});
