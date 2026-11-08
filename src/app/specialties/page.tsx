import { Metadata } from "next";
import { Navbar } from "@/components/veldarion/nav-footer";
import { Footer } from "@/components/veldarion/nav-footer";
import { PageHeading, Rule, CTAButton, Eyebrow } from "@/components/veldarion/homepage-elements";
import { BlogLayout } from "@/components/veldarion/blog-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Specialties — Denial Management for Specialty Practices",
  description:
    "How Veldarion serves specialty medical practices — orthopedics, oncology, and others — with denial analysis and appeal preparation tailored to specialty documentation and payer requirements.",
  openGraph: {
    title: "Specialties — Veldarion",
    description:
      "Specialty-practice denial-management use cases: orthopedics, oncology, and more.",
    type: "website",
  },
};

const SPECIALTIES = [
  {
    name: "Orthopedics",
    focus: "High-dollar procedures such as joint replacements, spinal injections, and arthroscopic surgery.",
    denialConsiderations:
      "Payers often require evidence of failed conservative therapy (physical therapy, medication, bracing) before approving surgical procedures. Documentation gaps around medical necessity are a common denial driver.",
    documentation: ["Operative reports", "Physical therapy records", "Imaging studies", "Prior authorization"],
  },
  {
    name: "Oncology",
    focus: "Infusion therapy, radiation oncology, and high-cost oncology drugs and procedures.",
    denialConsiderations:
      "Oncology claims frequently involve prior authorization and medical-necessity review. Payers may require documentation of diagnosis stage, prior treatment history, and alignment with clinical guidelines.",
    documentation: ["Pathology reports", "Treatment plans", "Prior authorization records", "Infusion logs"],
  },
  {
    name: "Pain management",
    focus: "Epidural injections, nerve blocks, and interventional pain procedures.",
    denialConsiderations:
      "Pain procedures are commonly denied for lack of medical necessity or failure to document conservative-care trials. Payers often require documented pain scores and functional limitation.",
    documentation: ["Pain assessments", "Conservative therapy history", "Procedure notes", "Imaging correlation"],
  },
  {
    name: "Cardiology",
    focus: "Diagnostic and interventional cardiology procedures, including catheterizations and stress testing.",
    denialConsiderations:
      "Cardiology denials often center on whether the procedure met the payer's appropriate-use criteria and whether supporting diagnostic evidence was included.",
    documentation: ["ECG and stress test results", "Catheterization reports", "Appropriate-use documentation", "Referral notes"],
  },
];

export default function SpecialtiesPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Specialties", href: "/specialties" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main>
        <BlogLayout
          title="Specialty practices"
          intro="How Veldarion's denial analysis and appeal preparation applies to specialty medical practices — and how documentation and payer requirements differ by specialty."
          breadcrumbs={breadcrumbs}
        >

            <p className="mt-6 text-[17px] leading-relaxed text-[#2A2620] max-w-3xl mb-12">
              Specialty practices typically handle high-dollar procedures that
              payers scrutinize closely. Denial categories, clinical
              documentation expectations, and prior-authorization requirements
              vary by specialty — and by payer. Veldarion's analysis is
              tailored to the specific denial reason and the relevant payer
              policy for each claim.
            </p>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {SPECIALTIES.map((s) => (
                <div
                  key={s.name}
                  className="group relative rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-8 hover:bg-[#E8E0CF] transition-colors min-w-0"
                >
                  <h3 className="mb-2 font-serif text-xl font-bold tracking-tight text-[#14110C] group-hover:text-[#B8800E] transition-colors">
                    {s.name}
                  </h3>
                  <p className="mb-3 text-[13px] leading-relaxed text-[#2A2620]">
                    {s.focus}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#14110C]/10">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5C5447] mb-2">
                      Common documentation
                    </p>
                    <ul className="space-y-1 text-[12px] text-[#2A2620]">
                      {s.documentation.map((d) => (
                        <li key={d} className="flex items-start gap-1.5">
                          <span className="mt-0.5 text-[#A8D11C]">›</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <Rule className="mt-16" />

            {/* Important considerations */}
            <div className="mt-16 rounded-sm border-2 border-[#14110C] bg-[#14110C] p-10 sm:p-14 text-[#F4EFE4]">
              <Eyebrow tone="chartreuse">What we do not claim</Eyebrow>
              <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#F4EFE4]">
                Specialty capabilities — honestly
              </h2>
              <ul className="mt-6 space-y-4 text-[#DDD3BD]/90 leading-relaxed max-w-xl">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#C5F23D]">✓</span>
                  Denial analysis and appeal preparation across specialties.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#C5F23D]">✓</span>
                  Specialty-specific documentation review tailored to payer policy.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#9C3D3D]">✗</span>
                  We do not publish specialty-specific accuracy or recovery rates.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#9C3D3D]">✗</span>
                  We do not guarantee reimbursement for any specialty or procedure.
                </li>
              </ul>
              <p className="mt-6 text-[13px] text-[#DDD3BD]/60 max-w-lg">
                Payer policies and documentation requirements change. Verify
                current requirements before submitting an appeal.
              </p>
            </div>
        </BlogLayout>
      </main>
      <Footer />
    </div>
  );
}
