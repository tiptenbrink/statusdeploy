#!/bin/bash
# $0 is argument 0, which is always the script path
# % is a type of Parameter Expansion
# '/*' matches the last '/' and so %/* will remove everything after it
cd "${0%/*}" || exit
# This ensures all env variables are exported so env variables used in .env (like $HOME) are properly expanded when the
# env files are consumed by e.g. docker compose
set -a
# Load environment variables from .env file
. .env
# Pull the image from Docker Hub
docker compose pull
# Run the docker-compose.yml
docker compose up -d
