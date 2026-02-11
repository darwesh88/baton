# SESSION 0 Protocol - Progress

## Current Phase
Phase 1: Core Protocol + Skills Library — COMPLETE

---

## Session Log

### Session 0 - 2026-02-10 (Phase: Discovery + Core Build)

**What We Did:**

1. **Discovery Complete**
   - 8-question framework defined
   - Target: Non-coders (primary), devs (secondary)
   - Distribution: GitHub + copy-paste

2. **SESSION_0 v3.1 Created**
   - Flexible task count (1-4 based on size)
   - Session continuation protocol ("next" to continue)
   - IDE config generation (CLAUDE.md, .cursorrules)
   - Skills loading order
   - Lean protocol (~400 lines)

3. **Core Skills Library (7 files)**
   - `security.md` — Universal security rules
   - `testing.md` — Testing standards
   - `production-readiness.md` — Launch checklist
   - `anti-overengineering.md` — YAGNI, simplicity
   - `milestones.md` — Phase-based planning
   - `launch-prep.md` — GTM basics
   - `cost-awareness.md` — Token efficiency

4. **Stack Skills (2 files)**
   - `nextjs.md` — Next.js patterns
   - `supabase.md` — Supabase patterns

5. **IDE Templates (2 files)**
   - `CLAUDE.md.template`
   - `cursorrules.template`

6. **Documentation**
   - README.md
   - PROGRESS.md

**Research Conducted:**
- 2025/2026 AI coding pain points
- Context loss as #1 problem
- Model capabilities (Opus 4.5/4.6, GPT-5.3-Codex, Gemini 3 Pro)
- Validated SESSION_0 solves real problems

---

### Session 1 - 2026-02-11 (Phase: Completeness + Planning)

**What We Did:**

1. **File Templates Added to SESSION_0_v3.1.md (+317 lines)**
   - `.ai-rules/project.md` template
   - `.ai-rules/tech-stack.md` template
   - `.ai-rules/structure.md` template
   - `.ai-rules/patterns.md` template
   - `.ai-rules/data-model.md` template (conditional)
   - `PROGRESS.md` template
   - `FEATURES.md` template
   - `BACKLOG.md` template
   - `handoff/SESSION_1.md` template (Agent Mindset, Session Protocol, Knowledge Lookup, etc.)

2. **README.md Fixes**
   - Updated 7 questions → 8 questions (v3.1 added IDE selection)
   - Updated 1-3 tasks → 1-4 tasks
   - Quick Start now points to SESSION_0_v3.1.md
   - Added `core/` to skills tree (was missing)
   - Project structure now shows v3.1 as primary

3. **Research: Test Project Ideas**
   - Evaluated 18 app concepts across web, iOS, CLI, bots, extensions
   - Evaluated AI coding tools (Claude Code, Codex, Cursor, Windsurf, Kiro, Warp)
   - Recommendation: Claude Code primary, Codex secondary for demos

**Key Decisions:**
- Protocol is now self-contained — SESSION_0_v3.1.md + skills/ folder is all you need
- Templates ensure AI generates consistent file formats across any tool

---

### Session 2 - 2026-02-11 (Phase: Pre-Test Polish)

**What We Did:**

1. **UI/UX Core Skill Added**
   - `skills/core/ui-ux.md` — Ensures AI builds good-looking UIs from first build
   - Covers: layout defaults, typography, color, components, responsive, states (loading/empty/error/success), accessibility basics
   - Default stack: shadcn/ui + Lucide icons + Inter font
   - Added to SESSION_0_v3.1.md core skills loading list
   - Added to README.md skills description

**Key Decisions:**
- One UI/UX skill file is enough — keeps it simple, covers the basics
- Goal: first-time users see polished output, not ugly AI defaults

---

## Final Structure

