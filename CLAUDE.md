# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server at http://localhost:3000
npm run build        # production build to dist/
npm run preview      # preview production build
npm run lint         # type-check with tsc --noEmit (no test suite)
npm run clean        # remove dist/
```

## Environment

Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`. The app is scaffolded for Google AI Studio — `GEMINI_API_KEY` is exposed to the frontend via `process.env.GEMINI_API_KEY` (inlined by Vite at build time).

## Architecture

This is a single-page React 19 app built with Vite 6 and Tailwind CSS v4. All UI lives in one file: `src/App.tsx`. There is no router, no state management library, and no backend — it is a pure static marketing site for VRISE Global, an Indian school-facing VR education company.

`src/App.tsx` exports a single `App` component that composes six section components defined in the same file: `Navbar`, `Hero`, `Benefits`, `NowShowing`, `About`, `PricingCTA`, and `Footer`. Animations use `motion/react` (Framer Motion v12).

### Styling

Tailwind v4 is configured via the `@tailwindcss/vite` plugin (no `tailwind.config.*` file). Theme tokens are defined directly in `src/index.css` under `@theme`:

- `--color-primary-navy: #001851`
- `--color-secondary-green: #91da40`
- `--color-tertiary-cyan: #00a4eb`
- Fonts: `Lexend` (body, `font-sans`) and `Montserrat` (headings, `font-display`)

Custom utility classes (`.glass-nav`, `.glass-card`, `.hero-gradient`, `.animate-float`) are also defined in `index.css`.

### Path alias

`@` resolves to the project root (e.g., `@/src/foo` → `./src/foo`), configured in both `vite.config.ts` and `tsconfig.json`.
