import { Metadata } from "next";
import { Navbar } from "@/components/veldarion/nav-footer";
import { Footer } from "@/components/veldarion/nav-footer";
import { Rule, Eyebrow } from "@/components/veldarion/homepage-elements";
import { BlogLayout } from "@/components/veldarion/blog-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer — Veldarion AI Claims Appeals",
  description:
    "Veldarion disclaimer: AI-generated appeal drafts require verification; Veldarion is not a substitute for clinical, legal, or payer judgment.",
  openGraph: {
    title: "Disclaimer — Veldarion",
    description: "Important disclaimers about Veldarion's denied-claims appeal service including AI output risks and professional boundaries.",
    type: "website",
    images: [
      {
        url: "https://veldarion.com/og/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Veldarion — AI-Assisted Medical Claim Denial Analysis & Appeal Preparation",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://veldarion.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Disclaimer", href: "/disclaimer" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main>
        <BlogLayout
          title="Important disclaimer"
          intro="Please read this disclaimer before using Veldarion's denied-claims appeal-preparation service."
          breadcrumbs={breadcrumbs}
        >
          <div className="mt-12 rounded-sm border-2 border-[#7A2E2E] bg-[#7A2E2E]/5 p-8 text-[#14110C]">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              Not a substitute for professional judgment
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-6 max-w-xl">
              Veldarion prepares appeal documentation for denied medical
              claims using AI-assisted analysis. All AI-generated appeal
              drafts, evidence reports, and denial analyses require
              verification by a qualified person before submission.
            </p>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              <strong className="text-[#14110C]">
                Veldarion is not a substitute for qualified clinical,
                legal, coding, billing, or payer-specific judgment. The
                treating provider and billing team retain full responsibility
                for the accuracy of any appeal and for the decision to
                submit it.
              </strong>
            </p>
          </div>

          {/* A. AI-generated information */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              A. AI-generated information
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              Veldarion uses artificial intelligence and automated processes to analyze documents and generate outputs, including appeal drafts, denial analyses, evidence reports, and citations to payer policies or coverage documents. <strong className="text-[#14110C]">AI-generated output is not reviewed by a licensed professional before it is delivered to you, and it may be wrong.</strong> Outputs may contain:
            </p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2620] mb-6 pl-6 list-disc list-inside">
              <li>inaccurate or incomplete statements of fact;</li>
              <li>incorrect interpretations of denial codes, billing codes, payer policies, or coverage criteria;</li>
              <li>outdated references to payer policies, coverage determinations, or regulatory requirements;</li>
              <li>unsupported conclusions about medical necessity or the reasons for a denial;</li>
              <li>missing evidence, or evidence misclassified as supporting when it is not;</li>
              <li>citations to authorities that do not exist or do not say what the output suggests ("hallucinated" citations), or</li>
              <li>omissions of relevant facts, deadlines, or requirements present in the underlying documents.</li>
            </ul>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              You must verify every factual assertion, code, citation, policy reference, and conclusion in any output before relying on it or including it in a submission to a payer.
            </p>
          </div>

          {/* B. No guarantee of appeal outcomes */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              B. No guarantee of appeal outcomes
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              Veldarion does not guarantee, and makes no representation or warranty, regarding the outcome of any claim, appeal, or payment matter. Specifically, we do not guarantee:
            </p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2620] mb-6 pl-6 list-disc list-inside">
              <li>approval of any appeal or reconsideration request;</li>
              <li>payment, reversal, or adjustment of any claim;</li>
              <li>a specific recovery amount, recovery percentage, or financial outcome;</li>
              <li>acceptance by any payer of documentation prepared with our assistance;</li>
              <li>eligibility of any claim for appeal, or preservation of any appeal right;</li>
              <li>any particular turnaround or processing time, unless expressly committed to in a signed agreement with you.</li>
            </ul>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              Decisions about coverage, appeal outcomes, and payment belong to the payer (and, in external review, to independent reviewers) and are outside Veldarion's control. Any statements about typical or illustrative outcomes do not constitute a promise, warranty, or forecast about your results.
            </p>
          </div>

          {/* C. Human review and approval required */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              C. Human review and approval required
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              Generated appeal materials are <strong className="text-[#14110C]">drafts prepared for review</strong>. They are not approved, signed, certified, or submitted by Veldarion. Before any use or submission:
            </p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2620] mb-6 pl-6 list-disc list-inside">
              <li>the customer's qualified personnel must review and approve each output;</li>
              <li>the customer is responsible for verifying the factual accuracy and completeness of the material, including the existence and content of all referenced evidence and policies;</li>
              <li>the customer is solely responsible for the decision to submit an appeal, for the content submitted, for meeting all applicable deadlines and procedural requirements, and for communications with payers.</li>
            </ul>
          </div>

          {/* D. No professional advice */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              D. No professional advice
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              Veldarion provides administrative and technology services only. Nothing in the services, the website, or any output is:
            </p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2620] mb-6 pl-6 list-disc list-inside">
              <li><strong className="text-[#14110C]">legal advice</strong> or the practice of law. Veldarion is not a law firm and does not represent you or any patient before any payer, agency, or tribunal. If you want legal advice about coverage disputes, appeals strategy, or regulatory compliance, engage qualified counsel.</li>
              <li><strong className="text-[#14110C]">medical or clinical advice</strong> or a clinical decision. Veldarion does not practice medicine and does not make, recommend, or influence diagnostic or treatment decisions for any patient.</li>
              <li><strong className="text-[#14110C]">an insurance coverage determination</strong>. Coverage and payment obligations are determined by the payer under the applicable plan, policy, and law — not by Veldarion.</li>
              <li><strong className="text-[#14110C]">a professional billing or coding judgment</strong>. Coding and billing decisions, including the correctness of codes identified in or proposed by our outputs, remain the responsibility of the customer's qualified billing and clinical personnel.</li>
              <li><strong className="text-[#14110C]">a determination of medical necessity</strong>, which is a clinical and coverage judgment made by the patient's providers and the payer.</li>
            </ul>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              Our role is limited to organizing information and drafting documents at the direction of the customer's authorized personnel.
            </p>
          </div>

          {/* E. Third-party information */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              E. Third-party information
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              Our analyses and outputs may reference third-party sources, including payer medical policies, Local and National Coverage Determinations, plan documents, coding references, statutes, and regulations. These sources:
            </p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2620] mb-6 pl-6 list-disc list-inside">
              <li>belong to third parties and change frequently, sometimes retroactively;</li>
              <li>may contain errors, ambiguities, or internal inconsistencies;</li>
              <li>may be summarized or interpreted imperfectly by automated processes; and</li>
              <li>may not reflect the specific plan, state, or fiscal-year rules applicable to a given claim.</li>
            </ul>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              We do not control third-party sources and are not responsible for their content, availability, or accuracy. Verify each authority against the payer's current, official source before relying on it.
            </p>
          </div>

          {/* F. Financial and performance representations */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              F. Financial and performance representations
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              Any recovery estimates, financial examples, processing statistics, or performance statements associated with Veldarion's services or marketing are illustrative only, depend on the facts of each claim and the payer involved, and are not guarantees of future results. Where we publish performance figures, they describe measured historical experience under stated conditions and do not promise equivalent results for any particular customer. Fee arrangements (including any percentage-of-recovery arrangements) are governed exclusively by the written agreement signed with each customer, not by this Disclaimer or any marketing page.
            </p>
          </div>

          {/* G. Limits of this Disclaimer */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              G. Limits of this Disclaimer
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              This Disclaimer operates subject to applicable law. Nothing in it, or in our Terms of Service, excludes or limits:
            </p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2620] mb-6 pl-6 list-disc list-inside">
              <li>obligations that cannot lawfully be excluded or limited, including liability for fraud, willful misconduct, or death or personal injury caused by negligence where such liability cannot be excluded;</li>
              <li>Veldarion's obligations under any executed Business Associate Agreement or Data Processing Agreement, including breach-notification and security obligations, which are not waived or narrowed by anything here;</li>
              <li>any customer's or individual's non-waivable statutory rights; or</li>
              <li>the allocation of responsibilities between Veldarion and its customers under HIPAA and analogous law.</li>
            </ul>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              To the extent permitted by law, the services are otherwise provided "as is" and "as available" without warranties of any kind, as further stated in our Terms of Service.
            </p>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
                          <strong>Questions about this Disclaimer:</strong> <strong>shivansh@veldarion.com</strong>, <strong>[REGISTERED BUSINESS ADDRESS — TO CONFIRM]</strong>.
                        </p>
                      </div>

                      <Rule className="mt-16" />
        </BlogLayout>
      </main>
      <Footer />
    </div>
  );
}
