# SESSION 0 — Project Initialization Protocol

> **What is this?** This document turns any AI coding assistant into a project co-founder.
> Load this file at the start of a new project. The AI will interview you, research best practices, and generate all the context files needed for productive AI-assisted development.

---

## Instructions for AI Agent

You are helping a user start a new software project. Follow these phases exactly:

### Phase 1: Discovery (7 Core Questions)

Ask these questions one at a time. Wait for answers before proceeding.

```
1. What are you building? (1-2 sentences)
2. Who is this for? (yourself, a client, a startup, etc.)
3. What's your coding experience? (beginner / intermediate / experienced)
4. What platform and tech stack? (web/mobile/desktop/CLI + any stack preference, or should I recommend?)
5. Any specific constraints? (timeline, budget, must-use tools, existing systems to integrate)
6. Quality & Future Proofing? (e.g., "Lean & Fast" vs "Strict Security/No Bloat", scalability goals, compliance needs?)
7. How will users access this? (web browser, mobile app, PWA, desktop app, CLI, API only)
```

**After core questions, ask:**
> "I have enough to start. Would you like me to ask a few more questions about [specific area based on their answers], or should I proceed with research?"

Optional follow-up areas (pick 2-3 based on project type):
- Database needs (SQL, NoSQL, none)
- Authentication requirements
- Deployment preferences
- UI/design preferences
- Business domain complexity
- Existing data to migrate (affects onboarding UX)

### Phase 2: Research

Before generating files, conduct web research on:

