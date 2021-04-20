FROM node:14

# Create app directory
WORKDIR /api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /api/

RUN npm install
RUN npm install -g --save nodemon
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /api/

EXPOSE 9000
CMD [ "nodemon", "app.js" ]
