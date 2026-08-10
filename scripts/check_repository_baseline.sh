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

while IFS= read -r -d '' tracked_path; do
  tracked_basename=${tracked_path##*/}
  case "$tracked_basename" in
    .env|.env.local|id_rsa|id_ed25519|credentials.json)
      echo "Forbidden credential basename is tracked: $tracked_path" >&2
      exit 1
      ;;
  esac
done < <(git ls-files -z)

secret_pattern='-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----|AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}'
if git grep -nE -- "$secret_pattern"; then
  echo 'A credential-like value is tracked. Remove and rotate it before continuing.' >&2
  exit 1
fi

base_sha=${BASE_SHA:-}
head_sha=${HEAD_SHA:-HEAD}
zero_sha=0000000000000000000000000000000000000000

if [[ -n "$base_sha" && "$base_sha" != "$zero_sha" ]] \
  && git cat-file -e "${base_sha}^{commit}" 2>/dev/null \
  && git cat-file -e "${head_sha}^{commit}" 2>/dev/null; then
  git diff --check "${base_sha}...${head_sha}"
else
  git diff-tree -r --check --root -m "$head_sha"
fi

echo 'Repository baseline passed.'
