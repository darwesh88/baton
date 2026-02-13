---
name: cost-awareness
description: >-
  AI cost tracking and optimization. Covers model pricing, model selection
  guide, cost-saving practices, and session cost tracking.
  Use when discussing AI costs, choosing models, optimizing token usage,
  or when spending seems high.
---

# Cost Awareness Skill

> AI isn't free. Know what you're spending.
> Expensive ≠ better. Smart model selection saves money.

---

## Why This Matters

Real examples from developers:
- "$60 in 3 days just fixing React components"
- "Blew through monthly budget in one week"
- "Didn't realize web search costs extra tokens"

**Don't be surprised. Be aware.**

---

## 2026 Model Pricing (Approximate)

| Model | Input (per 1M tokens) | Output (per 1M tokens) | Best For |
|-------|----------------------|------------------------|----------|
| **Claude Opus 4.5** | $15 | $75 | Complex reasoning, architecture |
| **Claude Sonnet** | $3 | $15 | Daily coding, most tasks |
| **Claude Haiku** | $0.25 | $1.25 | Simple tasks, quick checks |
| **GPT-5.3-Codex** | $10 | $40 | Agentic coding |
| **Gemini 3 Pro** | $1.25 | $5 | Long context, large codebases |

*Prices change. Check current rates.*

---

## Model Selection Guide

### Use Opus/Expensive Models For:

- Architecture decisions
- Complex debugging
- Security reviews
- Major refactors
- When you're stuck

### Use Sonnet/Mid-tier For:

- Daily feature building
- Code generation
- Documentation
- Most normal work

### Use Haiku/Cheap Models For:

- Simple questions
- Formatting
- Quick lookups
- Repetitive tasks

---

## Cost-Saving Practices

### 1. Check Skills Before Web Search

```
EXPENSIVE:
"Search the web for Next.js best practices"
(Tokens for search + results + processing)

CHEAP:
"Read skills/stacks/nextjs.md"
(Just file read, minimal tokens)
```

**Skills library exists to save money.**

### 2. Don't Reload Context Unnecessarily

```
EXPENSIVE:
Reading all .ai-rules files every time you ask a question

BETTER:
Read at session start, reference from memory
```

### 3. Ask Specific Questions

```
EXPENSIVE:
"Help me with authentication"
(Vague → long back-and-forth)

CHEAP:
"Add Supabase auth to the login form at src/app/login/page.tsx"
(Specific → one-shot answer)
```

### 4. Use Smaller Models for Simple Tasks

```
EXPENSIVE:
Using Opus to rename a variable

CHEAP:
Using Haiku for simple edits, Opus for complex reasoning
```

---

## Session Cost Tracking

At end of each session, note in PROGRESS.md:

```markdown
### Session N - [Date]

**Cost:** ~$X.XX
**Model:** Claude Opus 4.5
**Notes:** Heavy research session, expect higher cost

**Running Total:** ~$XX.XX
```

---

## Cost Red Flags

| Red Flag | Likely Cause | Solution |
|----------|--------------|----------|
| >$20 in one session | Long context, many searches | Split work, use skills |
| Repeated research | Not using patterns.md | Document discoveries |
| Many failed attempts | Poor prompts | Be more specific |
| Constant clarification | Vague requests | Ask complete questions |

---

## Budget Guidelines

| Project Type | Expected Total | Per Session |
|--------------|---------------|-------------|
| Simple app (5 sessions) | $20-50 | $4-10 |
| Medium app (10 sessions) | $50-150 | $5-15 |
| Complex app (20+ sessions) | $150-500 | $7-25 |

*These are estimates. Actual varies by complexity and efficiency.*

---

## When Costs Are High

If spending seems high:

1. **Review:** What's using tokens?
   - Web searches?
   - Long files?
   - Repeated context?

2. **Optimize:**
   - Use skills library more
   - Be more specific in prompts
   - Consider cheaper model for simple tasks

3. **Communicate:**
   - Tell user if session was expensive and why
   - Suggest optimizations for next session

---

## Cost vs. Time Trade-off

Sometimes expensive is worth it:

| Situation | Recommendation |
|-----------|----------------|
| Stuck for 30+ minutes | Use Opus, worth the cost |
| Simple task | Use Haiku, save money |
| Architecture decision | Use Opus, get it right |
| Formatting/cleanup | Use Haiku |
| Security review | Use Opus, don't skimp |

**Cheap mistakes cost more than expensive prevention.**

---

## Token Estimation

Rough guidelines:

| Content | Approximate Tokens |
|---------|-------------------|
| 1 page of code (~50 lines) | ~500 tokens |
| Average source file | 500-2000 tokens |
| BATON_v3.1.md | ~2000 tokens |
| All .ai-rules files | ~3000-5000 tokens |
| Web search results | ~1000-3000 tokens |

---

*Last updated: Baton Protocol v3.1*
