FROM node:26-alpine AS build
WORKDIR /app

COPY package*.json ./ 
RUN npm ci

COPY . . 
RUN npm run build

FROM node:26-alpine AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

RUN npm ci --only=production

EXPOSE 3000
ENV NODE_ENV=production

CMD ["npm","run", "start:prod"]