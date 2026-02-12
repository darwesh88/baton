# Anti-Over-Engineering Skill

> YAGNI: You Aren't Gonna Need It.
> The best code is code you didn't write.

---

## The Problem

AI loves to add complexity. Research shows:
- PR sizes up 154% with AI assistance
- 4x more code duplication
- 9% more bugs per developer

**More code = more bugs = more maintenance = slower progress.**

---

## Before Writing ANY Code

Ask these 3 questions:

1. **Does this solve the immediate problem?**
   - If no → don't build it

2. **Am I adding features nobody asked for?**
   - If yes → stop

3. **Can this be simpler?**
   - If yes → make it simpler first

---

## Red Flags (Stop and Reconsider)

| Red Flag | What's Happening |
|----------|-----------------|
| "While we're at it..." | Scope creep |
| "For flexibility later..." | Premature abstraction |
| "Just in case..." | YAGNI violation |
| "Best practice says..." | Cargo culting |
| "Let me refactor this first..." | Yak shaving |
| PR > 200 lines for simple task | Over-engineering |

---

## Rules

### 1. One Thing at a Time

```
BAD:
"Add login button, and while I'm here let me also
refactor the header, add dark mode toggle, and
improve the responsive layout"

GOOD:
"Add login button"
(That's it. Next task is next task.)
```

### 2. No Speculative Features

```
BAD:
"Adding config options for future customization"
"Building plugin system for extensibility"
"Creating abstraction layer for flexibility"

GOOD:
"Building exactly what's needed now"
(Add flexibility when you need it, not before)
```

### 3. Three Strikes Rule

Don't abstract until you've written the same thing THREE times.

```
First time: Just write it
Second time: Note the duplication
Third time: NOW consider abstracting
```

### 4. Boring Technology

```
BAD:
"Let's try this new framework/library/pattern"
(Unless specifically requested)

GOOD:
"Using proven, stable technology"
(New = risk = debugging = time waste)
```

### 5. Delete Before Add

Before adding new code, ask:
- Can I delete something instead?
- Can I simplify existing code?
- Is there dead code to remove?

---

## Size Limits

| Change Type | Max Lines | If Larger... |
|------------|-----------|--------------|
| Bug fix | 50 | Split it up |
| Small feature | 150 | Split it up |
| Normal feature | 300 | Split into tasks |
| Large feature | 500 | Split into sessions |

**If a "simple" change is 200+ lines, something is wrong.**

---

## Complexity Checklist

Before ending a task, verify:

- [ ] No unnecessary abstractions added
- [ ] No "just in case" code
- [ ] No premature optimization
- [ ] No gold-plating (extra polish nobody asked for)
- [ ] Could a junior developer understand this?
- [ ] Is the PR focused on ONE thing?

---

## When User Asks for Something Complex

Don't just build it. Ask:

> "This could be built simply (Option A) or with more flexibility (Option B).
>
> **Option A (Recommended):** [Simple approach] — Works for current needs, easy to extend later.
>
> **Option B:** [Complex approach] — More flexible but adds complexity.
>
> Which do you prefer?"

**Default to simple. Let user explicitly choose complexity.**

---

## Recovery: Already Over-Engineered?

If you realize you've over-engineered:

1. Stop immediately
2. Tell the user what happened
3. Propose simpler alternative
4. Ask if they want to simplify or keep

Don't hide it. Don't keep building on bad foundation.

---

## Mantras

- Simplicity is a feature
- Working > perfect
- Ship > polish
- Delete > add
- Ask > assume

---

*Last updated: Baton Protocol v3.1*
