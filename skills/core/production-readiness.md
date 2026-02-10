# Production Readiness Skill — Launch Checklist

> Complete this checklist before launching to real users.
> Not every item applies to every project — mark N/A where appropriate.

---

## Pre-Launch Gate

**Do not launch until you can answer YES to all critical items.**

---

## 1. Security (Critical)

See `skills/core/security.md` for details.

### Must Have
- [ ] No secrets in codebase
- [ ] Environment variables for all sensitive config
- [ ] RLS enabled on all database tables
- [ ] Input validation on all forms and APIs
- [ ] Authentication on all protected routes
- [ ] HTTPS enforced

### Should Have
- [ ] Rate limiting on public endpoints
- [ ] Security headers configured
- [ ] File upload validation (type + size)
- [ ] Error messages don't leak internals

---

## 2. Error Handling (Critical)

### Must Have
- [ ] Global error boundary (catches React crashes)
- [ ] API routes return proper error responses
- [ ] Forms show validation errors to users
- [ ] Database errors don't crash the app

### Implementation

```tsx
// Error boundary (app/error.tsx)
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

---

## 3. Monitoring & Observability (Critical)

### Must Have
- [ ] Error tracking installed (Sentry, LogRocket, etc.)
- [ ] Errors are captured with context
- [ ] Alerts configured for critical errors

### Should Have
- [ ] Health check endpoint (`/api/health`)
- [ ] Uptime monitoring (Vercel, UptimeRobot, etc.)
- [ ] Performance monitoring (Core Web Vitals)

### Health Check Example

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database connection
    await db.query('SELECT 1')

    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: 'Database connection failed' },
      { status: 503 }
    )
  }
}
```

---

## 4. Database (Critical)

### Must Have
- [ ] Backups configured (Supabase/provider handles this)
- [ ] Backup restoration tested at least once
- [ ] Migrations versioned and tracked
- [ ] Indexes on frequently queried columns

### Should Have
- [ ] Connection pooling configured
- [ ] Query performance reviewed
- [ ] Soft deletes for important data (audit trail)

---

## 5. Deployment (Critical)

### Must Have
- [ ] Production environment configured
- [ ] Environment variables set in production
- [ ] Build passes in production environment
- [ ] Domain configured and working

### Should Have
- [ ] CI/CD pipeline configured
- [ ] Preview deployments for PRs
- [ ] Rollback procedure documented

### Rollback Procedure Template

```markdown
## Rollback Procedure

1. Go to [Vercel/Netlify/etc.] dashboard
2. Navigate to Deployments
3. Find last working deployment
4. Click "Promote to Production" or "Redeploy"
5. Verify rollback successful
6. Investigate and fix the issue
7. Deploy fix when ready
```

---

## 6. UX Polish (Important)

### Must Have
- [ ] Empty states for all lists ("No items yet")
- [ ] Loading states for async operations
- [ ] Error states with recovery options
- [ ] Mobile responsive (unless desktop-only)

### Should Have
- [ ] Confirmation dialogs for destructive actions
- [ ] Success feedback for completed actions
- [ ] Keyboard accessible (Tab navigation works)
- [ ] Focus management (modals trap focus)

### Empty State Example

```tsx
{items.length === 0 ? (
  <div className="text-center py-12">
    <h3>No items yet</h3>
    <p>Create your first item to get started.</p>
    <Button onClick={openCreateModal}>Create Item</Button>
  </div>
) : (
  <ItemsList items={items} />
)}
```

---

## 7. Performance (Important)

### Must Have
- [ ] No blocking resources on initial load
- [ ] Images optimized (Next.js Image, WebP, etc.)
- [ ] Build size reasonable (<500KB JS initial)

### Should Have
- [ ] Core Web Vitals passing (LCP, FID, CLS)
- [ ] Lazy loading for below-fold content
- [ ] Caching strategy defined

### Check Performance

```bash
# Run Lighthouse audit
npx lighthouse https://yourdomain.com --view

# Or use Vercel Speed Insights, PageSpeed Insights
```

---

## 8. Analytics (Important)

### Should Have
- [ ] Page view tracking
- [ ] Key action tracking (signups, conversions)
- [ ] Error tracking linked to user sessions

### Options

| Tool | Best For |
|------|----------|
| Vercel Analytics | Simple, privacy-focused |
| Plausible | Privacy-focused, EU compliant |
| PostHog | Product analytics, session replay |
| Google Analytics | Comprehensive, free |

---

## 9. Legal (If Public)

### Must Have (If Collecting User Data)
- [ ] Privacy Policy page
- [ ] Terms of Service page
- [ ] Cookie consent (if using cookies for tracking)

### Should Have
- [ ] GDPR compliance (if EU users)
- [ ] Data deletion capability
- [ ] Clear data usage explanation

---

## 10. Documentation (Important)

### Must Have
- [ ] README with setup instructions
- [ ] Environment variables documented
- [ ] Key features documented for users

### Should Have
- [ ] API documentation (if applicable)
- [ ] Deployment guide
- [ ] Troubleshooting guide

---

## Launch Readiness Score

Rate each category:
- ✅ Complete
- 🟡 Partial (acceptable for launch)
- ❌ Incomplete (blocker)

| Category | Status | Notes |
|----------|--------|-------|
| Security | | |
| Error Handling | | |
| Monitoring | | |
| Database | | |
| Deployment | | |
| UX Polish | | |
| Performance | | |
| Analytics | | |
| Legal | | |
| Documentation | | |

**Launch when:** All critical items are ✅, important items are at least 🟡.

---

## Post-Launch Checklist

First 24 hours:
- [ ] Monitor error tracking for new errors
- [ ] Watch for performance issues
- [ ] Respond to user feedback quickly
- [ ] Check analytics are recording

First week:
- [ ] Review error patterns
- [ ] Address critical bugs immediately
- [ ] Collect user feedback
- [ ] Plan improvements based on real usage

---

## Common Launch Mistakes

| Mistake | Prevention |
|---------|------------|
| Forgot to set production env vars | Use checklist, verify before launch |
| No error tracking | Install Sentry before launch |
| No backup strategy | Verify provider backups, test restore |
| Missing empty states | QA with empty database |
| No rate limiting | Add before launch, not after attack |
| No rollback plan | Document procedure, test it |

---

*Last updated: SESSION 0 Protocol v3.1*
