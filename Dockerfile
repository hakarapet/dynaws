# Download alpine OS with nodejs 8 preinstalled
FROM node:8-alpine

# Create user node, so the default user won't be the root
USER node

# Create a working directory
RUN mkdir /home/node/app

# Assign working directory
WORKDIR /home/node/app

# Copy the code into working directory
COPY . /home/node/app

# Install dependencies
RUN npm install --production

# Command to run the node service
CMD ["npm", "start"]

# Expose port 8000 to be able to connect from outside of the container
EXPOSE 8000
