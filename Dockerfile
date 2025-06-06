# Use Node.js Alpine base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set environment variables (build-time and runtime)
ARG NEXT_PUBLIC_API_URL
ARG AUTH_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV AUTH_URL=$AUTH_URL

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Optional: log env vars to confirm they're set (debug)
RUN echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" && \
    echo "AUTH_URL=$AUTH_URL"

# Build the Next.js app (NEXT_PUBLIC_* vars are baked here)
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
