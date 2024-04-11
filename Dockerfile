FROM cypress/base:18.12.0

RUN mkdir /app
WORKDIR /app

COPY . /app
RUN npm install --save-dev cypress

RUN $(npm bin)/cypress verify

RUN ["npm", "run","test:e2e"]