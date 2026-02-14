---
name: seo
description: >-
  SEO patterns — metadata, Open Graph, sitemaps, structured data, and
  Core Web Vitals. Load at Session 5+ when preparing for launch.
  Use when optimizing pages for search engines or social sharing.
---

# SEO Skill

> SEO is not magic. It's metadata + performance + content. Do the basics right.

---

## Load This Skill When

- Project is approaching launch (Session 5+)
- User mentions SEO, search rankings, or discoverability
- Building a marketing site, blog, or e-commerce store

---

## The Basics (Session 5-6)

### Every Page Needs

```typescript
// Next.js metadata
export const metadata: Metadata = {
  title: 'Page Title — App Name',        // Under 60 characters
  description: 'What this page offers.',  // Under 160 characters
};
```

### Title Rules

```
Homepage:    "App Name — One Line Value Prop"
Inner pages: "Page Topic — App Name"
Blog posts:  "Post Title — App Name"
```

- Keep under 60 characters
- Put the important words first
- Don't stuff keywords

### Description Rules

- Write for humans, not search engines
- Include a call to action ("Learn how to...")
- Unique per page (never duplicate)
- 120-160 characters

---

## Open Graph (Social Sharing)

### Every Page Needs

```typescript
export const metadata: Metadata = {
  openGraph: {
    title: 'Page Title',
    description: 'What this page offers.',
    url: 'https://yourdomain.com/page',
    siteName: 'App Name',
    images: [{
      url: 'https://yourdomain.com/og-image.png',
      width: 1200,
      height: 630,
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title',
    description: 'What this page offers.',
    images: ['https://yourdomain.com/og-image.png'],
  },
};
```

### OG Image Rules

- Size: 1200x630px
- Include app name/logo
- Readable text (not too small)
- Create a default OG image for the site
- Create unique OG images for key pages (homepage, pricing, blog posts)

---

## Sitemap (Session 5)

### Next.js Auto-Generation

```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    { url: 'https://yourdomain.com', lastModified: new Date() },
    { url: 'https://yourdomain.com/pricing', lastModified: new Date() },
    { url: 'https://yourdomain.com/about', lastModified: new Date() },
  ];

  // Add dynamic pages
  const posts = await getBlogPosts();
  const postPages = posts.map(post => ({
    url: `https://yourdomain.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  return [...pages, ...postPages];
}
```

### robots.txt

```typescript
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}
```

---

## Structured Data (Session 6+)

### When to Add

- Product pages (e-commerce)
- Blog posts/articles
- FAQ pages
- Organization info

### JSON-LD Pattern

```typescript
// Component for structured data
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Usage in a blog post
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  datePublished: post.publishedAt,
  author: { '@type': 'Person', name: 'Author Name' },
}} />
```

### Don't Over-Do It

Only add structured data for:
- Content types Google explicitly supports
- Pages you want enhanced search results for
- Don't add it to every page "just in case"

---

## Performance as SEO

### Core Web Vitals

Google uses these as ranking signals:

| Metric | Target | What It Measures |
|--------|--------|-----------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | How fast the main content loads |
| **INP** (Interaction to Next Paint) | < 200ms | How fast the page responds to clicks |
| **CLS** (Cumulative Layout Shift) | < 0.1 | How much the page shifts during load |

### Quick Wins

1. **Use Next.js Image** — auto-optimization, lazy loading, sizing
2. **Minimize client-side JavaScript** — use Server Components
3. **Don't load fonts from Google Fonts CDN** — use `next/font`
4. **Preload critical assets** — hero images, above-fold content
5. **Avoid layout shifts** — set width/height on images, use skeleton loaders

---

## SEO Checklist (Pre-Launch)

- [ ] Every page has unique title and description
- [ ] OG images set for key pages
- [ ] Sitemap generated and accessible
- [ ] robots.txt allows indexing
- [ ] Core Web Vitals passing (check with PageSpeed Insights)
- [ ] No broken links (404s)
- [ ] HTTPS enforced
- [ ] Mobile-friendly (test at 375px)
- [ ] Structured data on key pages (if applicable)

---

## What NOT to Do

- Don't keyword stuff (Google penalizes this)
- Don't hide text (white text on white background)
- Don't create pages just for SEO (thin content)
- Don't buy backlinks
- Don't obsess over rankings — focus on content quality
- Don't add SEO before the product works

---

*Last updated: Baton Protocol v3.1*
