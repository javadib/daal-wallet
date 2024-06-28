# Stage 1
FROM node:20.11.0-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install pnpm -g
RUN pnpm install
COPY . .
RUN npm run build

# Stage 2
FROM node:20.11.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN pnpm install --only=production
COPY --from=build /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
