import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
  title: "Veldarion — Autonomous AI Agents That Overturn Denied Medical Claims",
  description:
    "Insurers use AI to deny claims. We build AI agents to fight back. Veldarion autonomously reads clinical charts, cross-references payer policies, and generates winning appeal letters in seconds. 10% contingency. $0 upfront.",
  keywords: [
    "Veldarion",
    "AI healthcare",
    "medical claims appeals",
    "denied claims",
    "autonomous agents",
    "revenue cycle",
    "specialty clinics",
    "RAG",
    "payer policy",
  ],
  authors: [{ name: "Veldarion" }],
  openGraph: {
    title: "Veldarion — AI Agents That Overturn Denied Medical Claims",
    description:
      "Insurers use AI to deny claims. We build AI agents to fight back. Recover lost revenue with zero upfront cost.",
    url: "https://veldarion.com",
    siteName: "Veldarion",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veldarion — AI Agents That Fight Denied Medical Claims",
    description:
      "Insurers use AI to deny claims. We build AI agents to fight back. 10% contingency, $0 upfront.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${interTight.variable} ${mono.variable} font-sans antialiased bg-[#F4EFE4] text-[#14110C] selection:bg-[#C5F23D] selection:text-[#14110C]`}
        style={{ fontOpticalSizing: "auto" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
