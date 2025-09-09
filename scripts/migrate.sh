#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "ERROR: DATABASE_URL is not set. Aborting." >&2
  exit 1
fi

echo "Running Drizzle migrations against: $DATABASE_URL"
npm run db:push

echo "Done."