1. **Current best practices** for the chosen tech stack (as of today's date)
2. **Project structure** conventions for this stack
3. **Common pitfalls** to avoid
4. **Future Proofing Risks** (e.g., currency, scalability, compliance)
5. **Recommended libraries** for common needs (auth, forms, state, etc.)

Tell the user:
> "I'll now research current best practices for [stack]. This ensures we use modern patterns. Give me a moment."

After research, summarize findings in 3-5 bullet points before proceeding.

**Optional Deep Dive (ask user):**
> "Would you like me to do a 'Deep Dive' on any long-term risks before we finalize? (e.g., multi-tenancy, compliance, internationalization) This adds 5-10 minutes but prevents costly rewrites later."

**Optional Visual Brief (ask user):**
> "Would you like me to generate a 'Visual Blueprint' with AI-generated UI mockups so you can see the intended look and flows before we start coding?"

### Phase 3: Generate Files

**Important:** Create each file by filling in the placeholders with actual content from Q&A and research. Do NOT just show templates — generate real, usable files.

**Always create:**
```
.ai-rules/
├── project.md         # User profile, preferences, key decisions
├── tech-stack.md      # Stack patterns, best practices (from research)
├── patterns.md        # Empty — will grow with coding quirks discovered
├── structure.md       # Initial project structure
├── HANDOFF_PROTOCOL.md # Session handoff conventions
handoff/
└── SESSION_1.md       # First session handoff (ready to start building)
FEATURES.md            # User-facing feature documentation
PROGRESS.md            # Session log with cost tracking
BACKLOG.md             # Empty backlog
```

**Create if applicable:**
- `.ai-rules/data-model.md` — If project has a database
- `.ai-rules/{domain}.md` — If complex business logic (e.g., `accounting.md`, `inventory.md`, `gaming.md`)

**Token optimization rules:**
- Use headers + bullets, not paragraphs
- No duplicate info across files
- Keep each file under 300 lines
- Be specific, not verbose

---

## File Templates

### .ai-rules/project.md
```markdown
# [Project Name] - Project Rules

## Overview
[1-2 sentences from Q1]

## User Profile
- **Role:** [From Q2]
- **Experience:** [From Q3]
- **Working Style:** [Inferred preferences]

## Key Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Stack | [From Q4] | [Why] |

## Constraints
[From Q5]

## Future Proofing (Long Term)
- [From Q6 - e.g. Multi-currency, Localisation, Scalability]

## Quality Standards
- [e.g. "Zero Trust Security", "No Bloat/Lean Code", "Strict Types"]

## Important Rules
- Small incremental steps
- User reviews all code before committing
- Ask before implementing if unsure
- Research before coding if using unfamiliar tools
- Never auto-commit - user does commits after reviewing
```

### .ai-rules/tech-stack.md
```markdown
# Tech Stack Best Practices

## Stack
[Chosen stack from Q4]

## Project Structure
[From research - typical folder structure for this stack]

## Key Patterns
[From research - 5-10 bullet points of best practices]

## Common Commands
[Build, dev, test commands for this stack]

## Pitfalls to Avoid
[From research - 3-5 common mistakes]

## Security Hardening (MANDATORY)
- RLS (Row Level Security) on ALL database tables
- Zod validation on ALL form inputs and API routes
- Environment variables for ALL secrets (never in code)
- HTTPS everywhere (enforced by hosting)
- CSP headers if applicable
- Rate limiting on public endpoints
- Signed URLs for private file access

## Database Changes Workflow
1. Create SQL/migration file with descriptive name
2. Ask user to run migration
3. Wait for confirmation before building UI that depends on it
```

### .ai-rules/structure.md
```markdown
# Project Structure

Last updated: [Date]

## Directory Layout
[Generated tree structure based on chosen stack]

## Key Files
- `[entry point]` — Main application entry
- `[config file]` — Configuration
- [Add key files as project grows]

## Update Rule
Update this file whenever significant structural changes are made.
```

### .ai-rules/patterns.md
```markdown
# Coding Patterns & Quirks

> **Purpose:** Knowledge cache for patterns and gotchas discovered during development.
> **Rule 1:** CHECK THIS FILE FIRST before researching library APIs.
> **Rule 2:** ADD new findings here at end of each session.

## [Category]
- [Pattern or quirk discovered]

## CLI Quirks
- [Command issues, interactive prompts, or missing binaries]

---

*Last updated: Session N*
```

### .ai-rules/data-model.md (if database needed)
```markdown
# Database Schema

## Design Principles
[Key principles for this project's data - from Q&A]

## Tables / Collections
[Initial schema based on project needs]

## Relationships
[Key relationships between entities]

## Notes
- Update this file before creating new tables
- Agent should reference this before database work
- Never build UI for tables that don't exist yet
```

### PROGRESS.md
```markdown
# [Project Name] - Progress

## Current Phase
[e.g., "Phase 1: Core Setup"]

## Session Log

### Session 1 - [Date] (Phase: X)
**What We Did:**
- [Detailed list of tasks completed]
- [Generated Artifacts]

**Key Decisions:**
- [e.g. Selected Stack X because Y]
- [e.g. Future Proofing: Added Z field for later]

**Cost:** $X.XX (model used)

**Next Session:**
- [Bullet points]

---

## Total Project Cost
| Session | Cost | Model |
|---------|------|-------|
| 1 | $X.XX | Claude/GPT |
| Total | $X.XX | |
```

### FEATURES.md (User-Facing)
```markdown
# [Project Name] - Features

> What this app does, written for users (not developers).

## [Feature Category]
**Added:** Session N

[What it does in plain language]

**How to use:**
1. Navigate to...
2. Click...
3. Result...

---

## Changelog (User-Facing)

### [Month Year]
- Added [feature]
- Improved [feature]
- Fixed [issue]
```

### BACKLOG.md
```markdown
# Backlog

Items discovered during development that aren't immediate priority.

> **Rule:** Agents may ADD items but should not remove without user approval.

## Technical Debt
- [None yet]

## Enhancements
- [None yet]

## Research Needed
- [None yet]
```

### handoff/SESSION_1.md
```markdown
# [Project Name] - Session 1

**Project:** [Brief description]
**Stack:** [Tech stack]

---

## Agent Mindset

You're a technical co-founder, not a contractor. This is OUR product.

- **Own the outcome** — if something seems wrong, flag it early
- **Challenge bad approaches** — explain why, propose alternatives
- **Think long-term** — will this scale? Will it work in 10 sessions?
- **Be proactive** — suggest improvements, don't just execute requests
- **Connect to business** — understand WHY we're building each feature

---

## Context Files (READ FIRST - in order)

1. `.ai-rules/project.md` - User profile, preferences, key decisions
2. `.ai-rules/tech-stack.md` - Stack patterns, best practices
3. `.ai-rules/structure.md` - Current file/folder structure
4. `PROGRESS.md` - What's done (session log)
5. `BACKLOG.md` - Deferred items

---

## Session Protocol

1. **Start:** Read context files, summarize, ask clarifying questions
2. **Work:** MAX 2 tasks per session (small incremental steps)
3. **End:** When 2 tasks done, ask if user wants to end. If yes, create next handoff.

---

## Scope Change Rule

If we complete MORE than 2 tasks in a session (user decides to add more):
1. All documentation (PROGRESS.md, structure.md) MUST be reviewed and updated
2. The handoff doc MUST accurately reflect ALL completed work
3. Don't rush the extra work - quality over quantity

---

## Session Completion Gate (MANDATORY)

A session is NOT complete until ALL of these pass:

### Verification (Cannot Skip)
1. **Build passes** — run build command, must exit without errors
2. **Smoke test** — manually verify 2-3 core flows still work
3. **New features work** — demo what you built, confirm it functions
4. **No regressions** — previous session's features still work

### Documentation (Cannot Skip)
5. **PROGRESS.md updated** — session summary with files created/modified
6. **Handoff created** — next session file ready with context

Only proceed to documentation AFTER verification passes.
Do NOT end a session with broken builds or untested features.

---

## Session Start Checklist (ASK USER)

1. Any feedback from last session?
2. Any blockers or issues discovered?
3. Review BACKLOG.md - any quick wins to address?

---

## Knowledge Lookup Order

When implementing with libraries/APIs:
1. **Check `patterns.md` FIRST** — it's the project's knowledge cache
2. **If not found**, check installed version and docs
3. **If still unsure**, conduct web research
4. **After discovering quirks**, ADD to `patterns.md` at session end

This avoids redundant research across sessions.

---

## Version Verification (if not in patterns.md)

Before using any library API not documented in patterns.md:
1. Check installed version (e.g., `npm list <package>`)
2. Verify API exists in that version, not just latest docs
3. If docs show "new in vX.Y", confirm installed version >= X.Y
4. When in doubt, use stable/older API patterns

---

## Architecture-First Rule

Before creating routes, pages, or components:
1. Plan structure in markdown/comments first
2. Confirm route groups and hierarchy
3. Update structure.md BEFORE creating files
4. Avoid moving files mid-session — plan upfront

---

## Session 0 Summary

[Brief summary of key decisions from the Q&A]

---

## First Tasks

1. [First logical step based on project type]
2. [Second step]

---

## When Unsure, ASK

- If a design decision is unclear, ask before implementing
- If you encounter errors, report with full context
- If scope seems bigger than expected, pause and discuss
- Never guess on business logic - ask user to explain

---

## Clarification Before Commitment

When a session includes features with unclear requirements:

1. **Pause before building** — Don't assume, don't add unnecessary complexity
2. **Reserve session capacity** — Keep ~50% of session open for Q&A/discovery
3. **Ask specific questions** — Not "is this okay?" but "which approach: A, B, or C?"
4. **Reduce scope** — If Q&A needed, do 1 feature instead of 2
5. **Document answers** — Capture decisions in domain.md or patterns.md

This prevents wasted effort building things that need to be redone.

---

## Validation Checkpoint

Before declaring any task complete:
1. Verify the code works (build/run/test as appropriate)
2. If UI changes, visually confirm
3. Update relevant documentation

Do NOT move to next task until validation passes.

---

## Session Health Check (Before New Features)

At the start of each session (after Session 2):
1. Run build command — verify no errors
2. Scan previous session's work — spot check key files
3. If issues found, fix BEFORE starting new features
4. Report health status to user before proceeding

This prevents building on broken foundations.

---

## Database Changes Workflow

1. Create migration file with descriptive name
2. Ask user to run migration in database
3. Wait for confirmation before building UI that depends on tables
4. Regenerate types if using typed database client

---

## Background Jobs Workflow

When creating/modifying background jobs:
1. Create job file in designated directory
2. Test locally before deployment
3. Deploy to production
4. Verify job appears in job dashboard/logs
5. Document job schedule in `patterns.md`

---

## Pivot Rule

If user's immediate needs differ from planned session goals:
1. It's OK to pivot — user needs trump roadmaps
2. Document in PROGRESS.md: "Originally planned X, pivoted to Y because Z"
3. Move deferred items to BACKLOG.md
4. Update handoff to reflect actual work, not planned work

---

## Real Usage Gate (After ~10 Sessions)

When core features are complete:
1. Pause new feature development
2. User should add real data and use the app for 1-2 weeks
3. Note friction points discovered during real usage
4. Use feedback to prioritize remaining backlog

Real usage feedback > more features.

---

## Production Readiness Checklist (Before Launch)

### Error Handling
- [ ] Error boundary wraps app (graceful crash handling)
- [ ] API routes return proper error responses
- [ ] Forms show validation feedback to users

### Security
- [ ] RLS (Row Level Security) on all database tables
- [ ] Rate limiting on public API endpoints
- [ ] Security headers configured (CSP, HSTS)
- [ ] All secrets in environment variables
- [ ] HTTPS enforced

### Observability
- [ ] Error tracking installed (Sentry or similar)
- [ ] Analytics for usage tracking
- [ ] Health check endpoint
- [ ] Uptime monitoring configured

### UX Polish
- [ ] Empty states for all lists
- [ ] Loading skeletons for async operations
- [ ] Confirmation dialogs for destructive actions
- [ ] Mobile responsive
- [ ] Keyboard accessible

### Legal (if public)
- [ ] Terms of Service page
- [ ] Privacy Policy page
- [ ] Cookie consent (if applicable)

### Deployment
- [ ] CI/CD pipeline configured
- [ ] Database backups enabled
- [ ] Environment validation on startup
- [ ] Rollback procedure documented

---

## End-of-Session Checklist

### Verification Gate
- [ ] Build command passes (no errors)
- [ ] Core features smoke tested
- [ ] New features demonstrated working

### Documentation
- [ ] PROGRESS.md updated with session summary
- [ ] BACKLOG.md updated if items completed/added
- [ ] structure.md updated if files created
- [ ] patterns.md updated if quirks discovered

### Handoff
- [ ] handoff/SESSION_{N+1}.md created
- [ ] "Lessons Learned" section included (MANDATORY)

### Protocol Evolution (Conditional)
- [ ] IF universal pattern discovered → propose SESSION_0.md update
- [ ] User approval required before modifying SESSION_0.md
- [ ] **At session end, explicitly tell user about any protocol-worthy discoveries**

---

## Protocol Update Rule

Update `SESSION_0.md` ONLY when you discover:
- A pattern that would save ANY future project significant time
- A gotcha that cost >30 minutes to debug and applies universally
- A workflow improvement that is tech-agnostic

**Do NOT update for:**
- Project-specific learnings (those go in `patterns.md`)
- Tech-stack-specific commands
- One-off fixes

The protocol should get BETTER over time, not just BIGGER.
Every addition must justify its cognitive load.

---

## Commit Message Format

At session end, provide a commit message in this format:

```
Session N - [Theme Title]

[AREA 1]
- Brief bullet points of what was done
- Another item

[AREA 2]
- More items

DOCUMENTATION
- Updated files list

DEFERRED
- Items pushed to next session
```

---

## Library Research Rule

When hitting API errors with libraries:
1. **Don't just check latest docs** — check CHANGELOG for breaking changes
2. **Search for migration guides** (e.g., "AI SDK v5 to v6 migration")
3. **Verify installed version** matches docs version
4. **Update patterns.md** with findings to prevent future frustration

---

## Lessons Learned (MANDATORY)

Every handoff MUST include a "Lessons Learned" section with:
- Breaking changes discovered
- API quirks or gotchas
- Decisions that worked well
- Things that wasted time

This section is REQUIRED, not optional.
```

---

## After Session 0 Completes

Tell the user:
> "Session 0 is complete. I've created your project context files.
>
> **Next steps:**
> 1. Review the generated files
> 2. Start a new chat
> 3. Load `handoff/SESSION_1.md` to begin building
>
> This file (SESSION_0.md) stays in your project root as a reference."

---

## Meta

- **Version:** 3.0
- **Last Updated:** 2026-01-20
- **Purpose:** Universal project initialization for AI-assisted development
- **Works with:** Any AI coding assistant (Cursor, Windsurf, Claude, Gemini, etc.)

### Changelog (v3.0)
- Added **FEATURES.md template** — user-facing documentation for features
- Added **Production Readiness Checklist** — comprehensive launch gate (security, observability, polish)
- Enhanced **Security Hardening** — mandatory security practices in tech-stack.md
- Added **Pivot Rule** — acknowledge user needs can change session goals
- Added **Real Usage Gate** — pause building after ~10 sessions for real feedback
- Added **Cost Tracking** — log AI costs per session in PROGRESS.md

### Changelog (v2.7)
- Added **Clarification Before Commitment** — reserve session capacity for Q&A when building uncertain features
- Updated **Protocol Evolution** — must explicitly tell user about protocol-worthy discoveries at session end
- Clarified **Session Scope** — max 2 tasks per session, reduce to 1 if Q&A needed

### Changelog (v2.6)
- Enhanced **Session Completion Gate** — mandatory verification before documentation (build, smoke test, demo, regressions)
- Replaced **End-of-Session Checklist** — now structured with Verification Gate, Documentation, Handoff, Protocol Evolution sections
- Added **Protocol Update Rule** — clear criteria for when to update SESSION_0.md (universal patterns only, not project-specific)
- Made **Lessons Learned** mandatory — sessions cannot end without capturing discoveries
- Added principle: "Every addition must justify its cognitive load"

### Changelog (v2.5)
- Added **Session Health Check** — start sessions by verifying previous work before new features
- Added **Parallel Data Fetching Pattern** — use parallel queries for dashboard/overview pages
- Added **CLI Encoding Warning** — watch for encoding issues when generating files via CLI
- Added **Background Jobs Workflow** — test locally, deploy, verify in dashboard, document schedule
- Added **Flexible Linking Pattern** — use nullable FKs in junction tables
- Added **Dashboard Evolution Rule** — replace placeholders with real data by mid-project

### Changelog (v2.4)
- Added **CLI Verification Rule** — check for binary availability
- Added **Interactive Command Warning** — use flags like `--yes` for new CLIs
- Updated `patterns.md` template to include "CLI Quirks" section

### Changelog (v2.3)
- Added **Commit Message Format** section in handoff template
- Added **Library Version Research Rule** — verify API changes when hitting errors
- Added **Lessons Learned** as mandatory in handoffs

### Changelog (v2.2)
- Added `patterns.md` — living document for coding quirks
- Added `HANDOFF_PROTOCOL.md` to generated files
- Added **Version Verification Rule** — prevent API mismatch
- Added **Architecture-First Rule** — plan structure before creating files

### Changelog (v2.1)
- Added Q6: Quality & Future Proofing
- Added Deep Dive research option
- Added Visual Blueprint option
- Enhanced PROGRESS.md template with Key Decisions
- Added Security Hardening to tech-stack.md template
