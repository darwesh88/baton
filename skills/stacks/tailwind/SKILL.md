---
name: tailwind
description: >-
  Tailwind CSS patterns — utility-first styling, responsive design, dark mode,
  custom configuration, and component composition. Load at Session 1-2 when
  using Tailwind. Use when styling components or discussing CSS approach.
---

# Tailwind CSS Skill

> Utility-first means every style decision is visible in the markup. No mystery CSS files.

---

## Setup (Session 1)

### With Next.js

Tailwind comes pre-configured with `create-next-app`. If not installed:

```bash
npm install -D tailwindcss @tailwindcss/postcss postcss
```

### Essential Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

**Rules:**
- Extend the theme, don't override it
- Define brand colors once in config
- Use `content` to point to your source files only

---

## Core Patterns

### Spacing

Use Tailwind's spacing scale consistently:

```
p-1 = 4px    p-2 = 8px    p-3 = 12px   p-4 = 16px
p-6 = 24px   p-8 = 32px   p-12 = 48px  p-16 = 64px
```

**Rule:** Stick to `4, 8, 12, 16, 24, 32, 48, 64`. Skip odd values.

### Layout

```tsx
// Centered container with max width
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

// Flex row with gap
<div className="flex items-center gap-4">

// Grid
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
```

### Typography

```tsx
// Heading
<h1 className="text-3xl font-bold tracking-tight text-gray-900">

// Body
<p className="text-base text-gray-600 leading-relaxed">

// Small/caption
<span className="text-sm text-gray-500">
```

---

## Responsive Design

### Mobile-First (Default)

Tailwind is mobile-first. No prefix = mobile. Prefixes add larger breakpoints:

```tsx
// Stack on mobile, row on desktop
<div className="flex flex-col sm:flex-row gap-4">

// Full width mobile, half on tablet, third on desktop
<div className="w-full sm:w-1/2 lg:w-1/3">

// Hide on mobile, show on desktop
<nav className="hidden lg:block">
```

### Breakpoints

```
sm:  640px   (tablet portrait)
md:  768px   (tablet landscape)
lg:  1024px  (desktop)
xl:  1280px  (large desktop)
2xl: 1536px  (wide desktop)
```

**Rule:** Only use `sm:`, `lg:`, and `xl:`. Three breakpoints cover 95% of layouts.

---

## Dark Mode

### Setup

```typescript
// tailwind.config.ts
const config: Config = {
  darkMode: 'class',  // or 'media' for system preference
  // ...
};
```

### Usage

```tsx
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">
  <p className="text-gray-600 dark:text-gray-400">
</div>
```

**Rule:** Don't add dark mode until the user asks. It doubles your styling work.

---

## Component Patterns

### Button

```tsx
// Base button styles
const buttonBase = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

// Variants
const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
  ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
};

// Sizes
const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};
```

### Card

```tsx
<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
  <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
  <p className="mt-2 text-sm text-gray-600">{description}</p>
</div>
```

### Input

```tsx
<input
  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
             placeholder:text-gray-400
             focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
  placeholder="Enter value..."
/>
```

---

## Best Practices

### Do

- Use `gap` instead of margins between flex/grid children
- Use `max-w-prose` for text content (65ch)
- Use `truncate` for text that might overflow
- Use `sr-only` for screen-reader-only text
- Group hover states: `group hover:group-hover:text-blue-500`

### Don't

- Don't use `@apply` in CSS files (defeats the purpose of utility-first)
- Don't create utility classes that match existing Tailwind classes
- Don't nest more than 3 responsive prefixes on one element
- Don't use arbitrary values `[13px]` when a scale value exists

---

## cn() Helper (Conditional Classes)

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  "rounded-lg p-4",
  isActive && "bg-brand-50 border-brand-500",
  !isActive && "bg-gray-50 border-gray-200"
)}>
```

Install: `npm install clsx tailwind-merge`

---

*Last updated: Baton Protocol v3.1*
