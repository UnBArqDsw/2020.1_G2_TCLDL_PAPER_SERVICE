FROM node:lts-alpine3.9

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn

CMD ["sh", "-c", "yarn && yarn start:dev"]