# Personal CV Portfolio

Single-page portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui primitives

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
```

## Deployment Notes

- Vite base path is set to `/CV/` in `vite.config.ts`.
- Router basename is derived from `import.meta.env.BASE_URL` in `src/App.tsx`.
- Keep static assets in `public/` and reference them via `import.meta.env.BASE_URL` when needed.
