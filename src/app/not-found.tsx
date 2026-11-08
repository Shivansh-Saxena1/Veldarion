import { Metadata } from "next";
import { Navbar } from "@/components/veldarion/nav-footer";
import { Footer } from "@/components/veldarion/nav-footer";
import { Eyebrow, CTAButton } from "@/components/veldarion/homepage-elements";

export const metadata: Metadata = {
  title: "Page not found — Veldarion",
  description: "The page you're looking for is not available.",
  robots: { noindex: true },
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main className="px-6 pt-20 sm:pt-32 pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="oxblood">Not found</Eyebrow>
          <h1 className="mt-4 font-serif text-[68px] font-bold leading-[1.02] tracking-[-0.02em] text-[#14110C] sm:text-[88px]">
            Not filed
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-[#2A2620]">
            The page you requested is not available. It may have moved or been
            removed.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton href="/" className="px-7 py-3.5 text-[15px]">
              Return home
              <ArrowRight />
            </CTAButton>
            <CTAButton href="/insights" variant="ghost" className="px-7 py-3.5 text-[15px]">
              Browse Insights
              <ArrowRight />
            </CTAButton>
          </div>
        </div>
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
