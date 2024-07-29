ARG NODE_VERSION=21.6.2

FROM node:${NODE_VERSION}-alpine

WORKDIR /comment-api

COPY . .

RUN yarn install

EXPOSE 3001

CMD yarn start
