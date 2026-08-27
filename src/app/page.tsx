"use client";

import { useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import {
  FileWarning,
  Clock,
  DollarSign,
  ScanText,
  Search,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
  Network,
  TrendingUp,
  Zap,
  Menu,
  X,
  Copy,
} from "lucide-react";
import AscentField from "@/components/veldarion/ascent-field";
import Tilt3D from "@/components/veldarion/tilt-3d";

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
};

/* ----------------------------------------------------------------
   CONTACT EMAIL — the ONE line to edit when changing the address.
   Used by every mailto link and the visible email on the page.
---------------------------------------------------------------- */
const CONTACT_EMAIL = "hello@veldarion.com";
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
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
type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

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

function Reveal({ children, className, delay = 0 }: RevealProps) {
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
};

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

/* Mask reveal — for serif headlines, sweeps a clip-path upward */
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

/* Animated number counter — for big stats */
function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  if (reduce && inView && display === 0) setDisplay(to);
  return (
    <span ref={ref}>
      {inView && !reduce ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <CountUpInner to={to} duration={duration} />
        </motion.span>
      ) : (
        <>{display || to}</>
      )}
      {prefix}
      {suffix}
    </span>
  );
}

function CountUpInner({ to, duration }: { to: number; duration: number }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  if (!started.current) {
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(to * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  return <>{val}</>;
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
   1. NAVIGATION — parchment, ink, mono labels
---------------------------------------------------------------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Problem", href: "#problem", num: "§01" },
    { label: "How it works", href: "#solution", num: "§02" },
    { label: "The Moat", href: "#moat", num: "§03" },
    { label: "Pricing", href: "#pricing", num: "§04" },
  ];
  return (
    <header className="sticky top-0 z-50">
      <div
        className="border-b border-[#14110C]/15 bg-[#F4EFE4]/85 backdrop-blur-md"
        style={{ boxShadow: "0 1px 0 0 rgba(20,17,12,0.04) inset" }}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <a href="#top" className="inline-flex">
            <VeldarionLogo tone="ink" />
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group flex items-baseline gap-1.5 text-[13px] font-medium text-[#5C5447] transition-colors hover:text-[#14110C]"
              >
                <span className="font-mono text-[10px] text-[#8A8170] group-hover:text-[#A8D11C]">
                  {l.num}
                </span>
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#solution"
              className="text-[13px] font-medium text-[#5C5447] transition-colors hover:text-[#14110C]"
            >
              How it works
            </a>
            <CTAButton href="#contact" className="px-5 py-2.5 text-[12px]">
              Contact Us
              <ArrowRight className="h-3.5 w-3.5" />
            </CTAButton>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-sm border border-[#14110C]/20 text-[#14110C] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#14110C]/15 bg-[#F4EFE4]/95 backdrop-blur-md md:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-[#14110C] hover:bg-[#14110C]/5"
                >
                  <span className="font-mono text-[10px] text-[#8A8170]">
                    {l.num}
                  </span>
                  {l.label}
                </a>
              ))}
              <CTAButton
                href="#contact"
                className="mt-3 w-full"
                onClick={() => setOpen(false)}
              >
                Contact Us
                <ArrowRight className="h-3.5 w-3.5" />
              </CTAButton>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------
   2. HERO — editorial, asymmetric, big serif, highlighter swipe
---------------------------------------------------------------- */
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
                Insurers use AI to deny claims.
              </h1>
            </MaskReveal>

            <MaskReveal delay={0.25} className="mt-2">
              <h1 className="font-serif text-[44px] font-bold leading-[1.02] tracking-[-0.02em] text-[#14110C] sm:text-[68px] md:text-[88px] md:leading-[0.98]">
                We build AI agents to{" "}
                <Highlight>fight&nbsp;back</Highlight>.
              </h1>
            </MaskReveal>

            <Reveal delay={0.4}>
              <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-[#2A2620]">
                Send us your denied claims. Our autonomous agents read the
                clinical charts, cross-reference payer policies, draft the
                appeal letters, and file them on your behalf.{" "}
                <span className="font-semibold text-[#14110C]">
                  You pay only when revenue is recovered.
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <CTAButton href="#contact" className="px-7 py-4 text-[15px]">
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </CTAButton>
                <CTAButton href="#solution" variant="ghost" className="px-6 py-4 text-[15px]">
                  See how it works
                  <ArrowUpRight className="h-4 w-4" />
                </CTAButton>
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <p className="mt-7 font-mono text-[12px] text-[#8A8170]">
                ↳ No software to learn. No staff to train. We handle the appeal end-to-end.
              </p>
            </Reveal>
          </div>

          {/* Right — live AI appeal letter preview (product demo).
              Held in 3D: pointer tilt like a brief in the hand. */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tilt3D max={3.5} perspective={1200}>
              <div className="relative rounded-sm border-2 border-[#14110C] bg-white shadow-[8px_8px_0_0_#14110C] [transform-style:preserve-3d]">
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

            {/* Filed stamp — anchored below the letter preview */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mt-5 flex items-center gap-3">
                <div className="rotate-[-6deg] rounded-sm border-2 border-[#7A2E2E] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#7A2E2E]">
                  Filed
                </div>
                <div className="font-mono text-[11px] leading-tight text-[#8A8170]">
                  17 appeals filed<br />
                  by our agents this hour
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   3. PROBLEM — oxblood accents, 3-col editorial grid
---------------------------------------------------------------- */
function Problem() {
  const items = [
    {
      icon: FileWarning,
      num: "i.",
      title: "Payers auto-deny",
      body: "Payers use AI to auto-deny high-dollar procedures — often batch-rejecting entire categories of specialty care without a clinician ever reviewing the chart. The denial is the default; the appeal is the exception.",
    },
    {
      icon: Clock,
      num: "ii.",
      title: "Manual appeals are slow",
      body: "Nurses and billing staff spend hours reading 50-page clinical charts just to draft one appeal letter. The math never works: there are more denials than hours in a day, so most go unchallenged.",
    },
    {
      icon: DollarSign,
      num: "iii.",
      title: "Revenue left on the table",
      body: "Clinics leave hundreds of thousands of dollars on the table to un-appealed denials — write-offs that quietly erode margin, capacity, and the ability to invest in care.",
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
                The <em className="font-serif italic font-medium text-[#7A2E2E]">Bureaucratic</em> Bottleneck
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-[17px] leading-relaxed text-[#2A2620]">
                US healthcare loses{" "}
                <span className="font-serif text-2xl font-bold text-[#7A2E2E]">
                  $250B
                </span>{" "}
                annually on administrative friction. Payers weaponize that
                friction with automation. Clinics fight back with sticky notes
                and overtime — a war they cannot win by hand.
              </p>
            </div>
          </div>
        </Reveal>

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[#14110C]/20 bg-[#14110C]/20 md:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group relative h-full bg-[#F4EFE4] p-8 transition-colors hover:bg-[#E8E0CF]">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-sm border border-[#7A2E2E]/30 bg-[#7A2E2E]/10 text-[#7A2E2E]">
                    <item.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-serif text-2xl italic text-[#8A8170]">
                    {item.num}
                  </span>
                </div>
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
   4. SOLUTION — 4-step flow, legal-brief numbering
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
      body: "We generate a legally sound, fully cited appeal letter tailored to the denial reason — and file it on your behalf. No clinician review required.",
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
                From denial to recovered revenue{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 italic">in 3 seconds.</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-[-4px] bottom-1 h-[0.55em] -z-0 bg-[#C5F23D]"
                    style={{ transform: "skewX(-7deg)", opacity: 0.9 }}
                  />
                </span>
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[12px] leading-relaxed text-[#5C5447]">
              Four autonomous steps.<br />Zero work for your team.<br />We handle the
              entire appeal.
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <StaggerItem key={s.num}>
              <div className="group relative h-full rounded-sm border border-[#14110C]/20 bg-[#F4EFE4] p-6 transition-all duration-300 hover:border-[#14110C] hover:bg-[#E8E0CF]">
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
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   5. THE MOAT — INK-BLACK DRAMATIC PANEL, animated constellation
---------------------------------------------------------------- */
function Moat() {
  return (
    <section
      id="moat"
      className="relative scroll-mt-16 overflow-hidden bg-[#14110C] px-6 py-24 sm:py-32"
    >
      {/* Top bleed — ink fades in from parchment (taller, more visible) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, #F4EFE4 0%, rgba(244,239,228,0.7) 30%, rgba(244,239,228,0.3) 60%, transparent 100%)",
        }}
      />
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #C5F23D 1px, transparent 1px), linear-gradient(to bottom, #C5F23D 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 75%)",
        }}
      />
      {/* ambient amber glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-[#E8A317]/15 blur-[120px]"
      />
      {/* Bottom bleed — ink fades out to parchment (taller, more visible) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, #F4EFE4 0%, rgba(244,239,228,0.7) 30%, rgba(244,239,228,0.3) 60%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — copy */}
          <div>
            <Reveal>
              <Eyebrow tone="chartreuse">§ 03 — The Moat</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#F4EFE4] sm:text-[56px]">
                The Payer Denial <em className="font-serif italic font-medium text-[#E8A317]">Rules</em> Graph
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-[17px] leading-relaxed text-[#DDD3BD]/80">
                Every time an appeal is won, Veldarion learns the exact semantic
                triggers that force insurers to capitulate. The more claims we
                process, the higher your approval rate.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-[17px] leading-relaxed text-[#DDD3BD]/80">
                <span className="font-semibold text-[#C5F23D]">
                  Software is easy to copy. A trained agent network is not.
                </span>{" "}
                Each overturned denial becomes a permanent edge in the rules
                graph — compounding knowledge that no payer can defuse and no
                competitor can replicate.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { icon: Network, label: "Win rate grows", value: "+18%" },
                  { icon: Zap, label: "Cycle time", value: "3s" },
                  { icon: TrendingUp, label: "Compounding edge", value: "∞" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-sm border border-[#C5F23D]/20 bg-[#2A2620]/40 p-4 text-center"
                  >
                    <m.icon className="mx-auto h-4 w-4 text-[#C5F23D]" />
                    <div className="mt-2 font-serif text-2xl font-bold text-[#F4EFE4]">
                      {m.value}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-[#DDD3BD]/60">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — constellation graph, in a 3D housing:
              rises from the desk on scroll, then tilts to the
              pointer like a holographic control surface. */}
          <Reveal delay={0.3} className="relative">
            <MoatGraphTilt />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Scroll-tilted + pointer-tilted housing for the rules graph.
   Two composed 3D layers: an entrance rotateX driven by scroll
   (the panel tilts up from the desk as it enters) wrapped around
   a pointer tilt (holographic control-surface feel). */
function MoatGraphTilt() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 35%"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  if (reduce) return <ConstellationGraph />;
  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ rotateX, transformPerspective: 1300 }}
    >
      <Tilt3D max={4.5} perspective={1300}>
        <ConstellationGraph />
      </Tilt3D>
    </motion.div>
  );
}

function ConstellationGraph() {
  const cx = 50;
  const cy = 50;
  /* Round to 3 decimals: Node and the browser can disagree on the
     16th digit of Math.cos/sin, which breaks hydration. At this
     viewBox scale 0.001 units is invisible. */
  const R3 = (n: number) => Math.round(n * 1000) / 1000;
  const polar = (angleDeg: number, r: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: R3(cx + r * Math.cos(rad)), y: R3(cy + r * Math.sin(rad)) };
  };

  /* Inner ring — the 6 payers we appeal against */
  const payers = [
    { id: "cigna", angle: -90, label: "Cigna" },
    { id: "uhc", angle: -30, label: "UHC" },
    { id: "aetna", angle: 30, label: "Aetna" },
    { id: "bcbs", angle: 90, label: "BCBS" },
    { id: "humana", angle: 150, label: "Humana" },
    { id: "cvs", angle: 210, label: "CVS" },
  ].map((p) => ({ ...p, ...polar(p.angle, 26) }));

  /* Outer ring — policy sources we cite */
  const policies = [
    { id: "lcd", angle: -60, label: "LCD" },
    { id: "ncd", angle: 0, label: "NCD" },
    { id: "policy", angle: 60, label: "Policy" },
    { id: "clinical", angle: 120, label: "Clinical" },
    { id: "cms", angle: 180, label: "CMS" },
    { id: "statute", angle: 240, label: "Statute" },
  ].map((p) => ({ ...p, ...polar(p.angle, 43) }));

  /* Curved Bézier from center to a node, control point offset perpendicular */
  const curvedFromCenter = (x: number, y: number, offset: number) => {
    const mx = (cx + x) / 2;
    const my = (cy + y) / 2;
    const dx = x - cx;
    const dy = y - cy;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const px = mx + (-dy / len) * offset;
    const py = my + (dx / len) * offset;
    return `M ${cx} ${cy} Q ${R3(px)} ${R3(py)} ${x} ${y}`;
  };

  /* Curved arc between two ring nodes */
  const arcBetween = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    offset: number,
  ) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const px = mx + (-dy / len) * offset;
    const py = my + (dx / len) * offset;
    return `M ${x1} ${y1} Q ${R3(px)} ${R3(py)} ${x2} ${y2}`;
  };

  const reduce = useReducedMotion() ?? false;

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-[#C5F23D]/15 bg-[#0A0907]">
      {/* Layered ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(197,242,61,0.10), transparent 70%), radial-gradient(ellipse 80% 70% at 50% 50%, rgba(232,163,23,0.06), transparent 75%)",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(232,163,23,0.55)" />
            <stop offset="60%" stopColor="rgba(232,163,23,0.12)" />
            <stop offset="100%" stopColor="rgba(232,163,23,0)" />
          </radialGradient>
          <radialGradient id="coreFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4D88A" />
            <stop offset="55%" stopColor="#E8A317" />
            <stop offset="100%" stopColor="#B8800E" />
          </radialGradient>
          <linearGradient id="edgeInbound" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(197,242,61,0)" />
            <stop offset="50%" stopColor="rgba(197,242,61,0.55)" />
            <stop offset="100%" stopColor="rgba(197,242,61,0.15)" />
          </linearGradient>
        </defs>

        {/* Faint concentric guide rings */}
        <circle
          cx={50}
          cy={50}
          r={26}
          fill="none"
          stroke="rgba(197,242,61,0.07)"
          strokeWidth={0.2}
          strokeDasharray="0.6 1.2"
        />
        <circle
          cx={50}
          cy={50}
          r={43}
          fill="none"
          stroke="rgba(197,242,61,0.05)"
          strokeWidth={0.2}
          strokeDasharray="0.6 1.2"
        />

        {/* Center core radial glow */}
        <circle cx={50} cy={50} r={20} fill="url(#coreGlow)" />

        {/* Outer ring: policy → nearest payer (thin dotted arcs) */}
        {policies.map((p, i) => {
          const payer = payers[i % payers.length];
          return (
            <motion.path
              key={`outer-edge-${i}`}
              d={arcBetween(payer.x, payer.y, p.x, p.y, 5)}
              stroke="rgba(221,211,189,0.22)"
              strokeWidth={0.22}
              fill="none"
              strokeDasharray="0.7 0.7"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.5 + i * 0.07,
                ease: "easeOut",
              }}
            />
          );
        })}

        {/* Inner ring: payer → center (curved Bézier, gradient stroke) */}
        {payers.map((p, i) => (
          <motion.path
            key={`inner-edge-${i}`}
            d={curvedFromCenter(p.x, p.y, i % 2 === 0 ? 2.5 : -2.5)}
            stroke="rgba(197,242,61,0.32)"
            strokeWidth={0.4}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.1,
              delay: 0.2 + i * 0.09,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Inbound data pulses: payer → center (chartreuse — claims arriving) */}
        {!reduce &&
          payers.map((p, i) => (
            <motion.circle
              key={`inbound-${i}`}
              r={0.55}
              fill="#C5F23D"
              initial={{ cx: p.x, cy: p.y, opacity: 0 }}
              animate={{ cx: [p.x, 50], cy: [p.y, 50], opacity: [0, 1, 0] }}
              transition={{
                duration: 2.8,
                delay: 1.2 + i * 0.35,
                repeat: Infinity,
                repeatDelay: 2.2,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* Outbound win signals: center → payer (amber — appeals won) */}
        {!reduce &&
          payers.map((p, i) => (
            <motion.circle
              key={`outbound-${i}`}
              r={0.85}
              fill="#E8A317"
              initial={{ cx: 50, cy: 50, opacity: 0 }}
              animate={{ cx: [50, p.x], cy: [50, p.y], opacity: [0, 1, 0] }}
              transition={{
                duration: 2.2,
                delay: 2.0 + i * 0.45,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* Outer ring: policy nodes */}
        {policies.map((p, i) => (
          <motion.g
            key={p.id}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.6 + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={2.1}
              fill="rgba(10,9,7,0.95)"
              stroke="rgba(221,211,189,0.5)"
              strokeWidth={0.25}
            />
            {!reduce && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={2.1}
                fill="rgba(221,211,189,0.18)"
                animate={{ opacity: [0.18, 0.42, 0.18] }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            <text
              x={p.x}
              y={p.y - 4.2}
              textAnchor="middle"
              fontSize={2.6}
              fontWeight={500}
              fill="#DDD3BD"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {p.label}
            </text>
          </motion.g>
        ))}

        {/* Inner ring: payer nodes */}
        {payers.map((p, i) => (
          <motion.g
            key={p.id}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.15 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* outer halo */}
            <circle
              cx={p.x}
              cy={p.y}
              r={4.8}
              fill="none"
              stroke="rgba(197,242,61,0.18)"
              strokeWidth={0.2}
            />
            {/* payer node body */}
            <circle
              cx={p.x}
              cy={p.y}
              r={3.4}
              fill="rgba(10,9,7,0.95)"
              stroke="rgba(197,242,61,0.55)"
              strokeWidth={0.4}
            />
            <text
              x={p.x}
              y={p.y + 0.9}
              textAnchor="middle"
              fontSize={2.5}
              fontWeight={600}
              fill="#F4EFE4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {p.label}
            </text>
          </motion.g>
        ))}

        {/* Center: Veldarion core */}
        <motion.g
          initial={{ opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Expanding pulse rings emanating from the core */}
          {!reduce &&
            [0, 1, 2].map((i) => (
              <motion.circle
                key={`pulse-ring-${i}`}
                cx={50}
                cy={50}
                fill="none"
                stroke="rgba(232,163,23,0.45)"
                strokeWidth={0.3}
                initial={{ r: 6, opacity: 0.5 }}
                animate={{
                  r: [6, 18, 6],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3.2,
                  delay: i * 1.05,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* Core fill */}
          <circle cx={50} cy={50} r={6.5} fill="url(#coreFill)" />
          <circle
            cx={50}
            cy={50}
            r={6.5}
            fill="none"
            stroke="#F4EFE4"
            strokeWidth={0.45}
          />

          {/* Mini V mark inside the core (brand identity) */}
          <path
            d="M46.2 47.5 L50 53.5 L53.8 47.5 L52.2 47.5 L50 50.8 L47.8 47.5 Z"
            fill="#14110C"
          />

          {/* Labels below the core */}
          <text
            x={50}
            y={62.5}
            textAnchor="middle"
            fontSize={3.2}
            fontWeight={700}
            fill="#F4EFE4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            VELDARION
          </text>
          <text
            x={50}
            y={66.4}
            textAnchor="middle"
            fontSize={2}
            fontWeight={500}
            fill="#A8D11C"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            CORE
          </text>
        </motion.g>
      </svg>

      {/* HUD overlay — telemetry */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 font-mono text-[10px] text-[#DDD3BD]/45">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C5F23D] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C5F23D]" />
            </span>
            rules_graph.live
          </span>
          <span>cycle 4,182</span>
        </div>
        <div className="flex items-center justify-between">
          <span>12 nodes online</span>
          <span>v3.2.0</span>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   6. PRICING — amber-bordered legal fee agreement card
---------------------------------------------------------------- */
function Pricing() {
  const features = [
    "Unlimited appeal generations",
    "EHR integration (Epic, Athena, eClinicalWorks)",
    "Real-time ROI & win-rate dashboard",
    "White-glove onboarding with clinical SMEs",
    "SOC 2 Type II / HIPAA-aligned delivery",
    "Cited, audit-ready appeal letters",
  ];
  return (
    <section id="pricing" className="scroll-mt-16 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center">
            <Eyebrow tone="amber">§ 04 — Pricing</Eyebrow>
            <h2 className="mt-4 font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C] sm:text-[56px]">
              Pure <em className="font-serif italic font-medium text-[#B8800E]">Found</em> Money.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[#2A2620]">
              No seats, no tiers, no SaaS tax. We align incentives by getting
              paid only when you do.
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
                $0 upfront. $0 monthly SaaS fees. If we don&apos;t recover your
                denied claims,{" "}
                <span className="font-semibold text-[#14110C]">
                  you don&apos;t pay us a dime.
                </span>
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
              <CTAButton href="#contact" className="w-full py-4 text-[15px]">
                Contact Us to Begin
                <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <p className="mt-3 text-center font-mono text-[11px] text-[#8A8170]">
                ↳ Send us a denied claim. We handle the appeal end-to-end and file it for you.
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
   7. FINAL CTA — full-bleed chartreuse, ink button + contact card
---------------------------------------------------------------- */

/* Copy-to-clipboard email button — works even when the visitor has no
   mail client configured (webmail users), where mailto: does nothing. */
function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API unavailable (older browsers) — legacy fallback
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 px-5 py-2.5 font-mono text-[12px] font-bold tracking-tight transition-all duration-200 ${
        copied
          ? "border-[#14110C] bg-[#14110C] text-[#C5F23D]"
          : "border-[#14110C]/30 bg-transparent text-[#14110C] hover:border-[#14110C] hover:bg-[#14110C]/5"
      }`}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

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
          <Eyebrow tone="ink">§ 05 — Contact</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-[48px] font-bold leading-[0.98] tracking-[-0.025em] text-[#14110C] sm:text-[80px] sm:leading-[0.95]">
            <em className="font-serif italic font-medium">Stop</em> letting AI deny your claims.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-[#14110C]/80">
            Send us your denied claims. Our agents read the charts, find the
            policy clauses, write the appeals, and file them on your behalf.
            You pay only when revenue is recovered.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton
              href={CONTACT_MAILTO}
              variant="ink"
              className="w-full px-7 py-4 text-[15px] sm:w-auto"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </CTAButton>
            <CTAButton
              href="#solution"
              variant="ghost"
              className="w-full border-[#14110C]/30 px-7 py-4 text-[15px] sm:w-auto"
            >
              See how it works
            </CTAButton>
          </div>
        </Reveal>
        <Reveal delay={0.35}>
          <p className="mt-6 text-center font-mono text-[12px] text-[#14110C]/70">
            ↳ Or email us directly at{" "}
            <a
              href="mailto:hello@veldarion.com"
              className="font-bold underline decoration-[#14110C]/40 underline-offset-2 hover:decoration-[#14110C]"
            >
              hello@veldarion.com
            </a>
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] text-[#14110C]/70">
            <span className="flex items-center gap-1.5">
              <Check className="h-3 w-3" strokeWidth={3} /> HIPAA-aligned
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3 w-3" strokeWidth={3} /> SOC 2 Type II
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3 w-3" strokeWidth={3} /> No long-term
              contract
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   8. FOOTER
---------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="border-t border-[#14110C]/15 bg-[#F4EFE4] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <VeldarionLogo tone="ink" />
        </div>
        <p className="text-center font-mono text-[11px] text-[#8A8170]">
          © 2024 Veldarion. All rights reserved.
        </p>
        <nav className="flex items-center gap-5 font-mono text-[11px] text-[#5C5447]">
          <a href="#" className="transition-colors hover:text-[#14110C]">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-[#14110C]">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-[#14110C]">
            Security
          </a>
        </nav>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------
   Page
---------------------------------------------------------------- */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Rule />
        <Solution />
        <Moat />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
