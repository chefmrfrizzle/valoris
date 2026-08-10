#!/usr/bin/env bash
set -euo pipefail

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
baseline_script="$repo_root/scripts/check_repository_baseline.sh"
test_root=$(mktemp -d "${TMPDIR:-/tmp}/valoris-public-baseline.XXXXXX")

cleanup() {
  if [[ -n "${test_root:-}" && -d "$test_root" ]]; then
    rm -rf -- "$test_root"
  fi
}
trap cleanup EXIT

credential_repo="$test_root/credential-path"
git clone --quiet --no-hardlinks "$repo_root" "$credential_repo"

for forbidden_basename in .env .env.local id_rsa id_ed25519 credentials.json; do
  forbidden_path="nested/config/$forbidden_basename"
  mkdir -p "$credential_repo/nested/config"
  printf 'synthetic-placeholder\n' > "$credential_repo/$forbidden_path"
  git -C "$credential_repo" add -f -- "$forbidden_path"

  if output=$(cd "$credential_repo" && "$baseline_script" 2>&1); then
    echo "Expected tracked $forbidden_path to fail the repository baseline." >&2
    exit 1
  fi
  if [[ "$output" != *"Forbidden credential basename is tracked: $forbidden_path"* ]]; then
    echo "Credential-path failure did not identify $forbidden_path." >&2
    echo "$output" >&2
    exit 1
  fi

  git -C "$credential_repo" rm -f -- "$forbidden_path" >/dev/null
done

mkdir -p "$credential_repo/nested/config"
printf 'DOCUMENTED_VALUE=replace-me\n' > "$credential_repo/nested/config/.env.example"
git -C "$credential_repo" add -f -- nested/config/.env.example
(cd "$credential_repo" && "$baseline_script" >/dev/null)

diff_repo="$test_root/full-diff"
git clone --quiet --no-hardlinks "$repo_root" "$diff_repo"
git -C "$diff_repo" config user.name 'Baseline Regression Test'
git -C "$diff_repo" config user.email 'baseline-test@example.invalid'
base_sha=$(git -C "$diff_repo" rev-parse HEAD)
mkdir -p "$diff_repo/nested"
printf 'trailing whitespace   \n' > "$diff_repo/nested/trailing.txt"
git -C "$diff_repo" add nested/trailing.txt
git -C "$diff_repo" commit --quiet -m 'Add nested whitespace fixture'
printf 'clean head commit\n' > "$diff_repo/nested/clean.txt"
git -C "$diff_repo" add nested/clean.txt
git -C "$diff_repo" commit --quiet -m 'Add clean head fixture'
head_sha=$(git -C "$diff_repo" rev-parse HEAD)

if output=$(cd "$diff_repo" && BASE_SHA="$base_sha" HEAD_SHA="$head_sha" "$baseline_script" 2>&1); then
  echo 'Expected the complete-diff whitespace regression to fail.' >&2
  exit 1
fi
if [[ "$output" != *'trailing whitespace'* ]]; then
  echo 'Complete-diff failure did not report trailing whitespace.' >&2
  echo "$output" >&2
  exit 1
fi

echo 'Repository baseline regression tests passed.'
