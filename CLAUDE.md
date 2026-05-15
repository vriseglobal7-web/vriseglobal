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
npm run deploy       # gh-pages deploy (runs build first via predeploy) — not used in production
```

## Deployment

Hosted on **Vercel** at `vriseglobal.co.in` (redirects to `www.vriseglobal.co.in`). Vercel auto-deploys on push to the main branch. SPA routing is handled via `vercel.json` rewrites. SSL is provisioned automatically by Vercel.

```bash
```

## Environment

Copy `.env.example` to `.env.local` and set:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `GEMINI_API_KEY` (inlined at build time via `process.env.GEMINI_API_KEY`)

EmailJS handles all booking form submissions — no backend required.

## Architecture

This is a multi-page React 19 SPA built with Vite 6 and Tailwind CSS v4. Routing is handled by React Router v7 (`BrowserRouter` + `Routes`).

### File structure

```
src/
  main.tsx          # App entry — BrowserRouter, Routes, ScrollToTop
  App.tsx           # Home page (/) — Navbar, Hero, Benefits, NowShowing, About, PricingCTA, Footer
  ScrollToTop.tsx   # Scrolls window to top on every route change
  index.css         # Tailwind v4 config + custom utilities
  pages/
    About.tsx       # /about — full About page with founder section
    Shows.tsx       # /shows — detailed show pages with scroll-to-show-id via location.state
    FAQ.tsx         # /faq — accordion FAQ grouped by category
  vite-env.d.ts
public/
  images/
    hero-vr.png           # Hero section VR image (mobile bg + desktop float)
    about-student.avif    # Student VR photo used on Home & About
    show-big-bang.jpeg    # Big Bang show thumbnail
    show-jurassic.jpeg    # Jurassic show thumbnail
    vrisefounder.jpeg     # Founder photo (Krishen Kant Dubey)
    vriselogo.svg
    experiences/          # 5 stock VR photos used in the PricingCTA image grid
```

### Pages & sections

**Home (`/`)** — `src/App.tsx`
- `Navbar` — glassmorphism fixed nav with mobile hamburger, active link highlighted per page
- `Hero` — full-screen with hero-vr.png (mobile: full-bleed bg; desktop: floating right image + glowing blur)
- `Benefits` — 5 benefit cards (360° Immersive, Curriculum Aligned, Safe & Supervised, Concept Clarity, No Investment)
- `NowShowing` — 2 show cards (Big Bang Theory, Jurassic Era & Beyond) with Book Now + Learn More buttons
- `About` — split grid with about-student.avif and company stats (300+ schools, 50,000+ students)
- `PricingCTA` — dark section with 5-image mosaic grid and "Enquire Now" CTA
- `Footer` — links, contact info, social icons

**About (`/about`)** — `src/pages/About.tsx`
- Hero banner, Our Story, Founder (Krishen Kant Dubey — 9+ years in schools), Mission/Vision/Values, How It Works (4 steps), Team sections

**Shows (`/shows`)** — `src/pages/Shows.tsx`
- Two detailed show sections (`#big-bang`, `#jurassic`) rendered via `ShowCard` component
- Supports deep-link scroll: `navigate("/shows", { state: { scrollTo: id } })` from Home
- Each show has: overview, journey steps, curriculum coverage, session highlights, Book CTA

**FAQ (`/faq`)** — `src/pages/FAQ.tsx`
- 4 categories: Booking & Logistics, Safety & Equipment, Content & Curriculum, On the Day
- Animated accordion (`AnimatePresence` + `motion/react`)

### BookingModal

All pages have a local `BookingModal` component (same form, duplicated per page — not shared). Fields: school_name, contact_name, phone, email, students, date, experience, message. Sends via EmailJS. Shows success/error state. Supports `defaultExperience` prop (pre-selects experience dropdown).

### Styling

Tailwind v4 via `@tailwindcss/vite` plugin (no `tailwind.config.*` file). Theme tokens in `src/index.css` under `@theme`:

- `--color-primary-navy: #001851`
- `--color-secondary-green: #91da40`
- `--color-tertiary-cyan: #00a4eb`
- Fonts: `Lexend` (body, `font-sans`) and `Montserrat` (headings, `font-display`)

Custom utility classes: `.glass-nav`, `.glass-card`, `.hero-gradient`, `.animate-float`

### Path alias

`@` resolves to the project root (e.g., `@/src/foo` → `./src/foo`), configured in both `vite.config.ts` and `tsconfig.json`.

## Business context

VRISE Global is an Indian school-facing VR education company based in Gurugram, Haryana. They bring VR headsets directly to schools (zero school investment). Current shows: **Big Bang Theory** (20 min, Class 4–10) and **Jurassic Era & Beyond** (20 min, Class 4–10). Batches of 30–40 students. Contact: +91 98991 57132 / vriseglobal7@gmail.com. Founder: Krishen Kant Dubey.
