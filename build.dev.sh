#!/bin/bash -xe
docker-compose -f "docker-compose.dev.yml" -p rooms-js-dev down
DOCKER_BUILDKIT=1 docker-compose -f "docker-compose.dev.yml" -p rooms-js-dev up -d --build
