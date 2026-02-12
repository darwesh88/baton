# Launch Prep Skill

> Building is easy. Launching is hard.
> Start thinking about launch from Session 8, not Session 20.

---

## When to Load This Skill

- Session 8+ (after MVP features work)
- When user mentions "launch" or "users"
- When backlog keeps growing without shipping

---

## The Launch Mindset

Most projects fail not because they're bad, but because they never launch.

**The formula:**
```
Launched + Imperfect > Perfect + Never Shipped
```

---

## Pre-Launch Questions (Session 8-10)

Ask the user:

### 1. Who is the first user?

> "Who will use this first?
> - Yourself only?
> - Friends/family?
> - A specific person you know?
> - Strangers on the internet?"

**Why it matters:** First user determines launch complexity.

### 2. How will they find it?

> "How will first users discover this?
> - You'll send them a link directly
> - Post on social media
> - Product Hunt / Hacker News
> - SEO / organic search
> - Other?"

**Why it matters:** Distribution determines what needs to be ready.

### 3. What's the minimum to launch?

> "If you had to launch tomorrow, what's truly missing?
> List only BLOCKERS, not nice-to-haves."

**Why it matters:** Separates real blockers from perfectionism.

---

## Launch Options

### Option A: Silent Launch

Just deploy. Share link with a few people. No announcement.

**Good for:**
- Testing with real users
- Low pressure
- Finding bugs before public launch

**Requires:**
- [ ] Core feature works
- [ ] No obvious crashes
- [ ] Basic error handling
- Nothing else

### Option B: Soft Launch

Deploy + announce to a small audience (Twitter, friends, community).

**Good for:**
- Getting initial feedback
- Building early users
- Testing positioning

**Requires:**
- [ ] Everything from Silent Launch
- [ ] Landing page / clear value prop
- [ ] Way to collect feedback
- [ ] Basic analytics

### Option C: Public Launch

Product Hunt, Hacker News, press outreach.

**Good for:**
- Maximum initial exposure
- Building credibility
- "Launch moment" marketing

**Requires:**
- [ ] Everything from Soft Launch
- [ ] Polished UI/UX
- [ ] Ready for traffic spike
- [ ] Prepared for feedback/criticism

---

## Launch Checklist

### Must Have (Blockers)

- [ ] Core feature works reliably
- [ ] Users can sign up / log in
- [ ] No data loss bugs
- [ ] Basic error handling (doesn't crash)
- [ ] Works on mobile (if web app)
- [ ] HTTPS enabled

### Should Have (Important)

- [ ] Clear value proposition on landing page
- [ ] Way to contact you (email, chat)
- [ ] Basic analytics installed
- [ ] Error monitoring (Sentry)
- [ ] Feedback collection method

### Nice to Have (Not Launch Blockers)

- [ ] Perfect UI polish
- [ ] All edge cases handled
- [ ] Comprehensive onboarding
- [ ] Advanced features
- [ ] Performance optimization

**Don't let "nice to have" delay launch.**

---

## Launch Week Protocol

### 3 Days Before

- [ ] Final smoke test
- [ ] Check production environment
- [ ] Prepare announcement (post, tweet, email)
- [ ] Tell 2-3 friends to be ready to try it

### Launch Day

- [ ] Deploy final version
- [ ] Verify everything works
- [ ] Post announcement
- [ ] Monitor for errors (watch Sentry/logs)
- [ ] Respond to all feedback quickly

### Week After

- [ ] Collect feedback themes
- [ ] Fix critical bugs immediately
- [ ] Note feature requests (don't build yet)
- [ ] Thank early users personally

---

## Post-Launch: What's Next?

After launch, priorities change:

```
Before launch: Build features
After launch:  Fix what users report + observe usage
```

### First 2 Weeks After Launch

1. **Fix bugs** reported by real users
2. **Observe** how people actually use it
3. **Talk** to users directly
4. **Don't** add new features yet

### Then

Use real feedback to decide what to build next.
Not your backlog. Not your ideas. What users actually need.

---

## When User Keeps Delaying

If user repeatedly says "one more feature before launch":

> "I notice we've delayed launch a few times. Can I share an observation?
>
> Most successful products launch earlier than feels comfortable. The feedback from ONE real user is worth more than 10 features built in isolation.
>
> What would it take to do a silent launch this week, just to a few people?"

---

## Marketing Basics (If Needed)

### Minimum Viable Marketing

1. **One sentence:** What does it do? For whom?
2. **Screenshot:** What does it look like?
3. **Link:** Where can people try it?

That's enough to launch.

### If User Wants More

Point to resources:
- Product Hunt launch guide
- Marketing skills (if available)
- Launch strategy templates

But don't let marketing planning delay the actual launch.

---

*Last updated: Baton Protocol v3.1*
