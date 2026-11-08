"use client";

import { useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import {
  ScanText,
  Search,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import AscentField from "@/components/veldarion/ascent-field";
import Link from "next/link";
import Tilt3D from "@/components/veldarion/tilt-3d";
import { Navbar, Footer } from "@/components/veldarion/nav-footer";

/* ================================================================
   VELDARION — "The Appeal Brief" aesthetic
   Parchment + India Ink + Electric Chartreuse + Amber Gold + Oxblood
   Fraunces (variable serif, optical sizing) × Inter Tight × JetBrains Mono
   Editorial voice: legal brief × medical chart × financial filing.
   Mixed italic accents on display headlines for editorial character.
================================================================ */

/* Design tokens — kept inline so the file is fully portable */
const C = {
  parchment: "#F4EFE4",
  parchmentDim: "#E8E0CF",
  parchmentDeep: "#DDD3BD",
  ink: "#14110C",
  inkSoft: "#2A2620",
  inkDim: "#5C5447",
  inkMuted: "#8A8170",
  chartreuse: "#C5F23D",
  chartreuseDeep: "#A8D11C",
  amber: "#E8A317",
  amberDeep: "#B8800E",
  oxblood: "#7A2E2E",
  oxbloodSoft: "#9C3D3D",
} as const;

/* ----------------------------------------------------------------
   CONTACT EMAIL — the ONE line to edit when changing the address.
   Used by every mailto link and the visible email on the page.
---------------------------------------------------------------- */
const CONTACT_EMAIL = "shivansh@veldarion.com";
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Veldarion — Denied Claims Recovery Inquiry"
)}`;

/* Direct email for the FinalCTA "Email us directly" link */
const DIRECT_EMAIL = "shivansh@veldarion.com";
const DIRECT_MAILTO = `mailto:${DIRECT_EMAIL}?subject=${encodeURIComponent(
  "Veldarion — Denied Claims Recovery Inquiry"
)}`;

/* ----------------------------------------------------------------
   Veldarion logo — V mark + recovered-claim signal arrow
   Two geometric primitives: a filled V with an arrow rising from its
   opening. Reads as both the brand initial and the act of lifting
   denied claims upward.
---------------------------------------------------------------- */
function VeldarionMark({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "light";
  className?: string;
}) {
  const bg = tone === "ink" ? "#14110C" : "#F4EFE4";
  const fg = tone === "ink" ? "#C5F23D" : "#14110C";
  return (
    <svg
      viewBox="0 0 40 44"
      className={className}
      fill="none"
      aria-hidden
      style={{ display: "block" }}
    >
      <rect x="0" y="0" width="40" height="44" rx="6" fill={bg} />
      {/* Filled V (slab-serif geometry) */}
      <path d="M7 14 L20 34 L33 14 L28 14 L20 26 L12 14 Z" fill={fg} />
      {/* Upward arrow rising from the V opening (recovered-claim signal) */}
      <path d="M20 4 L27 14 L13 14 Z" fill={fg} />
    </svg>
  );
}

function VeldarionLogo({
  tone = "ink",
  className = "",
  showWordmark = true,
}: {
  tone?: "ink" | "light";
  className?: string;
  showWordmark?: boolean;
}) {
  const wordColor = tone === "ink" ? "#14110C" : "#F4EFE4";
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <VeldarionMark tone={tone} className="h-8 w-[29px]" />
      {showWordmark && (
        <span
          className="font-serif text-[19px] font-bold tracking-tight"
          style={{ color: wordColor }}
        >
          Veldarion
        </span>
      )}
    </span>
  );
}

/* ----------------------------------------------------------------
   Motion primitives
---------------------------------------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  visible: (reduce: boolean) => ({
    transition: {
      staggerChildren: reduce ? 0 : 0.1,
      delayChildren: reduce ? 0 : 0.08,
    },
  }),
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (reduce: boolean) => ({
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={reduce}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div className={className} variants={staggerChild} custom={reduce}>
      {children}
    </motion.div>
  );
}

function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{
          duration: reduce ? 0.01 : 1.1,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Shared atoms
---------------------------------------------------------------- */

/* Legal-brief eyebrow label */
function Eyebrow({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: "ink" | "chartreuse" | "amber" | "oxblood";
}) {
  const toneClass = {
    ink: "text-[#5C5447]",
    chartreuse: "text-[#A8D11C]",
    amber: "text-[#B8800E]",
    oxblood: "text-[#9C3D3D]",
  }[tone];
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.22em] ${toneClass}`}
    >
      {children}
    </span>
  );
}

