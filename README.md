# Baton

**The lifecycle protocol for AI-assisted building — interview to handoff, any tool, any skill level.**

Every AI coding session starts the same way: you explain your project, the AI forgets it next time, and you start over. Baton fixes this permanently.

---

## The Problem

AI coding tools are powerful but stateless. Every session starts from zero. This causes:

- **Context rot** — AI forgets decisions, patterns, and constraints between sessions
- **Compounding errors** — without accumulated knowledge, the same mistakes repeat
- **Manual overhead** — you become the documentation system, re-explaining everything
- **Tool lock-in** — switch from Cursor to Claude Code and you lose all context

Developers lose ~200 hours/year to context loss. Baton eliminates it.

---

## What Baton Does

Baton is a **methodology**, not just files. One markdown protocol that turns any AI into a self-managing project partner:

1. **Session Zero** — AI interviews you, researches your stack, generates all project context
2. **Structured sessions** — AI builds in small increments, documents everything as it goes
3. **Session handoffs** — every session ends with a handoff file the next session reads
4. **Self-improving loop** — AI checks at session end for universal improvements to the protocol
5. **Skills library** — curated best practices AI loads instead of guessing

You make decisions. AI does everything else — coding, testing, documenting, and managing itself.

---

## Quick Start

### Option 1: CLI (recommended)
```bash
npx create-baton
```
Asks 3 questions, scaffolds everything — protocol, skills, AGENTS.md, IDE config, folder structure.

### Option 2: Copy the files
1. Copy `BATON_v3.1.md` + `skills/` folder to your project root
2. Open your AI coding tool
3. Tell it: *"Read BATON_v3.1.md and begin"*

---

## What Makes Baton Different

| Feature | AGENTS.md | CLAUDE.md | Baton |
|---------|-----------|-----------|-------|
| Static project context | Yes | Yes | Yes |
| AI generates the context | No | No | **Yes** — AI interviews you, you don't write it |
| Session handoffs | No | No | **Yes** — protocol-level, not a hack |
| Self-improving loop | No | No | **Yes** — AI improves the process each session |
| Skills library | No | No | **Yes** — curated patterns loaded per project |
| Works across tools | Partial | Claude only | **Yes** — any AI tool that reads markdown |
| Built for non-coders | No | No | **Yes** — orchestrators are first-class users |

AGENTS.md tells AI about your project. Baton **runs** your project.

---

## How It Works

```
Session Zero:
  AI interviews you (8 questions) → reads skills → condenses into one tech-stack file → generates all context

Session 1+:
  AI reads handoff + tech-stack (not all skills) → picks up where it left off → builds 1-4 tasks → creates new handoff

Every session:
  AI updates progress, documents patterns, checks for improvements, hands off cleanly
```

After Baton runs, your project has:

```
your-project/
├── BATON_v3.1.md          # The protocol (AI's operating manual)
├── AGENTS.md              # Universal agent context (auto-generated)
├── skills/                # Best practices library
│   ├── core/              # Security, testing, anti-overengineering, etc.
│   ├── stacks/            # Next.js, Supabase, etc.
│   └── patterns/          # API integration, auth, etc.
├── .ai-rules/             # Project context (AI-generated, grows over time)
│   ├── project.md         # Your preferences and decisions
│   ├── tech-stack.md      # Condensed skills — single source of technical truth
│   ├── patterns.md        # Knowledge cache — compound learning
│   └── structure.md       # Project file structure
├── handoff/               # Session handoff files
│   ├── SESSION_1.md
│   └── SESSION_2.md       # Each session picks up from the last
├── CLAUDE.md              # IDE config (or .cursorrules, .windsurfrules)
├── PROGRESS.md            # Session log
└── BACKLOG.md             # Deferred items
```

---

## Skills Library

26 curated skills in [SKILL.md format](https://agentskills.io/specification) — compatible with Claude Code, Codex, and the broader agent ecosystem.

During Session Zero, AI reads relevant skills and **condenses** them into `.ai-rules/tech-stack.md` — a single file with only the rules that apply to your project. After that, AI reads one file instead of 15. Faster. Cheaper. More focused.

**Core skills** (8 — always loaded):
`security` · `testing` · `anti-overengineering` · `ui-ux` · `production-readiness` · `milestones` · `cost-awareness` · `launch-prep`

**Stack skills** (7 — loaded based on your tech choice):
`nextjs` · `supabase` · `tailwind` · `shadcn` · `typescript` · `prisma` · `vercel`

**Pattern skills** (7 — loaded based on features):
`authentication` · `database-design` · `file-uploads` · `payments` · `email` · `seo` · `api-integration`

**Domain skills** (4 — loaded based on project type):
`saas` · `ecommerce` · `portfolio` · `api`

---

## Works With Every Tool

| Tool | Config File | Status |
|------|------------|--------|
| Claude Code | `CLAUDE.md` | Full support |
| Cursor | `.cursorrules` | Full support |
| Windsurf | `.windsurfrules` | Full support |
| Codex (OpenAI) | `AGENTS.md` | Full support |
| Kiro | `CLAUDE.md` | Full support |
| Warp | `CLAUDE.md` | Full support |
| Any AI chat | Paste protocol | Works (no skills) |

The protocol is tool-agnostic. It's just markdown. The CLI generates the right config file for your tool.

---

## Proof

**GhostPost** — a tweet scoring app built entirely with Baton:
- 7 sessions, 2 different AI tools (Kiro → Warp)
- 2,196 lines of working code
- 247 lines of accumulated patterns (compound knowledge)
- Total cost: $2.60
- Zero context loss despite switching tools mid-project

The handoff system meant Warp picked up exactly where Kiro left off. No re-explanation. No lost decisions.

---

## Who Is This For

**AI Orchestrators** — people who direct AI to build software without writing code themselves. Baton was built by one.

**Developers** — anyone tired of re-explaining their project to AI every session. Baton handles the context management so you focus on building.

**Teams** — multiple people (or AIs) working on the same project. Handoff files mean anyone can pick up where someone else left off.

---

## Philosophy

1. **AI does the work, human makes decisions** — you're the CEO, not the developer
2. **Context compounds** — every session makes the next one better
3. **Small increments over big ambitions** — 1-4 tasks per session, always shippable
4. **The protocol improves itself** — AI checks for universal improvements at session end
5. **No infrastructure** — if it needs a server, database, or API key, it's not Baton's job

---

## Contributing

Baton evolves through real usage. If you discover:

- A pattern that saves significant time → add it as a skill
- A gotcha that cost >30 minutes to debug → document it
- A workflow improvement that applies universally → open a PR

Skills use the [SKILL.md standard](https://agentskills.io/specification). See any existing skill for the format.

---

## License

MIT — Use it however you want.

---

**Version 3.1** — Built with human-AI collaboration, tested across real production projects.
