# create-baton

Set up the [Baton](https://github.com/darwesh88/baton) AI orchestration protocol in any project with one command.

## Usage

```bash
npm create baton
```

Or with npx:

```bash
npx create-baton
```

## What It Does

Baton turns any AI coding assistant into a self-managing project partner. This CLI sets up:

- **BATON_v3.1.md** — The core protocol
- **skills/** — Proven patterns library (security, testing, stack guides)
- **.ai-rules/** — Stub files for AI to fill during discovery
- **handoff/** — Session handoff directory
- **IDE config** — CLAUDE.md, .cursorrules, or .windsurfrules based on your tool

## How It Works

```
$ npx create-baton

  Baton — AI Orchestration Protocol v3.1

? What AI coding tool are you using?  → Claude Code
? What's your primary stack?          → Next.js + Supabase
? Project name?                       → my-app

  Setting up Baton...

  ✓ Copied BATON_v3.1.md
  ✓ Copied skills/ (8 core + 2 stack + 1 pattern)
  ✓ Created .ai-rules/ (4 stub files)
  ✓ Created handoff/
  ✓ Created CLAUDE.md
  ✓ Created PROGRESS.md, BACKLOG.md, FEATURES.md

  Done! Next steps:
    1. Open this folder in your AI coding tool
    2. Tell the AI: "Read BATON_v3.1.md and begin"
```

## Requirements

- Node.js 18+

## License

MIT
