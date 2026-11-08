# Publishing Articles on Veldarion Insights

Veldarion's Insights section (`/insights`) is a Markdown-based editorial system. Articles live as `.md` files in `content/insights/` and are automatically picked up by the listing page, sitemap, and article detail routes — no rebuild or deploy is required to add content beyond the normal build/deploy cycle.

## Article file format

Each article is a Markdown file with YAML frontmatter followed by Markdown body content:

```md
---
title: How Medical Claim Denials Affect Healthcare Revenue Cycle Management
slug: medical-claim-denials-revenue-cycle-management
description: Denied claims quietly erode clinic margins. This article explains how denial rates flow through the revenue cycle, where revenue leaks, and what specialty practices can do to protect reimbursement.
category: Denial Management
author: Veldarion Editorial
publishedDate: 2026-01-15
updatedDate: 2026-01-15
tags: ["denial management", "RCM", "revenue cycle", "medical billing", "denied claims"]
draft: false
readingTime: 6
---

# Article headline

Body content in Markdown. Headings, lists, tables, blockquotes, and inline links are all supported via `react-markdown`.
```

## Required frontmatter fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | Article headline, used for `<h1>`, `<title>`, and structured data |
| `slug` | string | Yes | URL segment at `/insights/<slug>`. Must be unique across all articles |
| `description` | string | Yes | Meta description, Open Graph description, and listing excerpt |
| `category` | string | Yes | One of: Denial Management, RCM, Insurance Policy Updates, Healthcare Technology, Medical Billing, Appeals |
| `author` | string | Yes | Byline shown on article page and in structured data |
| `publishedDate` | string (ISO date) | Yes | Publication date |
| `updatedDate` | string (ISO date) | Optional | Last update date; falls back to `publishedDate` if absent |
| `tags` | string[] | Optional | Array of tags used for related-article scoring |
| `draft` | boolean | Optional | Defaults to `false`. Set `true` to hide from public listing and sitemap |
| `readingTime` | number | Optional | Estimated minutes. Auto-computed from word count (~200 wpm) if omitted |

## How to publish a new article

1. **Create the file** at `content/insights/<slug>.md` with frontmatter + body.
2. **Set `draft: false`** (or omit it) to make it public.
3. **Verify no duplicate slug** — `getAllArticles()` throws on duplicate slugs and will fail the build.
4. **Add sources** for any factual industry or regulatory claims (link to CMS, AMA, payer policy, etc.).
5. **Run the build** (`npm run build`) to prerender the article route and update `sitemap.xml`.
6. **Deploy** — push to `main`; GitHub Actions rebuilds and republishes the static site.

## Draft articles

Set `draft: true` in the frontmatter to keep an article private. Drafts are:

- Excluded from `/insights` listing
- Excluded from `sitemap.xml`
- Not prerendered via `generateStaticParams`
- Not indexed (they have no public URL)

## Category chips

Categories are derived automatically from published articles. The `/insights` listing shows a chip for each category with a count, and clicking a chip filters by `?category=<name>`.

## Related articles

The article detail page shows up to 3 related articles, scored by shared category (2 points) and shared tags (1 point each).

## SEO

Each article page gets:
- Unique `<title>` and meta description
- Open Graph + Twitter card metadata
- Canonical URL: `https://veldarion.com/insights/<slug>`
- Article JSON-LD structured data
- BreadcrumbList navigation (Home > Insights > Category > Article)
- Included in `sitemap.xml`

## Truthfulness & healthcare context

- Do not invent statistics, payer policies, reimbursement outcomes, or customer results.
- Link to authoritative sources (CMS, AMA, official payer policies) for factual claims.
- Clearly distinguish published facts from commentary.
- Include the standard educational disclaimer at the end of each article.
- Do not claim HIPAA compliance, a BAA, or specific security certifications.