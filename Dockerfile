# -------- STAGE 1: Build --------
    FROM node:18-alpine AS builder

    # Install pnpm
    RUN npm install -g pnpm
    
    # Set working directory
    WORKDIR /app
    
    # Copy package files and install dependencies
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --frozen-lockfile
    
    # Copy the rest of the application and build it
    COPY . .
    RUN pnpm build
    
    # -------- STAGE 2: Run (smaller image) --------
    FROM node:18-alpine
    
    # Install pnpm
    RUN npm install -g pnpm
    
    WORKDIR /app
    
    # Copy only what's needed for production runtime
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/package.json ./package.json
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/next.config.js ./next.config.js
    
    # Expose port
    EXPOSE 3000
    
    # Start the app
    CMD ["pnpm", "start"]
    