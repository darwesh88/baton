# SESSION 0

**Turn any AI into a self-managing developer. You just approve.**

---

## What Is This?

SESSION 0 is an AI orchestration protocol. Load one markdown file, and any AI coding assistant becomes:

- A developer that writes code
- A project manager that tracks progress
- A documentation writer that maintains context
- A system that hands off perfectly between sessions

You don't write code. You don't manage tasks. You don't document.
**You make decisions. AI does everything else.**

---

## How It Works

```
1. Copy SESSION_0.md into your project
2. Load it in any AI tool (Claude, Cursor, Windsurf, Kiro, etc.)
3. AI interviews you about your project (8 questions)
4. AI researches best practices for your stack
5. AI generates all context files
6. AI builds in small increments (1-4 tasks per session)
7. AI documents everything and creates handoffs
8. You say "next" to continue, or "done" to stop
```

That's it. The AI manages itself. You're the CEO.

---

## Quick Start

### Option 1: Copy the files
1. Copy `SESSION_0_v3.1.md` + `skills/` folder to your project root
2. Open your AI coding tool
3. Tell it: "Read SESSION_0_v3.1.md and begin"

### Option 2: Paste directly
1. Copy the contents of `SESSION_0_v3.1.md`
2. Paste into any AI chat
3. AI will start the discovery process (skills won't load without the folder)

---

## What Gets Created

After SESSION 0 completes, your project has:

```
your-project/
├── .ai-rules/
│   ├── project.md      # Your preferences and decisions
│   ├── tech-stack.md   # Stack patterns and best practices
│   ├── patterns.md     # Knowledge cache (grows over time)
│   └── structure.md    # Project file structure
├── handoff/
│   └── SESSION_1.md    # Ready to start building
├── PROGRESS.md         # Session log
├── BACKLOG.md          # Deferred items
└── FEATURES.md         # User-facing docs
```

Every session, the AI updates these files. Context is never lost.

---

## Why This Works

**Problem:** AI forgets everything between sessions. You repeat context. Quality drops.

**Solution:** AI documents itself. Every session ends with a handoff file. Next session picks up exactly where you left off.

**Result:**
- 14+ session projects with consistent quality
- Production apps built by non-coders
- Zero context loss between sessions

---

## Proof

This protocol was developed across 28+ sessions on two production projects:

- **PropertyPulse** — UAE property lease management SaaS
- **Jewellers ERP** — Multi-module business system with live data

Both built by someone who doesn't write code. Both in production.

---

## Skills Library

The `skills/` folder contains proven patterns from real projects:

```
skills/
├── core/        # Security, testing, production-readiness, anti-overengineering
├── stacks/      # Next.js, Supabase, Tailwind, etc.
├── patterns/    # Authentication, file uploads, background jobs
└── domains/     # E-commerce, SaaS billing, ERP accounting
```

AI checks skills first before searching the web. Faster. More reliable.

---

## Works With

- Claude (claude.ai, Claude Code)
- Cursor
- Windsurf
- Kiro
- Warp
- Any AI coding assistant that can read files

The protocol is tool-agnostic. It's just markdown.

---

## Project Structure

```
session-zero-protocol/
├── SESSION_0_v3.1.md   # The core protocol (start here)
├── SESSION_0.md        # v3.0 (legacy reference)
├── skills/             # Proven patterns library
│   ├── core/           # Universal rules (always loaded)
│   ├── stacks/         # Tech stack guides
│   ├── patterns/       # Common implementations
│   └── domains/        # Business domain knowledge
├── templates/          # IDE config templates
├── examples/           # Real project examples (coming)
└── guides/             # Tool-specific setup guides (coming)
```

---

## Philosophy

1. **AI does the work, human makes decisions**
2. **Small increments over big ambitions**
3. **Documentation is not optional**
4. **The protocol improves over time, but stays simple**
5. **Works everywhere, depends on nothing**

---

## Contributing

This protocol evolves through real usage. If you discover:

- A pattern that saves significant time
- A gotcha that cost >30 minutes to debug
- A workflow improvement that applies universally

Open a PR. The protocol should get better, not just bigger.

---

## License

MIT — Use it however you want.

---

## Meta

- **Version:** 3.1
- **Created:** 2026
- **Built with:** Human-AI collaboration