/* Primary CTA — chartreuse block, ink text. Feels like a stamped seal. */
function CTAButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost" | "ink";
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold tracking-tight transition-all duration-300";
  const styles = {
    primary: `bg-[#C5F23D] text-[#14110C] hover:bg-[#A8D11C] shadow-[0_4px_0_0_rgba(20,17,12,1)] hover:shadow-[0_2px_0_0_rgba(20,17,12,1)] hover:translate-y-[2px]`,
    ink: `bg-[#14110C] text-[#F4EFE4] hover:bg-[#2A2620] shadow-[0_4px_0_0_rgba(168,209,28,1)] hover:shadow-[0_2px_0_0_rgba(168,209,28,1)] hover:translate-y-[2px]`,
    ghost: `border border-[#14110C]/20 bg-transparent text-[#14110C] hover:border-[#14110C]/50 hover:bg-[#14110C]/5`,
  }[variant];
  const motionProps = {
    whileHover: { scale: 1.015 },
    whileTap: { scale: 0.985 },
    transition: { type: "spring", stiffness: 500, damping: 25 },
    className: `${base} ${styles} ${className}`,
  } as const;
  if (href) {
    return (
      <motion.a href={href} onClick={onClick} {...motionProps}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} {...motionProps}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

/* Inline chartreuse highlighter swipe — for hero "fight back" */
function Highlight({
  children,
  color = C.chartreuse,
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10 italic">{children}</span>
      <span
        aria-hidden
        className="absolute inset-x-[-6px] bottom-[0.1em] h-[0.7em] -z-0"
        style={{
          background: color,
          transform: "skewX(-7deg)",
          opacity: 0.9,
        }}
      />
    </span>
  );
}

/* Section divider — inked rule with chartreuse tick */
function Rule() {
  return (
    <div className="mx-auto flex max-w-7xl items-center gap-4 px-6">
      <div className="h-px flex-1 bg-[#14110C]/15" />
      <div className="h-1.5 w-1.5 rotate-45 bg-[#A8D11C]" />
      <div className="h-px flex-1 bg-[#14110C]/15" />
    </div>
  );
}

/* ----------------------------------------------------------------
   1. HERO — editorial, asymmetric, big serif, highlighter swipe
----------------------------------------------------------------- */
function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pt-14 pb-16 sm:pt-20 sm:pb-20"
    >
      {/* Decorative paper texture — subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #14110C 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* The Ascent Field — signature WebGL terrain (3D layer).
          A survey of the payer-rules landscape with the chartreuse
          ascent ridge rising through it. Pointer parallax + scroll
          drift; pauses offscreen; static frame under reduced motion. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <AscentField />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Top meta line */}
        <Reveal>
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-[#14110C]/15 pb-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A8D11C] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A8D11C]" />
              </span>
              <Eyebrow tone="chartreuse">Now accepting beta clinics</Eyebrow>
            </div>
            <Eyebrow>Appeal No. 0001 / Filed: 2024</Eyebrow>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Left — headline column */}
          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <Eyebrow>§ 00 — The Hook</Eyebrow>
            </Reveal>

            <MaskReveal delay={0.1} className="mt-3">
              <h1 className="font-serif text-[44px] font-bold leading-[1.02] tracking-[-0.02em] text-[#14110C] sm:text-[68px] md:text-[88px] md:leading-[0.98]">
                Fight medical claim denials with evidence, not overtime.
              </h1>
            </MaskReveal>

            <Reveal delay={0.4}>
              <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-[#2A2620]">
                Veldarion helps orthopedic, oncology, and other specialty practices analyze denied claims, find the payer-policy evidence that supports coverage, and prepare fully cited appeals — reviewed by experienced humans before anything is delivered.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <CTAButton href="/contact" className="px-7 py-4 text-[15px]">
                  Submit a denied claim for review
                  <ArrowRight className="h-4 w-4" />
                </CTAButton>
                <CTAButton href="/how-it-works" variant="ghost" className="px-6 py-4 text-[15px]">
                  See how it works
                  <ArrowUpRight className="h-4 w-4" />
                </CTAButton>
              </div>
            </Reveal>

            <Reveal delay={0.55}>
              <p className="mt-4 font-mono text-[12px] text-[#A8D11C]">
                Now accepting beta clinics
              </p>
            </Reveal>
          </div>

          {/* Right — illustrative appeal letter preview (product demo).
              Held in 3D: pointer tilt like a brief in the hand. */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tilt3D max={3.5} perspective={1200}>
              <div className="relative rounded-sm border-2 border-[#14110C] bg-white shadow-[8px_8px_0_0_#14110C] [transform-style:preserve-3d]">
                {/* Illustrative label */}
                <div className="absolute -top-3 left-5 right-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#14110C]/20 bg-[#F4EFE4] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#5C5447]">
                    Illustrative example — synthetic data
                  </span>
                </div>

                {/* Letter header — looks like document chrome */}
                <div className="flex items-center justify-between border-b-2 border-[#14110C] bg-[#14110C] px-5 py-2.5 [transform:translateZ(14px)]">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C5F23D] opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C5F23D]" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#C5F23D]">
                      Agent drafting · 00:03
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#DDD3BD]">
                    appeal_8472.docx
                  </span>
                </div>

                {/* Letter body */}
                <div className="space-y-3 px-5 py-5">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#8A8170]">
                    Re: Appeal — Denied Claim #8472
                  </div>
                  <div className="font-serif text-[15px] font-semibold leading-snug text-[#14110C]">
                    To the Medical Director,
                  </div>
                  <p className="font-serif text-[12px] leading-relaxed text-[#2A2620]">
                    I am writing to formally appeal the denial of claim #8472
                    for L4-L5 transforaminal epidural steroid injection. The
                    denial cites &ldquo;lack of medical necessity,&rdquo; however
                    the clinical record demonstrates...
                  </p>
                  {/* Highlighted citation — chartreuse inked */}
                  <div className="border-l-2 border-[#A8D11C] bg-[#C5F23D]/20 px-3 py-2 font-mono text-[10px] leading-relaxed text-[#14110C]">
                    <span className="font-bold">[Citation 1]</span> Per{" "}
                    <span className="font-bold">CGS LCD L33515</span>, Section
                    4.b: epidural injection is medically necessary when
                    conservative therapy exceeds 6 weeks...
                  </div>
                  <p className="font-serif text-[12px] leading-relaxed text-[#2A2620]">
                    Per the patient&apos;s chart, conservative management was
                    pursued for{" "}
                    <span className="bg-[#C5F23D] px-1 font-bold">8 weeks</span>{" "}
                    without resolution...
                    <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-[#14110C] align-text-bottom" />
                  </p>
                </div>

                {/* Letter footer — metadata bar */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t-2 border-[#14110C] bg-[#F4EFE4] px-5 py-2.5 font-mono text-[9px] uppercase tracking-wider text-[#5C5447]">
                  <span className="flex items-center gap-1">
                    <Check className="h-2.5 w-2.5 text-[#A8D11C]" strokeWidth={3} />
                    5 citations
                  </span>
                  <span className="text-[#8A8170]">·</span>
                  <span>ICD-10: M54.5</span>
                  <span className="text-[#8A8170]">·</span>
                  <span>Policy: CGS-LCD-L33515</span>
                  <span className="text-[#8A8170]">·</span>
                  <span className="text-[#B8800E]">Confidence: 94%</span>
                </div>
              </div>
              </Tilt3D>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   2. PROBLEM — oxblood accents, cited stats
---------------------------------------------------------------- */
function Problem() {
  const items = [
    {
      num: "i.",
      title: "Payers deny at scale.",
      body: "Medical-necessity policies, prior-auth rules, and bundling edits are applied automatically across every claim. The denial is the default; the appeal is the exception.",
    },
    {
      num: "ii.",
      title: "Appeals eat your team's week.",
      body: "Reading a 50-page chart, finding the LCD clause, drafting the letter — that's an afternoon per denial, and the queue keeps growing.",
    },
    {
      num: "iii.",
      title: "Revenue gets quietly written off.",
      body: "When the cost of an appeal approaches the value of the claim, the denial goes unchallenged. That's margin leaking out of the practice every month.",
    },
  ];

  return (
    <section id="problem" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow tone="oxblood">§ 01 — The Problem</Eyebrow>
              <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C] sm:text-[56px]">
                The denial math is broken
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-[17px] leading-relaxed text-[#2A2620]">
                Payers review at machine scale. Specialty clinics answer by hand — when there's time.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-10 space-y-4 text-[15px] leading-relaxed text-[#2A2620] max-w-3xl">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-mono text-[#7A2E2E]">•</span>
              Hospitals lose an average of <strong className="text-[#14110C]">4.8% of net patient revenue to denials</strong> (HFMA Pulse Survey, 2025).
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-mono text-[#7A2E2E]">•</span>
              The average appeal costs about <strong className="text-[#14110C]">$57 in staff time</strong> to prepare (Premier analysis, 2025, cited by HFMA).
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-mono text-[#7A2E2E]">•</span>
              Medicare Advantage plans denied <strong className="text-[#14110C]">12% of standard prior-authorization requests</strong> in 2025 — and <strong className="text-[#14110C]">overturned 67% of the denials that were appealed</strong> (KFF analysis of newly required insurer metrics, 2026).
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-[17px] leading-relaxed text-[#2A2620] max-w-2xl">
            The problem isn't that appeals don't work. It's that most denials never get a real one.
          </p>
        </Reveal>

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[#14110C]/20 bg-[#14110C]/20 md:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group relative h-full bg-[#F4EFE4] p-8 transition-colors hover:bg-[#E8E0CF]">
                <span className="font-serif text-2xl italic text-[#8A8170]">
                  {item.num}
                </span>
                <h3 className="mt-6 font-serif text-2xl font-bold tracking-tight text-[#14110C]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#2A2620]">
                  {item.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   3. SOLUTION — 4-step flow, human review section, solution links
---------------------------------------------------------------- */
function Solution() {
  const steps = [
    {
      icon: ScanText,
      num: "01.",
      title: "Ingest",
      body: "Send us your denied EOBs and clinical notes. Our agents ingest faxes, PDFs, and EHR exports in any format — no template engineering required.",
    },
    {
      icon: Search,
      num: "02.",
      title: "Analyze",
      body: "AI extracts ICD-10 codes, CPT procedures, and clinical context, then maps the payer's stated denial reason to the relevant medical necessity criteria.",
    },
    {
      icon: FileText,
      num: "03.",
      title: "Research",
      body: "RAG searches 200-page payer policy manuals, LCDs, and NCDs in milliseconds — surfacing the exact clauses that justify coverage for this procedure.",
    },
    {
      icon: CheckCircle2,
      num: "04.",
      title: "Draft",
      body: "We generate a fully cited appeal letter tailored to the denial reason — and deliver it for your review. [VERIFY: filing capability — state exactly what is true]",
    },
  ];

  return (
    <section id="solution" className="scroll-mt-16 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#14110C]/15 pb-6">
            <div>
              <Eyebrow tone="chartreuse">§ 02 — The Solution</Eyebrow>
              <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C] sm:text-[56px]">
                What Veldarion does
              </h2>
            </div>
          </div>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <StaggerItem key={s.num}>
              <div className="group relative h-full rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-6 transition-all duration-300 hover:border-[#14110C] hover:bg-[#E8E0CF] min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold tracking-widest text-[#A8D11C]">
                    {s.num}
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] text-[#14110C]">
                    <s.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-bold tracking-tight text-[#14110C]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#2A2620]">
                  {s.body}
                </p>
                {i < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-[#14110C]/30 lg:block"
                  />
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Human review section */}
        <Reveal delay={0.2} className="mt-16">
          <div className="rounded-sm border-2 border-[#C5F23D] bg-[#C5F23D] p-8 sm:p-10 text-[#14110C]">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-full bg-[#14110C] text-[#C5F23D] font-mono text-[11px] font-bold">
                ✓
              </span>
              <div>
                <h3 className="font-serif text-2xl font-bold">
                  Human review, every time
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#2A2620]">
                  AI does the reading and the drafting. Experienced reviewers check the citations, the clinical summary, and the argument before anything is delivered. [VERIFY: reviewer team composition — e.g., coders and RCM specialists with X years of experience]
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Solution page links */}
        <Reveal delay={0.3} className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            href="/solutions/denial-analysis/"
            className="group rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-6 hover:bg-[#E8E0CF] hover:border-[#14110C] transition-colors"
          >
            <h3 className="font-serif text-2xl font-bold tracking-tight text-[#14110C] group-hover:text-[#B8800E]">
              Denial analysis
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#2A2620]">
              Classify denials by CARC/RARC code, group them by root cause, and prioritize the claims worth appealing by recovery value and evidence strength.
            </p>
          </Link>
          <Link
            href="/solutions/appeal-preparation/"
            className="group rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-6 hover:bg-[#E8E0CF] hover:border-[#14110C] transition-colors"
          >
            <h3 className="font-serif text-2xl font-bold tracking-tight text-[#14110C] group-hover:text-[#B8800E]">
              Appeal preparation
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#2A2620]">
              Evidence-backed appeal letters that cite the payer's own policy language, map the clinical documentation to it, and arrive ready for your review.
            </p>
          </Link>
        </Reveal>

        <Reveal delay={0.4} className="mt-6">
          <CTAButton href="/how-it-works" variant="ghost" className="px-6 py-3.5 text-[14px]">
            See the full workflow
            <ArrowRight className="h-4 w-4" />
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   4. BUILT FOR SPECIALTY CARE
---------------------------------------------------------------- */
function SpecialtyCards() {
  const specialties = [
    {
      name: "Orthopedics",
      href: "/specialties/orthopedics/",
      focus: "Spine injections, joint replacement, surgery, and DME denials: medical-necessity criteria, prior auth, and bundling edits, worked the way ortho bills.",
    },
    {
      name: "Oncology",
      href: "/specialties/oncology/",
      focus: "Infusion, radiation, and drug-claim denials where every appeal is high-stakes: prior auth, step therapy, and site-of-care disputes.",
    },
  ];

  return (
    <section id="specialties" className="scroll-mt-16 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="chartreuse">§ 03 — Specialties</Eyebrow>
          <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C] sm:text-[56px]">
            Built for specialty care
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-[#2A2620] max-w-3xl">
            Specialty practices typically handle high-dollar procedures that
            payers scrutinize closely. Denial categories, clinical
            documentation expectations, and prior-authorization requirements
            vary by specialty — and by payer. Veldarion's analysis is
            tailored to the specific denial reason and the relevant payer
            policy for each claim.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {specialties.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              className="group relative rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-8 hover:bg-[#E8E0CF] hover:border-[#14110C] transition-colors"
            >
              <h3 className="font-serif text-2xl font-bold tracking-tight text-[#14110C] group-hover:text-[#B8800E] transition-colors">
                {s.name}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#2A2620]">
                {s.focus}
              </p>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   5. EVIDENCE AND REVIEW STANDARDS
---------------------------------------------------------------- */
function EvidenceStandards() {
  return (
    <section className="scroll-mt-16 px-6 py-20 sm:py-28 bg-[#F4EFE4]">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="amber">§ 04 — Standards</Eyebrow>
          <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C] sm:text-[56px]">
            Evidence and review standards
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 space-y-4 text-[15px] leading-relaxed text-[#2A2620] max-w-3xl">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 text-[#C5F23D]">✓</span>
            Every appeal cites the payer policy, LCD, or NCD it relies on — quoted, with section references.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 text-[#C5F23D]">✓</span>
            Every letter passes human review before delivery.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 text-[#C5F23D]">✓</span>
            No patient data is used in marketing materials or demos; examples are synthetic and labeled.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 text-[#C5F23D]">✓</span>
            <Link href="/security/" className="underline decoration-[#14110C]/40 underline-offset-2 hover:decoration-[#14110C] text-[#14110C]">
              Security & compliance
            </Link>{" "}
            — publish this link only when /security/ content is verified.
          </li>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   6. PRICING — amber-bordered legal fee agreement card
---------------------------------------------------------------- */
function Pricing() {
  const features = [
    "Unlimited appeal generations",
    "Cited, audit-ready appeal letters",
    "Human review of every appeal draft",
    "10% contingency — $0 upfront",
  ];
  return (
    <section id="pricing" className="scroll-mt-16 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center">
            <Eyebrow tone="amber">§ 05 — Pricing</Eyebrow>
            <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C] sm:text-[56px]">
              Success-based pricing: 10% of recovered revenue
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[#2A2620]">
              No seats, no tiers, no SaaS tax. You pay only when revenue is
              recovered.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <Tilt3D max={4} perspective={1200} className="mt-12">
          <div
            className="relative rounded-sm border-2 border-[#E8A317] bg-[#F4EFE4] p-8 sm:p-10 [transform-style:preserve-3d]"
            style={{ boxShadow: "10px 10px 0 0 #14110C" }}
          >
            {/* stamp */}
            <div className="absolute right-6 top-6 rotate-[6deg]">
              <div className="rounded-full border-2 border-[#7A2E2E] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#7A2E2E] [transform:translateZ(26px)]">
                $0 Upfront
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-sm border border-[#E8A317] bg-[#E8A317]/15 text-[#B8800E]">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#5C5447]">
                Veldarion Contingency Agreement
              </span>
            </div>

            <div className="mt-7 [transform:translateZ(34px)]">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-[88px] font-bold leading-none tracking-[-0.04em] text-[#14110C]">
                  10%
                </span>
              </div>
              <p className="mt-1 font-mono text-[12px] uppercase tracking-wider text-[#8A8170]">
                of recovered revenue
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-[#2A2620]">
                $0 upfront. $0 monthly SaaS fees. If an appeal doesn&apos;t
                recover money, you don&apos;t pay for it. [Legal review required
                for absolute wording — ledger item L-19.]
              </p>
            </div>

            <div className="my-7 h-px bg-[#14110C]/15" />

            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 [transform:translateZ(16px)]">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-[#C5F23D] text-[#14110C]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-[14px] text-[#2A2620]">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <CTAButton href="/pricing/" className="w-full py-4 text-[15px]">
                Full pricing details
                <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <p className="mt-3 text-center font-mono text-[11px] text-[#8A8170]">
                ↳ Send us a denied claim. We review and prepare the appeal. You
                approve before anything is filed.
              </p>
            </div>
          </div>
          </Tilt3D>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   7. FINAL CTA — chartreuse, simple CTA
---------------------------------------------------------------- */
function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-16 overflow-hidden bg-[#C5F23D] px-6 py-28 sm:py-36"
    >
      {/* big paper texture dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, #14110C 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* diagonal amber stripe accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-full w-64 rotate-[15deg] bg-[#E8A317]/40"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow tone="ink">§ 06 — Contact</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-[48px] font-bold leading-[0.98] tracking-[-0.025em] text-[#14110C] sm:text-[80px] sm:leading-[0.95]">
            Stop writing off winnable denials.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-[#14110C]/80">
            Send one denied claim. See the analysis and the appeal workup before you commit to anything.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <CTAButton
            href="/contact"
            variant="ink"
            className="w-full px-7 py-4 text-[15px] sm:w-auto"
          >
            Submit a denied claim for review
            <ArrowRight className="h-4 w-4" />
          </CTAButton>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 rounded-2xl border-2 border-[#14110C]/15 bg-[#F4EFE4]/70 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-4">
            <div className="min-w-0 flex-1 text-left">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#14110C]/55">
                Email us directly
              </p>
              <a
                href={DIRECT_MAILTO}
                className="mt-1 block truncate font-mono text-[14px] font-bold text-[#14110C] underline decoration-[#14110C]/40 underline-offset-4 transition-colors hover:decoration-[#14110C]"
              >
                {DIRECT_EMAIL}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Page
----------------------------------------------------------------- */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Rule />
        <Solution />
        <SpecialtyCards />
        <EvidenceStandards />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}