FROM node:23-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY studio/package.json ./studio/
RUN npm ci

FROM deps AS builder
WORKDIR /app

COPY . .

ARG SANITY_STUDIO_PROJECT_ID
ARG SANITY_STUDIO_DATASET
ENV SANITY_STUDIO_PROJECT_ID=${SANITY_STUDIO_PROJECT_ID} \
    SANITY_STUDIO_DATASET=${SANITY_STUDIO_DATASET}

RUN yes | npm run build --workspace=studio

FROM caddy:2-alpine AS prod
COPY --from=builder /app/studio/dist /usr/share/caddy
EXPOSE 80
