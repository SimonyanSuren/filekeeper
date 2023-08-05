# BUILD FOR LOCAL DEVELOPMENT

FROM node:18.16.1-bullseye-slim AS development

RUN apt-get update && apt-get install -y procps

USER node

WORKDIR /home/node/filekeeper-api

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node . .


# BUILD FOR PRODUCTION

FROM node:18.16.1-bullseye-slim AS build

USER node

WORKDIR /home/node/filekeeper-api

COPY --chown=node:node --from=development /home/node/filekeeper-api ./

RUN npm run build

ENV NODE_ENV production


# PRODUCTION: Running the application:

FROM node:18.16.1-bullseye-slim AS production

USER node

WORKDIR /home/node/filekeeper-api

COPY --chown=node:node --from=build /home/node/filekeeper-api/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/filekeeper-api/dist ./dist
COPY --chown=node:node --from=build /home/node/filekeeper-api/assets ./assets
COPY package.json ./ 

