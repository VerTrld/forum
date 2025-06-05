# 1. Use official Node.js image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy all files
COPY . .

# 5. Build the app
RUN npm run build

# 6. Expose the default Next.js port
EXPOSE 3000

# 7. Start Next.js in production mode
CMD ["npm", "start"]
