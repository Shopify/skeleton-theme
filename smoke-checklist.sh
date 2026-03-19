#!/usr/bin/env bash

set -euo pipefail

echo "Running smoke checklist..."

echo "1) Typecheck"
bun run typecheck

echo "2) Build"
bun run build

echo "3) Theme check (optional local)"
if command -v theme-check >/dev/null 2>&1; then
  theme-check
elif command -v shopify >/dev/null 2>&1; then
  shopify theme check
else
  echo "theme-check not available locally; rely on CI Theme Check job"
fi

echo "4) Generated asset consistency"
git diff --exit-code -- assets snippets/vite-tag.liquid

echo "Smoke checklist passed."
