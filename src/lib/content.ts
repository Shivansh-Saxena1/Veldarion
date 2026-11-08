"use server";

import * as fs from "fs/promises";
import * as path from "path";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

/* ------------------------------------------------------------------ */
/*  Minimal YAML frontmatter parser                                   */
/* ------------------------------------------------------------------ */

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = raw.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: raw };
  }

  const fmText = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  for (const line of fmText.split(/\r?\n/)) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();

    if (key === "tags") {
      // Parse inline YAML array: ["a", "b"] or [a, b]
      const arrMatch = value.match(/^\[([\s\S]*)\]$/);
      if (arrMatch) {
        data[key] = arrMatch[1]
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean);
      } else {
        data[key] = [];
      }
    } else if (key === "draft") {
      data[key] = value === "true";
    } else if (key === "readingTime") {
      data[key] = Number(value) || undefined;
    } else {
      // Strip surrounding quotes if present.
      data[key] = value.replace(/^["']([\s\S]*)["']$/, "$1");
    }
  }

  return { data, content };
}

/* ------------------------------------------------------------------ */
/*  Article schema                                                    */
/* ------------------------------------------------------------------ */

const ArticleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  author: z.string().min(1),
  publishedDate: z.string().min(1),
  updatedDate: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  readingTime: z.number().optional(),
});

export type ArticleMeta = z.infer<typeof ArticleSchema> & {
  content: string;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function readingTimeFromContent(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

/* ------------------------------------------------------------------ */
/*  Public API                                                        */
/* ------------------------------------------------------------------ */

export async function getAllArticles(): Promise<ArticleMeta[]> {
  const files = await fs.readdir(CONTENT_DIR);
  const mdFiles = files.filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const articles: ArticleMeta[] = [];
  const seenSlugs = new Set<string>();

  for (const file of mdFiles) {
    const fullPath = path.join(CONTENT_DIR, file);
    const raw = await fs.readFile(fullPath, "utf8");
    const { data, content } = parseFrontmatter(raw);

    const slug = (data.slug as string | undefined) ?? slugFromFilename(file);

    // Validate and guard against duplicate slugs.
    if (seenSlugs.has(slug)) {
      throw new Error(`Duplicate article slug detected: "${slug}" (file: ${file})`);
    }
    seenSlugs.add(slug);

    const meta = ArticleSchema.parse({
      ...data,
      slug,
      draft: data.draft ?? false,
      tags: data.tags ?? [],
    });

    articles.push({
      ...meta,
      content,
      readingTime: meta.readingTime ?? readingTimeFromContent(content),
    });
  }

  // Sort by published date, newest first.
  articles.sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return articles;
}

export async function getPublishedArticles(): Promise<ArticleMeta[]> {
  const all = await getAllArticles();
  return all.filter((a) => !a.draft);
}

export async function getArticleBySlug(slug: string): Promise<ArticleMeta | null> {
  const fullPath = path.join(CONTENT_DIR, `${slug}.md`);
  let raw: string;
  try {
    raw = await fs.readFile(fullPath, "utf8");
  } catch {
    return null;
  }

  const { data, content } = parseFrontmatter(raw);
  const meta = ArticleSchema.parse({
    ...data,
    slug,
    draft: data.draft ?? false,
    tags: data.tags ?? [],
  });

  return {
    ...meta,
    content,
    readingTime: meta.readingTime ?? readingTimeFromContent(content),
  };
}

export async function getArticlesByCategory(
  category: string
): Promise<ArticleMeta[]> {
  const all = await getPublishedArticles();
  return all.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

export async function getCategories(): Promise<string[]> {
  const all = await getPublishedArticles();
  const cats = new Set(all.map((a) => a.category));
  return Array.from(cats).sort();
}

export async function getRelatedArticles(
  slug: string,
  limit = 3
): Promise<ArticleMeta[]> {
  const all = await getPublishedArticles();
  const current = all.find((a) => a.slug === slug);
  if (!current) return all.slice(0, limit);

  const scored = all
    .filter((a) => a.slug !== slug)
    .map((a) => {
      let score = 0;
      if (a.category === current.category) score += 2;
      const sharedTags = a.tags.filter((t) => current.tags.includes(t)).length;
      score += sharedTags;
      return { article: a, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((x) => x.article).slice(0, limit);
}
