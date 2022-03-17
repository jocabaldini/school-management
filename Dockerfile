# Multi-stage docker builds
# https://medium.com/trendyol-tech/how-we-reduce-node-docker-image-size-in-3-steps-ff2762b51d5a
FROM node:16-alpine AS BUILD_IMAGE

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g nodemon
# If you are building your code for production
# RUN npm ci --only=production

FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

#EXPOSE 3005
#CMD [ "./node_modules/nodemon/bin/nodemon.js", "index.js" ]