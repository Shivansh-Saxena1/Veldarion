import { Metadata } from "next";
import { Navbar } from "@/components/veldarion/nav-footer";
import { Footer } from "@/components/veldarion/nav-footer";
import { Rule, CTAButton, Eyebrow } from "@/components/veldarion/homepage-elements";
import { BlogLayout } from "@/components/veldarion/blog-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Veldarion",
  description:
    "Answers to common questions about Veldarion's claims analysis and appeal-preparation service, workflow, pricing, and data handling.",
  openGraph: {
    title: "FAQ — Veldarion",
    description: "Common questions about Veldarion's denied-claims appeal service.",
    type: "website",
  },
};

const FAQS = [
  {
    q: "What does Veldarion do?",
    a: "Veldarion reviews denied medical claims and prepares appeal documentation for specialty clinics and healthcare revenue cycle teams. You send us denied EOBs and clinical records; our agents analyze the denial, cross-reference payer policies, draft a cited appeal letter, and file it on your behalf. You pay only when revenue is recovered.",
  },
  {
    q: "How does the appeal-preparation workflow work?",
    a: "The workflow has six stages: (1) you upload denied claims and records, (2) information is extracted and organized, (3) denial reasons are analyzed against payer policy, (4) documentation gaps are identified, (5) an appeal draft is prepared, and (6) a human reviews and files the appeal. See /how-it-works for the full breakdown.",
  },
  {
    q: "What information and documents are required?",
    a: "Denied EOBs, remittance advices, clinical notes, and any related records for the denied claim. The more complete the chart, the stronger the appeal can be. We may ask you to supply missing documentation if gaps are identified.",
  },
  {
    q: "What does the application generate?",
    a: "Veldarion generates appeal drafts citing chart evidence and payer-policy clauses, plus supporting-evidence reports that identify documentation gaps and contradictions. All drafts require human review before submission.",
  },
  {
    q: "Does Veldarion guarantee appeal success?",
    a: "No. We do not guarantee appeal outcomes, reimbursement, recovery rates, or processing-time reductions. Payers make the final decision on every appeal.",
  },
  {
    q: "What is the role of human review?",
    a: "A human reviews every AI-generated appeal draft before it is filed. AI prepares the documentation; people confirm clinical and coding accuracy and authorize submission.",
  },
  {
    q: "Who is Veldarion for?",
    a: "Specialty medical practices and healthcare revenue cycle teams that manage denied insurance claims — particularly where high-dollar procedures are frequently denied or require complex documentation.",
  },
  {
    q: "Which specialties does Veldarion serve?",
    a: "Veldarion is designed for specialty practices including orthopedics, oncology, pain management, and cardiology. The analysis is tailored to each denial reason and the relevant payer policy, not to a fixed specialty list.",
  },
  {
    q: "How is data handled?",
    a: "Veldarion processes claim and clinical documentation to prepare appeals. Specific data-collection, storage, and sharing practices are described in the Privacy Policy. We do not assert HIPAA certification or a signed BAA; these should be confirmed before sending protected health information.",
  },
  {
    q: "How much does it cost?",
    a: "Compensation is a 10% contingency on recovered revenue. There is $0 upfront and no SaaS subscription fee. If we do not recover revenue, you do not pay.",
  },
  {
    q: "How do I get started?",
    a: "Contact us at shivansh@veldarion.com or use the contact page to begin. There is no software to install and no staff to train.",
  },
];

export default function FAQPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main>
        <BlogLayout
          title="Frequently asked questions"
          intro="Straight answers about Veldarion's denied-claims appeal service, workflow, pricing, and data handling."
          breadcrumbs={breadcrumbs}
        >

            <div className="mt-14 space-y-6">
              {FAQS.map(({ q, a }) => (
                <div
                  key={q}
                  className="group rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-6 hover:bg-[#E8E0CF] transition-colors"
                >
                  <h3 className="mb-3 font-serif text-xl font-bold tracking-tight text-[#14110C]">
                    {q}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#2A2620]">{a}</p>
                </div>
              ))}
            </div>

            <Rule className="mt-16" />

            <div className="mt-12 rounded-sm border-2 border-[#C5F23D] bg-[#C5F23D] p-10 text-center text-[#14110C]">
              <Eyebrow tone="ink">Still have questions?</Eyebrow>
              <h3 className="mt-3 font-serif text-2xl font-bold text-[#14110C]">
                Get in touch
              </h3>
              <p className="mt-3 text-[#14110C]/80 max-w-md mx-auto">
                We do not publish a phone number or sales calendar. Email is the
                best way to reach us.
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
