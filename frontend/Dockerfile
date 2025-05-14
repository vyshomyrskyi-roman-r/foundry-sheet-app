# Build stage
FROM node:18-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
#RUN npx next build

# Run stage
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app ./
RUN npm install --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
