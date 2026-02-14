---
name: saas
description: >-
  SaaS product patterns — multi-tenancy, workspaces, billing, onboarding,
  feature gating, and usage tracking. Load at Session 0 when building a
  SaaS product. Stays loaded for the entire project lifecycle.
---

# SaaS Domain Skill

> SaaS is not just an app with login. It's an app with organizations, billing, and self-service.

---

## Load This Skill When

- User says they're building a SaaS, platform, or subscription product
- Project has multiple users, teams, or organizations
- Revenue model is recurring (monthly/annual subscriptions)

---

## Architecture Decisions (Session 0-1)

### Multi-Tenancy Model

Choose ONE. Don't change mid-project.

| Model | How It Works | Best For |
|-------|-------------|----------|
| **Shared database, tenant column** | All tenants in same tables, filtered by `org_id` | Most SaaS (start here) |
| **Schema per tenant** | Separate database schema per tenant | Regulated industries |
| **Database per tenant** | Completely isolated databases | Enterprise, compliance-heavy |

**Default:** Shared database with tenant column. It's simplest and scales to 10,000+ tenants.

```sql
-- Every table gets an org_id
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS enforces tenant isolation
CREATE POLICY "Tenant isolation"
ON projects FOR ALL
USING (org_id = (SELECT current_org_id()));
```

### Core Data Model

Every SaaS needs these tables minimum:

```
users              — Individual people
organizations      — Workspaces/teams (the billing entity)
memberships        — users ↔ organizations (with role)
subscriptions      — org ↔ plan (billing state)
```

Don't build more until you need it.

---

## Onboarding Flow (Session 2-3)

### First-Time User Experience

The first 60 seconds determine if a user stays. Design for this:

```
1. Sign up (email + password, or OAuth)
2. Create or join organization
3. ONE guided action (create first [thing])
4. Success state — "You're set up!"
```

**Rules:**
- Maximum 3 steps before user sees value
- Pre-fill defaults where possible
- Skip optional steps — let users configure later
- Show progress indicator if more than 2 steps

### Empty States

Every list/dashboard screen needs an empty state with:
- What this screen is for (one sentence)
- A call to action (button to create first item)
- Optional: example data or template

Never show an empty table with column headers and no rows.

---

## Billing Integration (Session 3-5)

### Stripe (Default Choice)

Unless user specifies otherwise, use Stripe. It handles 90% of SaaS billing needs.

**Core flow:**
```
User clicks "Upgrade" →
  Redirect to Stripe Checkout →
    Stripe handles payment →
      Webhook confirms payment →
        App updates subscription status
```

### What to Build

| Component | When | Priority |
|-----------|------|----------|
| Pricing page | Session 3-4 | Must have |
| Stripe Checkout redirect | Session 3-4 | Must have |
| Webhook handler | Session 3-4 | Must have |
| Customer portal link | Session 4-5 | Should have |
| Usage tracking | Session 5+ | Nice to have |

### What NOT to Build

- Custom payment forms (use Stripe Checkout)
- Invoice generation (Stripe does this)
- Tax calculation (Stripe Tax or let Stripe handle it)
- Subscription management UI (link to Stripe Customer Portal)

### Webhook Security

```typescript
// ALWAYS verify webhook signatures
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET
);

// Handle these events minimum:
// checkout.session.completed — new subscription
// customer.subscription.updated — plan change
// customer.subscription.deleted — cancellation
// invoice.payment_failed — payment issue
```

---

## Feature Gating (Session 4-5)

### Simple Tier Check

```typescript
// lib/billing.ts
export function canAccess(org: Organization, feature: string): boolean {
  const featureMap: Record<string, string[]> = {
    free: ['basic_feature'],
    pro: ['basic_feature', 'advanced_feature', 'api_access'],
    enterprise: ['basic_feature', 'advanced_feature', 'api_access', 'sso', 'audit_log'],
  };

  return featureMap[org.plan]?.includes(feature) ?? false;
}
```

**Rules:**
- Check features, not plan names (plans change, features don't)
- Gate at the server, not the client (client gates are cosmetic, not security)
- Show locked features with upgrade prompt, don't hide them

---

## Usage Tracking (Session 5+)

If billing is usage-based or has limits:

```typescript
// Track usage per org per period
interface UsageRecord {
  org_id: string;
  metric: string;      // 'api_calls' | 'storage_mb' | 'team_members'
  value: number;
  period: string;      // '2026-02' (monthly)
}
```

Show usage in dashboard:
- Current usage vs limit
- Percentage bar
- Warning at 80%, block at 100%

---

## Common SaaS Patterns

### Invitation System

```
Owner invites by email →
  Email sent with invite link →
    Invitee signs up or logs in →
      Auto-joined to organization
```

Store pending invites. Don't require account creation before accepting.

### Role-Based Access

Keep it simple. Three roles cover 95% of SaaS:

| Role | Can Do |
|------|--------|
| **Owner** | Everything + billing + delete org |
| **Admin** | Everything except billing and delete |
| **Member** | CRUD own resources, view shared resources |

Don't add roles until users ask for them.

### Settings Structure

```
Settings/
├── Profile (user-level)
├── Organization (org-level)
├── Billing (owner-only)
├── Team Members (admin+)
└── Integrations (admin+)
```

---

## Session Checkpoints

### Session 3: Foundation Check
- [ ] Users can sign up and create organization
- [ ] Basic CRUD works with tenant isolation
- [ ] Empty states on all screens

### Session 5: Billing Check
- [ ] Pricing page exists
- [ ] Stripe integration works (test mode)
- [ ] Webhook handles subscription events
- [ ] Feature gating works for at least 2 tiers

### Session 8: Pre-Launch Check
- [ ] Onboarding flow is smooth (test with fresh account)
- [ ] Billing works in live mode
- [ ] Invitation system works
- [ ] Settings pages exist

---

*Last updated: Baton Protocol v3.1*
