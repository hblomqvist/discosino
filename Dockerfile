# Base stage
FROM node:16-bullseye-slim AS base

WORKDIR /usr/src/bot

RUN apt-get update && apt-get install -y --no-install-recommends \
	dumb-init \
	procps \
	&& rm -rf /var/lib/apt/lists/*

ENTRYPOINT [ "dumb-init", "--" ]

# Pre-build stage
FROM base as prebuild

COPY --chown=node:node .yarn/ .yarn/
COPY --chown=node:node scripts/ scripts/
COPY --chown=node:node \
	.yarnrc.yml \
	package.json \
	yarn.lock \
	./

# Build stage
FROM prebuild AS build

ENV HUSKY=0

COPY --chown=node:node src/ src/
COPY --chown=node:node \
	tsconfig.json \
	tsup.config.json \
	./

RUN yarn install --immutable \
	&& yarn build

# Production stage
FROM prebuild AS prod

ENV NODE_ENV=production

COPY --chown=node:node --from=build /usr/src/bot/dist/ dist/

RUN yarn workspaces focus --all --production \
	&& chown node:node /usr/src/bot/

USER node

CMD [ "yarn", "start" ]
