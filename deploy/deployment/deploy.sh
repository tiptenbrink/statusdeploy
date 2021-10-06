# Prepare env variables from .env
cd deployment || exit
set -a
source .env
# Pull the image and run it
docker compose pull
docker compose up -d