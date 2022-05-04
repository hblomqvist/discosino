# Base stage
FROM node:16-bullseye-slim AS base

WORKDIR /usr/src/bot

ENV CI=true

RUN apt-get update && apt-get install -y \
	build-essential \
	python3 \
	dumb-init \
	&& rm -rf /var/lib/apt/lists/*

COPY --chown=node:node .yarn/ .yarn/
COPY --chown=node:node \
	.yarnrc.yml \
	package.json \
	yarn.lock \
	./

ENTRYPOINT [ "dumb-init", "--" ]

# Build stage
FROM base AS build

COPY --chown=node:node src/ src/
COPY --chown=node:node \
	tsconfig.json \
	tsup.config.json \
	./

RUN yarn install --immutable && yarn build

# Production stage
FROM base AS prod

ENV NODE_ENV=production

COPY --chown=node:node --from=build /usr/src/bot/dist/ dist/

RUN yarn workspaces focus --all --production
RUN chown node:node /usr/src/bot/

USER node

CMD [ "yarn", "start" ]
