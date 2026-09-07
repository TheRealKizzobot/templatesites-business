# Analytics Dashboard (MetricsApp)

A TweetDeck-style social analytics template, part of the template-sites collection.
Next.js 14 + SQLite (better-sqlite3) + Recharts, with a lightweight live simulator
so the numbers visibly move without any external services.

## Features

- **/dashboard** — three metric cards (Views, Engagement, Active now) with
  day-over-day deltas, a polling live feed of content posts, and a trending-topics sidebar.
- **/analytics** — 7-day aggregate views + engagement area chart (Recharts) plus
  "best posting day" and "highest engagement rate" highlights.
- **/content/[id]** — full post detail: metadata, tags, stat cards, and a 7-day
  performance chart per post.
- **/settings** — light / dark / system theme and polling interval
  (3s / 5s / 10s / paused). Preferences persist in localStorage.
- **Live simulation** — a background ticker bumps views/engagement on 3 random posts
  every 5 seconds (configurable), so dashboards behave like real analytics products.
- Dark mode via `class` strategy; accessible (skip link, ARIA labels, reduced-motion
  support, 44px touch targets).

## API

| Route                  | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `GET /api/metrics`     | Totals, 7-day series, trending topics            |
| `GET /api/feed`        | Up to 50 content items, newest first             |
| `GET /api/content/:id` | Single content item + its 7-day daily stats      |

All responses use the envelope `{ ok: boolean, data?, error? }`.

## Getting started

```bash
npm install
cp .env.example .env        # optional; defaults work out of the box
npm run seed                # creates data/analytics.db with 18 content items
npm run dev                 # http://localhost:3000
```

To change the simulation cadence (milliseconds, min 1000, 0 disables):

```bash
SIMULATOR_INTERVAL_MS=2000 npm run dev
```

## Scripts

| Script            | Purpose                                   |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start Next.js dev server                  |
| `npm run seed`    | Create/reset the SQLite DB with seed data |
| `npm run build`   | Production build                          |
| `npm start`       | Serve the production build                |
| `npm run typecheck` | `tsc --noEmit`                          |

## Technology choices

- **better-sqlite3** — synchronous, zero-ORM, ideal for a self-contained template.
  Database lives at `data/analytics.db` (WAL mode, ignored by git).
- **Recharts** — the only external charting library; kept purposefully minimal.
- **Next.js API routes** (`nodejs` runtime, `force-dynamic`) so the simulator is
  guaranteed to run inside the same process that serves the pages.
- **lib/ vs src/lib/** — client-safe helpers live in the root `lib/` because the
  `@/lib/*` alias targets the root `lib/` directory, not `src/`.

## Reset

```bash
rm -f data/analytics.db && npm run seed
```