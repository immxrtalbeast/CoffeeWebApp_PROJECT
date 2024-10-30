# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Production stage
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000

CMD ["npm", "start"]