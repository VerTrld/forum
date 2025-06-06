FROM node:18-alpine

WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG AUTH_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV AUTH_URL=$AUTH_URL

COPY package*.json ./
RUN npm install

COPY . .

RUN echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" > .env.local && \
    echo "AUTH_URL=$AUTH_URL" >> .env.local

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

