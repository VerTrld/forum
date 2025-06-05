# Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Start the app
CMD ["npm", "run", "start:prod"]
