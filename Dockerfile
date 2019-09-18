FROM node:alpine

MAINTAINER xpioneer

COPY . /app

WORKDIR /app

RUN npm install pm2 -g
RUN yarn && yarn build

EXPOSE 8100

CMD ['yarn', 'start:prod']