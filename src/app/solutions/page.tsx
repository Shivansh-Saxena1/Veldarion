import { Metadata } from "next";
import { Navbar } from "@/components/veldarion/nav-footer";
import { Footer } from "@/components/veldarion/nav-footer";
import { PageHeading, Rule, CTAButton, Eyebrow } from "@/components/veldarion/homepage-elements";
import { BlogLayout } from "@/components/veldarion/blog-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions — Medical Claim Denial Analysis & Appeal Preparation",
  description:
    "Veldarion solutions: medical claim denial analysis, appeal documentation preparation, supporting-document review, and denial-management workflow assistance for specialty clinics.",
  openGraph: {
    title: "Solutions — Veldarion",
    description:
      "How Veldarion helps healthcare practices with denied claims and revenue cycle management.",
    type: "website",
  },
};

const SOLUTIONS = [
  {
    title: "Medical claim denial analysis",
    summary:
      "We analyze denied claims — EOBs, remittance advice, denial reason codes, and clinical documentation — to determine why a claim was denied and whether it can be overturned.",
    useCases: ["Denial reason review", "CARC/RARC code analysis", "Coverage criteria mapping"],
  },
  {
    title: "Appeal documentation preparation",
    summary:
      "We draft cited appeal letters and supporting-evidence reports that connect chart evidence to payer policy, ready for your review before submission.",
    useCases: ["Appeal letter drafting", "Policy clause citation", "Evidence report generation"],
  },
  {
    title: "Supporting-document review",
    summary:
      "We review clinical charts, operative reports, and prior-authorization records to identify gaps, contradictions, or missing documentation that could weaken an appeal.",
    useCases: ["Chart review", "Documentation gap identification", "Consistency checks"],
  },
  {
    title: "Denial-management workflow assistance",
    summary:
      "We help revenue cycle teams organize and prioritize denials, track appeal status, and focus effort on high-value, winnable claims.",
    useCases: ["Denial triage", "High-value prioritization", "Appeal tracking"],
  },
];

export default function SolutionsPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main>
        <BlogLayout
          title="Solutions for denied claims"
          intro="Veldarion helps specialty clinics and revenue cycle teams review denied medical claims and prepare appeal documentation. All services are contingency-based: you pay only when revenue is recovered."
          breadcrumbs={breadcrumbs}
        >

            <div className="mt-14 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {SOLUTIONS.map((s) => (
                <div
                  key={s.title}
                  className="group relative rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-8 hover:bg-[#E8E0CF] transition-colors min-w-0"
                >
                  <h3 className="mb-3 font-serif text-xl font-bold tracking-tight text-[#14110C] group-hover:text-[#B8800E] transition-colors">
                    {s.title}
                  </h3>
                  <p className="mb-4 text-[14px] leading-relaxed text-[#2A2620]">
                    {s.summary}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#14110C]/10">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5C5447] mb-2">
                      Typical use cases
                    </p>
                    <ul className="space-y-1 text-[13px] text-[#2A2620]">
                      {s.useCases.map((u) => (
                        <li key={u} className="flex items-start gap-2">
                          <span className="mt-0.5 text-[#A8D11C]">›</span>
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <Rule className="mt-16" />

            {/* How solutions relate to RCM */}
            <div className="mt-16 grid gap-12 lg:grid-cols-2">
              <div>
                <Eyebrow tone="amber">Where Veldarion fits</Eyebrow>
                <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C]">
                  Denial management within the revenue cycle
                </h2>
                <p className="mt-6 text-[17px] leading-relaxed text-[#2A2620] mb-6">
                  Denial management is a stage of revenue cycle management
                  (RCM): after a claim is denied, it must be analyzed,
                  documented, appealed, and tracked. Veldarion supports that
                  stage — from denial analysis through appeal drafting and
                  filing.
                </p>
                <ul className="space-y-4 text-[15px] leading-relaxed text-[#2A2620]">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#C5F23D]">✓</span>
                    Medical claim denial analysis
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#C5F23D]">✓</span>
                    Appeal documentation preparation
                  </li>
                  <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-[#C5F23D]">✓</span>
                    Supporting-document review
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#C5F23D]">✓</span>
                    Identification of evidence gaps
                  </li>
                </ul>
              </div>
              <div className="rounded-sm border-2 border-[#C5F23D] bg-[#C5F23D] p-10 text-[#14110C]">
                <Eyebrow tone="ink">Ready to recover revenue?</Eyebrow>
                <h3 className="mt-3 font-serif text-2xl font-bold text-[#14110C]">
                  Send us your denied claims
                </h3>
                <p className="mt-3 text-[#14110C]/80">
                  We review denied medical claims, prepare appeal
                  documentation, and file on your behalf. You pay only when
                  revenue is recovered — 10% of recovered amounts, $0 upfront.
                </p>
                <CTAButton href="/contact" className="mt-6 px-7 py-3.5 text-[14px]">
                  Contact Us
                  <ArrowRight />
                </CTAButton>
              </div>
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
