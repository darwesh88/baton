---
name: milestones
description: >-
  Project milestone tracking and scope creep detection. Defines standard
  milestone phases (Foundation, MVP, Polish, Launch, Iterate) with session
  targets and review checkpoints. Use when planning project phases,
  detecting scope creep, or when milestones slip.
---

# Milestones Skill

> Sessions are tactics. Milestones are strategy.
> Know where you're going, not just what you're doing today.

---

## Why Milestones Matter

Without milestones:
- Build forever, never ship
- Lose sight of the goal
- Features without users
- Burnout from endless work

With milestones:
- Clear checkpoints
- Celebrate progress
- Ship early, iterate
- Sustainable pace

---

## Standard Milestone Template

| Phase | Sessions | Goal | Checkpoint |
|-------|----------|------|------------|
| **Foundation** | 1-3 | Project setup, auth, core UI | "Can a user log in and see the main screen?" |
| **MVP** | 4-7 | Core features working | "Can a user do the ONE main thing?" |
| **Polish** | 8-10 | UX, testing, hardening | "Would I be embarrassed to show this?" |
| **Launch** | 11-12 | Deploy, soft launch | "Is one real person using this?" |
| **Iterate** | 13+ | User feedback driven | "What did users actually need?" |

---

## Milestone Reviews

### At Session 3 (End of Foundation)

Ask user:
> "Foundation complete. We have [summary].
>
> Before moving to MVP features:
> 1. Is the base solid?
> 2. Any concerns about architecture?
> 3. Ready to build core features?"

### At Session 7 (End of MVP)

Ask user:
> "MVP features complete. The app can [core function].
>
> Decision point:
> - **Option A:** Polish and launch with current features
> - **Option B:** Add [2-3 more features] then launch
> - **Option C:** Keep building (not recommended)
>
> Most successful products launch earlier than feels comfortable."

### At Session 10 (End of Polish)

Ask user:
> "App is polished and tested.
>
> Launch checklist:
> - [ ] Core features work
> - [ ] Obvious bugs fixed
> - [ ] Basic error handling
> - [ ] Mobile works (if applicable)
>
> **It's time to get real users.** What's the launch plan?"

---

## Milestone Tracking

Add to PROGRESS.md:

```markdown
## Milestones

| Phase | Target | Actual | Status |
|-------|--------|--------|--------|
| Foundation | Session 3 | Session 3 | ✅ Complete |
| MVP | Session 7 | Session 8 | ✅ Complete |
| Polish | Session 10 | - | 🔄 In Progress |
| Launch | Session 12 | - | ⏳ Upcoming |
```

Update at end of each session.

---

## Scope Creep Detection

At each session start, check:

1. **Are we still in the same milestone?**
   - If milestone changed without completing previous → flag it

2. **How many sessions since last milestone?**
   - If 5+ sessions in same milestone → something's wrong

3. **Is backlog growing faster than completing?**
   - If yes → stop adding, start finishing

---

## When Milestones Slip

If a milestone takes longer than expected:

1. **Acknowledge it** — "We're at Session 9, MVP was planned for Session 7"
2. **Diagnose** — Scope creep? Unexpected complexity? Rework?
3. **Adjust** — Reduce scope or extend timeline
4. **Document** — Note in PROGRESS.md what happened

Don't silently let milestones slip. Make it visible.

---

## Anti-Pattern: The Endless Build

Warning signs:
- Session 15+ without real users
- "Just one more feature before launch"
- Backlog grows every session
- No milestone ever completed

Solution:
- Stop adding features
- Launch what you have
- Get real feedback
- THEN decide what's next

---

## Custom Milestones

For non-standard projects, define milestones in Baton setup:

```markdown
## Project Milestones

| Phase | Sessions | Definition of Done |
|-------|----------|-------------------|
| [Phase 1] | 1-X | [What must be true?] |
| [Phase 2] | X-Y | [What must be true?] |
| [Launch] | Y-Z | [What must be true?] |
```

Every project needs at least:
1. A "working" milestone (MVP)
2. A "launch" milestone (real users)

---

*Last updated: Baton Protocol v3.1*
