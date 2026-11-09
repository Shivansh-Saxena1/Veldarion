import { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/content";

const BASE_URL = "https://veldarion.com";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  "",
  "/about",
  "/contact",
  "/disclaimer",
  "/faq",
  "/how-it-works",
  "/insights",
  "/privacy",
  "/solutions",
  "/specialties",
  "/terms",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles().catch(() => []);

  const staticUrls = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const articleUrls = articles.map((article) => ({
    url: `${BASE_URL}/insights/${article.slug}`,
    lastModified: new Date(
      article.updatedDate ?? article.publishedDate
    ),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...articleUrls];
}
