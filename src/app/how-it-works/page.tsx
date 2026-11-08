import { Metadata } from "next";
import { Navbar } from "@/components/veldarion/nav-footer";
import { Footer } from "@/components/veldarion/nav-footer";
import { Rule, CTAButton, Eyebrow, StaggerGroup, StaggerItem } from "@/components/veldarion/homepage-elements";
import { BlogLayout } from "@/components/veldarion/blog-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works — AI-Assisted Denial Review and Appeal Preparation",
  description:
    "How Veldarion works: upload denied claims, our agents analyze denial reasons and cross-reference payer policies, draft appeal letters, and file them after human review. For specialty clinics and revenue cycle teams.",
  openGraph: {
    title: "How It Works — Veldarion",
    description:
      "The Veldarion claims analysis and appeal-preparation workflow, stage by stage.",
    type: "website",
  },
};

const STAGES = [
  {
    num: "01",
    title: "Upload denied claims and records",
    whatYouSupply: "Denied EOBs, remittance advices, clinical notes, and related records.",
    whatWeDo: "Agents ingest faxes, PDFs, and EHR exports — no template engineering required.",
    humanAction: "You gather and send the denied-claim documentation.",
  },
  {
    num: "02",
    title: "Extract and organize information",
    whatYouSupply: "The same claim and clinical documents.",
    whatWeDo: "AI extracts ICD-10 codes, CPT procedures, patient details, and the payer's stated denial reason.",
    humanAction: "None required at this stage.",
  },
  {
    num: "03",
    title: "Analyze denial reasons and coverage",
    whatYouSupply: "The denial and the chart.",
    whatWeDo: "Denial reasons are mapped to ICD-10/CPT codes and the payer's published medical-necessity criteria.",
    humanAction: "None required at this stage.",
  },
  {
    num: "04",
    title: "Identify documentation gaps",
    whatYouSupply: "The clinical record.",
    whatWeDo: "The system flags missing documentation, contradictions, or unsupported coding that could weaken the appeal.",
    humanAction: "You may be asked to supply missing records.",
  },
  {
    num: "05",
    title: "Prepare the appeal draft",
    whatYouSupply: "The denied claim and supporting records.",
    whatWeDo: "A cited appeal letter is drafted, referencing chart evidence and the relevant payer policy clause.",
    humanAction: "A human reviewer checks the draft before anything is filed.",
  },
  {
    num: "06",
    title: "Human review and filing",
    whatYouSupply: "Approval to submit.",
    whatWeDo: "The finalized appeal is filed on your behalf through the payer's channel.",
    humanAction: "You review and authorize the filing; you retain final decision authority.",
  },
];

export default function HowItWorksPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main>
        <BlogLayout
          title="How Veldarion works"
          intro="The claims analysis and appeal-preparation workflow, stage by stage. Stages marked as planned reflect capabilities under development."
          breadcrumbs={breadcrumbs}
        >

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {STAGES.map((stage) => (
                <div
                  key={stage.num}
                  className="group relative rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-8 hover:bg-[#E8E0CF] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="font-mono text-[11px] font-bold tracking-widest text-[#A8D11C]">
                      {stage.num}
                    </span>
                  </div>
                  <h3 className="mb-2 font-serif text-2xl font-bold tracking-tight text-[#14110C]">
                    {stage.title}
                  </h3>
                  <div className="mb-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9C3D3D] mb-1">
                      You supply
                    </p>
                    <p className="text-[13px] text-[#2A2620]">{stage.whatYouSupply}</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#A8D11C] mb-1">
                      Veldarion generates
                    </p>
                    <p className="text-[13px] text-[#2A2620]">{stage.whatWeDo}</p>
                  </div>
                  <div className="pt-4 border-t border-[#14110C]/10">
                    <p className="font-mono text-[10px] text-[#8A8170] leading-relaxed">
                      {stage.humanAction}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Rule className="mt-16" />

            {/* What still requires human judgment */}
            <div className="mt-16 rounded-sm border-2 border-[#14110C] bg-[#14110C] p-10 sm:p-14 text-[#F4EFE4]">
              <Eyebrow tone="chartreuse">Human judgment remains essential</Eyebrow>
              <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#F4EFE4]">
                What the application does — and what it does not
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#C5F23D] mb-3">
                    Veldarion prepares
                  </h3>
                  <ul className="space-y-3 text-[#DDD3BD]/90 leading-relaxed text-[14px]">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#C5F23D]">✓</span>
                      Appeal drafts citing chart evidence and payer policy.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#C5F23D]">✓</span>
                      Supporting-evidence reports identifying gaps and contradictions.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#C5F23D]">✓</span>
                      Filing on the clinic's behalf, where supported.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#9C3D3D] mb-3">
                    You still decide
                  </h3>
                  <ul className="space-y-3 text-[#DDD3BD]/90 leading-relaxed text-[14px]">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#9C3D3D]">✓</span>
                      Whether to appeal a given denial.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#9C3D3D]">✓</span>
                      The clinical and coding accuracy of the appeal.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#9C3D3D]">✓</span>
                      Final authorization to submit each appeal.
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-[13px] text-[#DDD3BD]/60 max-w-lg">
                AI-generated drafts require verification. Veldarion does not
                guarantee appeal outcomes or reimbursement.
              </p>
            </div>
        </BlogLayout>
      </main>
      <Footer />
    </div>
  );
}
