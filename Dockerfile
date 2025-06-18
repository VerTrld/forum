FROM node:22.9.0-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_URL

COPY package.json ./
RUN npm install

COPY . .

ENV NEXT_PUBLIC_API_URL=http://128.199.250.178:3001

RUN npm run build

FROM node:22.9.0-alpine
WORKDIR /app

ENV NEXT_PUBLIC_API_URL=http://128.199.250.178:3001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["npm", "start"]
