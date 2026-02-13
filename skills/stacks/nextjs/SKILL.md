---
name: nextjs
description: >-
  Next.js App Router patterns and conventions for production applications.
  Covers Server Components, Server Actions, route groups, loading/error
  states, and common pitfalls. Use when working with Next.js 14+,
  React Server Components, or App Router projects.
---

# Next.js Skill File

> Proven patterns from production Next.js projects. Check here before searching the web.

---

## Version Compatibility

This file covers Next.js 14-16 with App Router. Update version notes as needed.

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth route group
│   ├── (dashboard)/      # Main app route group
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/               # shadcn/ui components
│   └── [feature]/        # Feature-specific components
├── lib/
│   ├── actions/          # Server actions
│   ├── db/               # Database utilities
│   └── utils.ts          # Helper functions
└── types/
    └── index.ts          # Type definitions
```

---

## Key Patterns

### Server Components First

Default to Server Components. Only use `'use client'` when you need:
- useState, useEffect
- Event handlers (onClick, onChange)
- Browser APIs

```tsx
// Server Component (default) - can fetch data directly
export default async function Page() {
  const data = await getData()
  return <div>{data}</div>
}

// Client Component - only when needed
'use client'
export function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### Server Actions for Mutations

All data mutations go through Server Actions. Never mutate from client.

```tsx
// lib/actions/items.ts
'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
})

export async function createItem(formData: FormData) {
  const parsed = schema.safeParse({
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return { success: false, error: 'Invalid input' }
  }

  // Database operation here

  revalidatePath('/items')
  return { success: true }
}
```

### Route Groups for Layout Control

Use `(groupName)` folders to share layouts without affecting URLs.

```
app/
├── (marketing)/          # Marketing layout
│   ├── layout.tsx
│   ├── page.tsx          # → /
│   └── pricing/page.tsx  # → /pricing
└── (dashboard)/          # Dashboard layout
    ├── layout.tsx
    └── dashboard/page.tsx # → /dashboard
```

### Loading and Error States

Every route group should have loading and error handling.

```
app/
└── dashboard/
    ├── page.tsx
    ├── loading.tsx       # Shows while page loads
    └── error.tsx         # Shows on error (must be 'use client')
```

---

## Common Commands

```bash
# Development
npm run dev

# Build (always run before deploying)
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

---

## Pitfalls to Avoid

### 1. Importing Server-Only Code in Client Components

```tsx
// BAD - will break
'use client'
import { db } from '@/lib/db'  // Server-only!

// GOOD - use Server Actions
'use client'
import { getData } from '@/lib/actions/data'
```

### 2. Not Using revalidatePath After Mutations

```tsx
// BAD - UI won't update
export async function createItem() {
  await db.insert(...)
  return { success: true }
}

// GOOD - UI updates
export async function createItem() {
  await db.insert(...)
  revalidatePath('/items')
  return { success: true }
}
```

### 3. Using useEffect for Data Fetching

```tsx
// BAD - unnecessary client-side fetch
'use client'
export function Items() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch('/api/items').then(...)
  }, [])
}

// GOOD - fetch in Server Component
export default async function Items() {
  const items = await getItems()
  return <ItemsList items={items} />
}
```

### 4. Forgetting 'use client' for Interactive Components

If you use useState, useEffect, onClick, onChange — you need 'use client'.

---

## Recommended Libraries

| Need | Library | Why |
|------|---------|-----|
| UI Components | shadcn/ui | Customizable, accessible, copy-paste |
| Forms | react-hook-form + zod | Type-safe validation |
| Styling | Tailwind CSS | Utility-first, fast |
| Icons | Lucide React | Clean, consistent |
| Date handling | date-fns | Lightweight, tree-shakeable |
| Animation | Framer Motion | Powerful, declarative |

---

## Environment Variables

```bash
# .env.local (never commit)
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=      # NEXT_PUBLIC_ = exposed to client
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # No prefix = server-only
```

**Rule:** Never put sensitive keys in NEXT_PUBLIC_ variables.

---

*Last updated: Baton Protocol v3.1*
