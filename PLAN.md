# Plan: MoshineSites Portfolio — 5 Site Templates (rev 4 — complete)

## Objective
5 production-grade, portfolio-ready site templates in separate subfolders, sharing one consistent design system. Frontend-only sites are statically exported; backend sites are full-stack Next.js with API routes + SQLite and fully polished frontends.

## Milestones

### M1: Shared Design System + Scaffolding ✅
- [x] Define tokens (colors, spacing scale, type scale, radii, shadows) → design-system.md
- [x] Document responsive + accessibility requirements

### M2: Frontend-Only Sites (static export) ✅ verified
- `restaurant-site` (Ember & Wood) — built, `out/` served (HTTP 200)
- `taskflow-saas` (TaskFlow) — built, `out/` served (HTTP 200)
- `start` script uses `node scripts/serve-out.mjs` (zero-dep static server) since `next start` breaks on static export

### M3: Backend-Hosted Sites (full-stack, polished frontends) ✅ verified
- `booking-system` (Ember & Wood booking) — enhanced frontend (slots 11:00-12:30/17:00-21:00 15-min, party 1-8 labels, statuses pending/confirmed/completed/cancelled, capacity 24, admin table + delete modal, success banner auto-dismiss, About fade-in), SQLite, admin auth; agent-verified E2E
- `ecommerce-store` (Northlight Goods) — full storefront + admin, manually completed & smoke-tested (below)
- `analytics-dashboard` (MetricsApp) — TweetDeck-style analytics: `/dashboard` (metric cards + polling feed + trending), `/analytics` (Recharts 7-day area chart + day highlights), `/content/[id]` (detail + per-post chart), `/settings` (theme + polling interval); APIs `/api/metrics`, `/api/feed`, `/api/content/[id]`; 5s live simulator (env `SIMULATOR_INTERVAL_MS`); 18 seeded content items across 4 brands with 7 days of daily stats; dark mode (`class` strategy)

### M4: Verification & Polish ✅
- [x] `npm run build` for all 5 sites (restaurant, taskflow, booking, ecommerce, analytics) — all pass
- [x] API smoke tests: ecommerce (products list/filter/search/pagination, categories, order placement + stock decrement + free-shipping threshold, admin auth + order status + product CRUD, 401/400/404/409 edge cases) — all pass
- [x] API smoke tests: analytics (metrics totals/series/trending, feed 18 items, content detail + 7-day series, 400/404 edge cases; live-simulation delta verified — totals moved between polls) — all pass
- [x] Static sites served via `scripts/serve-out.mjs` — 200 OK
- [x] Re-seeded ecommerce `data/store.db` to clean 16 products / 3 orders after testing
- [x] Re-seeded analytics `data/analytics.db` to clean 18 items / 126 daily rows after testing
- [x] Root README + final PLAN.md status

## Build details (manual completion)
- Ecommerce: client-safe pricing/search constants moved to `lib/{format,catalog}.ts` so `@/lib/*` alias resolves (alias points at root `lib/`, not `src/`) and only type-safe intent crosses the client boundary; `tsc --noEmit` clean, `next build` passes (21 routes), full curl suite green.
- Analytics: same `@/lib/*` alias lesson — client-safe helpers live in root `lib/format.ts`; `lib/store.ts` is server-only (better-sqlite3). Typecheck needed `target: es2017` (Map iteration) + clearing the stale incremental tsbuildinfo. `next build` passes (9 routes). Server smoke-tested on PORT=3010 (3000 occupied by an unrelated stale next-server process).

## How to run

| Site | Folder | Command | URL |
| ---- | ------ | ------- | --- |
| Restaurant | `restaurant-site` | `npm run build && npm start` | http://localhost:3000 |
| TaskFlow | `taskflow-saas` | `npm run build && npm start` | http://localhost:3001 |
| Booking | `booking-system` | `npm run seed && npm run dev` | http://localhost:3000 |
| Ecommerce | `ecommerce-store` | `npm run seed && npm run dev` (PORT=3020) | http://localhost:3020 |
| Analytics | `analytics-dashboard` | `npm run seed && npm run dev` (PORT=3010) | http://localhost:3010 |

Admin passwords: `ADMIN_PASSWORD` env (default `admin123` in `.env.example`) for booking-system + ecommerce-store.

## Momentum
- **now**: — (all milestones complete)
- **next**: Screenshot QA pass in browser (booking + ecommerce admin flows, analytics dashboard) and optional deploy of `out/` folders
- **blocked**: —
- **improve**: Run `@gstack-qa` against booking-system + ecommerce-store + analytics-dashboard for a visual regression pass