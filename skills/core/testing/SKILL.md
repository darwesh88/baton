---
name: testing
description: >-
  Universal testing standards for any project. Covers build verification,
  smoke testing, automated test levels, and session testing protocol.
  Use when setting up tests, reviewing test coverage, discussing testing
  strategy, or when the user asks about testing.
---

# Testing Skill — Universal Rules

> Testing standards that apply to every project.
> Not all projects need all tests, but all projects need SOME testing.

---

## Testing Philosophy

### The Minimum Viable Testing Rule

Every project MUST have at least:
1. **Build verification** — Code compiles without errors
2. **Smoke test** — Core user flows work manually
3. **Critical path coverage** — Main features don't break

### When to Add More Testing

| Project Stage | Testing Level |
|---------------|--------------|
| MVP / Prototype | Build + manual smoke test |
| Beta / Early users | Add critical path tests |
| Production / Paying users | Comprehensive test suite |

Don't over-test early. Don't under-test late.

---

## Build Verification

### Always Required

Before ending ANY session:

```bash
# Must pass with no errors
npm run build    # or yarn build, pnpm build

# TypeScript projects
npx tsc --noEmit  # Type check only
```

### What "Build Passes" Means

- [ ] No compilation errors
- [ ] No TypeScript errors
- [ ] No unresolved imports
- [ ] Build output generated successfully

**If build fails, session is NOT complete.**

---

## Manual Smoke Testing

### What to Test Each Session

After completing tasks, manually verify:

1. **New features work** — Demo what you just built
2. **Core flows still work** — Login, main action, logout
3. **No visual regressions** — UI looks correct

### Smoke Test Checklist Template

```markdown
## Session N Smoke Test

### New Features
- [ ] [Feature 1] works as expected
- [ ] [Feature 2] works as expected

### Core Flows
- [ ] Can log in
- [ ] Can perform main action
- [ ] Can log out

### Visual Check
- [ ] No layout breaks
- [ ] No missing elements
- [ ] Mobile view works (if applicable)
```

---

## Automated Testing Levels

### Level 1: Unit Tests

Test individual functions in isolation.

```typescript
// Example: Testing a utility function
import { formatCurrency } from '@/lib/utils'

describe('formatCurrency', () => {
  it('formats cents to dollars', () => {
    expect(formatCurrency(1000)).toBe('$10.00')
  })

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })
})
```

**When to add:** When you have pure functions with business logic.

### Level 2: Integration Tests

Test multiple components working together.

```typescript
// Example: Testing a server action
import { createItem } from '@/lib/actions/items'

describe('createItem', () => {
  it('creates item and returns it', async () => {
    const result = await createItem({
      name: 'Test Item',
      userId: 'test-user-id',
    })

    expect(result.success).toBe(true)
    expect(result.data.name).toBe('Test Item')
  })
})
```

**When to add:** When you have server actions or API routes with critical logic.

### Level 3: End-to-End Tests

Test full user flows in a browser.

```typescript
// Example: Playwright E2E test
import { test, expect } from '@playwright/test'

test('user can create an item', async ({ page }) => {
  await page.goto('/login')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="password"]', 'password')
  await page.click('button[type="submit"]')

  await page.goto('/items/new')
  await page.fill('[name="name"]', 'New Item')
  await page.click('button[type="submit"]')

  await expect(page.locator('text=New Item')).toBeVisible()
})
```

**When to add:** When you have paying users and can't afford broken flows.

---

## Test File Organization

```
src/
├── lib/
│   ├── utils.ts
│   └── utils.test.ts      # Co-located unit tests
├── actions/
│   ├── items.ts
│   └── items.test.ts      # Co-located action tests
tests/
├── e2e/                    # End-to-end tests
│   ├── auth.spec.ts
│   └── items.spec.ts
└── setup.ts                # Test configuration
```

---

## Testing Tools by Stack

### Next.js / React

| Type | Tool | Why |
|------|------|-----|
| Unit | Vitest or Jest | Fast, good DX |
| Component | React Testing Library | Tests user behavior |
| E2E | Playwright | Reliable, fast |

### Node.js / Backend

| Type | Tool | Why |
|------|------|-----|
| Unit | Vitest or Jest | Standard |
| Integration | Supertest | HTTP testing |
| E2E | Playwright or Cypress | Full flow |

---

## What to Test (Priority Order)

### Must Test (Critical Path)

1. **Authentication** — Login, logout, session handling
2. **Core user action** — The main thing users do
3. **Payment flows** — If you charge money
4. **Data integrity** — Critical calculations, financial data

### Should Test (Important)

5. **Form validation** — Error states, edge cases
6. **API error handling** — What happens when things fail
7. **Permissions** — Users can only access their data

### Nice to Test (Polish)

8. **UI states** — Loading, empty, error states
9. **Edge cases** — Empty inputs, long strings, special characters
10. **Accessibility** — Screen reader, keyboard nav

---

## Session Testing Protocol

### Before Ending Session

1. **Run build** — Must pass
2. **Run existing tests** — All must pass
3. **Manual smoke test** — Core flows work
4. **Document test status** — Note in PROGRESS.md

### Test Status in PROGRESS.md

```markdown
### Session N - Testing

**Build:** ✅ Passes
**Existing Tests:** ✅ 12/12 passing
**New Tests Added:** 2 (item creation, validation)
**Manual Smoke Test:** ✅ Completed

**Coverage Notes:**
- Added tests for createItem action
- Auth flow manually verified
```

---

## When Tests Fail

### In CI/Build

1. Stop deployment
2. Fix the failing test
3. Verify fix locally
4. Push and verify CI passes

### Flaky Tests

A test that sometimes passes and sometimes fails is **worse than no test**.

- Fix immediately or delete
- Never ignore flaky tests
- Usually caused by: timing issues, shared state, network dependencies

---

## Testing Debt

Track testing gaps in BACKLOG.md:

```markdown
## Testing Debt

- [ ] Add E2E tests for checkout flow (Session 8)
- [ ] Add unit tests for currency conversion (Session 5)
- [ ] Fix flaky auth test (Session 7)
```

Address testing debt before adding more features.

---

## Quick Checklist

Every session:
- [ ] Build passes
- [ ] Existing tests pass
- [ ] New critical features have tests
- [ ] Manual smoke test completed
- [ ] Test status documented

Before launch:
- [ ] Critical path has automated tests
- [ ] No flaky tests
- [ ] Test coverage documented
- [ ] CI/CD runs tests on every push

---

*Last updated: Baton Protocol v3.1*
