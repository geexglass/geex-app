# GEEX Next.js App

Frontend application for GEEX, built with Next.js App Router and Sanity content.

## Commands

```bash
npm run dev --workspace=nextjs-app
npm run build --workspace=nextjs-app
npm run start --workspace=nextjs-app
```

## Type Generation

The app uses Sanity type generation before `dev` and `build`.

- Schema is extracted from the Studio workspace.
- Generated types are written to `nextjs-app/sanity.types.ts`.

If needed, run manually:

```bash
npm run typegen --workspace=nextjs-app
```
