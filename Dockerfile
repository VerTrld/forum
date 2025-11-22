# syntax=docker/dockerfile:1
FROM node:22.9.0-alpine AS base

# Install libc6-compat for Node compatibility
RUN apk add --no-cache libc6-compat

WORKDIR /app

# -------------------------------
# Stage 1: Install dependencies
# -------------------------------
FROM base AS deps
COPY package.json package-lock.json* ./ 
RUN npm install --force

# -------------------------------
# Stage 2: Build the app
# -------------------------------
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Set build-time environment variables
ENV NEXT_PUBLIC_API_URL=https://forum-ws.univerapp.site
ENV NEXTAUTH_URL=https://forum.univerapp.site
ENV NEXT_PUBLIC_APP_URL=https://forum.univerapp.site

RUN npm run build

# -------------------------------
# Stage 3: Production image
# -------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXTAUTH_URL=https://forum.univerapp.site
ENV NEXT_PUBLIC_API_URL=https://forum-ws.univerapp.site
ENV NEXT_PUBLIC_APP_URL=https://forum.univerapp.site

# Create user for non-root execution
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public files
COPY --from=builder /app/public ./public

# Prepare .next folder
RUN mkdir .next && chown nextjs:nodejs .next

# Copy standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./ 
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
