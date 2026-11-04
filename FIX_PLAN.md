# Immediate Fix Plan — MoshineSites Template Portfolio

## Phase 1: Foundation (Do First)

### 1.1 Pin Next.js to 14.2.35 across all sites
```bash
# In each site's package.json:
"next": "14.2.35",
"react": "18.3.1",
"react-dom": "18.3.1",
```

### 1.2 Fix TypeScript JSX in all tsconfig.json
```json
// Add to each site's tsconfig.json compilerOptions:
"jsx": "react-jsx"
```

### 1.3 Create shared design tokens package
```
packages/
└── design-tokens/
    ├── package.json
    ├── tailwind.config.js      # Single source of truth
    ├── globals.css             # CSS variables + @layer components
    └── index.ts                # Token exports for JS/TS
```

Each site's `tailwind.config.js` extends this:
```js
// site/tailwind.config.js
import sharedConfig from '@moshinesites/design-tokens/tailwind.config.js';

export default {
  ...sharedConfig,
  content: ['./src/**/*.{ts,tsx}'],
};
```

Each site's `globals.css` imports shared:
```css
@import '@moshinesites/design-tokens/globals.css';
/* Site-specific overrides only */
```

### 1.4 Standardize font variable names
**Decision:** Use `--font-display` and `--font-body` (matching design-system.md and portfolio/taskflow)

Update layout.tsx in restaurant-site, booking-system, ecommerce-store, analytics-dashboard:
```tsx
const fraunces = Fraunces({ variable: '--font-display', ... });
const inter = Inter({ variable: '--font-body', ... });
<html className={`${fraunces.variable} ${inter.variable}`}>
```

---

## Phase 2: Dark Mode (All 4 Frontend Sites)

### 2.1 Add `.dark` class support to globals.css

**restaurant-site, taskflow-saas, booking-system, ecommerce-store** — add to globals.css:

```css
.dark {
  --bg-primary: #1a1a1a;
  --bg-secondary: #252525;
  --text-primary: #f4efe8;
  --text-secondary: #b0b0b0;
  --brand: #a98f82;
  --brand-hover: #c4b7ae;
  --border: #3d3d3d;
  --error: #f87171;
  --success: #6fbf8e;
  --warning: #e8b86a;

  --brand-50: #1d1815;
  --brand-100: #2c2521;
  --brand-200: #3b312c;
  --brand-300: #4a3d37;
  --brand-400: #5a4a42;
  --brand-500: #a98f82;
  --brand-600: #c4b7ae;
  --brand-700: #ddd4cd;
  --brand-800: #f0ece8;
  --brand-900: #faf8f6;
}
```

### 2.2 Add dark mode toggle to each site's nav/header
- Persist preference in localStorage
- Respect `prefers-color-scheme` media query
- Apply `.dark` class to `<html>`

### 2.3 Update tailwind.config.js for all sites
```js
darkMode: 'class',
```

---

## Phase 3: Remove SQLite (3 Sites)

### 3.1 booking-system — localStorage + Email API

**Remove:** `better-sqlite3`, `lib/db.ts`, `scripts/seed.mjs`, `lib/seed.cjs`

**Add:** `/api/bookings` route that:
1. Validates input (server-side)
2. Calls Resend/SendGrid to send confirmation email
3. Returns success

**Client:** Store pending booking in localStorage, show confirmation from localStorage

### 3.2 ecommerce-store — localStorage Cart + Stripe Checkout

**Remove:** `better-sqlite3`, `lib/store.ts`, `lib/db.ts`, `scripts/seed.mjs`, `lib/seed.cjs`

**Keep:** `lib/format.ts` (pricing utils), `lib/catalog.ts` (product data)

**Cart:** Already uses localStorage ✅

**Add:** `/api/checkout` route:
1. Creates Stripe Checkout Session
2. Redirects to Stripe
3. Webhook `/api/webhooks/stripe` fulfills order → sends email

**Admin Panel:** Replace with Stripe Dashboard or simple localStorage-based order view

### 3.3 analytics-dashboard — Static Data + Client Simulator

**Remove:** `better-sqlite3`, `lib/store.ts`, `scripts/seed.mjs`

**Keep:** `lib/format.ts`, mock data in `lib/mock-data.ts`

**Simulator:** Move to client-side only (useEffect with setInterval) — no server needed

**API Routes:** Remove or convert to static JSON served from `public/api/`

---

## Phase 4: Portfolio Navigation Fix

### 4.1 Option A: Remove Subpages (Recommended)
Delete `/privacy`, `/terms`, `/cookies` pages. Add content to homepage sections or modal dialogs.

