import { Metadata } from "next";
import { Navbar } from "@/components/veldarion/nav-footer";
import { Footer } from "@/components/veldarion/nav-footer";
import { Eyebrow, CTAButton } from "@/components/veldarion/homepage-elements";
import { BlogLayout } from "@/components/veldarion/blog-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You — Veldarion",
  description: "Your denied claim submission has been received. We'll review it and respond within 1 business day.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://veldarion.com/contact/thank-you" },
};

export default function ThankYouPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
    { label: "Thank You", href: "/contact/thank-you" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main>
        <BlogLayout title="Thank you" intro="Your denied claim submission has been received." breadcrumbs={breadcrumbs}>
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <Eyebrow tone="chartreuse">Submission received</Eyebrow>
            <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C] sm:text-[56px]">
              We&apos;ve received your denied claim
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-[#2A2620] max-w-xl mx-auto">
              Thank you for submitting your denied claim for review. Our team will analyze the denial,
              cross-reference the relevant payer policy, and prepare an appeal workup. You&apos;ll hear
              from us within <strong className="text-[#14110C]">1 business day</strong>.
            </p>

            <div className="mt-12 rounded-sm border-2 border-[#C5F23D] bg-[#C5F23D] p-8 text-[#14110C]">
              <h3 className="font-serif text-2xl font-bold mb-4">What happens next</h3>
              <ol className="space-y-3 text-left max-w-md mx-auto text-[15px] leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-[#14110C] text-[#C5F23D] font-mono text-[11px] font-bold shrink-0">1</span>
                  <span>We review the denial reason, claim history, and clinical documentation you provided.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-[#14110C] text-[#C5F23D] font-mono text-[11px] font-bold shrink-0">2</span>
                  <span>Our agents identify the controlling payer policy, LCD, or NCD and extract supporting clauses.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-[#14110C] text-[#C5F23D] font-mono text-[11px] font-bold shrink-0">3</span>
                  <span>We prepare a cited appeal draft and deliver it for your review.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-[#14110C] text-[#C5F23D] font-mono text-[11px] font-bold shrink-0">4</span>
                  <span>Upon your approval, we file the appeal on your behalf. You pay only if revenue is recovered.</span>
                </li>
              </ol>
            </div>

            <div className="mt-10">
              <CTAButton href="/how-it-works" variant="ghost" className="px-6 py-3.5 text-[14px]">
                See the full workflow
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10v10M7 17l10-10"/></svg>
              </CTAButton>
            </div>
          </div>
        </BlogLayout>
      </main>
      <Footer />
    </div>
  );
}
