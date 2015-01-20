FROM node:0.10.35
ADD . /code
WORKDIR /code
RUN npm install
CMD npm test
