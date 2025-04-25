FROM node:23-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY studio/package.json ./studio/
RUN npm ci

FROM deps AS builder
WORKDIR /app

COPY . .

ARG SANITY_PROJECT_ID
ENV SANITY_STUDIO_PROJECT_ID=${SANITY_PROJECT_ID}

ARG SANITY_STUDIO_DATASET
ENV SANITY_STUDIO_DATASET=${SANITY_STUDIO_DATASET}

ARG SANITY_STUDIO_PREVIEW_URL
ENV SANITY_STUDIO_PREVIEW_URL=${SANITY_STUDIO_PREVIEW_URL}

RUN npm run build --workspace=studio

FROM caddy:2-alpine AS prod
COPY --from=builder /app/studio/dist /usr/share/caddy
EXPOSE 80
