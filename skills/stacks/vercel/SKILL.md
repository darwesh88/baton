---
name: vercel
description: >-
  Vercel deployment patterns — project setup, environment variables, domains,
  preview deployments, and edge functions. Load at Session 3+ when deploying
  to Vercel. Use when setting up deployment or troubleshooting builds.
---

# Vercel Skill

> Deploy first, polish later. A live URL changes everything.

---

## First Deployment (Session 3)

### Connect Repository

1. Go to vercel.com → New Project
2. Import your GitHub repo
3. Vercel auto-detects Next.js (or other frameworks)
4. Click Deploy

That's it. Every push to `main` auto-deploys.

### Or Use CLI

```bash
npm i -g vercel
vercel          # Deploy preview
vercel --prod   # Deploy to production
```

---

## Environment Variables

### Setting Them

```
Vercel Dashboard → Project → Settings → Environment Variables
```

### Environment Scoping

| Scope | When Applied |
|-------|-------------|
| Production | `vercel.com` (main branch) |
| Preview | PR deployments, branches |
| Development | `vercel dev` locally |

**Rule:** Always set variables for all three environments. Missing preview env vars = broken PR previews.

### Naming

```
DATABASE_URL=...                    # Server only
STRIPE_SECRET_KEY=...               # Server only
NEXT_PUBLIC_APP_URL=...             # Client + server (public)
NEXT_PUBLIC_SUPABASE_URL=...        # Client + server (public)
```

**`NEXT_PUBLIC_` prefix = exposed to browser.** Never put secrets in `NEXT_PUBLIC_` variables.

---

## Custom Domain

### Setup

```
Vercel Dashboard → Project → Settings → Domains → Add
```

### DNS Configuration

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### SSL

Automatic. Vercel provisions Let's Encrypt certificates. Nothing to configure.

---

## Preview Deployments

Every PR gets its own URL: `project-git-branch-name-username.vercel.app`

### Uses

- Test features before merging
- Share with teammates for review
- QA on a real URL
- Test with preview environment variables

### Preview Comments

Enable in project settings. Team members can comment directly on preview deployments.

---

## Build Configuration

### Next.js Defaults (Usually No Config Needed)

Vercel auto-detects:
- Build command: `next build`
- Output directory: `.next`
- Install command: `npm install`

### Custom Build Settings

Only change if needed:

```
Vercel Dashboard → Project → Settings → General → Build & Development Settings
```

### Build Troubleshooting

| Problem | Fix |
|---------|-----|
| Build fails locally works | Check Node.js version matches (Settings → General) |
| Missing env vars | Add to Vercel dashboard, not just .env.local |
| Type errors in build | Run `npx tsc --noEmit` locally first |
| Module not found | Check imports, case sensitivity (Linux is case-sensitive) |

---

## Serverless Functions

### API Routes (Automatic)

Next.js API routes automatically become serverless functions:

```typescript
// app/api/hello/route.ts → deployed as serverless function
export async function GET() {
  return Response.json({ message: 'hello' });
}
```

### Limits

| Limit | Free | Pro |
|-------|------|-----|
| Duration | 10s | 60s |
| Memory | 1024MB | 3008MB |
| Size | 4.5MB | 4.5MB |

**If your function times out:** Optimize the query, add caching, or upgrade to Pro.

---

## Edge Functions

### When to Use

- Middleware (auth checks, redirects)
- Geolocation-based responses
- A/B testing
- When you need <50ms response times globally

### When NOT to Use

- Database queries (most databases aren't at the edge)
- Heavy computation
- Node.js-specific APIs

```typescript
// middleware.ts runs on the edge by default
export function middleware(request: NextRequest) {
  // Fast, runs in 50+ global locations
}
```

---

## Caching

### Static Pages (Automatic)

Pages without dynamic data are statically generated at build time. Served from CDN. Instant.

### ISR (Incremental Static Regeneration)

```typescript
// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Page() {
  const data = await getData();
  return <div>{data}</div>;
}
```

### On-Demand Revalidation

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const { path } = await request.json();
  revalidatePath(path);
  return Response.json({ revalidated: true });
}
```

---

## Deployment Checklist

### Before First Deploy
- [ ] Build passes locally (`npm run build`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] Environment variables set in Vercel dashboard
- [ ] `.env.local` is in `.gitignore`

### Before Going Live
- [ ] Custom domain configured
- [ ] Production environment variables set
- [ ] Preview deployments working
- [ ] Test the production URL (not just preview)
- [ ] Error tracking installed (Sentry)

---

*Last updated: Baton Protocol v3.1*
