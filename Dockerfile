# Step 1 - Base image (Node.js 20 on lightweight Alpine Linux)
FROM node:20-alpine

# Step 2 - Set working directory inside container
WORKDIR /app

# Step 3 - Copy package files first (for caching)
COPY package*.json ./

# Step 4 - Install dependencies
RUN npm install

# Step 5 - Copy rest of the source code
COPY . .

# Step 6 - Build TypeScript to JavaScript
RUN npm run build

# Step 7 - Expose the port
EXPOSE 3000

# Step 8 - Start the app
CMD ["node", "dist/index.js"]