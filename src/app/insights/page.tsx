import { Metadata } from "next";
import { getPublishedArticles, getCategories } from "@/lib/content";
import { Navbar } from "@/components/veldarion/nav-footer";
import { Footer } from "@/components/veldarion/nav-footer";
import { PageHeading, Rule, CTAButton, Eyebrow, StaggerGroup, StaggerItem } from "@/components/veldarion/homepage-elements";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights — Denial Management, RCM & Healthcare Claims",
  description:
    "Veldarion's editorial section on medical claim denials, revenue cycle management, insurance policy updates, and appeal preparation. Original articles for healthcare practices and revenue cycle teams.",
  openGraph: {
    title: "Insights — Veldarion",
    description:
      "Original articles on denial management, RCM, insurance policy, and medical claim appeals.",
    type: "website",
  },
};

interface CategoryChipProps {
  category: string;
  count: number;
  selected?: boolean;
}

function CategoryChip({ category, count, selected }: CategoryChipProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors ${
        selected
          ? "border-[#14110C] bg-[#14110C] text-[#F4EFE4]"
          : "border-[#14110C]/20 text-[#5C5447] hover:border-[#14110C] hover:text-[#14110C]"
      }`}
    >
      {category} <span className="opacity-60">({count})</span>
    </button>
  );
}

export default async function InsightsPage() {
  const articles = await getPublishedArticles();
  const categories = await getCategories();

  const categoryCounts: Record<string, number> = {};
  for (const a of articles) {
    categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
  }

  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main>
        <section className="px-6 pt-16 sm:pt-24 pb-16 sm:pb-24">
          <div className="mx-auto max-w-7xl">
            <PageHeading
              eyebrow="§ 03 — Insights"
              title="Industry intelligence for denied claims and revenue cycle teams"
              intro="Original articles on medical claim denials, revenue cycle management, payer policy, and appeal preparation. Written for specialty clinics and healthcare revenue cycle teams."
            />

            {/* Category filter */}
            <div className="mt-12 flex flex-wrap gap-2">
              <CategoryChip category="All" count={articles.length} selected />
              {categories.map((cat) => (
                <CategoryChip
                  key={cat}
                  category={cat}
                  count={categoryCounts[cat] || 0}
                />
              ))}
            </div>

            {/* Article listing */}
            <div className="mt-12">
              {articles.length === 0 ? (
                <div className="rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-12 text-center">
                  <Eyebrow tone="oxblood">No articles</Eyebrow>
                  <h2 className="mt-4 font-serif text-2xl font-bold text-[#14110C]">
                    Nothing published yet
                  </h2>
                  <p className="mt-2 text-[#2A2620]">
                    Check back soon for denial-management and RCM insights.
                  </p>
                </div>
              ) : (
                <StaggerGroup className="mt-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article) => (
                    <StaggerItem key={article.slug}>
                      <article
                        className="group relative rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-8 hover:bg-[#E8E0CF] transition-colors min-w-0"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                          <span
                            className="font-mono text-[10px] uppercase tracking-wider text-[#B8800E]"
                          >
                            {article.category}
                          </span>
                          <time
                            className="font-mono text-[10px] text-[#8A8170]"
                            dateTime={article.publishedDate}
                          >
                            {new Date(article.publishedDate).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric", year: "numeric" }
                            )}
                          </time>
                        </div>
                        <h3
                          className="mb-2 font-serif text-[22px] font-bold leading-[1.15] tracking-tight text-[#14110C] group-hover:text-[#B8800E] transition-colors"
                        >
                          {article.title}
                        </h3>
                        <p className="mb-4 text-[14px] leading-relaxed text-[#2A2620] line-clamp-3">
                          {article.description}
                        </p>
                        <div className="mt-6 pt-4 border-t border-[#14110C]/10 flex items-center justify-between">
                          <Link
                            href={`/insights/${article.slug}`}
                            className="font-mono text-[11px] uppercase tracking-wider text-[#14110C] hover:text-[#B8800E] flex items-center gap-1.5"
                          >
                            Read article
                            <ArrowRightSmall />
                          </Link>
                          <span className="font-mono text-[10px] text-[#8A8170]">
                            {article.readingTime} min read
                          </span>
                        </div>
                      </article>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              )}
            </div>

            <Rule className="mt-16" />

            {/* CTA */}
            <div className="mt-12 rounded-sm border-2 border-[#C5F23D] bg-[#C5F23D] p-10 text-center text-[#14110C]">
              <Eyebrow tone="ink">Explore the product</Eyebrow>
              <h3 className="mt-3 font-serif text-2xl font-bold text-[#14110C]">
                Want help with denied claims?
              </h3>
              <p className="mt-3 text-[#14110C]/80 max-w-md mx-auto">
                Veldarion reviews denied medical claims and prepares appeal
                documentation for specialty clinics. You pay only when revenue is
                recovered.
              </p>
              <CTAButton
                href="/contact"
                className="mt-6 px-7 py-3.5 text-[14px]"
              >
                Contact Us
                <ArrowRightSmall />
              </CTAButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ArrowRightSmall() {
  return (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
