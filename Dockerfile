# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
