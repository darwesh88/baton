---
name: portfolio
description: >-
  Portfolio and personal brand site patterns — case studies, project showcases,
  contact forms, and performance optimization. Load at Session 0 when building
  a portfolio, personal site, or creative showcase. Stays loaded entire lifecycle.
---

# Portfolio Domain Skill

> A portfolio is a sales page for your skills. Every design choice should answer: "Would I hire this person?"

---

## Load This Skill When

- User says they're building a portfolio, personal site, or showcase
- Project is about presenting work, not building a product
- Goal is impressions, not recurring revenue

---

## What Makes a Good Portfolio (Session 0)

### The 5-Second Test

A visitor decides in 5 seconds:
1. **Who are you?** (name + role)
2. **What do you do?** (one sentence)
3. **Can I see proof?** (projects visible immediately)

If any answer is missing above the fold, the site fails.

### Content Priority (in order)

1. Name + title + one-line bio
2. 3-6 best projects (not everything you've ever done)
3. Brief about section
4. Contact method
5. Optional: blog, resume, testimonials

---

## Site Structure (Session 1)

### Simple and Fast

```
/                   — Hero + project grid
/projects/[slug]    — Individual case study
/about              — Bio, skills, background
/contact            — Contact form or links
```

That's it. Don't add pages until you have a reason.

### Navigation

- Max 4 nav items: Work, About, Contact, [Blog/Resume]
- Logo/name links home
- Mobile: hamburger menu or bottom nav
- Current page indicator

---

## Project Showcase (Session 1-3)

### Project Card (Grid View)

Each card shows:
- Featured image/screenshot (16:9 or 4:3, consistent ratio)
- Project name
- One-line description
- Tech tags (optional, subtle)

### Case Study Page

Structure each project page the same way:

```markdown
## [Project Name]

**One-liner:** What it is and who it's for

**The Challenge:** What problem needed solving (2-3 sentences)

**The Solution:** What you built and key decisions (3-5 sentences)

**Key Features:** 3-5 bullet points with screenshots

**Results:** Numbers if possible (users, revenue, performance)

**Tech Stack:** List of technologies used
```

**Rules:**
- Lead with visuals — screenshot or demo above the fold
- Keep text short — visitors skim, they don't read
- Show 3-6 projects maximum — quality over quantity
- Order by impressiveness, not chronology

---

## Design Standards (Session 1-2)

### Typography

- Large heading for name (40-60px)
- Clean body font (16-18px, system font or Inter)
- Generous line height (1.6-1.8 for body)
- Max reading width: 680px for text blocks

### Color

- Dark background with light text (modern, dramatic) OR
- Light background with dark text (clean, professional)
- One accent color for links and CTAs
- Don't use more than 3 colors total

### Animation

- Subtle fade-in on scroll (IntersectionObserver)
- Hover effects on project cards (scale 1.02, shadow)
- Page transitions (optional, keep fast)
- **Never:** Auto-playing video, parallax that causes jank, loading screens

### Performance

Portfolio sites MUST be fast. Target:
- First paint under 1 second
- Full load under 2 seconds
- Lighthouse performance score 90+

Use Next.js Image component, lazy loading, and static generation.

---

## Contact (Session 2-3)

### Options (Pick One)

| Method | Pros | Cons |
|--------|------|------|
| **Email link** | Simplest, no backend needed | Spam exposure |
| **Contact form** | Professional, controlled | Needs backend/service |
| **Calendly embed** | Direct booking | Feels salesy |
| **Social links** | Multiple channels | No single inbox |

**Default for most:** Contact form with email notification.

### Contact Form (If Used)

Fields:
- Name (required)
- Email (required)
- Message (required)
- That's it. No phone, no company, no dropdown menus.

Use a form service (Formspree, Resend, or server action) to avoid building a backend just for contact.

---

## SEO for Portfolios (Session 3+)

### Minimum

- Page title: "[Name] — [Role]" (e.g., "Sarah Chen — Product Designer")
- Meta description: One sentence about what you do
- Open Graph image: Screenshot of your homepage or a branded card
- Sitemap generated automatically (Next.js does this)

### Project Pages

- Each project gets its own URL (`/projects/project-name`)
- Unique title and description per project
- Featured image as OG image

---

## Blog (Optional, Session 5+)

Only add a blog if the user specifically wants one. Don't suggest it.

If added:
- Markdown or MDX files (no CMS unless requested)
- Simple list page, individual post pages
- Date, title, reading time
- No categories, tags, or comments until needed

---

## Session Checkpoints

### Session 2: Foundation Check
- [ ] Homepage shows name, role, and project grid
- [ ] At least 2 project case studies exist
- [ ] Mobile responsive (test at 375px)

### Session 4: Polish Check
- [ ] All projects have case study pages
- [ ] Contact method works
- [ ] About page exists
- [ ] Lighthouse performance 90+

### Session 6: Launch Check
- [ ] Custom domain configured
- [ ] OG images set for all pages
- [ ] Tested on real phones (not just browser resize)
- [ ] Ask someone else to review for 30 seconds

---

*Last updated: Baton Protocol v3.1*
