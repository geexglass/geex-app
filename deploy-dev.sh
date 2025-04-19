#!/usr/bin/env bash
set -euo pipefail

# Usage: deploy-dev.yml.sh [repo_dir] [branch]
#   repo_dir defaults to /home/opc/app
#   branch   defaults to "dev"
REPO_DIR="${1:-/home/opc/app}"
BRANCH="${2:-dev}"

cd "$REPO_DIR"

# Load environment variables, if you have a .env file here
if [ -f .env ]; then
  set -o allexport
  # shellcheck disable=SC1091
  source .env
  set +o allexport
fi

# Pull latest from GitHub (uses the deploy key you installed as a repo-level key)
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

# Bring up containers
docker-compose up -d
