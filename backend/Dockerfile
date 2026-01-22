FROM node:22-alpine AS base

RUN apk add --no-cache tini

ENTRYPOINT ["/sbin/tini", "--"]

WORKDIR /app

# --- DEPS ---
FROM base AS deps
COPY package*.json ./
RUN npm install --omit=dev

# --- DEV ---
FROM base AS dev
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "start:dev"]

# --- BUILD ---
FROM dev AS build
RUN npm run build

# --- PROD ---
FROM base AS prod

RUN mkdir -p logs && chown -R node:node logs

USER node

COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/prisma ./prisma

CMD ["node", "dist/src/main.js"]