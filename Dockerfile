# Base stage
FROM node:18-alpine AS base

WORKDIR /bot

RUN apk add --no-cache \
	build-base \
	dumb-init \
	python3 \
	openssl1.1-compat \
	&& chown node:node /bot

USER node

COPY --chown=node:node .yarn/ .yarn/
COPY --chown=node:node prisma/ prisma/
COPY --chown=node:node scripts/ scripts/
COPY --chown=node:node \
	.yarnrc.yml \
	package.json \
	yarn.lock \
	./

ENTRYPOINT [ "dumb-init", "--" ]

# Pre-build stage
FROM base as prebuild

ENV HUSKY=0

COPY --chown=node:node \
	tsconfig.json \
	tsup.config.json \
	./

RUN yarn install --immutable

# Build stage
FROM prebuild AS build

COPY --chown=node:node src/ src/

RUN yarn build

# Production stage
FROM base AS prod

ENV NODE_ENV=production

COPY --chown=node:node --from=build /bot/dist/ dist/

RUN yarn workspaces focus --all --production

CMD [ "yarn", "start:migrate" ]
