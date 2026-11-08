"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Check,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

/* ================================================================
   VELDARION SHARED ELEMENTS — extracted from homepage
   Parchment + India Ink + Electric Chartreuse + Amber Gold + Oxblood
   Fraunces × Inter Tight × JetBrains Mono
==================================================================== */

export const C = {
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

/* ------------------------------------------------------------------ */
/*  Logo                                                              */
/* ------------------------------------------------------------------ */

export function VeldarionMark({
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
      <path d="M7 14 L20 34 L33 14 L28 14 L20 26 L12 14 Z" fill={fg} />
      <path d="M20 4 L27 14 L13 14 Z" fill={fg} />
    </svg>
  );
}

export function VeldarionLogo({
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

/* ------------------------------------------------------------------ */
/*  Motion primitives                                                 */
/* ------------------------------------------------------------------ */

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

export function Reveal({
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
};

export function StaggerGroup({
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

export function StaggerItem({
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
      variants={staggerChild}
      custom={reduce}
    >
      {children}
    </motion.div>
  );
}

export function MaskReveal({
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

/* ------------------------------------------------------------------ */
/*  Eyebrow label                                                     */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: "ink" | "chartreuse" | "amber" | "oxblood";
}) {
  const toneClass: Record<string, string> = {
    ink: "text-[#5C5447]",
    chartreuse: "text-[#A8D11C]",
    amber: "text-[#B8800E]",
    oxblood: "text-[#9C3D3D]",
  };
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.22em] ${toneClass[tone] ?? toneClass.ink}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA button                                                        */
/* ------------------------------------------------------------------ */

export function CTAButton({
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
  const styles: Record<string, string> = {
    primary: `bg-[#C5F23D] text-[#14110C] hover:bg-[#A8D11C] shadow-[0_4px_0_0_rgba(20,17,12,1)] hover:shadow-[0_2px_0_0_rgba(20,17,12,1)] hover:translate-y-[2px]`,
    ink: `bg-[#14110C] text-[#F4EFE4] hover:bg-[#2A2620] shadow-[0_4px_0_0_rgba(168,209,28,1)] hover:shadow-[0_2px_0_0_rgba(168,209,28,1)] hover:translate-y-[2px]`,
    ghost: `border border-[#14110C]/20 bg-transparent text-[#14110C] hover:border-[#14110C]/50 hover:bg-[#14110C]/5`,
  };
  const motionProps = {
    whileHover: { scale: 1.015 },
    whileTap: { scale: 0.985 },
    transition: { type: "spring", stiffness: 500, damping: 25 },
    className: `${base} ${styles[variant]} ${className}`,
  } as const;
  if (href) {
    // Use motion.a for all links including mailto
    return (
      <motion.a href={href} {...motionProps}>
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

/* ------------------------------------------------------------------ */
/*  Highlighter swipe                                                 */
/* ------------------------------------------------------------------ */

export function Highlight({
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

/* ------------------------------------------------------------------ */
/*  Section divider                                                   */
/* ------------------------------------------------------------------ */

export function Rule() {
  return (
    <div className="mx-auto flex max-w-7xl items-center gap-4 px-6">
      <div className="h-px flex-1 bg-[#14110C]/15" />
      <div className="h-1.5 w-1.5 rotate-45 bg-[#A8D11C]" />
      <div className="h-px flex-1 bg-[#14110C]/15" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page heading block (eyebrow + H1 + intro)                         */
/* ------------------------------------------------------------------ */

export function PageHeading({
  eyebrow,
  title,
  titleClass,
  intro,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  titleClass?: string;
  intro?: ReactNode;
}) {
  return (
    <div className="mb-10">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1
        className={[
          "mt-4 font-serif font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C]",
          titleClass || "text-[42px] sm:text-[56px]",
        ].join(" ")}
      >
        {title}
      </h1>
      {intro && (
        <p className="mt-6 text-[17px] leading-relaxed text-[#2A2620] max-w-3xl">
          {intro}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Link list helper (for footer / resource lists)                    */
/* ------------------------------------------------------------------ */

export interface NavLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export function LinkList({ items }: { items: NavLinkItem[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.href}>
          {item.external ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-[#5C5447] transition-colors hover:text-[#14110C] flex items-center gap-1.5"
            >
              {item.label}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          ) : (
            <Link
              href={item.href}
              className="font-mono text-[11px] text-[#5C5447] transition-colors hover:text-[#14110C]"
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
