# UI/UX Skill — Look Good Out of the Gate

> Every screen should look polished on first build. No "we'll fix the UI later."

---

## The Problem

AI-generated UIs are functional but ugly. Common issues:
- Inconsistent spacing and sizing
- No visual hierarchy — everything looks the same importance
- Missing loading, empty, and error states
- Looks broken on mobile
- No feedback when users click things

**If it looks bad, users don't trust it — even if it works perfectly.**

---

## Design Defaults (Use Unless Told Otherwise)

### Layout
- **Mobile-first** — design for phone, scale up to desktop
- **Max content width:** 1200px centered, with side padding
- **Consistent spacing:** pick a scale (4, 8, 12, 16, 24, 32, 48, 64px) and stick to it
- **White space is good** — when in doubt, add more breathing room

### Typography
- **One font family** — system font stack or one Google Font, never more
- **3 sizes max** for body text: small (14px), normal (16px), large (18px)
- **Headings:** clear size steps (h1: 36px, h2: 28px, h3: 22px)
- **Line height:** 1.5 for body, 1.2 for headings
- **Max line width:** 65-75 characters for readability

### Color
- **2-3 colors max** — primary, neutral, one accent
- **Use opacity/shades** of your primary instead of adding more colors
- **Text contrast:** minimum 4.5:1 ratio (WCAG AA)
- **Don't convey meaning with color alone** — add icons or labels too

### Components
- **Use a component library** — shadcn/ui (recommended), Radix, or Headless UI
- **Don't build custom components** when a library has them
- **Consistent border radius** — pick one (6px or 8px) and use everywhere
- **Consistent shadows** — one subtle shadow for elevation, not five different ones

---

## Every Screen Must Have

### 1. Loading State
```
Show skeleton or spinner while data loads.
Never show a blank screen or flash of unstyled content.
```

### 2. Empty State
```
When there's no data, show:
- A clear message explaining what goes here
- A call to action (button to create first item)
Never show an empty table or blank page.
```

### 3. Error State
```
When something fails, show:
- What went wrong (in human language, not error codes)
- What to do about it (retry button, contact support, etc.)
Never show a raw error message or silent failure.
```

### 4. Success Feedback
```
When an action succeeds:
- Toast notification, or
- Inline confirmation, or
- Redirect with success message
Never let the user wonder "did that work?"
```

---

## Responsive Rules

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Single column, stacked |
| Tablet | 640-1024px | Adjusted spacing, may show sidebar |
| Desktop | > 1024px | Full layout |

**Test every screen at 375px width (iPhone SE).** If it breaks there, fix it.

---

## Quick Wins That Make Everything Look Better

1. **Add padding to containers** — 16px mobile, 24px+ desktop
2. **Align everything to a grid** — no random positioning
3. **Use subtle borders or backgrounds** to separate sections, not heavy lines
4. **Make buttons look clickable** — clear hover/active states
5. **Size touch targets 44px minimum** — fingers are bigger than cursors
6. **Add transitions** — 150ms ease on hover states, nothing flashy
7. **Consistent icon style** — all outline OR all filled, never mixed (use Lucide)

---

## Don'ts

| Don't | Do Instead |
|-------|-----------|
| Rainbow of colors | 2-3 color palette |
| Five font sizes on one page | Consistent type scale |
| Custom scrollbars, animations | Subtle, standard interactions |
| Auto-playing anything | User-initiated actions |
| Walls of text | Short copy, clear hierarchy |
| Pixel-perfect custom everything | Component library + small tweaks |
| Different button styles everywhere | One primary, one secondary, one ghost |

---

## Accessibility Basics (Non-Negotiable)

- All images have `alt` text
- All form inputs have labels (not just placeholders)
- Keyboard navigation works (Tab through the page)
- Focus states are visible (don't remove outline without replacing)
- Color is not the only indicator (add icons/text to status)

---

## When User Doesn't Specify Design

Default to:
1. **Clean and minimal** — white/light gray background, dark text
2. **shadcn/ui components** (if using React/Next.js)
3. **Lucide icons** (consistent, clean)
4. **Inter or system font**
5. **Rounded corners (8px), subtle shadows**
6. **Blue primary color** (#2563EB or similar)

This gives a professional baseline. User can customize later.

---

*Last updated: SESSION 0 Protocol v3.1*
