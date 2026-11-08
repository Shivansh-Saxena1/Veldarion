import { Metadata } from "next";
import { Navbar } from "@/components/veldarion/nav-footer";
import { Footer } from "@/components/veldarion/nav-footer";
import { PageHeading, Rule, Eyebrow, CTAButton } from "@/components/veldarion/homepage-elements";
import { BlogLayout } from "@/components/veldarion/blog-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Veldarion (Draft — Legal Review Required)",
  description:
    "Veldarion privacy policy: how we collect, use, store, and share information including PHI under HIPAA BAAs. Draft requires qualified legal review.",
  openGraph: {
    title: "Privacy Policy — Veldarion",
    description: "Privacy practices for Veldarion's denied-claims appeal service including HIPAA, state, and Indian law disclosures.",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://veldarion.com/privacy",
  },
};

export default function PrivacyPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main>
        <BlogLayout
          title="Privacy Policy"
          intro="Last updated: [LAST UPDATED — TO CONFIRM]. This document describes how Veldarion collects, uses, stores, and shares information in connection with its denied-claims appeal-preparation service."
          breadcrumbs={breadcrumbs}
        >
          <div className="mb-4 rounded-sm border-2 border-[#7A2E2E] bg-[#7A2E2E]/5 p-4 text-[#7A2E2E]">
            <Eyebrow tone="oxblood">Draft — legal review required</Eyebrow>
            <p className="mt-1 text-[12px] font-medium">
              This privacy policy is a draft. It has not been reviewed by
              qualified counsel and does not constitute a guarantee of legal
              compliance.
            </p>
          </div>

          {/* 1. Introduction and company identity */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              1. Introduction and company identity
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-6">
              Veldarion provides an AI-assisted platform that helps United States healthcare clinics and their authorized administrative personnel analyze denied insurance claims and prepare appeal documentation for the clinics' review and submission.
            </p>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-6">
              Veldarion is operated by <strong>Ram Bharosa Saxena</strong>, a sole proprietorship registered in India (proprietor: <strong>Ram Bharosa Saxena</strong>), trading as Veldarion, with its registered office at <strong>[REGISTERED BUSINESS ADDRESS — TO CONFIRM]</strong>. References to "Veldarion," "we," "us," and "our" mean that legal entity.
            </p>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-6">
              Veldarion is a business-to-business technology provider. <strong className="text-[#14110C]">We are not a healthcare provider, an insurance company, a law firm, or a collection agency, and we do not make medical, coverage, or payment decisions.</strong> Our customers are clinics and healthcare organizations, not patients.
            </p>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              <strong>Contact:</strong> <strong>shivansh@veldarion.com</strong>
            </p>
          </div>

          {/* 2. Scope */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              2. Scope of this Privacy Policy; roles and legal relationships
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              This Privacy Policy covers three distinct categories of information and it is important to understand the differences:
            </p>
            <ol className="space-y-3 text-[15px] leading-relaxed text-[#2A2620] mb-6 pl-6 list-decimal list-inside">
              <li><strong>Website and business information</strong> — information we collect directly from visitors to veldarion.com, prospective customers, and customer representatives (Sections 4–5).</li>
              <li><strong>Customer-provided information</strong> — account information and documents that our business customers (clinics and their revenue-cycle teams) provide to obtain our services (Sections 6–7).</li>
              <li><strong>Patient information</strong> — personal and health information <strong>about patients</strong>, contained inside the documents our customers upload (Section 8).</li>
            </ol>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              For website and business information, Veldarion is the entity responsible for the information. For patient information contained in customer-uploaded documents, the <strong>customer (the clinic) is the party responsible for that information and for its relationship with the patient</strong>; Veldarion processes it on the customer's behalf under a written agreement (a Business Associate Agreement where the information is protected health information regulated by HIPAA). This Privacy Policy does not create a direct relationship between patients and Veldarion, and patients are not our customers.
            </p>
          </div>

          {/* 3. Categories table */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              3. Categories of information we collect
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[14px] leading-relaxed">
                <thead>
                  <tr className="border-b-2 border-[#14110C]">
                    <th className="text-left pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5C5447]">Category</th>
                    <th className="text-left pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5C5447]">Examples</th>
                    <th className="text-left pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5C5447]">Typical source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#14110C]/15">
                  <tr>
                    <td className="py-3 font-medium text-[#14110C]">Website usage data</td>
                    <td className="py-3 text-[#2A2620]">IP address, device and browser information, pages viewed, referring page, cookies</td>
                    <td className="py-3 text-[#2A2620]">Your browser, automatically</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#14110C]">Business contact data</td>
                    <td className="py-3 text-[#2A2620]">Name, work email, telephone, clinic or organization name, role, messages you send us</td>
                    <td className="py-3 text-[#2A2620]">Forms, emails, demo requests</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#14110C]">Customer account data</td>
                    <td className="py-3 text-[#2A2620]">Authorized User names, business email addresses, login credentials, role assignments, account metadata</td>
                    <td className="py-3 text-[#2A2620]">Customer administrators</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#14110C]">Uploaded documents</td>
                    <td className="py-3 text-[#2A2620]">Denial letters, Explanation of Benefits (EOB) documents, Electronic Remittance Advice (ERA/835) files, clinical notes and patient records, payer policy documents</td>
                    <td className="py-3 text-[#2A2620]">Customer uploads</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#14110C]">Derived processing data</td>
                    <td className="py-3 text-[#2A2620]">Extracted text, denial and billing codes (e.g., CARC/RARC, CPT, ICD-10), analyses, generated appeal drafts and evidence reports</td>
                    <td className="py-3 text-[#2A2620]">Our platform</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#14110C]">Support and billing records</td>
                    <td className="py-3 text-[#2A2620]">Correspondence, invoices, fee calculations based on claim amounts recovered by customers</td>
                    <td className="py-3 text-[#2A2620]">Ordinary administration</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Website visitor information */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              4. Website visitor information
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              We collect limited technical information when you visit veldarion.com (IP address, device and browser type, pages viewed, and similar data), along with any information you provide through contact or demo-request forms. We use this information to operate and secure the website, respond to inquiries, and understand aggregate usage. We do not operate a patient portal, and our website forms are intended for business representatives. <strong className="text-[#14110C]">Please do not submit patient health information through website forms or email.</strong>
            </p>
          </div>

          {/* 5. Business contact information */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              5. Business contact information
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              If you contact us as a prospective customer, partner, or vendor, we keep the business contact details and correspondence you provide in order to respond and to maintain our commercial relationship. Where Veldarion is subject to Indian data protection law with respect to this information, we process it on the basis of your consent, which you may withdraw, or as necessary to perform our relationship or comply with law. You may ask us to access, correct, or delete this information at any time (Section 26).
            </p>
          </div>

          {/* 6. Customer account information */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              6. Customer account information
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              Customer organizations designate Authorized Users (as defined in our Terms of Service). We collect the names, business email addresses, credentials, and role information needed to operate accounts, authenticate users, and keep an audit trail. We use this information only to provide, secure, and administer the services.
            </p>
          </div>

          {/* 7. Uploaded documents */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              7. Uploaded documents and clinical information
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              Customers upload documents relating to denied claims so that our platform can analyze them and prepare appeal drafts. These documents typically include insurance denial letters, EOBs, ERA/835 data, clinical notes, and patient records, and they ordinarily contain patient names, identification numbers, dates of birth, diagnoses, procedures, and claim financials. We process these documents solely to provide the services the customer has requested: extracting relevant information, analyzing denial reasons against payer policies and coverage criteria, identifying supporting evidence in the customer's own records, and generating structured appeal drafts for review by the customer's authorized personnel.
            </p>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              <strong className="text-[#14110C]">Customers must upload only documents they are authorized to provide to us.</strong> See Section 8 and our Terms of Service.
            </p>
          </div>

          {/* 8. PHI */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              8. Protected Health Information (PHI)
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              Documents uploaded by customers will frequently contain Protected Health Information as defined by the U.S. Health Insurance Portability and Accountability Act ("HIPAA").
            </p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2620] mb-6 pl-6 list-disc list-inside">
              <li>Veldarion processes PHI <strong>only on behalf of a customer that is a HIPAA Covered Entity (or another vendor acting for one)</strong> and <strong>only under a separately executed HIPAA Business Associate Agreement ("BAA")</strong> between Veldarion and that customer. Website Terms of Service alone do not authorize the submission of PHI.</li>
              <li><strong>Customers must not upload documents containing PHI unless and until a BAA has been executed with Veldarion.</strong> Our platform is intended to enforce this requirement administratively.</li>
              <li>Under the BAA, we use and disclose PHI only as needed to provide the services, we report security incidents and breaches to the customer, we flow HIPAA obligations down to subcontractors that handle PHI, and we return or destroy PHI at the end of the relationship in accordance with the BAA.</li>
              <li>We do not sell PHI, use PHI for marketing, or use PHI to train or fine-tune models for our own purposes.</li>
              <li>Patients whose information appears in customer-uploaded documents are not our customers. <strong>Patients should direct privacy questions and rights requests to the clinic that treated them</strong>; we support our customers in responding to those requests as required by the BAA and applicable law.</li>
            </ul>
          </div>

          {/* 9. Purposes */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              9. Purposes of processing
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              We process information to: provide, maintain, and improve the services; analyze uploaded documents and generate appeal drafts; communicate with customers and prospective customers; authenticate users and secure the platform; invoice and collect fees in accordance with customer agreements; comply with legal obligations; and defend rights and resolve disputes.
            </p>
          </div>

          {/* 10. Legal bases */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              10. Legal bases and permissions
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              We rely on the following, as applicable: performance of our contract with the customer and the customer's instructions; consent (for website and business contact information where required, including under Indian law); compliance with legal obligations; and legitimate interests in securing and operating our business (such as fraud prevention, record retention, and network security). Where we process PHI, the BAA and HIPAA govern the permissibility of that processing. We do not carry out automated decision-making that produces legal or similarly significant effects on individuals, and we do not use customer information for profiling in the sense regulated by consumer privacy law.
            </p>
          </div>

          {/* 11. AI processing */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              11. AI processing and third-party AI services
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              Our platform uses third-party artificial intelligence services to analyze document text and generate appeal drafts and evidence reports. <strong>When a customer uploads documents, the extracted content of those documents — including PHI where a BAA is in force — is transmitted to our AI provider for processing.</strong>
            </p>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              We hold ourselves to the following standards for any AI provider used to process customer documents:
            </p>
            <ol className="space-y-2 text-[15px] leading-relaxed text-[#2A2620] mb-4 pl-6 list-decimal list-inside">
              <li>the provider must be engaged under terms that <strong>do not permit the provider to use submitted content to train or improve its models</strong>; and</li>
              <li>where PHI is processed, the provider must be covered by an appropriate <strong>HIPAA Business Associate Agreement</strong> (directly or through a covered enterprise service).</li>
            </ol>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              Our current AI processing configuration is <strong>[AI PROCESSING PROVIDER & TIER — TO CONFIRM — must be completed only after verification against Part A §A.10 before publication]</strong>. We do not represent that any specific AI product is "HIPAA compliant" in itself; compliance depends on the product configuration, the contractual terms, and the executed agreements.
            </p>
          </div>

          {/* 12. Data sharing */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              12. Data sharing and disclosure
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              We do not sell personal information, and we do not share customer documents or their contents with third parties for those third parties' own purposes. We disclose information only to:
            </p>
            <ol className="space-y-3 text-[15px] leading-relaxed text-[#2A2620] mb-6 pl-6 list-decimal list-inside">
              <li><strong>Subprocessors</strong> that help us deliver the services, under written data-protection terms (Section 13);</li>
              <li><strong>our AI provider</strong> as described in Section 11;</li>
              <li>the <strong>customer</strong> that provided the information (outputs and reports are delivered to the customer's Authorized Users);</li>
              <li>authorities, where required by law or valid legal process, or as necessary to establish or defend legal claims; and</li>
              <li>a successor in connection with a merger, acquisition, or sale of assets, under confidentiality obligations.</li>
            </ol>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              If we are ever required to disclose PHI we hold under a BAA, we will notify the affected customer before disclosure where legally permitted and otherwise act in accordance with the BAA.
            </p>
          </div>

          {/* 13. Subprocessors */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              13. Subprocessors and service providers
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              The categories of subprocessors we use are listed below. The current, complete list with entities and processing locations is maintained at <strong>[SUBPROCESSOR LIST URL — TO CONFIRM]</strong> and in Exhibit 3 of our BAA. Before we engage any new subprocessor that will have access to PHI, we will (a) confirm it is bound by HIPAA-compliant obligations through a BAA or equivalent, and (b) notify affected customers and allow them to object as provided in their agreements.
            </p>
            <div className="overflow-x-auto mt-6">
              <table className="w-full border-collapse text-[14px] leading-relaxed">
                <thead>
                  <tr className="border-b-2 border-[#14110C]">
                    <th className="text-left pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5C5447]">Category</th>
                    <th className="text-left pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5C5447]">Function</th>
                    <th className="text-left pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5C5447]">Current provider</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#14110C]/15">
                  <tr>
                    <td className="py-3 font-medium text-[#14110C]">Hosting / application infrastructure</td>
                    <td className="py-3 text-[#2A2620]">Operating the website and application</td>
                    <td className="py-3 text-[#2A2620]"><strong>[HOSTING PROVIDER & REGION(S) — TO CONFIRM]</strong></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#14110C]">Data storage</td>
                    <td className="py-3 text-[#2A2620]">Database and document storage</td>
                    <td className="py-3 text-[#2A2620]"><strong>[DATABASE / STORAGE PROVIDER & REGION(S) — TO CONFIRM]</strong></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#14110C]">AI processing</td>
                    <td className="py-3 text-[#2A2620]">Document analysis and generation</td>
                    <td className="py-3 text-[#2A2620]"><strong>[AI PROCESSING PROVIDER & TIER — TO CONFIRM]</strong></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#14110C]">Transactional email</td>
                    <td className="py-3 text-[#2A2620]">Service notifications</td>
                    <td className="py-3 text-[#2A2620]"><strong>[EMAIL SERVICE PROVIDER — TO CONFIRM]</strong></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#14110C]">Website analytics</td>
                    <td className="py-3 text-[#2A2620]">Usage measurement</td>
                    <td className="py-3 text-[#2A2620]"><strong>[ANALYTICS / COOKIE PROVIDER(S) — TO CONFIRM, or "none"]</strong></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#14110C]">Payments</td>
                    <td className="py-3 text-[#2A2620]">Invoicing and fee collection</td>
                    <td className="py-3 text-[#2A2620]"><strong>[PAYMENT PROCESSOR — TO CONFIRM]</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 14. International transfers */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              14. International data transfers
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              Veldarion operates from India, and information we collect — including customer-uploaded documents — is processed in India and in the United States, and may be processed in other countries by our subprocessors, including our AI provider, whose systems may store or cache data transiently in any country in which it or its agents maintain facilities. Transfers of PHI to us and to our subprocessors are made under BAAs as required by HIPAA, which does not prohibit processing outside the United States but requires contractual safeguards and security. We apply the same data-protection terms to such transfers wherever feasible, and we remain subject to Indian data protection law with respect to processing performed in India. Customers who require specific data-residency arrangements should raise them before onboarding.
            </p>
          </div>

          {/* 15. Retention */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              15. Data retention and deletion
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              We retain information only as long as needed for the purposes described in this policy, our contractual commitments, and applicable law:
            </p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2620] mb-6 pl-6 list-disc list-inside">
              <li><strong>Website and business contact information:</strong> retained while there is a relationship or a legitimate interest, and thereafter for a reasonable limitation period.</li>
              <li><strong>Customer account information:</strong> retained for the life of the account and thereafter as needed for records and legal defense.</li>
              <li><strong>Uploaded documents, extracted data, and generated outputs:</strong> retained for <strong>[DATA RETENTION PERIOD — TO CONFIRM]</strong>, after which they are deleted in accordance with <strong>[DELETION PROCEDURE & TIMELINE — TO CONFIRM]</strong>. Backups are retained for <strong>[BACKUP RETENTION PERIOD — TO CONFIRM]</strong> and age out on that cycle.</li>
              <li><strong>PHI under a BAA:</strong> at the end of the customer relationship, PHI is returned or destroyed in accordance with the BAA (retained only where return or destruction is infeasible, with continued protections).</li>
              <li><strong>Accounting records:</strong> retained as required by Indian tax and commercial law.</li>
            </ul>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              Customers may request deletion of specific documents or their entire workspace through the application or by contacting us (Section 26). Requests by patients cannot be actioned by us directly and will be referred to the customer clinic (Section 8).
            </p>
          </div>

          {/* 16. Security */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              16. Data security safeguards
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              We maintain administrative, technical, and physical safeguards designed to protect the confidentiality, integrity, and availability of the information we process, consistent with the HIPAA Security Rule where PHI is involved. <strong>[SECURITY SAFEGUARDS — TO CONFIRM: verified description of access controls, multi-factor authentication, encryption in transit and at rest, logging and monitoring, workforce training, and risk-analysis practices — insert only measures confirmed to exist.]</strong> We restrict access to personnel and subprocessors who need it to perform their functions, and we require subprocessors that handle PHI to be bound by HIPAA-compliant obligations. No method of transmission or storage is completely secure, and we cannot guarantee absolute security; if a security incident affecting information occurs, we will respond as described in Section 22.
            </p>
          </div>

          {/* 17. Cookies */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              17. Cookies and analytics
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              We use strictly necessary cookies (such as session and security cookies) to operate the website. Our analytics usage is <strong>[ANALYTICS / COOKIE PROVIDER(S) — TO CONFIRM: list each provider and purpose, or state "we use no analytics cookies"]</strong>. If we use analytics or other non-essential cookies, we will present a consent notice before they are set, and you may change your choices through that notice at any time. We do not use cookies to build health-related profiles of website visitors.
            </p>
          </div>

          {/* 18. Privacy rights */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              18. Customer and individual privacy rights
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              <strong>Business contacts and website visitors</strong> may request access to, correction of, or deletion of their personal information, and may object to or restrict certain processing, by contacting <strong>shivansh@veldarion.com</strong>. Where Veldarion is subject to a specific privacy law for that information, we will honor the rights that law provides.
            </p>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              <strong>Customers</strong> control their own account information and documents through the application and may direct deletion requests to us as described in Section 15 and in our Terms of Service.
            </p>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              <strong>Patients</strong> whose information is contained in customer-uploaded documents should direct requests (access, amendment, accounting of disclosures, restrictions, or complaints) to the clinic that holds their records. Under the BAA, we assist that clinic in responding where the request touches information we process on its behalf. We do not respond directly to patient requests without the customer's authorization, because the customer is the entity legally responsible for the patient's records.
            </p>
          </div>

          {/* 19. HIPAA responsibilities */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              19. HIPAA-related responsibilities
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              Where we process PHI, we act as a <strong>Business Associate</strong> of the customer. Our obligations in that role — which prevail over this Privacy Policy to the extent of any conflict — include: processing PHI only as the BAA permits; implementing Security Rule safeguards; reporting breaches and security incidents to the customer without unreasonable delay; making PHI available to the customer and to the U.S. Department of Health and Human Services for compliance reviews; flowing obligations down to subcontractors; and returning or destroying PHI when the relationship ends. We are not a Covered Entity, we do not provide treatment or insurance, and nothing in this policy or our Terms of Service replaces or amends a BAA. Additional information about our HIPAA readiness and our BAA process is available from <strong>shivansh@veldarion.com</strong>.
            </p>
          </div>

          {/* 20. State-specific */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              20. State-specific privacy disclosures (United States)
            </h2>
            <ul className="space-y-4 text-[15px] leading-relaxed text-[#2A2620] pl-6 list-disc list-inside">
              <li><strong>California.</strong> We do not "sell" or "share" (as those terms are defined by the CCPA) personal information, and we do not process personal information for cross-context behavioral advertising in the provision of our services. To the extent the CCPA ever applies to us with respect to business contact information, we honor the rights it provides (notice, access, deletion, correction, non-discrimination). Personal information we process as a service provider to healthcare customers, including PHI, is exempt from the CCPA.</li>
              <li><strong>Washington (My Health My Data Act).</strong> We do not collect "consumer health data" directly from Washington consumers: our services are business-to-business, and PHI we receive under a BAA is outside that Act's scope. If our services ever change so that we collect consumer health data directly from consumers, we will provide the separate consumer health data privacy policy, consent flows, and disclosures that the Act requires before doing so.</li>
              <li><strong>Nevada.</strong> We do not sell consumer health data as defined by Nevada law.</li>
              <li><strong>Texas.</strong> We are mindful of the Texas Medical Records Privacy Act's broad scope and handle medical records in accordance with our customer agreements and applicable law.</li>
              <li><strong>All states.</strong> As a processor of patient information for healthcare customers, our public-facing commitments are reflected here and in our BAA/DPA; individuals with rights claims regarding patient records should contact the treating clinic (Section 8).</li>
            </ul>
          </div>

          {/* 21. Indian law */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              21. Indian data protection disclosures (DPDP and allied law)
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              To the extent India's Digital Personal Data Protection Act, 2023 and the rules made under it apply to our processing:
            </p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2620] mb-6 pl-6 list-disc list-inside">
              <li>For our <strong>own</strong> website, business contact, and account data, Veldarion acts as a Data Fiduciary; we process personal data on the basis of consent (withdrawable at any time) or for purposes connected with the services and legal compliance, and we collect only what is needed for those purposes.</li>
              <li>For customer-provided documents, Veldarion acts as a <strong>Data Processor</strong> and processes personal data only on the customer's documented instructions under our Data Processing Agreement.</li>
              <li>Individuals may exercise rights (including access to a description of data processed, correction, completion, updating, and erasure where consent was the basis), lodge grievances, or nominate a representative, by contacting our grievance officer: <strong>shivansh@veldarion.com</strong>. We aim to acknowledge grievances promptly and to respond substantively within the timelines prescribed by law.</li>
              <li>Personal data may be transferred outside India in connection with our services, subject to the transfer conditions of Indian law.</li>
              <li>We also observe the security obligations of India's Information Technology Act, 2000 (section 43A) and the SPDI Rules, 2011, which continue to apply to Indian entities handling health information.</li>
            </ul>
          </div>

          {/* 22. Breach response */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              22. Data breach response and notifications
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              We maintain <strong>[INCIDENT RESPONSE PLAN — TO CONFIRM: reference to internal procedures]</strong> and will act to contain and investigate security incidents promptly. Where PHI is involved, we will notify the affected customer without unreasonable delay and no later than <strong>[BREACH NOTIFICATION TIMELINE — TO CONFIRM]</strong> after confirming a reportable breach, as required by the BAA and 45 CFR 164.410, so that the customer can meet its own notification obligations. Where required by Indian law, we will intimate the Data Protection Board of India and affected individuals. For website and business contact data, we will notify affected individuals and authorities as required by applicable law.
            </p>
          </div>

          {/* 23. Children's privacy */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              23. Children's privacy
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              Our services are directed to businesses and healthcare professionals and are not directed to children. We do not knowingly collect personal information from children. If you believe a child has provided us personal information, contact <strong>shivansh@veldarion.com</strong> and we will delete it.
            </p>
          </div>

          {/* 24. External websites */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              24. External websites and third-party services
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              Our website may link to third-party websites and resources. Those third parties have their own privacy practices, and we are not responsible for their content or policies. This Privacy Policy applies only to information we collect. We encourage you to read the privacy policies of any third-party services you use.
            </p>
          </div>

          {/* 25. Changes */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              25. Changes to this Privacy Policy
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2A2620]">
              We may update this Privacy Policy to reflect changes in our practices, technology, or legal requirements. We will post the updated version on this page with a revised "Last Updated" date, and we will notify customers of material changes by email or in-application notice before they take effect where required by law or by our agreements with them. Continued use of the website or services after changes take effect constitutes acceptance of the updated policy, subject to any notice requirements in our Terms of Service.
            </p>
          </div>

          {/* 26. Contact */}
          <div className="mt-12">
            <h2 className="font-serif text-[26px] font-bold tracking-tight text-[#14110C] mb-4">
              26. Contact, privacy requests, and grievances
            </h2>
            <p className="font-mono text-[14px] font-bold text-[#14110C] mb-2"><strong>Privacy contact:</strong> <strong>shivansh@veldarion.com</strong></p>
            <p className="font-mono text-[14px] font-bold text-[#14110C] mb-2"><strong>Legal contact:</strong> <strong>shivansh@veldarion.com</strong></p>
            <p className="font-mono text-[14px] font-bold text-[#14110C] mb-2"><strong>Postal address:</strong> <strong>[REGISTERED BUSINESS ADDRESS — TO CONFIRM]</strong></p>
            <p className="font-mono text-[14px] font-bold text-[#14110C] mb-6"><strong>Grievance / data protection officer (India):</strong> <strong>[DATA PROTECTION CONTACT — TO CONFIRM]</strong></p>
            <p className="text-[15px] leading-relaxed text-[#2A2620] mb-4">
              We aim to acknowledge privacy requests within a reasonable period and to respond substantively within the timelines required by applicable law. If you are a patient, please contact your clinic first (Section 8). If you are unsatisfied with our response to a privacy request and you are subject to Indian law, you may escalate to the Data Protection Board of India once its complaint mechanisms are operational for such matters.
            </p>
            <CTAButton href="/contact" className="px-7 py-3.5 text-[14px]">
              Contact Us
              <ArrowRight />
            </CTAButton>
          </div>

          <Rule className="mt-16" />
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
