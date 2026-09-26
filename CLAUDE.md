# MoshineSites — Template Portfolio Monorepo

## Overview
Five production-grade Next.js site templates + one portfolio site in a single repo, sharing one design system. Each template is a standalone project with its own `package.json`, `next.config.mjs`, and dependencies.

| # | Template | Folder | Type | Stack |
|---|----------|--------|------|-------|
| 1 | **Ember & Wood** — restaurant | `restaurant-site` | Static export | Next.js, Tailwind, 17 hand-drawn SVGs |
| 2 | **TaskFlow** — SaaS dashboard | `taskflow-saas` | Static export | Next.js, Tailwind, Framer Motion |
| 3 | **Ember & Wood Booking** — reservations | `booking-system` | Full-stack | Next.js + SQLite + API routes |
| 4 | **Northlight Goods** — e-commerce | `ecommerce-store` | Full-stack | Next.js + SQLite + API + admin panel |
| 5 | **MetricsApp** — analytics dashboard | `analytics-dashboard` | Full-stack | Next.js + SQLite + Recharts + live simulator |
| 6 | **Portfolio** — template showcase | `moshine-portfolio` | Static export | Next.js + Tailwind |

---

## Design System (`design-system.md`)
All sites share the same tokens via CSS variables + Tailwind theme extension:

**Colors:** `--brand #5a4a42` (primary), `--bg-primary #ffffff`, `--bg-secondary #f4efe8`, `--text-primary #1a1a1a`, `--text-secondary #6b6b6b`, `--border #e0ddd8`, `--error #c94a4a`, plus full brand scale (50-900) and success/warning.

**Spacing:** 8px base → `xs:4 sm:8 md:16 lg:24 xl:32 2xl:48 3xl:64`

**Typography:** Fraunces (display, via `next/font/google`) + Inter (body, via `next/font/google`)

**Responsive:** Mobile 0-640px, Tablet 640-1024px (`sm:`), Desktop 1024px+ (`lg:`)

**Accessibility:** WCAG AA contrast, 44px touch targets, semantic landmarks, `focus-visible` rings, reduced motion support, proper ARIA.

**Tech baseline:** Next.js 14.2.x, React 18, TypeScript, Tailwind 3.4.x. No external UI component libraries.

---

## Quick Start

```bash
# Frontend sites (static export) — serve `out/` via zero-dep server
cd restaurant-site && npm install && npm run build && npm start   # http://localhost:3000
cd taskflow-saas   && npm install && npm run build && npm start   # http://localhost:3001

# Backend sites (full-stack Next.js + SQLite)
cd booking-system  && npm install && npm run seed && npm run dev  # http://localhost:3000
cd ecommerce-store && npm install && npm run seed && npm run dev  # http://localhost:3020
cd analytics-dashboard && npm install && npm run seed && npm run dev  # http://localhost:3010
```

**Admin auth** (booking-system + ecommerce-store): `ADMIN_PASSWORD` env var (default `admin123` in `.env.example` — **change before deploy**).

---

## Build & Dev Commands

| Site | Build | Dev | Start (static) |
|------|-------|-----|----------------|
| restaurant-site | `npm run build` | `npm run dev` | `npm start` (serves `out/` on 3000) |
| taskflow-saas | `npm run build` | `npm run dev` | `npm start` (serves `out/` on 3001) |
| booking-system | `npm run build` | `npm run dev` | N/A |
| ecommerce-store | `npm run build` | `npm run dev` (PORT=3020) | N/A |
| analytics-dashboard | `npm run build` | `npm run dev` (PORT=3010) | N/A |
| moshine-portfolio | `npm run build` | `npm run dev` | N/A |

**Static export sites** (`restaurant-site`, `taskflow-saas`, `moshine-portfolio`):
- `output: 'export'` in `next.config.mjs`
- Build outputs to `out/`
- Use `scripts/serve-out.mjs` (zero-dependency static server) for `npm start`
- `next start` **does not work** for static export

