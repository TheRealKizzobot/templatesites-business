# Design: MoshineSites Portfolio — Filter-First Showcase

**Date:** 2026-11-03
**Project:** `moshine-portfolio` (the main showcase site for the MoshineSites website business)
**Status:** Draft — pending builder check

## Intent

The portfolio is a **forwarded link**, not a homepage people browse to. Daniel advertises (ads, cold calls) and, when a prospect asks for proof, sends them the portfolio link. The page must convince on its own, fast, on a phone, with no salesperson in the room.

The five existing templates are **examples**, not a fixed catalog. Daniel will take on other project types, so the portfolio must grow without restructuring.

## Goals

- A prospect who receives the link can find the most relevant example in under 10 seconds.
- Each example has enough depth (screenshot, description, live demo, CTA) to stand on its own as proof.
- Adding a new project later is a data entry task, not a code change.

## Non-goals

- No fixed verticals (restaurant, SaaS, store, dashboard are tags, not categories).
- No separate marketing site beyond the portfolio — this IS the marketing site.
- No blog, no CMS, no admin panel for the portfolio itself.

## How it works

**Level 1 — Filter homepage.** Hero with one line ("Real sites, built for real businesses"). Below: a filter bar of tags (All, Restaurant, SaaS, E-commerce, Dashboard, Landing page, Custom, …). Below that: a grid of project cards. Each card shows: screenshot thumbnail, title, subtitle, tags, and a "View case study →" link. Clicking a tag filters the grid in place (client-side, no page reload).

**Level 2 — Case-study page.** One page per project: project name, type/tags, full screenshot, description of what was built, "Try live demo" button (opens the deployed site), "Get this site" CTA (contact form or book-a-call), tech stack line, and a "← Back to all projects" link.

## Constraints

- Stack: Next.js (App Router), Tailwind CSS, TypeScript — matches the existing portfolio site and design system (`design-system.md`: brand `#5a4a42`, Fraunces + Inter, 8px spacing, WCAG AA, 44px touch targets, mobile-first).
- Static-export friendly where possible (the portfolio is currently a plain Next.js app with no backend).
- Data-driven: projects live in a single array/file so adding one is trivial. No database needed for the portfolio itself.
- Must work on mobile (prospects open the link on their phones).

## What's left to the builder

- Exact copy and tone of the hero and CTAs.
- Whether "Get this site" opens a contact form or a Calendly-style booking link.
- Whether to keep the existing pricing tiers and "who we are" section or strip down.
- Visual polish, animations, and responsive breakpoints (within the design system).
- How tags are defined and whether a project can have multiple tags.