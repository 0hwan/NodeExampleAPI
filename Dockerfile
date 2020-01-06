FROM node:11-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN apk --no-cache add python make g++

RUN mkdir -p /usr/src/NodeExampleAPI
WORKDIR /usr/src/NodeExampleAPI
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
