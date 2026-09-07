# MoshineSites — Portfolio of Site Templates

Five production-grade, portfolio-ready site templates in one repo, each a self-contained project sharing one design system.

## The templates

| # | Template | Folder | Type | Stack |
|---|----------|--------|------|-------|
| 1 | **Ember & Wood** — restaurant | `restaurant-site` | Static export | Next.js, Tailwind, 17 hand-drawn SVGs |
| 2 | **TaskFlow** — SaaS dashboard | `taskflow-saas` | Static export | Next.js, Tailwind, Framer Motion |
| 3 | **Ember & Wood Booking** — reservations | `booking-system` | Full-stack | Next.js + SQLite + API |
| 4 | **Northlight Goods** — e-commerce | `ecommerce-store` | Full-stack | Next.js + SQLite + API + admin |
| 5 | **MetricsApp** — analytics dashboard | `analytics-dashboard` | Full-stack | Next.js + SQLite + Recharts + live simulator |

## Design system

All five sites follow `design-system.md`: brand `#5a4a42`, Fraunces + Inter type pairing, an 8px spacing scale, WCAG AA contrast, 44px touch targets, and mobile → tablet → desktop responsiveness.

## Quick start

Each folder is standalone:

```bash
# Frontend sites (static export)
cd restaurant-site && npm install && npm run build && npm start   # http://localhost:3000
cd taskflow-saas   && npm install && npm run build && npm start   # http://localhost:3001

# Backend sites (Next.js + SQLite)
cd booking-system  && npm install && npm run seed && npm run dev  # http://localhost:3000
cd ecommerce-store && npm install && npm run seed && npm run dev  # http://localhost:3020
cd analytics-dashboard && npm install && npm run seed && npm run dev  # http://localhost:3010
```

Admin areas (booking + ecommerce) use the `ADMIN_PASSWORD` env var; the local default is `admin123` (see each `.env.example` — change it before deploying).

## Static export deployment

`restaurant-site/out` and `taskflow-saas/out` are fully static — deploy to Vercel, Netlify, or GitHub Pages directly (`npm start` runs a zero-dependency static server for local preview).

## Backend notes

- Backend sites use SQLite (file-based, seeded via `npm run seed`) with hand-rolled API routes — no framework DB layer, no external UI libraries (the one exception: Recharts, required by the analytics brief).
- E-commerce pricing rules (free shipping over $100, flat $8, 8.5% tax) are defined in one client-safe module and shared by storefront and server so totals always match.
- Analytics dashboard ships with a background simulator (5s cadence, env-tunable) that bumps views/engagement so the live UI behaves like a real product. Routes: `/dashboard`, `/analytics`, `/content/[id]`, `/settings`; APIs `/api/metrics`, `/api/feed`, `/api/content/[id]`.

## Verification status

All five sites: `npm run build` green. Ecommerce + booking API suites exercised against running servers (auth, CRUD, stock/capacity edge cases). Analytics dashboard verified end-to-end: seed, typecheck, build, live-simulation delta, API edge cases (400/404), all pages 200. See `PLAN.md` for the full status.