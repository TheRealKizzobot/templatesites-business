# Ember & Wood — Restaurant Website Template

A portfolio-grade, frontend-only restaurant website template built with Next.js 14.2, React 18, TypeScript and Tailwind CSS 3.4. Statically exported to `out/`.

## Features

- Sticky nav with backdrop blur and accessible mobile drawer
- Hero, about, featured dishes, lightbox gallery, testimonials, hours/contact and reservation CTA
- Self-contained SVG illustrations in `public/images/` (no external assets)
- Design tokens (colors, spacing, type, radii, shadows) mapped from `design-system.md`
- WCAG AA contrast, 44px touch targets, focus-visible rings, `prefers-reduced-motion`

## Getting started

```bash
npm install
npm run dev      # local development at http://localhost:3000
npm run build    # static export to out/
npm run start    # serve the production build
npm run lint     # eslint
```

## Structure

```
src/app/          page, layout, globals (tokens + Tailwind layers)
src/components/   Nav, Hero, About, FeaturedDishes, Gallery, Testimonials, HoursContact, ReservationCTA, Footer
src/lib/data.ts   content data (dishes, gallery, testimonials, hours, contact)
public/images/    17 self-contained SVG illustrations
```

## Tech notes

- `next.config.mjs`: `output: 'export'`, `images.unoptimized = true`
- All images use plain `<img>` with `loading="lazy"` and explicit dimensions
- No external UI libraries, no API calls, no backend