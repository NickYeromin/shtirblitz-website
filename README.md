# Shtirblitz

Next.js App Router, React, and TypeScript. The UI uses MUI, and icons come from `lucide-react`.

## Public Access

- Website: [https://shtirblitz.duckdns.org/](https://shtirblitz.duckdns.org/)
- API: [https://shtirblitz.duckdns.org/api/](https://shtirblitz.duckdns.org/api/)

## Getting Started

```bash
npm ci
npm run dev
```

The site is available at http://localhost:3000.

## Component Guidelines

All styles are defined within components using MUI `sx`, and animations use MUI `keyframes`. There are no separate CSS files. Shared fonts and base styles are defined in `src/components/AppProviders.tsx` through `ThemeProvider` and `CssBaseline`.

Guidelines for further development: [AGENTS.md](./AGENTS.md).

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```
