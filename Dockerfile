# =====================
# BASE
# =====================
FROM node:22-alpine AS base

ARG APP_NAME
WORKDIR /app

COPY ${APP_NAME}/package*.json ./
RUN npm install

COPY ${APP_NAME}/ .

RUN if [ "$APP_NAME" = "backend" ]; then npx prisma generate; fi

# =====================
# DEV
# =====================
FROM base AS dev
CMD ["npm", "run", "start:dev"]

# =====================
# BUILD
# =====================
FROM base AS build
RUN npm run build

# =====================
# PROD (BACKEND)
# =====================
FROM node:22-alpine AS prod-backend
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

CMD ["node", "dist/src/main.js"]

# =====================
# PROD (BOT)
# =====================
FROM node:22-alpine AS prod-bot
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]
