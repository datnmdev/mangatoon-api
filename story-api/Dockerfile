ARG NODE_VERSION=21.6.2

FROM node:${NODE_VERSION}-alpine

WORKDIR /story-api

COPY . .

RUN yarn install

EXPOSE 3000

CMD yarn start