**Full-stack sites** (`booking-system`, `ecommerce-store`, `analytics-dashboard`):
- SQLite DB at `data/<name>.db` (gitignored)
- Seed: `npm run seed` (runs `scripts/seed.mjs`)
- API routes under `src/app/api/**` with `export const runtime = 'nodejs'`

---

## Vercel Deployment

### Project Structure
- **Root Vercel project**: `template-sites` (projectId: `prj_LnNw4enEWgLjiR15GsYZMFijcddE`)
- **Org**: `therealkizzobots-projects` (team: `team_qrMutO0YmWWjOljenmBDnkpU`)
- **GitHub repo**: `TheRealKizzobot/templatesites-business`

### Branch Strategy
| Branch | Vercel Environment | URL Pattern | Purpose |
|--------|-------------------|-------------|---------|
| `main` | Production | Custom domains: `dkservers.space`, `taskflow-saas-lac.vercel.app`, etc. | Live sites |
| `testing` | Preview | `*-git-testing-therealkizzobots-projects.vercel.app` | Staging/QA |
| `develop` | Preview | `*-git-develop-therealkizzobots-projects.vercel.app` | Active development |

### `vercel.json` (Root)
Configures the **portfolio project** with redirects to the 5 template deployments:

```json
{
  "redirects": [
    { "source": "/restaurant-examplepage", "destination": "https://restaurant-site-i0ohcnv5o-therealkizzobots-projects.vercel.app" },
    { "source": "/taskflow-examplepage", "destination": "https://taskflow-saas-iv2o8mnxg-therealkizzobots-projects.vercel.app" },
    { "source": "/booking-examplepage", "destination": "https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app" },
    { "source": "/shop-examplepage", "destination": "https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app" },
    { "source": "/metrics-examplepage", "destination": "https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app" }
  ]
}
```

### Individual Site Projects
Each template has its own Vercel project (linked to the same GitHub repo, different root directories):
- **restaurant-site** → `restaurant-site-tawny.vercel.app` (main), `*-git-develop/preview.vercel.app`
- **taskflow-saas** → `taskflow-saas-lac.vercel.app` (main)
- **booking-system** → `booking-system-olive-eight.vercel.app` (main)
- **ecommerce-store** → `ecommerce-store-five-phi.vercel.app` (main)
- **analytics-dashboard** → `analytics-dashboard-five-kohl.vercel.app` (main)
- **moshine-portfolio** → `dkservers.space` (main, custom domain), `moshine-portfolio-git-develop-...`

### Deployment Flow
1. Push to `develop` or `testing` → Vercel builds preview deployments automatically
2. Merge to `main` → Vercel builds production deployments with custom domains
3. Each site project reads from its subfolder (`rootDirectory` configured in Vercel dashboard)

---

## Security Fixes (Applied Sep 2025)
- **Path traversal** in `serve-out.mjs` (restaurant-site + taskflow-saas): Added `realpathSync()` containment check to prevent symlink-based traversal
- **Ecommerce validation**: `adminCreateProduct` requires description ≥10 chars
- **New ecommerce APIs**: Cart API (GET/POST with stock validation) + Admin Orders API (GET list + PATCH status)

---

## File Structure Highlights

```
template-sites/
├── CLAUDE.md              # This file
├── AGENTS.md              # Project-wide agent instructions
├── design-system.md       # Shared design tokens
├── vercel.json            # Root Vercel config (redirects)
├── package.json           # Root (for monorepo tooling if needed)
├── .vercel/project.json   # Vercel project linkage
├── restaurant-site/
│   ├── next.config.mjs    # output: 'export'
│   ├── scripts/serve-out.mjs  # Static file server (security-hardened)
│   ├── src/app/**         # App Router pages
│   └── src/components/**  # Shared UI components
├── taskflow-saas/
│   ├── scripts/serve-out.mjs  # Static file server (security-hardened)
│   └── src/app/** /components/**
├── booking-system/
│   ├── src/app/api/**     # API routes (bookings, admin auth)
│   ├── lib/db.ts          # better-sqlite3 setup
│   └── scripts/seed.mjs   # DB seeding
├── ecommerce-store/
│   ├── lib/store.ts       # Server-only store logic (better-sqlite3)
│   ├── lib/format.ts      # Client-safe pricing/search constants
│   ├── lib/catalog.ts     # Product images/constants
│   ├── src/app/api/**     # cart, orders, products, admin, categories
│   └── scripts/seed.mjs
├── analytics-dashboard/
│   ├── lib/store.ts       # Server-only (better-sqlite3)
│   ├── lib/format.ts      # Client-safe helpers
│   ├── src/app/api/**     # metrics, feed, content
│   └── scripts/seed.mjs
└── moshine-portfolio/
    ├── src/app/page.tsx   # Template showcase with links
    └── src/app/components/
```

