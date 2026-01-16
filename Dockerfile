FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=dependencies /app/dist ./dist

RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", "dist/main"]

# Development target (used by docker-compose)
FROM node:20-alpine AS builder

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p /app/data

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

