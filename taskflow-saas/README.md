# TaskFlow — SaaS Landing Page Template

Site 2 of the MoshineSites 4-template portfolio. A statically exported Next.js landing
page for a task-management product, with a fully interactive live task-widget demo.

## Stack

- Next.js 14.2 (static export, `output: 'export'`)
- React 18 + TypeScript
- Tailwind CSS 3.4 (MoshineSites design-system tokens)
- Framer Motion 11 (interactive sections only)

No UI libraries, no backend, no API calls. The demo widget is pure client state
(`useState`) with localStorage persistence.

## Getting started

```bash
npm install
npm run dev        # local dev server at http://localhost:3000
npm run build      # static export → ./out
npm start          # serve the static ./out build (node static server)
npm run lint       # next lint
```

## Notes

- The live demo saves tasks to localStorage under `taskflow.tasks.v1`. Seed data is used
  on first visit only.
- `prefers-reduced-motion` is respected in CSS and via Framer Motion's `useReducedMotion`.
- Anchor links scroll to in-page sections; social links open real platform homes in new tabs.