### 4.2 Option B: Fix Anchor Routing
If keeping subpages, nav links must be absolute to homepage:
```tsx
// In nav.tsx - already partially fixed
const NAV_LINKS = [
  { href: '/#templates', label: 'Templates' },
  { href: '/#about', label: 'About' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#contact', label: 'Contact' },
];
```

**And** add scroll-to-section logic on homepage that handles hash on load.

### 4.3 Fix Mobile Menu
Change `<a>` back to `<Link>` in mobile menu for SPA navigation:
```tsx
<Link href={link.href} onClick={() => setMobileOpen(false)} ... >
```

---

## Phase 5: Shared Component Library

Create `packages/ui-components/` with:
```
Button.tsx          // .btn, .btn-primary, .btn-outline, .btn-ghost
Card.tsx            // .card
Field.tsx           // .field, .label
NavLink.tsx         // .nav-link
Container.tsx       // .container-page
Section.tsx         // .section, .section-title, .section-kicker
FocusRing.tsx       // .focus-ring
```

Each site imports:
```tsx
import { Button, Card, Field } from '@moshinesites/ui-components';
```

---

## Phase 6: Vercel Deployment

### 6.1 Push to GitHub
```bash
git add -A
git commit -m "fix: comprehensive design system unification, dark mode, remove SQLite

- Pin Next.js 14.2.35 across all sites
- Fix TS JSX config
- Unify design tokens (colors, fonts, spacing)
- Add dark mode to restaurant-site, taskflow-saas, booking-system, ecommerce-store
- Replace SQLite with localStorage + serverless APIs
- Fix portfolio navigation
- Extract shared component library"
git push origin main
```

### 6.2 Vercel Project Setup
Each site needs its own Vercel project with:
- Root Directory: `restaurant-site`, `taskflow-saas`, etc.
- Build Command: `npm run build` (or `vercel-build` for full-stack)
- Output Directory: `out` (static) or default (full-stack)
- Environment Variables: `ADMIN_PASSWORD`, `RESEND_API_KEY`, `STRIPE_SECRET_KEY`

### 6.3 Domain Configuration
- `dkservers.space` → moshine-portfolio (main branch)
- Subpath redirects in portfolio's vercel.json (already done)

---

## Exact Commands to Run

```bash
# 1. Fix Next.js versions
cd /home/daniel/templatesites-business
for d in restaurant-site taskflow-saas booking-system ecommerce-store analytics-dashboard moshine-portfolio; do
  cd $d
  npm pkg set dependencies.next="14.2.35"
  npm pkg set dependencies.react="18.3.1"
  npm pkg set dependencies["react-dom"]="18.3.1"
  cd ..
done

# 2. Fix tsconfig.json JSX
for d in restaurant-site booking-system ecommerce-store analytics-dashboard moshine-portfolio; do
  cd $d
  # Use node to edit JSON properly
  node -e "
    const fs = require('fs');
    const cfg = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    cfg.compilerOptions.jsx = 'react-jsx';
    fs.writeFileSync('tsconfig.json', JSON.stringify(cfg, null, 2));
  "
  cd ..
done

# 3. Install dependencies
for d in restaurant-site taskflow-saas booking-system ecommerce-store analytics-dashboard moshine-portfolio; do
  cd $d && npm install && cd ..
done

# 4. Build test
for d in restaurant-site taskflow-saas booking-system ecommerce-store analytics-dashboard moshine-portfolio; do
  echo "=== Building $d ==="
  cd $d && npm run build && cd ..
done
```

---

## Verification Checklist

After fixes, verify each site:

- [ ] `npm run build` passes
- [ ] `npm run dev` starts without errors
- [ ] Dark mode toggle works
- [ ] Colors match design-system.md exactly
- [ ] Fonts load correctly (Fraunces + Inter)
- [ ] Buttons, cards, fields look consistent
- [ ] Portfolio nav works on all pages
- [ ] No better-sqlite3 in bundle (check `npm ls`)
- [ ] Accessibility: focus rings, 44px targets, reduced motion

---

## Timeline Estimate

| Phase | Effort |
|-------|--------|
| 1: Foundation | 2-3 hours |
| 2: Dark Mode | 3-4 hours |
| 3: Remove SQLite | 4-6 hours |
| 4: Portfolio Nav | 1 hour |
| 5: Component Lib | 3-4 hours |
| 6: Deploy | 1 hour |
| **Total** | **14-19 hours** |

**Recommendation:** Do Phases 1-3 first (core fixes), deploy, then Phases 4-5 (polish).