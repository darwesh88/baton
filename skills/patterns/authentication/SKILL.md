---
name: authentication
description: >-
  Authentication patterns — login, signup, OAuth, protected routes, middleware,
  password reset, and session management. Load at Session 1-3 when the project
  needs user accounts. Use when discussing auth strategy or implementing login.
---

# Authentication Skill

> Auth is the one thing you can't get wrong. A security hole here exposes everything.

---

## Choose Your Auth Strategy (Session 1)

### Decision Tree

```
Using Supabase? → Use Supabase Auth (built-in, free)
Using another database? → Use Better Auth or NextAuth
Building an API? → Use API keys (see api domain skill)
Just need social login? → Use OAuth provider directly
```

Don't mix strategies. Pick one and commit.

### Strategy Comparison

| Strategy | Best For | Complexity |
|----------|----------|-----------|
| **Supabase Auth** | Next.js + Supabase stack | Low |
| **Better Auth** | Any stack, full control | Medium |
| **NextAuth/Auth.js** | Next.js, many providers | Medium |
| **Custom JWT** | APIs, microservices | High (avoid unless needed) |

---

## Core Auth Flows

### Sign Up

```
Email + Password → Validate → Create account → Send verification email → Redirect to app
```

**Rules:**
- Minimum password length: 8 characters
- Don't enforce special characters (users hate it, doesn't help security)
- Email verification is optional for MVP, required for production
- After signup: redirect to app, not login page

### Log In

```
Email + Password → Validate → Create session → Redirect to app
```

**Rules:**
- Generic error messages: "Invalid email or password" (never reveal which is wrong)
- Rate limit login attempts (5 per minute per IP)
- Redirect to intended page after login, not always homepage

### Log Out

```
Click logout → Destroy session → Redirect to landing page
```

**Rules:**
- Clear all session data (cookies, localStorage)
- Invalidate server-side session
- Don't ask "are you sure?" — just log out

### Password Reset

```
Enter email → Send reset link → Click link → Set new password → Auto log in
```

**Rules:**
- Reset tokens expire in 1 hour
- One-time use (invalidate after use)
- Don't confirm if email exists ("If an account exists, we sent a reset link")
- After reset: log user in automatically

---

## Protected Routes

### Server-Side (Recommended)

```typescript
// middleware.ts (Next.js)
export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*'],
};
```

### In Server Components

```typescript
// app/dashboard/page.tsx
export default async function Dashboard() {
  const user = await getAuthenticatedUser();
  if (!user) redirect('/login');

  return <DashboardContent user={user} />;
}
```

### In Server Actions

```typescript
'use server'
export async function updateProfile(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error('Not authenticated');

  // ... update logic
}
```

**Rule:** Check auth in EVERY server action and API route. Never trust the client.

---

## Session Management

### Cookie-Based Sessions (Default)

```typescript
// Set session cookie
cookies().set('session', token, {
  httpOnly: true,      // JavaScript can't read it
  secure: true,        // HTTPS only
  sameSite: 'lax',     // CSRF protection
  maxAge: 60 * 60 * 24 * 7,  // 7 days
  path: '/',
});
```

**Rules:**
- Always `httpOnly` — prevents XSS from stealing sessions
- Always `secure` in production
- Session expiry: 7 days for "remember me", 24 hours otherwise
- Rotate session token on privilege changes (login, password change)

### Never Use localStorage for Auth Tokens

```
BAD:  localStorage.setItem('token', jwt)    // XSS can steal it
GOOD: httpOnly cookie set by server         // JavaScript can't access it
```

---

## OAuth (Social Login)

### When to Add

- When users expect it (consumer apps)
- When you want to reduce signup friction
- NOT for B2B SaaS (email + password is fine)

### Common Providers

| Provider | Use When |
|----------|----------|
| Google | Default choice, everyone has an account |
| GitHub | Developer-facing products |
| Apple | iOS apps (required by App Store if you have social login) |

### Implementation Pattern

```
Click "Login with Google" →
  Redirect to Google OAuth →
    Google redirects back with code →
      Exchange code for tokens (server-side) →
        Create or find user →
          Create session →
            Redirect to app
```

**Rules:**
- Always offer email + password alongside OAuth
- Handle "same email, different provider" gracefully
- Store provider info but don't depend on it

---

## Auth UI Patterns

### Login Page

- Email field (autofocus)
- Password field (with show/hide toggle)
- "Log in" button (primary)
- "Forgot password?" link
- "Don't have an account? Sign up" link
- OAuth buttons below (if applicable)

### Signup Page

- Email field
- Password field
- "Create account" button
- "Already have an account? Log in" link
- Terms of service checkbox (if legally required)

### Common Mistakes

- Don't put login and signup on the same page with tabs
- Don't require username during signup (let them set it later)
- Don't ask for unnecessary info at signup (name, phone, company)
- Don't disable the submit button without explaining why

---

## Session Checkpoints

### Session 2: Auth Foundation
- [ ] Signup creates account
- [ ] Login creates session
- [ ] Logout destroys session
- [ ] Protected routes redirect to login

### Session 4: Auth Complete
- [ ] Password reset works
- [ ] Session cookies are httpOnly and secure
- [ ] Auth checked in all server actions
- [ ] Rate limiting on login endpoint

---

*Last updated: Baton Protocol v3.1*
