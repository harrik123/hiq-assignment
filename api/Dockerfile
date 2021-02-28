FROM node:15.10.0-alpine AS BUILD_IMAGE

RUN apk update && apk add curl bash
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm prune --production
RUN /usr/local/bin/node-prune

FROM node:15.10.0-alpine

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/app/.env ./.env
COPY --from=BUILD_IMAGE /usr/src/app/storage ./storage

EXPOSE 4000

CMD [ "node", "dist/server.js" ]
