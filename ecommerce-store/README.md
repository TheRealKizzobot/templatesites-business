# Northlight Goods — Full-Stack E-Commerce Store

A complete, portfolio-grade e-commerce template built with **Next.js 14 (App Router) + SQLite**. Catalog, cart, checkout, order confirmation, and a full admin panel — all wired to a real backend with zero external UI libraries.

## Features

- **Storefront**
  - `/` — home with hero + featured products
  - `/shop` — search, category filter, 12-per-page pagination
  - `/product/[id]` — image gallery, quantity selector, add to cart, reviews, related products
  - `/cart` — client cart (React context + `localStorage`), quantity controls, live totals
  - `/checkout` — validated billing / shipping / mock payment form, order summary
  - `/order/[orderId]` — order confirmation with estimated delivery
- **Admin panel** (`/admin`, password protected)
  - Dashboard with revenue / orders / items-sold / average order value metrics
  - Orders: view, mark shipped, cancel (with restock) — updates instantly, no reload
  - Products: add / edit (modal form) / delete (confirm dialog)
  - Settings: logout + store defaults
- **Backend**
  - SQLite (`data/store.db`, file-based, WAL mode)
  - API routes (all Node runtime): products, orders, categories, admin auth, admin product CRUD
  - Seeded with 16 products across 5 categories + 3 sample orders
  - Consistent pricing rules shared between storefront and server (free shipping over $100, flat $8, 8.5% tax)

## Setup

```bash
npm install
cp .env.example .env   # optional — defaults are fine for local dev
npm run seed           # creates data/store.db and seeds products + sample orders
npm run dev            # http://localhost:3020
```

## Production

```bash
npm run build && npm run start
```

## Admin access

- URL: `http://localhost:3020/admin`
- Password: `ADMIN_PASSWORD` env var — default `admin123` (change it before deploying)

## API summary

| Method | Route | Auth | Purpose |
| ------ | ----- | ---- | ------- |
| GET | `/api/products` | — | List with `category`, `q`, `page`, `pageSize` |
| GET | `/api/products/:id` | — | Single product |
| GET | `/api/categories` | — | Distinct categories |
| POST | `/api/orders` | — | Place an order (validates stock, decrements, computes totals) |
| GET | `/api/orders` | admin | List orders with items |
| GET | `/api/orders/:id` | admin | Order detail |
| PATCH | `/api/orders/:id` | admin | Mark shipped / cancel (cancel restocks) |
| POST | `/api/admin/products` | admin | Create product |
| PATCH | `/api/admin/products/:id` | admin | Update product |
| DELETE | `/api/admin/products/:id` | admin | Delete product |
| POST | `/api/admin/login` / `logout` | — | Admin session (httpOnly cookie) |

## Design system

Uses the shared MoshineSites design system (`/design-system.md` at the portfolio root): brand `#5a4a42`, Fraunces + Inter, 8px spacing scale, WCAG AA contrast, 44px touch targets, `prefers-reduced-motion` support.