```
session-zero-protocol/
├── README.md                              # Overview + quick start
├── SESSION_0.md                           # v3.0 (original)
├── SESSION_0_v3.1.md                      # v3.1 (current)
├── PROGRESS.md                            # This file
│
├── skills/
│   ├── core/                              # Always load
│   │   ├── security.md
│   │   ├── testing.md
│   │   ├── production-readiness.md
│   │   ├── anti-overengineering.md
│   │   ├── milestones.md
│   │   ├── launch-prep.md
│   │   ├── cost-awareness.md
│   │   └── ui-ux.md
│   ├── stacks/                            # Load based on tech
│   │   ├── nextjs.md
│   │   └── supabase.md
│   ├── patterns/                          # Load as needed
│   └── domains/                           # Load if applicable
│
├── templates/
│   └── ide/
│       ├── CLAUDE.md.template
│       └── cursorrules.template
│
├── examples/                              # To add
└── guides/                                # To add
```

---

## Backlog

### Ready for v1.0 Release
- [x] Core protocol (SESSION_0 v3.1)
- [x] Core skills (7 files)
- [x] Stack skills (2 starter files)
- [x] IDE templates
- [x] README

### Nice to Have (Later)
- [ ] More stack skills (tailwind, shadcn, typescript)
- [ ] Pattern skills (authentication, file-uploads)
- [ ] Domain skills (saas, ecommerce)
- [ ] Example handoffs from real projects
- [ ] IDE-specific guides
- [ ] CLI tool

---

## Test Project Ideas (Researched 2026-02-11)

Ranked by size (smallest first). Each will use baton to validate the protocol.

### Web Apps
| # | Name | What | Sessions |
|---|------|------|----------|
| 1 | GhostPost | Paste tweet variations → AI scores which will perform best before posting | 3 |
| 2 | PostMorph | Write once → AI adapts tone/format per platform (X, LinkedIn, Bluesky) | 3 |
| 3 | ThreadWeaver | Paste any URL → get a ready-to-post X thread | 3 |
| 4 | OneMetric | One daily score + one recommendation instead of 47 analytics charts | 3 |
| 5 | ReplyRadar | Surfaces high-momentum tweets to reply to for max exposure (Chrome ext) | 3 |
| 6 | Content Repurposer | Blog post → 10 platform-specific social posts | 3-4 |
| 7 | ADHD Task Decomposer | Paste vague task → tiny sequenced micro-steps with timers | 3-4 |
| 8 | Vibe Code Security Scanner | CLI that scans AI-generated code for common vulnerabilities | 3-4 |
| 9 | README Generator | Point at repo → auto-generates README + API docs | 3-4 |
| 10 | ShipLog | GitHub commits → auto-drafted "build in public" social posts | 3-4 |

### iOS Apps (SwiftUI)
| # | Name | What | Sessions |
|---|------|------|----------|
| 11 | QuietHours | Calendar-aware auto-DND + auto-reply during meetings | 2-3 |
| 12 | GlassHabit | Minimal habit tracker with Liquid Glass + Apple Watch | 3 |
| 13 | ParkPin | Auto parking pin on Bluetooth disconnect + meter timer | 3 |
| 14 | CostPerWear | Log clothes + wears, see cost-per-wear ROI | 3 |
| 15 | MoodRing | One-tap mood log correlated with HealthKit data | 3-4 |
| 16 | SplitSnap | Photo receipt → OCR → tap to claim items → split bill | 3-4 |

### Other Platforms
| # | Name | Platform | What | Sessions |
|---|------|----------|------|----------|
| 17 | ReceiptSnap | WhatsApp Bot | Forward receipt photo → expense tracking | 4-5 |
| 18 | StandupBot | Slack/Discord | Async standup collector + daily summary | 3-4 |
| 19 | PageDiff | Chrome Ext | Snapshot webpage → pixel-level change detection | 4-5 |
| 20 | LangFlash | Telegram Bot | Spaced-repetition vocab cards in chat | 3-4 |
| 21 | Dep Drift | CLI | Scan deps → prioritized upgrade report with changelog summaries | 3-4 |
| 22 | DiffMail | API Service | POST markdown → beautiful HTML email back | 3-4 |

### Domain-Specific
| # | Name | What | Sessions |
|---|------|------|----------|
| 23 | HoardValue | Jewellery/gold estimator with live prices + shareable value cards | 3-4 |

---

## Status: Ready to Test

Protocol is complete. Next step: pick a test project, run baton, record the session.

---

## Protocol Version
SESSION_0 v3.1 — 2026-02-11
