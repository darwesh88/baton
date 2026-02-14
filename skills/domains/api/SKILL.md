---
name: api
description: >-
  API service patterns — RESTful design, endpoint versioning, authentication,
  rate limiting, documentation, and error handling. Load at Session 0 when
  building a backend API, webhook service, or microservice. Stays loaded
  entire lifecycle.
---

# API Service Domain Skill

> An API is a contract. Breaking it breaks everyone who depends on you.

---

## Load This Skill When

- User says they're building an API, backend service, or webhook handler
- Project serves data to other apps (mobile, frontend, third-party)
- No user-facing UI — the API IS the product

---

## API Design (Session 0-1)

### URL Structure

```
GET    /api/v1/items          — List items
GET    /api/v1/items/:id      — Get single item
POST   /api/v1/items          — Create item
PATCH  /api/v1/items/:id      — Update item
DELETE /api/v1/items/:id      — Delete item
```

**Rules:**
- Plural nouns (`/items` not `/item`)
- No verbs in URLs (`/items` not `/getItems`)
- Nest for relationships (`/items/:id/comments`)
- Maximum 2 levels of nesting
- Version in URL (`/api/v1/`) from day one

### Response Format

Always return consistent JSON:

```json
// Success
{
  "data": { ... },
  "meta": { "page": 1, "total": 42 }
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Name is required",
    "details": [
      { "field": "name", "message": "Cannot be empty" }
    ]
  }
}
```

**Never return:**
- Raw database errors
- Stack traces
- Inconsistent formats (sometimes array, sometimes object)

### HTTP Status Codes (Use These, Not Others)

| Code | When |
|------|------|
| 200 | Success (GET, PATCH) |
| 201 | Created (POST) |
| 204 | Deleted (DELETE, no body) |
| 400 | Bad request (validation failed) |
| 401 | Not authenticated |
| 403 | Authenticated but not authorized |
| 404 | Resource not found |
| 409 | Conflict (duplicate, version mismatch) |
| 429 | Rate limited |
| 500 | Server error (your fault) |

Don't use obscure status codes. These 10 cover everything.

---

## Authentication (Session 1-2)

### API Key Authentication (Simplest)

```typescript
// Middleware
const apiKey = req.headers['x-api-key'];
if (!apiKey || !isValidApiKey(apiKey)) {
  return Response.json(
    { error: { code: 'UNAUTHORIZED', message: 'Invalid API key' } },
    { status: 401 }
  );
}
```

**API key rules:**
- Prefix keys for identification (`baton_live_...`, `baton_test_...`)
- Store hashed, not plaintext
- Support key rotation (multiple active keys per user)
- Different keys for test vs production

### When to Use What

| Method | Use For |
|--------|---------|
| API keys | Server-to-server, simple integrations |
| JWT tokens | User-facing apps, short-lived sessions |
| OAuth 2.0 | Third-party integrations, "Login with X" |

**Default:** API keys for most backend services. Only add OAuth when third parties need access.

---

## Rate Limiting (Session 2-3)

### Implement From Day One

```typescript
// Simple in-memory rate limiter (replace with Redis for production)
const rateLimit = {
  windowMs: 60 * 1000,     // 1 minute
  maxRequests: 100,          // per window
};
```

### Rate Limit Headers

Always return these:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1708300800
```

### Tiered Limits

| Tier | Requests/min | Use Case |
|------|-------------|----------|
| Free | 60 | Testing, hobby |
| Pro | 600 | Production apps |
| Enterprise | 6000 | High-volume |

---

## Pagination (Session 1-2)

### Cursor-Based (Recommended)

```
GET /api/v1/items?limit=20&cursor=abc123
```

Response:
```json
{
  "data": [...],
  "meta": {
    "has_more": true,
    "next_cursor": "def456"
  }
}
```

**Why cursor over offset:** Offset pagination breaks when data changes between pages. Cursor doesn't.

### If Offset is Simpler

```
GET /api/v1/items?page=1&per_page=20
```

Response includes `total`, `page`, `per_page`, `total_pages`.

Fine for admin dashboards. Not for public APIs with frequent writes.

---

## Validation (Session 1-2)

### Validate Everything at the Boundary

```typescript
import { z } from 'zod';

const createItemSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  price_cents: z.number().int().positive(),
});

// In route handler
const parsed = createItemSchema.safeParse(body);
if (!parsed.success) {
  return Response.json({
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Invalid input',
      details: parsed.error.issues,
    }
  }, { status: 400 });
}
```

---

## Versioning (Session 0)

### URL Versioning (Default)

```
/api/v1/items
/api/v2/items
```

**Rules:**
- Start at v1, not v0
- Only bump version for breaking changes
- Keep old version running for at least 6 months
- Announce deprecation in response headers

```
Deprecation: true
Sunset: Sat, 01 Jan 2027 00:00:00 GMT
Link: <https://docs.example.com/migration>; rel="deprecation"
```

---

## Documentation (Session 4+)

### Minimum Viable Docs

Every endpoint needs:
- URL and method
- Request body (with example)
- Response body (with example)
- Error responses
- Authentication required (yes/no)

### OpenAPI/Swagger

Generate from code if possible. Don't maintain a separate spec file.

```typescript
// If using Next.js API routes, consider next-swagger-doc
// If standalone, use tsoa or express-openapi-validator
```

### README Quick Start

```markdown
## Quick Start

1. Get an API key at https://example.com/dashboard
2. Make your first request:

curl -X GET https://api.example.com/v1/items \
  -H "X-API-Key: your_key_here"
```

Every API needs a "get started in 30 seconds" section.

---

## Webhooks (If Your API Sends Events)

### Webhook Design

```json
{
  "id": "evt_abc123",
  "type": "item.created",
  "created_at": "2026-02-14T10:00:00Z",
  "data": { ... }
}
```

**Rules:**
- Sign every webhook (HMAC-SHA256)
- Include event type and timestamp
- Retry on failure (3 attempts, exponential backoff)
- Let users configure webhook URLs
- Log all deliveries (success and failure)

---

## Session Checkpoints

### Session 2: Foundation Check
- [ ] Core CRUD endpoints work
- [ ] Authentication enforced
- [ ] Consistent error format
- [ ] Validation on all inputs

### Session 4: Production Check
- [ ] Rate limiting active
- [ ] Pagination on list endpoints
- [ ] API documentation exists
- [ ] Error responses don't leak internals

### Session 7: Launch Check
- [ ] All endpoints documented with examples
- [ ] Rate limits tested under load
- [ ] API keys can be rotated
- [ ] Monitoring/logging on all routes

---

*Last updated: Baton Protocol v3.1*
