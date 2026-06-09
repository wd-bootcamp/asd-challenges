FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx nest build
CMD ["node", "dist/src/main.js"]

# FROM node:22-alpine
# WORKDIR /app
# ENV NODE_ENV=production
# COPY package*.json ./
# RUN npm ci --omit=dev
# COPY --from=build /app/dist ./dist