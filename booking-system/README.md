# Ember & Wood — Booking System

A full-stack restaurant booking system for **Ember & Wood** (wood-fired kitchen & natural wine). Next.js 14 (App Router) + Node API routes + file-based SQLite (`better-sqlite3`). No external UI libraries — everything is hand-rolled Tailwind against the shared MoshineSites design system.

## Stack

- **Next.js 16.3.4** (App Router, React 18, TypeScript)
- **Tailwind CSS 3.4** configured from the shared design-system tokens
- **better-sqlite3** file database at `data/booking.db` (WAL mode)
- Fonts: **Fraunces** (display) + **Inter** (body) via `next/font/google`

## Setup

```bash
npm install
cp .env.example .env       # optional — works without it too
rm -f data/booking.db*      # fresh rebuild (only if you want a clean seed)
npm run seed               # creates data/booking.db + 8 sample bookings
npm run dev                # http://localhost:3000
```

Production-style run:

```bash
npm run build
npm start                  # or PORT=3000 npx next start
```

## Environment variables (`.env.example`)

| Variable | Default | Purpose |
|----------|---------|---------|
| `ADMIN_PASSWORD` | `admin123` | Password for the `/admin` dashboard. **Falls back to `admin123` at runtime if unset** — change it before deploying. |
| `PORT` | `3000` | Server port (optional). |

## Database

File-based SQLite at `data/booking.db` (folder is gitignored; recreated automatically on first request or by `npm run seed`). The seed script is idempotent — it skips inserts when rows already exist, so **delete `data/booking.db*` first** to reseed.

- Slot model: every `(date, time)` slot holds **24 covers** (capacity). Each booking consumes `party_size` covers. A request is rejected with **409** if the slot is full or the party would exceed remaining covers.
- Allowed slots (shared list in `lib/booking.ts`, driving both the widget dropdown and server validation):
  - Lunch `11:00 – 12:30` at 15-min intervals: `11:00, 11:15, 11:30, 11:45, 12:00, 12:15, 12:30`
  - Dinner `17:00 – 21:00` at 15-min intervals: `17:00 … 21:00` (17 slots)
- Party sizes: **1 – 8** guests (widget labels: `Just me` … `8 people`), enforced by shared validation and a DB `CHECK` constraint.
- Statuses: `pending → confirmed → completed`, plus `cancelled` (from any active state). All four are enforced by a DB `CHECK` constraint.
- Validation: name ≥ 2 chars, valid email, phone ≥ 7 chars, valid future date, time in slot set, party size 1–8, and **2-hour lead time** for same-day bookings.

## API

All routes run on the **Node.js runtime** (`export const runtime = 'nodejs'`) and return a consistent envelope `{ ok, data?, error? }`.

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| `GET` | `/api/bookings` | Admin cookie | All bookings (date desc). Optional `?status=pending\|confirmed\|completed\|cancelled`. **401** without a valid session. |
| `POST` | `/api/bookings` | Public | Create a booking (status `pending`). Validates input; **409** on capacity conflict. |
| `PATCH` | `/api/bookings/[id]` | Admin cookie | Update status. Transitions: `pending→confirmed`, `confirmed→completed`, `pending/confirmed/completed→cancelled`. 404 if missing, **401** without a session. |
| `DELETE` | `/api/bookings/[id]` | Admin cookie | Delete a booking. 404 if missing, **401** without a session. |
| `POST` | `/api/admin/login` | — | `{ "password": "…" }` — sets an httpOnly HMAC-signed cookie on success. |
| `POST` | `/api/admin/logout` | — | Clears the admin cookie. |

> The admin cookie is set by `/api/admin/login` and verified on every admin API route (`GET`, `PATCH`, `DELETE`) plus the server-rendered `/admin` page. The public booking widget only needs `POST /api/bookings`.

## Admin dashboard (`/admin`)

- Gate: a server component checks the admin cookie and renders the login form otherwise.
- After sign-in you get an **Admin Panel** header with a logout button, a status filter, and a responsive bookings table (stacked cards on mobile) with columns: **Date · Time · Party · Guest Name · Phone · Email · Status · Actions**.
- Status badges: `pending` amber, `confirmed` green, `completed` gray, `cancelled` red.
- Row actions: **Confirm** (pending), **Mark done** (confirmed), **Cancel**, and **Delete** (opens a confirmation modal). All actions update the table immediately in state — no page reload.
- The table uses alternating row backgrounds, a sticky header row when it scrolls, and a subtle per-slot capacity indicator under each party size.

## Public site

- **Hero** ("Reserve your table") with a single large CTA that scrolls to the booking widget.
- **About** — two-column layout with an in-scroll fade/slide reveal (`IntersectionObserver`, disabled for `prefers-reduced-motion`, visible without JS) and a local SVG illustration at `public/images/about.svg`.
- **Menu** — compact "Signature dishes" strip (name, blurb, price).
- **Booking widget** — full reservation form; on success shows a green banner ("Reservation confirmed … confirmation email sent to …") that auto-dismisses after 4 s (or on the X button). Inline red field errors and a "Booking…" loading state on the submit button (full width on mobile).
- **Testimonials** (3 hover-lift cards, quote/author/role), **Hours & contact**, and a **footer** with logo, hours, address, phone, and social links.
- Sticky top **nav** with Home / Menu / Bookings / Contact links plus a "Book a table" pill; collapses to an accessible hamburger drawer below 640px (Escape closes, `aria-expanded`, 44 px targets).

## Design system

Tokens from `design-system.md` are applied exactly: brand scale rooted at `#5a4a42`, cream `#f4efe8` secondary, 8px spacing scale, Fraunces + Inter, 16px card radii, soft shadows, 44px touch targets, semantic landmarks, `focus-visible` rings, and `prefers-reduced-motion` support.

## Project layout

```
booking-system/
├── lib/
│   ├── auth.ts        # admin cookie signing + verification (HMAC)
│   ├── booking.ts     # shared slots/statuses/validation/capacity logic (client-safe)
│   ├── db.ts          # singleton better-sqlite3 connection (WAL, DDL)
│   └── seed.cjs       # standalone seed script — npm run seed
├── public/
│   └── images/about.svg
├── src/app/
│   ├── api/           # route handlers (nodejs runtime)
│   ├── admin/page.tsx # protected server component
│   ├── layout.tsx     # fonts + metadata
│   └── page.tsx       # public site (hero, about, menu, widget, testimonials, hours)
└── src/components/
    ├── booking-widget.tsx
    ├── site/{nav,fade-in}.tsx
    └── admin/{login-form,admin-dashboard}.tsx
```

## Verification

```bash
npm run typecheck   # tsc --noEmit
npm run build       # next build
npm run seed        # re-run is idempotent (skips when rows exist)
```

### Quick API smoke test

```bash
PORT=3000 npx next start &
curl -s localhost:3000/api/bookings                        # 401 before login
curl -s -c /tmp/book.cookies -X POST localhost:3000/api/admin/login \
  -H 'Content-Type: application/json' -d '{"password":"admin123"}'
curl -s -b /tmp/book.cookies localhost:3000/api/bookings   # 200 list
```