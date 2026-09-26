# MoshineSites — Agent Instructions

## Project Context
This is a monorepo containing 5 Next.js site templates + 1 portfolio site, sharing one design system (`design-system.md`). Each template is a standalone project with its own dependencies.

## How to Work in This Repo

### 1. Always Work in Isolation
- **Use git worktrees** for any edits: `EnterWorktree` tool or `git worktree add`
- The main checkout rejects direct edits — you'll get a permission error
- Each worktree gets its own branch; merge back when done

### 2. Build Verification Required
After any code change, verify the affected site builds:
```bash
cd <site-folder> && npm run build
```
All 6 sites must pass: `restaurant-site`, `taskflow-saas`, `booking-system`, `ecommerce-store`, `analytics-dashboard`, `moshine-portfolio`

### 3. Branch Discipline
- `develop` = active development (you're here now)
- `testing` = staging/QA (merge develop → testing)
- `main` = production (merge testing → main)
- Never commit directly to `main`

### 4. Security Non-Negotiables
- **Never** remove `realpathSync` checks in `scripts/serve-out.mjs` (path traversal protection)
- **Never** commit `.env` files or real secrets
- Admin passwords via `ADMIN_PASSWORD` env var only
- API routes using `better-sqlite3` must have `export const runtime = 'nodejs'`

### 5. Alias Resolution (`@/lib/*`)
- Backend sites: root-level `lib/` = client-safe, `src/lib/` = server-only
- This prevents `better-sqlite3` from leaking to client bundles
- If you add shared logic, put client-safe code in `lib/`, server code in `src/lib/`

### 6. Static Export Sites
- `restaurant-site`, `taskflow-saas`, `moshine-portfolio` use `output: 'export'`
- `npm start` runs `scripts/serve-out.mjs` (not `next start`)
- Build outputs to `out/` directory

### 7. Full-Stack Sites
- `booking-system`, `ecommerce-store`, `analytics-dashboard` use SQLite (`better-sqlite3`)
- DB at `data/<name>.db` (gitignored)
- Seed with `npm run seed` (idempotent)
- Dev ports: 3000 (booking), 3020 (ecommerce), 3010 (analytics)

---

## Vercel Deployment Rules

### Branch → Environment Mapping
| Branch | Environment | Domains |
|--------|-------------|---------|
| `main` | Production | `dkservers.space`, `*-lac.vercel.app`, etc. |
| `testing` | Preview | `*-git-testing-...vercel.app` |
| `develop` | Preview | `*-git-develop-...vercel.app` |

### Push Flow
1. Edit in worktree on `develop`
2. Merge `develop` → `testing`, push → Vercel preview
3. Merge `testing` → `main`, push → Vercel production (custom domains)

### Root `vercel.json`
Only configures the **portfolio project** with redirects to the 5 template deployments. Individual sites have their own Vercel project settings (rootDirectory configured in dashboard).

---

## Common Tasks

### Add a New Template
1. Create folder with `package.json`, `next.config.mjs`, `tailwind.config.ts`
2. Follow `design-system.md` tokens exactly
3. Add to `design-system.md` if new tokens needed
4. Add to `vercel.json` redirects if portfolio should link to it

### Modify Design System
1. Edit `design-system.md`
2. Update `tailwind.config.ts` in all 6 sites
3. Update `globals.css` CSS variables in all 6 sites
4. Build all 6 sites to verify

### Fix a Bug in One Site
1. `EnterWorktree` with descriptive name
2. Make fix
3. `cd <site> && npm run build` (must pass)
4. Merge worktree branch back to `develop`
5. Push `develop` → auto-deploys preview

### Update Ecommerce/Analytics Pricing/Metrics
- Single source of truth in `lib/format.ts` (client-safe)
- Server logic in `lib/store.ts` imports from `lib/format.ts`
- Change in one place, rebuild both client and server

---

## What NOT to Do

| Don't | Why |
|-------|-----|
| Edit files directly in main checkout | Rejected by git worktree guard |
| Remove `realpathSync` from serve-out.mjs | Path traversal vulnerability |
| Add UI component libraries (shadcn, MUI, etc.) | Design system is hand-rolled, zero-dep |
| Put `better-sqlite3` in `lib/` | Breaks client builds |
| Skip `npm run build` verification | Silent failures deploy to Vercel |
| Commit to `main` directly | Bypasses preview testing |
| Change `output: 'export'` on static sites | Breaks static hosting |

---

## Quick Reference

| File | Purpose |
|------|---------|
| `design-system.md` | Source of truth for all tokens |
| `vercel.json` | Root Vercel config (portfolio redirects) |
| `.vercel/project.json` | Vercel project linkage |
| `CLAUDE.md` | Full project documentation |
| `PLAN.md` | Project status/history |

---

## Contact
Repo: `TheRealKizzobots/templatesites-business`
Vercel Org: `therealkizzobots-projects`
Custom Domain: `dkservers.space`
