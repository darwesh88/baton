---
name: email
description: >-
  Transactional email patterns — provider selection, template design,
  deliverability, and common email flows (welcome, reset, notifications).
  Load at Session 2-4 when the project needs to send emails to users.
---

# Email Skill

> Users judge your app by your emails. Ugly emails = untrustworthy app.

---

## Choose a Provider (Session 2)

| Provider | Best For | Free Tier |
|----------|----------|-----------|
| **Resend** | Modern, great DX, React Email templates | 3,000/month |
| **SendGrid** | Established, high volume | 100/day |
| **Postmark** | Transactional focus, great deliverability | 100/month |
| **AWS SES** | Cheapest at scale, more setup | 62,000/month (from EC2) |

**Default:** Resend. Best developer experience, React Email for templates, generous free tier.

---

## Core Email Flows

### Which Emails to Send (Priority Order)

| Email | When | Priority |
|-------|------|----------|
| **Welcome** | After signup | Must have |
| **Password reset** | User requests it | Must have |
| **Email verification** | After signup (if required) | Should have |
| **Transactional** | Order confirmation, receipt | Must have (if payments) |
| **Notification** | New activity, updates | Nice to have |

Build in this order. Don't start with marketing emails.

---

## Setup with Resend (Session 2-3)

### Install

```bash
npm install resend
```

### Send an Email

```typescript
// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const { error } = await resend.emails.send({
    from: 'App Name <noreply@yourdomain.com>',
    to,
    subject,
    html,
  });

  if (error) {
    console.error('Email send failed:', error);
    throw error;
  }
}
```

### Environment Variables

```bash
RESEND_API_KEY=re_...
```

---

## Email Templates

### Keep It Simple

Every email needs:
1. **Logo/app name** at top
2. **One clear message** (what happened)
3. **One clear action** (button/link)
4. **Footer** (company name, unsubscribe if marketing)

### Welcome Email

```
Subject: Welcome to [App Name]

Hi [Name],

Thanks for signing up.

Here's what you can do next:
→ [One primary action button]

If you need help, just reply to this email.

— The [App Name] team
```

### Password Reset

```
Subject: Reset your password

Hi,

Someone requested a password reset for your account.

[Reset Password button]

This link expires in 1 hour. If you didn't request this, ignore this email.
```

### Transactional (Order Confirmation)

```
Subject: Order #1234 confirmed

Hi [Name],

Your order is confirmed.

[Order summary table]
  Item 1 — $XX.XX
  Item 2 — $XX.XX
  Total  — $XX.XX

We'll email you when it ships.

[View Order button]
```

---

## React Email (If Using Resend)

```typescript
// emails/welcome.tsx
import { Html, Head, Body, Container, Text, Button } from '@react-email/components';

export function WelcomeEmail({ name, url }: { name: string; url: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', background: '#f9f9f9' }}>
        <Container style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Welcome, {name}!
          </Text>
          <Text>Thanks for signing up. Get started:</Text>
          <Button
            href={url}
            style={{
              background: '#2563EB',
              color: 'white',
              padding: '12px 24px',
              borderRadius: 6,
            }}
          >
            Go to Dashboard
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

---

## Deliverability Basics

### Required Setup

1. **Custom domain** — send from `noreply@yourdomain.com`, not `@resend.dev`
2. **DNS records** — add SPF, DKIM, and DMARC records (provider gives you these)
3. **From name** — use your app name, not a person's name

### Rules

- Don't send from `noreply@gmail.com` or free email providers
- Keep subject lines short (under 50 characters)
- Don't use spam trigger words (FREE, URGENT, ACT NOW)
- Always include a plain text version alongside HTML
- Test with email preview tools before sending

---

## Error Handling

```typescript
// Emails should never crash your app
try {
  await sendEmail({ to, subject, html });
} catch (error) {
  // Log but don't block the user action
  console.error('Failed to send email:', error);
  // The user action (signup, order) should still succeed
}
```

**Rule:** Email sending failures should be logged, not thrown. Never let a failed email block a user from completing an action.

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Sending from free email domain | Set up custom domain |
| No DNS records (SPF/DKIM) | Add them or emails go to spam |
| Blocking user actions on email failure | Send async, log errors |
| Building complex email templates early | Start with plain, styled text |
| Sending too many emails | Only send what users expect |

---

*Last updated: Baton Protocol v3.1*
