import { Metadata } from "next";
import { Navbar } from "@/components/veldarion/nav-footer";
import { Footer } from "@/components/veldarion/nav-footer";
import { PageHeading, Rule, CTAButton, Eyebrow } from "@/components/veldarion/homepage-elements";
import { BlogLayout } from "@/components/veldarion/blog-layout";

const CONTACT_EMAIL = "shivansh@veldarion.com";
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Veldarion — Denied Claims Recovery Inquiry"
)}`;

export const metadata: Metadata = {
  title: "Contact Veldarion — Denied Claims Recovery",
  description:
    "Contact Veldarion about denied medical claims and appeal preparation. Email shivansh@veldarion.com. You pay only when revenue is recovered.",
  openGraph: {
    title: "Contact Veldarion",
    description: "Reach Veldarion about denied claims and appeal documentation.",
    type: "website",
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main>
        <BlogLayout
          title="Contact Veldarion"
          intro="Send us your denied claims. Our agents read the charts, find the policy clauses, write the appeals, and file them on your behalf. You pay only when revenue is recovered."
          breadcrumbs={breadcrumbs}
        >

            <div className="mt-14 grid gap-12 lg:grid-cols-2">
              {/* Contact method */}
              <div className="rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-10 sm:p-14">
                <Eyebrow tone="ink">Reach us</Eyebrow>
                <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C]">
                  Email is the best way to start
                </h2>
                <p className="mt-6 text-[17px] leading-relaxed text-[#2A2620] mb-8">
                  We do not publish a phone number or sales calendar. Email is
                  the fastest way to reach Veldarion and begin a denied-claims
                  review.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 grid h-9 w-9 place-items-center rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] text-[#14110C]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8A8170] mb-1">
                        Email
                      </p>
                      <a
                        href={CONTACT_MAILTO}
                        className="font-serif text-[18px] font-bold text-[#14110C] underline decoration-[#14110C]/40 underline-offset-4 transition-colors hover:decoration-[#14110C]"
                      >
                        {CONTACT_EMAIL}
                      </a>
                      <p className="mt-1 text-[13px] text-[#2A2620]">
                        Include the denied claim details and any available
                        remittance advice.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-[#14110C]/15">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8A8170] mb-3">
                    What to include
                  </p>
                  <ul className="space-y-3 text-[14px] leading-relaxed text-[#2A2620]">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#A8D11C]">›</span>
                      The denied claim number and date of service
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#A8D11C]">›</span>
                      The payer and denial reason, if known
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-[#A8D11C]">›</span>
                      Your practice name and specialty
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#A8D11C]">›</span>
                      Any available clinical notes or EOBs
                    </li>
                  </ul>
                </div>
              </div>

              {/* What happens next */}
              <div className="rounded-sm border-2 border-[#C5F23D] bg-[#C5F23D] p-10 sm:p-14 text-[#14110C]">
                <Eyebrow tone="ink">What happens next</Eyebrow>
                <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C]">
                  From inbox to appeal
                </h2>
                <ol className="mt-8 space-y-6 text-[#14110C]/90 leading-relaxed text-[15px]">
                  <li className="flex items-start gap-3">
                    <span className="shrink-0 grid h-9 w-9 place-items-center rounded-full bg-[#14110C] text-[#C5F23D] font-mono text-[11px] font-bold">
                      1
                    </span>
                    <div>
                      <p className="font-bold mb-1">You email us</p>
                      <p className="text-sm">Send the denied-claim details and records.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="shrink-0 grid h-9 w-9 place-items-center rounded-full bg-[#14110C] text-[#C5F23D] font-mono text-[11px] font-bold">
                      2
                    </span>
                    <div>
                      <p className="font-bold mb-1">We review</p>
                      <p className="text-sm">Our agents analyze the denial and payer policy.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="shrink-0 grid h-9 w-9 place-items-center rounded-full bg-[#14110C] text-[#C5F23D] font-mono text-[11px] font-bold">
                      3
                    </span>
                    <div>
                      <p className="font-bold mb-1">We draft and file</p>
                      <p className="text-sm">A human reviews the appeal draft before filing.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="shrink-0 grid h-9 w-9 place-items-center rounded-full bg-[#14110C] text-[#C5F23D] font-mono text-[11px] font-bold">
                      4
                    </span>
                    <div>
                      <p className="font-bold mb-1">You pay only on recovery</p>
                      <p className="text-sm">10% of recovered revenue. $0 upfront.</p>
                    </div>
                  </li>
                </ol>

                <div className="mt-12">
                  <CTAButton href={CONTACT_MAILTO} className="w-full py-4 text-[15px]">
                    Email Veldarion
                    <ArrowRight />
                  </CTAButton>
                  <p className="mt-4 font-mono text-[11px] text-[#14110C]/70">
                    {CONTACT_EMAIL}
                  </p>
                </div>
              </div>
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
