ARG NODE_VERSION=21.6.2

FROM node:${NODE_VERSION}-alpine

WORKDIR /user-api

COPY . .

RUN yarn install

EXPOSE 3002

CMD yarn start