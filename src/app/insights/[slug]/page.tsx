import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getArticleBySlug,
  getRelatedArticles,
  getPublishedArticles,
} from "@/lib/content";
import { Navbar } from "@/components/veldarion/nav-footer";
import { Footer } from "@/components/veldarion/nav-footer";
import { BlogLayout } from "@/components/veldarion/blog-layout";
import ReactMarkdown from "react-markdown";
import { Eyebrow, Rule, CTAButton } from "@/components/veldarion/homepage-elements";
import Link from "next/link";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return {
      title: "Article not found — Veldarion",
      description: "The requested article is not available.",
      noindex: true,
    };
  }

  return {
    title: `${article.title} — Veldarion Insights`,
    description: article.description,
    authors: [{ name: article.author }],
    openGraph: {
      title: `${article.title} — Veldarion`,
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
      authors: [article.author],
      url: `https://veldarion.com/insights/${article.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} — Veldarion`,
      description: article.description,
    },
    other: {
      "article:published_time": article.publishedDate,
      "article:modified_time": article.updatedDate ?? article.publishedDate,
      "article:author": article.author,
      "article:section": article.category,
    },
    alternates: {
      canonical: `https://veldarion.com/insights/${article.slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const breadcrumbs = [
    { label: "Insights", href: "/insights" },
    { label: article.category, href: `/insights?category=${encodeURIComponent(article.category)}` },
    { label: article.title, href: `/insights/${article.slug}` },
  ];

  const related = await getRelatedArticles(article.slug, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate ?? article.publishedDate,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Veldarion",
      url: "https://veldarion.com",
    },
    url: `https://veldarion.com/insights/${article.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://veldarion.com/insights/${article.slug}`,
    },
  };

  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main>
        {/* Article structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <BlogLayout
          title={article.title}
          description={article.description}
          breadcrumbs={breadcrumbs}
        >
          {/* Article meta bar */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#14110C]/15 pb-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow tone="chartreuse">{article.category}</Eyebrow>
              <p className="mt-1 font-mono text-[10px] text-[#5C5447]">
                By {article.author}&nbsp;·&nbsp;
                <time dateTime={article.publishedDate}>
                  {new Date(article.publishedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                {article.updatedDate && (
                  <>
                    &nbsp;·&nbsp;Updated{" "}
                    <time dateTime={article.updatedDate}>
                      {new Date(article.updatedDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </>
                )}
                &nbsp;·&nbsp;{article.readingTime} min read
              </p>
            </div>
          </div>

          {/* Article body */}
          <div className="article-body">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          <Rule className="mt-14 mb-10" />

          {/* Related articles */}
          {related.length > 0 && (
            <section className="mb-14">
              <h2 className="mb-6 font-serif text-2xl font-bold tracking-tight text-[#14110C]">
                Related reading
              </h2>
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {related.map((rel) => (
                  <article key={rel.slug} className="flex flex-col gap-2 min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#B8800E]">
                      {rel.category}
                    </span>
                    <Link
                      href={`/insights/${rel.slug}`}
                      className="font-serif text-[17px] font-bold leading-[1.2] tracking-tight text-[#14110C] hover:text-[#B8800E] transition-colors"
                    >
                      {rel.title}
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="rounded-sm border-2 border-[#C5F23D] bg-[#C5F23D] p-10 text-center text-[#14110C]">
            <Eyebrow tone="ink">Take action</Eyebrow>
            <h3 className="mt-3 font-serif text-2xl font-bold text-[#14110C]">
              Denied claim? We can help.
            </h3>
            <p className="mt-3 text-[#14110C]/80 max-w-md mx-auto">
              Veldarion reviews denied medical claims and prepares appeal
              documentation for specialty clinics. You pay only when revenue is
              recovered.
            </p>
            <CTAButton href="/contact" className="mt-6 px-7 py-3.5 text-[14px]">
              Contact Us
              <ArrowRight />
            </CTAButton>
          </div>
        </BlogLayout>
      </main>
      <Footer />
    </div>
  );
}

function ArrowRight() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
