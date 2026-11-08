"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Menu, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { VeldarionLogo } from "@/components/veldarion/homepage-elements";
import { CTAButton } from "@/components/veldarion/homepage-elements";

/* ------------------------------------------------------------------ */
/*  Navigation routes                                                 */
/* ------------------------------------------------------------------ */

const PRIMARY_LINKS = [
  { label: "Home", href: "/", num: "§00" },
  { label: "Solutions", href: "/solutions", num: "§01" },
  { label: "How It Works", href: "/how-it-works", num: "§02" },
  { label: "Insights", href: "/insights", num: "§03" },
  { label: "About", href: "/about", num: "§04" },
  { label: "Contact", href: "/contact", num: "§05" },
] as const;

const SECONDARY_LINKS = [
  { label: "Specialties", href: "/specialties", num: "§06" },
  { label: "FAQ", href: "/faq", num: "§07" },
] as const;

/* ------------------------------------------------------------------ */
/*  Navbar                                                            */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion() ?? false;

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  return (
    <header className="sticky top-0 z-50">
      <div
        className="border-b border-[#14110C]/15 bg-[#F4EFE4]/85 backdrop-blur-md"
        style={{
          boxShadow: "0 1px 0 0 rgba(20,17,12,0.04) inset",
        }}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="inline-flex" aria-label="Veldarion homepage">
            <VeldarionLogo tone="ink" />
          </Link>

          {/* Desktop primary links */}
          <div className="hidden items-center gap-7 md:flex">
            {PRIMARY_LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cnLink(
                    "group flex items-baseline gap-1.5 text-[13px] font-medium transition-colors",
                    active
                      ? "text-[#14110C]"
                      : "text-[#5C5447] hover:text-[#14110C]",
                    active && "font-semibold"
                  )}
                >
                  <span
                    className={cnLink(
                      "font-mono text-[10px] transition-colors",
                      active
                        ? "text-[#A8D11C]"
                        : "text-[#8A8170] group-hover:text-[#A8D11C]"
                    )}
                  >
                    {l.num}
                  </span>
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <CTAButton
              href="/contact"
              className="px-5 py-2.5 text-[12px]"
              aria-label="Contact Veldarion"
            >
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
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: reduce ? 0.01 : 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden border-t border-[#14110C]/15 bg-[#F4EFE4]/95 backdrop-blur-md md:hidden"
            >
              <div className="space-y-1 px-6 py-4">
                {PRIMARY_LINKS.map((l) => {
                  const active = isActive(l.href);
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cnLink(
                        "flex items-baseline gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-[#14110C]/5 text-[#14110C]"
                          : "text-[#14110C] hover:bg-[#14110C]/5"
                      )}
                    >
                      <span
                        className={cnLink(
                          "font-mono text-[10px] transition-colors",
                          active ? "text-[#A8D11C]" : "text-[#8A8170]"
                        )}
                      >
                        {l.num}
                      </span>
                      {l.label}
                    </Link>
                  );
                })}
                <div className="mt-4 pt-4 border-t border-[#14110C]/10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8A8170] mb-3">
                    Also
                  </p>
                  {SECONDARY_LINKS.map((l) => {
                    const active = isActive(l.href);
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={cnLink(
                          "flex items-baseline gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-[#14110C]/5 text-[#14110C]"
                            : "text-[#14110C] hover:bg-[#14110C]/5"
                        )}
                      >
                        <span
                          className={cnLink(
                            "font-mono text-[10px] transition-colors",
                            active ? "text-[#A8D11C]" : "text-[#8A8170]"
                          )}
                        >
                          {l.num}
                        </span>
                        {l.label}
                      </Link>
                    );
                  })}
                </div>
                <CTAButton
                  href="/contact"
                  className="mt-4 w-full"
                  onClick={() => setOpen(false)}
                >
                  Contact Us
                  <ArrowRight className="h-3.5 w-3.5" />
                </CTAButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------
   Footer                                                            */
  /* ------------------------------------------------------------------ */

const FOOTER_PRIMARY = [
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Insights", href: "/insights" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

const FOOTER_LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[#14110C]/15 bg-[#F4EFE4] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          {/* Brand */}
          <div className="flex flex-col items-center text-center sm:text-left sm:items-start">
            <VeldarionLogo tone="ink" className="mb-4" />
            <p className="font-mono text-[11px] text-[#8A8170] leading-relaxed max-w-xs">
              Veldarion reviews denied medical claims and prepares
              appeal documentation for specialty clinics. You pay only when
              revenue is recovered.
            </p>
          </div>

          {/* Primary links */}
          <div className="hidden sm:grid sm:grid-cols-2 sm:gap-8">
            <nav className="flex flex-col gap-2 sm:gap-3">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5C5447] mb-4">
                Product
              </h3>
              {FOOTER_PRIMARY.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-mono text-[11px] text-[#5C5447] transition-colors hover:text-[#14110C]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-2 sm:gap-3">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5C5447] mb-4">
                Legal
              </h3>
              {FOOTER_LEGAL.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-mono text-[11px] text-[#5C5447] transition-colors hover:text-[#14110C]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA + contact */}
          <div className="flex flex-col items-center gap-4 sm:items-end sm:text-right">
            <CTAButton href="/contact" className="px-6 py-3 text-[13px]">
              Contact Us
              <ArrowRight className="h-3.5 w-3.5" />
            </CTAButton>
            <a
                          href={`mailto:shivansh@veldarion.com?subject=Veldarion%20inquiry`}
                          className="font-mono text-[11px] text-[#14110C] underline decoration-[#14110C]/40 underline-offset-4 transition-colors hover:decoration-[#14110C]"
                        >
                          shivansh@veldarion.com
                        </a>
          </div>
        </div>

        <div className="mt-10 border-t border-[#14110C]/15 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-[11px] text-[#8A8170]">
            © {new Date().getFullYear()} Veldarion. All rights reserved.
          </p>
          <nav className="flex items-center gap-6 font-mono text-[11px] text-[#5C5447]">
            {FOOTER_LEGAL.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-[#14110C]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Small utils                                                       */
/* ------------------------------------------------------------------ */

function cnLink(
  base: string,
  conditional: string,
  extra?: string
): string {
  const parts = [base, conditional];
  if (extra) parts.push(extra);
  return parts.filter(Boolean).join(" ");
}

export type { PRIMARY_LINKS, SECONDARY_LINKS };
