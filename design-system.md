# MoshineSites Template Portfolio — Design System

One consistent design system across all 4 templates.

## Colors (CSS variables + Tailwind theme)

| Token | Value | Purpose |
|-------|-------|---------|
| `--bg-primary` | `#ffffff` | Page background |
| `--bg-secondary` | `#f4efe8` | Alternating sections, cards |
| `--text-primary` | `#1a1a1a` | Headings / body (AA on white & secondary bg) |
| `--text-secondary` | `#6b6b6b` | Muted text (AA on white & #f4efe8) |
| `--brand` | `#5a4a42` | Brand color (AA on white) |
| `--border` | `#e0ddd8` | Hairlines, dividers |
| `--error` | `#c94a4a` | Errors (AA on white) |

### Derived brand scale (from `#5a4a42`)
`brand-50 #faf8f6`, `brand-100 #f0ece8`, `brand-200 #ddd4cd`, `brand-300 #c4b7ae`, `brand-400 #a98f82`, `brand-500 #5a4a42`, `brand-600 #4a3d37`, `brand-700 #3b312c`, `brand-800 #2c2521`, `brand-900 #1d1815`

Supporting: `success #3d7a4e`, `warning #b07d2b`

## Spacing (8px base → Tailwind `extend.spacing`)

`xs: 4px`, `sm: 8px`, `md: 16px`, `lg: 24px`, `xl: 32px`, `2xl: 48px`, `3xl: 64px`

## Typography

- **Display:** Fraunces (serif, via `next/font/google`, fallback Georgia) — headings, hero, section titles
- **Body:** Inter (sans, via `next/font/google`, fallback system-ui) — body, UI, forms
- Scale: hero `text-4xl`–`text-5xl`, section titles `text-3xl`, cards `text-xl`, body `text-md`, captions `text-sm`

## Radii & Shadows

- Cards `rounded-xl` (16px), pills/buttons `rounded-full`, inputs `rounded-md`
- Soft shadows: `0 1px 2px rgba(26,26,26,.04)`, `0 4px 12px rgba(26,26,26,.06)`

## Responsive

- Mobile 0–640px: 1 column, hamburger nav
- Tablet 640–1024px: 2 columns (`sm:` breakpoint)
- Desktop 1024px+: 3 columns (`lg:` breakpoint)

## Accessibility (all templates)

- WCAG AA: 4.5:1 contrast minimum; headings/body as tokenized above
- 44px minimum touch targets (buttons, links, inputs)
- Semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `footer`)
- `focus-visible` ring: 2px brand, 2px offset
- `prefers-reduced-motion` respected (CSS media query + `useReducedMotion`)
- `aria-label`s on icon-only controls; form labels associated with inputs
- Decorative images `alt=""`; content images descriptive `alt`

## Tech Baseline

- Next.js **14.2.x** (pin), React 18, TypeScript, Tailwind CSS **3.4.x**
- No external UI component libraries
- Frontend-only: `output: 'export'` in next.config, no API calls, local SVG image assets
- Backend: `better-sqlite3`, `export const runtime = 'nodejs'` on API routes, seed script, `.env.example`, README
- Fast: lazy-loaded images, minimal deps, no console errors