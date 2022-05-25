# Base stage
FROM node:18-alpine AS base

WORKDIR /bot

RUN apk add --no-cache \
	dumb-init \
	procps

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

COPY --chown=node:node --from=build /bot/dist/ dist/

RUN yarn workspaces focus --all --production \
	&& chown node:node /bot/

USER node

CMD [ "yarn", "start" ]
