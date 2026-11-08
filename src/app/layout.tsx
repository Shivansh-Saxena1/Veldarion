import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GA4Provider } from "@/components/analytics/GA4Provider";

const GTM_ID = "GTM-5XS78BW6";

/*
  VELDARION TYPE SYSTEM
  ----------------------
  Fraunces      — variable serif, optical sizing; headlines + display numerals
                  (the optical-size axis gives large headlines a dramatic,
                   high-contrast, editorial character that small body sizes lack)
  Inter Tight   — tight grotesk sans; body copy, UI, navigation
  JetBrains Mono — monospaced; eyebrow labels, telemetry, metadata, HUD
*/

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://veldarion.com"),
  title: "Veldarion — AI-Assisted Medical Claim Denial Analysis & Appeal Preparation",
  description:
    "Veldarion helps specialty practices analyze denied claims, find the payer-policy evidence, and prepare fully cited appeals — with human expert review. Success-based pricing.",
  keywords: [
    "Veldarion",
    "AI healthcare",
    "medical claims appeals",
    "denied claims",
    "revenue cycle",
    "specialty clinics",
    "payer policy",
  ],
  authors: [{ name: "Veldarion" }],
  openGraph: {
    title: "Veldarion — AI-Assisted Medical Claim Denial Analysis & Appeal Preparation",
    description:
      "Veldarion helps specialty practices analyze denied claims, find the payer-policy evidence, and prepare fully cited appeals — with human expert review. Success-based pricing.",
    url: "https://veldarion.com",
    siteName: "Veldarion",
    type: "website",
    images: [
      {
        url: "/og/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Veldarion — AI-Assisted Medical Claim Denial Analysis & Appeal Preparation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veldarion — AI-Assisted Medical Claim Denial Analysis & Appeal Preparation",
    description:
      "Veldarion helps specialty practices analyze denied claims and prepare fully cited appeals with human review. Success-based pricing, $0 upfront.",
    images: ["/og/og-default.svg"],
  },
  alternates: {
    canonical: "https://veldarion.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${interTight.variable} ${mono.variable} font-sans antialiased bg-[#F4EFE4] text-[#14110C] selection:bg-[#C5F23D] selection:text-[#14110C]`}
        style={{ fontOpticalSizing: "auto" }}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <GA4Provider>
          {children}
        </GA4Provider>
        <Toaster />
        {/* Organization structured data */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Organization",
                      name: "Veldarion",
                      url: "https://veldarion.com",
                      logo: "https://veldarion.com/logo.svg",
                      contactPoint: {
                                              "@type": "ContactPoint",
                                              contactType: "customer service",
                                              email: "shivansh@veldarion.com",
                                              availableLanguage: ["English"],
                                            },
                      sameAs: [],
                    }),
                  }}
                />
        {/* WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Veldarion",
              url: "https://veldarion.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://veldarion.com/insights?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
