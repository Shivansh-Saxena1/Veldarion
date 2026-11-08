"use client";

import * as React from "react";
import Link from "next/link";

export interface BlogLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
}

export function BlogLayout({
  children,
  title,
  description,
  breadcrumbs,
}: BlogLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[#F4EFE4]">
      <article className="relative mx-auto max-w-3xl px-6 py-16 sm:py-24 lg:py-32">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-1.5 text-[11px] font-mono uppercase tracking-[0.22em] text-[#8A8170]">
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={b.href}>
                {i > 0 && (
                  <span className="mx-1 text-[#5C5447]" aria-hidden>
                    §
                  </span>
                )}
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-[#14110C]">{b.label}</span>
                ) : (
                  <Link href={b.href} className="transition-colors hover:text-[#14110C]">
                    {b.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {title && (
          <div className="mb-2 border-b border-[#14110C]/15 pb-6">
            <h1 className="font-serif text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#14110C] sm:text-[56px]">
              {title}
            </h1>
          </div>
        )}

        {description && (
          <p className="mb-10 text-[15px] leading-relaxed text-[#2A2620] max-w-2xl">
            {description}
          </p>
        )}

        <div className="article-body">{children}</div>
      </article>
    </div>
  );
}

export function ArticleBody({ html }: { html: string }) {
  return <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />;
}
