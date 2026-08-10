#!/usr/bin/env bash
set -euo pipefail

required_files=(
  .github/CODEOWNERS
  AGENTS.md
  README.md
  SECURITY.md
  docs/PUBLIC_PRIVATE_BOUNDARY.md
  docs/SECURITY_ARCHITECTURE.md
  policies/DATA_CLASSIFICATION.md
  policies/RELEASE_GATES.md
)

for required_file in "${required_files[@]}"; do
  if [[ ! -f "$required_file" ]]; then
    echo "Missing required trust-boundary file: $required_file" >&2
    exit 1
  fi
done

if grep -q '@protocol-maintainers\|@security-maintainers' .github/CODEOWNERS; then
  echo 'CODEOWNERS still contains unenforceable placeholder teams.' >&2
  exit 1
fi

for forbidden_path in .env .env.local id_rsa id_ed25519 credentials.json; do
  if git ls-files --error-unmatch "$forbidden_path" >/dev/null 2>&1; then
    echo "Forbidden credential path is tracked: $forbidden_path" >&2
    exit 1
  fi
done

secret_pattern='-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----|AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}'
if git grep -nE -- "$secret_pattern"; then
  echo 'A credential-like value is tracked. Remove and rotate it before continuing.' >&2
  exit 1
fi

git diff-tree --check --root HEAD
echo 'Repository baseline passed.'
