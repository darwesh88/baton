---
name: security
description: >-
  Universal security rules for every project. Covers secrets management,
  database security, input validation, authentication, API security, and
  common vulnerabilities. Use when building auth, handling user data,
  setting up databases, or reviewing security.
---

# Security Skill — Universal Rules

> These rules apply to EVERY project, regardless of stack or domain.
> Violations are blockers. Do not ship without addressing them.

---

## Secrets Management

### Never Commit Secrets

```
# BLOCKED - Never do this
const API_KEY = "sk-live-abc123..."
const DATABASE_URL = "postgres://user:password@..."

# CORRECT - Use environment variables
const API_KEY = process.env.API_KEY
const DATABASE_URL = process.env.DATABASE_URL
```

### Environment Variable Rules

| Variable Type | Prefix | Exposed To |
|--------------|--------|------------|
| Server-only secrets | None | Server only |
| Public keys | NEXT_PUBLIC_ / VITE_ | Client + Server |

```bash
# .env.local (never commit)
DATABASE_URL=...           # Server only
API_SECRET=...             # Server only
NEXT_PUBLIC_APP_URL=...    # Safe for client
```

### Check Before Commit

Before every commit, verify:
- [ ] No hardcoded secrets in code
- [ ] .env files in .gitignore
- [ ] No secrets in error messages or logs

---

## Database Security

### Row Level Security (RLS)

**MANDATORY for all tables.** No exceptions.

```sql
-- Enable RLS on every table
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Default deny - explicit policies required
CREATE POLICY "Users see own data"
ON items FOR SELECT
USING (auth.uid() = user_id);
```

### Verify RLS Is Enabled

```sql
-- Check all tables have RLS
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

Every table should show `rowsecurity = true`.

### Service Role Key

- Use ONLY in server-side code
- NEVER expose to client
- Use for admin operations and background jobs only

---

## Input Validation

### Validate All Inputs

Every form, API endpoint, and server action MUST validate input.

```typescript
// REQUIRED - Use Zod or similar
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().positive().optional(),
})

// Validate before using
const result = schema.safeParse(input)
if (!result.success) {
  return { error: 'Invalid input' }
}
```

### Never Trust Client Data

```typescript
// BAD - Trusting client-provided user ID
const userId = req.body.userId  // User can send any ID!

// GOOD - Get user ID from authenticated session
const userId = session.user.id  // Server-verified
```

---

## Authentication

### Verify Auth on Every Protected Route

```typescript
// Server component
const user = await getAuthenticatedUser()
if (!user) {
  redirect('/login')
}

// API route
export async function POST(req: Request) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
```

### Session Security

- Use HTTP-only cookies for tokens (not localStorage)
- Set secure flag in production
- Implement session expiry
- Rotate tokens on privilege changes

---

## API Security

### Rate Limiting

All public endpoints MUST have rate limiting.

```typescript
// Example with Upstash
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
})

const { success } = await ratelimit.limit(identifier)
if (!success) {
  return Response.json({ error: 'Too many requests' }, { status: 429 })
}
```

### CORS

Configure CORS to allow only trusted origins:

```typescript
// Only allow your domain
const allowedOrigins = ['https://yourdomain.com']
```

---

## File Uploads

### Validate Before Accepting

```typescript
// Check file type
const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
if (!allowedTypes.includes(file.type)) {
  return { error: 'Invalid file type' }
}

// Check file size (e.g., 5MB max)
const maxSize = 5 * 1024 * 1024
if (file.size > maxSize) {
  return { error: 'File too large' }
}
```

### Store Securely

- Use signed URLs for private files
- Set appropriate expiry times
- Never serve user uploads from your main domain (use CDN/storage domain)

---

## Error Handling

### Never Expose Internal Errors

```typescript
// BAD - Exposes internal details
catch (error) {
  return { error: error.message }  // Could leak DB schema, paths, etc.
}

// GOOD - Generic message, log internally
catch (error) {
  console.error('Operation failed:', error)  // Log for debugging
  return { error: 'Something went wrong' }   // Safe for user
}
```

### Log Sensitive Operations

Log but don't expose:
- Failed login attempts
- Permission denied events
- Unusual patterns (many requests, odd hours)

---

## HTTPS

### Enforce HTTPS Everywhere

- All production traffic over HTTPS
- Redirect HTTP to HTTPS
- Use HSTS headers

```typescript
// Middleware example
if (process.env.NODE_ENV === 'production' && !req.secure) {
  return Response.redirect(`https://${req.host}${req.url}`)
}
```

---

## Security Headers

Add these headers in production:

```typescript
// next.config.js or middleware
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
]
```

### Content Security Policy (CSP)

For apps with user content or third-party scripts:

```typescript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline'..."
}
```

---

## Quick Checklist

Before any release:

- [ ] No secrets in code or logs
- [ ] RLS enabled on all tables
- [ ] All inputs validated with Zod
- [ ] Auth checked on all protected routes
- [ ] Rate limiting on public APIs
- [ ] File uploads validated (type + size)
- [ ] Error messages don't leak internals
- [ ] HTTPS enforced
- [ ] Security headers configured

---

## Common Vulnerabilities to Avoid

| Vulnerability | Prevention |
|--------------|------------|
| SQL Injection | Use parameterized queries (ORMs do this) |
| XSS | Escape user content, use CSP |
| CSRF | Use anti-CSRF tokens (frameworks handle this) |
| Broken Auth | Verify session on every request |
| Sensitive Data Exposure | Encrypt at rest, HTTPS in transit |
| Insecure File Upload | Validate type/size, use signed URLs |

---

*Last updated: Baton Protocol v3.1*
