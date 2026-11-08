import { Metadata } from "next";
import { Navbar } from "@/components/veldarion/nav-footer";
import { Footer } from "@/components/veldarion/nav-footer";
import { Rule, CTAButton, Eyebrow, StaggerGroup, StaggerItem, Highlight } from "@/components/veldarion/homepage-elements";
import { BlogLayout } from "@/components/veldarion/blog-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Veldarion — AI Agents That Overturn Denied Medical Claims",
  description:
    "About Veldarion: an AI-assisted service that reviews denied medical claims and prepares appeal documentation for specialty clinics and healthcare revenue cycle teams. Mission, approach, and commitment to human review.",
  openGraph: {
    title: "About Veldarion",
    description:
      "What Veldarion is, the problem it addresses, and its approach to AI-assisted claims analysis and appeal preparation.",
    type: "website",
  },
};

export default function AboutPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main>
        <BlogLayout
          title="About Veldarion"
          intro="Veldarion is an AI-assisted service that reviews denied medical claims and prepares appeal documentation for specialty clinics and healthcare revenue cycle teams."
          breadcrumbs={breadcrumbs}
        >

            {/* What Veldarion is */}
            <div className="mt-16 grid gap-12 lg:grid-cols-2">
              <div>
                <Eyebrow tone="chartreuse">What we are</Eyebrow>
                <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C]">
                  A brief-writing service for denied claims
                </h2>
                <p className="mt-6 text-[17px] leading-relaxed text-[#2A2620] mb-6">
                  Veldarion is not a software platform you log into. It is a
                  service: you send us denied EOBs and clinical records, our AI
                  agents read the charts, cross-reference payer policies, draft
                  cited appeal letters, and we file them on your behalf.
                </p>
                <p className="text-[17px] leading-relaxed text-[#2A2620]">
                  Compensation is a <Highlight>10% contingency</Highlight> on
                  recovered revenue. There is <Highlight>$0 upfront</Highlight>
                  and no SaaS subscription fee.
                </p>
              </div>
              <div className="rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-8">
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8170]">Service model</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8170]">Contingency pricing</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8170]">Human review</span>
                </div>
                <p className="font-mono text-[11px] text-[#5C5447] leading-relaxed">
                  VELDARION · AUTONOMOUS APPEAL PREPARATION · NO SOFTWARE TO
                  LEARN · NO STAFF TO TRAIN
                </p>
              </div>
            </div>

            <Rule className="mt-16" />

            {/* The problem */}
            <div className="mt-16">
              <Eyebrow tone="oxblood">The problem we address</Eyebrow>
              <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C]">
                Payers use AI to deny. Clinics fight back by hand.
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-[#2A2620] mb-8 max-w-2xl">
                Insurers increasingly use automation to triage and deny claims
                — often batch-rejecting high-dollar specialty procedures before
                a clinician ever reviews the chart. The denial becomes the
                default; the appeal becomes the exception.
              </p>
              <p className="text-[17px] leading-relaxed text-[#2A2620] mb-8 max-w-2xl">
                Meanwhile, nurses and billing staff spend hours reading
                50-page clinical charts just to draft one appeal letter. Most
                denials go unchallenged simply because there are more denials
                than hours in a day.
              </p>
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
                {[
                  {
                    icon: "AI",
                    title: "Payer automation",
                    body: "Insurers use AI to auto-deny claims at scale.",
                  },
                  {
                    icon: "MANUAL",
                    title: "Manual appeals",
                    body: "Staff draft appeals by hand, one chart at a time.",
                  },
                  {
                    icon: "UNCHALLENGED",
                    title: "Unchallenged denials",
                    body: "Most denied claims are never appealed.",
                  },
                ].map((item) => (
                  <div
                    key={item.icon}
                    className="rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-6"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#9C3D3D] mb-2 block">
                      {item.icon}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#14110C] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-[#2A2620]">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <Rule className="mt-16" />

            {/* Approach */}
            <div className="mt-16">
              <Eyebrow tone="amber">Our approach</Eyebrow>
              <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C]">
                Evidence-based. Transparent. Human-reviewed.
              </h2>
              <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    num: "01",
                    title: "Chart review",
                    body: "Agents ingest denied EOBs, clinical notes, and payer policies in any format.",
                  },
                  {
                    num: "02",
                    title: "Denial analysis",
                    body: "ICD-10 and CPT codes are mapped to the payer's stated denial reason and coverage criteria.",
                  },
                  {
                    num: "03",
                    title: "Appeal drafting",
                    body: "A cited, appeal-ready letter is drafted — referencing the chart and the relevant policy clause.",
                  },
                  {
                    num: "04",
                    title: "Human review",
                    body: "Every draft is reviewed by a person before it is filed. AI prepares; humans decide.",
                  },
                  {
                    num: "05",
                    title: "Filing",
                    body: "The completed appeal is filed on the clinic's behalf through the payer's channel.",
                  },
                  {
                    num: "06",
                    title: "Contingency",
                    body: "You pay only when revenue is recovered — 10% of recovered amounts, $0 upfront.",
                  },
                ].map((item) => (
                  <StaggerItem key={item.num}>
                    <div className="rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-6">
                      <span className="font-mono text-[11px] font-bold tracking-widest text-[#A8D11C]">
                        {item.num}
                      </span>
                      <h3 className="mt-4 font-serif text-xl font-bold text-[#14110C]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[14px] text-[#2A2620]">{item.body}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            <Rule className="mt-16" />

            {/* Commitment */}
            <div className="mt-16 rounded-sm border-2 border-[#14110C] bg-[#14110C] p-10 sm:p-14 text-[#F4EFE4]">
              <Eyebrow tone="chartreuse">Our commitment</Eyebrow>
              <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#F4EFE4]">
                What we will and will not claim
              </h2>
              <ul className="mt-6 space-y-4 text-[#DDD3BD]/90 leading-relaxed max-w-xl">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#C5F23D]">✓</span>
                  We prepare appeal documentation and file on your behalf.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#C5F23D]">✓</span>
                  A human reviews every appeal draft before submission.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#C5F23D]">✓</span>
                  You pay only when revenue is recovered.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#9C3D3D]">✗</span>
                  We do not guarantee appeal outcomes or reimbursement.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#9C3D3D]">✗</span>
                  We do not claim HIPAA certification or a signed BAA.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#9C3D3D]">✗</span>
                  We are not an insurer, law firm, or healthcare provider.
                </li>
              </ul>
              <p className="mt-6 text-[13px] text-[#DDD3BD]/60 max-w-lg">
                Veldarion prepares appeal documentation. Clinical, coding, and
                payer judgments remain the responsibility of the treating
                provider and billing team.
              </p>
            </div>
        </BlogLayout>
      </main>
      <Footer />
    </div>
  );
}
