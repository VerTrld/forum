# Use lightweight Node.js Alpine base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Declare build arguments
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_AUTH_URL

# Set environment variables for runtime (and build time)
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_AUTH_URL=$NEXT_PUBLIC_AUTH_URL

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Optional: print env vars for debugging during build
RUN echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" && \
    echo "NEXT_PUBLIC_AUTH_URL=$NEXT_PUBLIC_AUTH_URL"

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
