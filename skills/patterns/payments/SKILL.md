---
name: payments
description: >-
  Payment integration patterns — Stripe Checkout, subscriptions, webhooks,
  one-time payments, and billing portal. Load at Session 3-5 when the project
  needs to accept payments. Use when discussing monetization or implementing
  checkout.
---

# Payments Skill

> Money code has zero margin for error. Use Stripe, don't build custom.

---

## Rule #1: Use Stripe Checkout

Don't build a custom payment form. Ever. Stripe Checkout handles:
- PCI compliance (you don't want this responsibility)
- Card input with validation
- Apple Pay, Google Pay, Link
- 3D Secure authentication
- Tax calculation
- Receipt emails
- 135+ currencies

---

## Choose Your Payment Model

| Model | Use When | Stripe Feature |
|-------|----------|---------------|
| **One-time** | Selling a product or service | Checkout (payment mode) |
| **Subscription** | Monthly/annual SaaS | Checkout (subscription mode) |
| **Usage-based** | Pay per API call, storage, etc. | Metered billing |
| **Freemium** | Free tier + paid upgrade | Checkout + feature gating |

**Default for SaaS:** Subscription with annual discount.
**Default for e-commerce:** One-time payments.

---

## One-Time Payment (Session 3-4)

### Create Checkout Session

```typescript
'use server'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckout(items: CartItem[]) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.priceCents,
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
  });

  redirect(session.url!);
}
```

### Success Page

```typescript
// app/success/page.tsx
export default async function SuccessPage({ searchParams }) {
  const sessionId = searchParams.session_id;

  // Verify the session is real (don't trust the URL alone)
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== 'paid') {
    redirect('/cart');
  }

  return <div>Payment successful! Order confirmed.</div>;
}
```

---

## Subscription (Session 3-5)

### Setup

1. Create products and prices in Stripe Dashboard (not in code)
2. Store Stripe `price_id` in your environment variables
3. Create checkout session with subscription mode

```typescript
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  line_items: [{
    price: process.env.STRIPE_PRO_PRICE_ID,
    quantity: 1,
  }],
  customer_email: user.email,
  success_url: `${baseUrl}/dashboard?upgraded=true`,
  cancel_url: `${baseUrl}/pricing`,
});
```

### Customer Portal (Managing Subscriptions)

Don't build subscription management UI. Use Stripe's Customer Portal:

```typescript
export async function createPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
  });

  redirect(session.url);
}
```

This gives users: plan changes, cancellation, payment method updates, invoice history — all built by Stripe.

---

## Webhooks (Critical)

### Setup

```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutComplete(event.data.object);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdate(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionCancelled(event.data.object);
      break;
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
  }

  return Response.json({ received: true });
}
```

### Critical Rules

- **Always verify signatures** — never skip this
- **Return 200 quickly** — do heavy processing async
- **Handle idempotently** — webhooks can fire multiple times
- **Log every event** — you'll need this for debugging

### Testing Webhooks Locally

```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This gives you a temporary webhook secret for local development.

---

## Pricing Page (Session 3-4)

### Standard Layout

```
Free          Pro           Enterprise
$0/mo         $29/mo        Custom
              ($290/year)

Feature 1 ✓   Feature 1 ✓   Feature 1 ✓
Feature 2 ✗   Feature 2 ✓   Feature 2 ✓
Feature 3 ✗   Feature 3 ✓   Feature 3 ✓
              Feature 4 ✓   Feature 4 ✓
                            Feature 5 ✓

[Start Free]  [Upgrade]     [Contact Us]
```

**Rules:**
- Highlight the recommended plan (usually middle)
- Show annual pricing with savings ("Save 20%")
- List features, not technical specs
- Primary CTA on the plan you want people to pick

---

## Environment Variables

```bash
# .env.local
STRIPE_SECRET_KEY=sk_test_...          # Server only
STRIPE_WEBHOOK_SECRET=whsec_...        # Server only
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Client OK

# Price IDs (from Stripe Dashboard)
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_ANNUAL_PRICE_ID=price_...
```

**Never expose the secret key to the client.**

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Building custom payment form | Use Stripe Checkout |
| Building subscription management UI | Use Stripe Customer Portal |
| Not verifying webhook signatures | Always verify |
| Trusting client-side payment confirmation | Verify via webhook |
| Hardcoding prices in UI | Pull from Stripe or env vars |
| Forgetting test mode vs live mode | Check keys before launch |

---

*Last updated: Baton Protocol v3.1*
