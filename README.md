# GEEX App

Monorepo containing:

- `nextjs-app`: public Next.js application
- `studio`: Sanity Studio for content management

## Requirements

- Node.js 20+
- npm 10+

## Install

```bash
npm install
```

## Environment

Create workspace environment files before running or building:

```bash
cp nextjs-app/.env.example nextjs-app/.env.local
cp studio/.env.example studio/.env.local
```

Set at least these required values in `nextjs-app/.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `POSTGRES_HOST`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `EMAIL_USER`
- `EMAIL_PASS`

## Run Locally

```bash
npm run dev
```

This starts:

- Next.js at `http://localhost:3000`
- Sanity Studio at `http://localhost:3333`

## Build

```bash
npm run build --workspace=nextjs-app
npm run build --workspace=studio
```

## Useful Scripts

- `npm run dev`: run both apps in parallel
- `npm run dev:next`: run Next.js only
- `npm run dev:studio`: run Studio only
- `npm run import-sample-data`: import sample dataset into Studio
