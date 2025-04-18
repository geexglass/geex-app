FROM node:23-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY nextjs-app/package.json ./nextjs-app/
RUN npm ci

FROM deps AS builder
WORKDIR /app

COPY . .

ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=${NEXT_PUBLIC_SANITY_PROJECT_ID} \
    NEXT_PUBLIC_SANITY_DATASET=${NEXT_PUBLIC_SANITY_DATASET}

ARG SANITY_API_READ_TOKEN
ENV SANITY_API_READ_TOKEN=${SANITY_API_READ_TOKEN}

RUN npm run build --workspace=nextjs-app

FROM node:23-alpine AS prod
WORKDIR /app/nextjs-app

ENV NODE_ENV=production
EXPOSE 3000

COPY --from=builder /app/nextjs-app/.next    ./.next
COPY --from=builder /app/nextjs-app/package.json ./package.json
COPY --from=deps /app/node_modules ../node_modules

CMD ["npm","run","start"]
