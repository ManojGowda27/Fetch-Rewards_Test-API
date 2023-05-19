# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose the port that the application listens on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]