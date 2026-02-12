# Supabase Skill File

> Proven patterns from production Supabase projects. Check here before searching the web.

---

## Setup

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Server-only, never expose
```

### Client Setup

```typescript
// lib/supabase/client.ts - Browser client
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

```typescript
// lib/supabase/server.ts - Server client
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

---

## Row Level Security (RLS)

**MANDATORY:** Enable RLS on ALL tables. No exceptions.

### Basic Pattern

```sql
-- Enable RLS
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Users can only see their own items
CREATE POLICY "Users can view own items"
ON items FOR SELECT
USING (auth.uid() = user_id);

-- Users can only insert their own items
CREATE POLICY "Users can insert own items"
ON items FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can only update their own items
CREATE POLICY "Users can update own items"
ON items FOR UPDATE
USING (auth.uid() = user_id);

-- Users can only delete their own items
CREATE POLICY "Users can delete own items"
ON items FOR DELETE
USING (auth.uid() = user_id);
```

### Service Role Bypass

For background jobs and admin operations, use service role key:

```typescript
// lib/supabase/admin.ts - Admin client (server-only)
import { createClient } from '@supabase/supabase-js'

export const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // Bypasses RLS
)
```

**Warning:** Never expose service role key to client.

---

## Database Patterns

### Currency Storage

Store currency in smallest units (cents, fils, etc.):

```sql
-- Store AED 100.50 as 10050 (fils)
amount_fils INTEGER NOT NULL

-- Store USD 99.99 as 9999 (cents)
amount_cents INTEGER NOT NULL
```

Convert for display:
```typescript
const displayAmount = (fils: number) => (fils / 100).toFixed(2)
```

### Timestamps

Always include audit timestamps:

```sql
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- your fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_items_updated_at
  BEFORE UPDATE ON items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

### Soft Deletes (Voiding)

Never hard-delete financial/audit records:

```sql
-- Add to table
is_void BOOLEAN DEFAULT FALSE,
voided_at TIMESTAMPTZ,
voided_by UUID REFERENCES auth.users(id),
void_reason TEXT

-- Update RLS to exclude voided records
CREATE POLICY "Users can view non-voided items"
ON items FOR SELECT
USING (auth.uid() = user_id AND is_void = FALSE);
```

---

## Type Generation

Generate TypeScript types from your database:

```bash
npx supabase gen types typescript --project-id your-project-id > src/types/database.ts
```

Use in code:
```typescript
import { Database } from '@/types/database'

type Item = Database['public']['Tables']['items']['Row']
type InsertItem = Database['public']['Tables']['items']['Insert']
```

---

## Common Operations

### Fetch with Type Safety

```typescript
const { data, error } = await supabase
  .from('items')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })

if (error) throw error
// data is typed as Item[]
```

### Insert with Returning

```typescript
const { data, error } = await supabase
  .from('items')
  .insert({ name: 'New Item', user_id: userId })
  .select()
  .single()

if (error) throw error
// data is the inserted row
```

### Update

```typescript
const { error } = await supabase
  .from('items')
  .update({ name: 'Updated Name' })
  .eq('id', itemId)
  .eq('user_id', userId)  // Always include user check

if (error) throw error
```

### Upsert

```typescript
const { data, error } = await supabase
  .from('settings')
  .upsert({
    user_id: userId,
    key: 'theme',
    value: 'dark'
  })
  .select()
  .single()
```

---

## Storage

### Bucket Setup

```sql
-- Create bucket (run in SQL editor)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- RLS for storage
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### Upload File

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/${fileName}`, file)

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${userId}/${fileName}`)
```

### Private Files (Signed URLs)

```typescript
// For private buckets
const { data, error } = await supabase.storage
  .from('documents')
  .createSignedUrl(`${userId}/${fileName}`, 3600) // 1 hour expiry
```

---

## Auth

### Get Current User (Server)

```typescript
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()

if (!user) {
  redirect('/login')
}
```

### Auth Helper

```typescript
// lib/auth.ts
export async function getAuthenticatedUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error('Not authenticated')
  }

  return user
}
```

---

## Migrations

### Naming Convention

```
20260210_001_create_items_table.sql
20260210_002_add_status_to_items.sql
```

### Migration Workflow

1. Create migration file in `supabase/migrations/`
2. Test locally: `npx supabase db reset`
3. Ask user to run in production dashboard
4. Wait for confirmation
5. Regenerate types
6. Then build UI

**Never build UI for tables that don't exist yet.**

---

## Pitfalls to Avoid

### 1. Forgetting RLS

Every table needs RLS. No exceptions. Check with:
```sql
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
```

### 2. Exposing Service Role Key

```typescript
// BAD - service role in client code
'use client'
import { adminClient } from '@/lib/supabase/admin'  // NEVER

// GOOD - use server actions
'use client'
import { adminAction } from '@/lib/actions/admin'
```

### 3. Not Handling Errors

```typescript
// BAD
const { data } = await supabase.from('items').select('*')

// GOOD
const { data, error } = await supabase.from('items').select('*')
if (error) {
  console.error('Failed to fetch items:', error)
  throw error
}
```

### 4. Using .single() Without Checking

```typescript
// BAD - throws if no rows
const { data } = await supabase.from('items').select('*').single()

// GOOD - handle empty case
const { data } = await supabase.from('items').select('*').maybeSingle()
if (!data) {
  // Handle not found
}
```

---

*Last updated: Baton Protocol v3.1*
