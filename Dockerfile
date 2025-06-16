# Base image na gagamitin
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json at package-lock.json papuntang container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy ang lahat ng files from local to container
COPY . .

# Expose the port na gagamitin ng app (depende sa app mo)
EXPOSE 3001

# Command para patakbuhin ang app
CMD ["npm", "start"]