---

## Key Technical Notes

### Alias Resolution (`@/lib/*`)
- `tsconfig.json` in each backend site sets `"baseUrl": "."` and `"paths": { "@/lib/*": ["lib/*"] }`
- **Root-level `lib/`** (e.g., `ecommerce-store/lib/format.ts`) is client-safe — no Node.js deps
- **`src/lib/`** is server-only (can use `better-sqlite3`)
- This distinction prevents `better-sqlite3` from leaking into client bundles

### Static File Server (`scripts/serve-out.mjs`)
- Used by `npm start` on static export sites
- **Security**: Uses `realpathSync(root)` + `realpathSync(target)` before containment check
- Handles `index.html` fallback for directory requests
- MIME types for all common static assets

### Database Seeding
- `npm run seed` → runs `scripts/seed.mjs`
- Creates `data/<name>.db` with schema + seed data
- Idempotent: safe to re-run (drops/recreates tables)

### Ecommerce Pricing (Single Source of Truth)
- `lib/format.ts`: `TAX_RATE`, `SHIPPING_FLAT_CENTS`, `FREE_SHIPPING_THRESHOLD_CENTS`, `computeTotals()`
- Shared by storefront (client) and server API routes — totals always match

### Analytics Dashboard Live Simulator
- Background interval (default 5s, configurable via `SIMULATOR_INTERVAL_MS`)
- Increments views/engagement on seeded content
- APIs: `/api/metrics`, `/api/feed`, `/api/content/[id]`
- Dark mode via `class` strategy on `<html>`

---

## Testing & Verification

```bash
# Build all sites
for d in restaurant-site taskflow-saas booking-system ecommerce-store analytics-dashboard moshine-portfolio; do
  echo "=== $d ===" && cd $d && npm run build && cd ..
done

# Run backend seeds
for d in booking-system ecommerce-store analytics-dashboard; do
  cd $d && npm run seed && cd ..
done

# Static serve test
cd restaurant-site && npm start & sleep 3 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 && cd ..
```

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| `next start` fails on static export | Use `npm start` → runs `scripts/serve-out.mjs` |
| TypeScript incremental build cache stale | Delete `tsconfig.tsbuildinfo` in site folder |
| `@/lib/*` resolves wrong on full-stack sites | Ensure `baseUrl: "."` in `tsconfig.json` |
| SQLite "database locked" | Ensure no other `next dev` process uses same DB file |
| Vercel build fails on `better-sqlite3` | API routes must have `export const runtime = 'nodejs'` |

---

## Git Workflow
- Work on `develop` branch
- PR/merge to `testing` for staging
- PR/merge to `main` for production
- Vercel auto-deploys on push to any tracked branch

---

## Environment Variables
| Site | Required | Optional |
|------|----------|----------|
| booking-system | `ADMIN_PASSWORD` | `PORT` |
| ecommerce-store | `ADMIN_PASSWORD` | `PORT` (default 3020) |
| analytics-dashboard | — | `PORT` (default 3010), `SIMULATOR_INTERVAL_MS` (default 5000) |
| restaurant-site | — | `PORT` (default 3000) |
| taskflow-saas | — | `PORT` (default 3001) |

Create `.env` from `.env.example` in each backend site before `npm run dev`.
