FROM node:14

# Create app directory
WORKDIR ${DOCKER_WEB_WORKDIR}

COPY ["package.json", "package-lock.json*", "./"]

# 1. Install npm packages
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Install global nodemon
RUN npm install -g nodemon

# 2. Start server 
CMD ["nodemon", "server.js"]