---
name: typescript
description: >-
  TypeScript patterns — type safety without over-engineering, practical typing
  strategies, common patterns, and when to use strict vs pragmatic approaches.
  Load at Session 0-1 when using TypeScript. Use when discussing types or
  fixing type errors.
---

# TypeScript Skill

> Types prevent bugs. Over-typing prevents progress. Find the balance.

---

## Pragmatic TypeScript Rules

### Type What Matters

```typescript
// DO type: function signatures, API responses, props
function createUser(data: CreateUserInput): Promise<User> { ... }

// DON'T over-type: obvious local variables
const count = items.length;  // TypeScript infers `number`
const name = 'hello';        // TypeScript infers `string`
```

### When to Use `any` (Seriously)

```typescript
// Temporary during prototyping — add a TODO
const data: any = await weirdApi.call(); // TODO: type this

// Third-party library without types
declare module 'untyped-lib' {
  const lib: any;
  export default lib;
}
```

**Rule:** `any` is a tool, not a sin. Use it sparingly, mark it with TODO, fix later.

### Prefer `unknown` Over `any` for Safety

```typescript
// BAD — any lets you do anything without checking
function process(data: any) {
  data.whatever();  // No error, crashes at runtime
}

// GOOD — unknown forces you to check first
function process(data: unknown) {
  if (typeof data === 'string') {
    data.toUpperCase();  // Safe
  }
}
```

---

## Essential Patterns

### API Response Types

```typescript
// Define once, use everywhere
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

// For create/update, make fields optional
type CreateUserInput = Pick<User, 'email' | 'name'>;
type UpdateUserInput = Partial<Pick<User, 'name'>>;
```

### Component Props

```typescript
// Simple props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// Props that extend HTML elements
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
```

### Server Action Return Types

```typescript
// Consistent return type for all server actions
type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

// Usage
export async function createItem(input: CreateItemInput): Promise<ActionResult<Item>> {
  try {
    const item = await db.insert(items).values(input).returning();
    return { success: true, data: item };
  } catch {
    return { success: false, error: 'Failed to create item' };
  }
}
```

---

## Zod for Runtime Validation

Types only exist at compile time. Use Zod for runtime:

```typescript
import { z } from 'zod';

// Define schema (runtime validation)
const createItemSchema = z.object({
  name: z.string().min(1).max(255),
  price: z.number().positive(),
  category: z.enum(['electronics', 'clothing', 'food']),
});

// Infer TypeScript type from schema (compile-time type)
type CreateItemInput = z.infer<typeof createItemSchema>;

// Validate at runtime
const parsed = createItemSchema.safeParse(userInput);
if (!parsed.success) {
  // Handle validation error
}
```

**Rule:** Use Zod at system boundaries (API routes, server actions, form submissions). Don't validate internal function calls.

---

## Common Type Utilities

```typescript
// Make some fields required
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// Database row type (from Supabase or Prisma)
type Item = Database['public']['Tables']['items']['Row'];

// Omit fields you don't want to expose
type PublicUser = Omit<User, 'passwordHash' | 'internalNotes'>;

// Record for key-value maps
const featureFlags: Record<string, boolean> = {
  darkMode: true,
  betaFeatures: false,
};
```

---

## tsconfig Best Practices

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

- **strict: true** — enables all strict checks (do this from day 1)
- **noUncheckedIndexedAccess** — catches `array[0]` potentially being undefined
- **skipLibCheck** — faster compilation, skip checking node_modules types

---

## Fixing Common Type Errors

### "Type X is not assignable to type Y"

Usually means you're passing the wrong shape. Check:
1. Are you passing all required fields?
2. Are field names spelled correctly?
3. Is the data coming from an untyped source (API, form)?

### "Object is possibly undefined"

```typescript
// BAD
const name = user.name;  // Error if user might be null

// GOOD — optional chaining
const name = user?.name;

// GOOD — early return
if (!user) return null;
const name = user.name;  // TypeScript knows user exists here
```

### "Property does not exist on type"

```typescript
// Usually from untyped API responses
const data = await fetch('/api').then(r => r.json());
// TypeScript doesn't know what `data` is

// Fix: type the response
const data: ApiResponse = await fetch('/api').then(r => r.json());
```

---

## Don'ts

| Don't | Do Instead |
|-------|-----------|
| Type every variable | Let TypeScript infer obvious types |
| Create types for one-time objects | Inline the type or use `typeof` |
| Use `as` to silence errors | Fix the actual type mismatch |
| Create separate type files for everything | Co-locate types with the code that uses them |
| Use `enum` | Use `as const` objects or union types |

```typescript
// Instead of enum
const Status = { ACTIVE: 'active', ARCHIVED: 'archived' } as const;
type Status = typeof Status[keyof typeof Status]; // 'active' | 'archived'
```

---

*Last updated: Baton Protocol v3.1*
