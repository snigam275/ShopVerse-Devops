FROM node:20-alpine

WORKDIR /app

# Copy package files first for dependency caching
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy source
COPY src ./src

EXPOSE 8001

CMD ["node", "src/index.js"]
