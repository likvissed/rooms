ARG NODE_MAJOR
FROM ***REMOVED***/registry/languages/nodejs/node:${NODE_MAJOR}-buster-slim

ARG APP_ROOT
ARG NEST_CLI_VERSION
ARG NG_CLI_VERSION

WORKDIR ${APP_ROOT}

ENV DEBIAN_FRONTEND noninteractive

# Common development packages
RUN set -xe && \
    apt-get update -qq && apt-get install -yq --no-install-recommends \
    ca-certificates \
    curl \
    less \
    \
    mc \
    \
    && \
    \
    apt-get clean && \
    rm -rf /var/cache/apt/archives/* && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    truncate -s 0 /var/log/*log

RUN set -xe && \
    \
    echo "cd ${APP_ROOT}" >> /root/.profile

# Install nest & ng
RUN set -xe && \
    yarn global add @nestjs/cli@${NEST_CLI_VERSION} && \
    yarn global add @angular/cli@${NG_CLI_VERSION} && \
    ng config -g cli.packageManager yarn

STOPSIGNAL SIGTERM
