/**
 * GA4 Event Tracking Utility
 * Events defined per 10_CONVERSION_AND_ANALYTICS_SPEC.md §3
 * Loads GA4 via gtag from NEXT_PUBLIC_GA_ID environment variable
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Initialize GA4 gtag script
 * Call this once in a client-side layout or component
 */
export function initGA4(): void {
  if (!GA_MEASUREMENT_ID) {
    if (process.env.NODE_ENV === "development") {
      console.log("[GA4] No NEXT_PUBLIC_GA_ID provided — analytics disabled");
    }
    return;
  }

  if (typeof window === "undefined") return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: true,
    anonymize_ip: true,
  });

  // Load gtag script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  if (process.env.NODE_ENV === "development") {
    console.log("[GA4] Initialized with ID:", GA_MEASUREMENT_ID);
  }
}

/**
 * Send a custom event to GA4
 * @param eventName - Event name (snake_case per spec)
 * @param parameters - Event parameters (snake_case)
 */
export function trackEvent(
  eventName: string,
  parameters: Record<string, string | number | boolean> = {}
): void {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) {
    if (process.env.NODE_ENV === "development") {
      console.log("[GA4] Event (dev):", eventName, parameters);
    }
    return;
  }

  // Sanitize parameters: no free-text user input, snake_case keys
  const sanitized: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(parameters)) {
    // Only allow snake_case keys, reject camelCase or free-text
    if (/^[a-z][a-z0-9_]*$/.test(key)) {
      sanitized[key] = value;
    }
  }

  window.gtag("event", eventName, sanitized);

  if (process.env.NODE_ENV === "development") {
    console.log("[GA4] Event:", eventName, sanitized);
  }
}

/**
 * Event tracking helpers per 10_CONVERSION_AND_ANALYTICS_SPEC.md §3
 */

// CTA clicks
export function trackCtaClick(ctaText: string, ctaLocation: string, destination: string): void {
  trackEvent("cta_click", { cta_text: ctaText, cta_location: ctaLocation, destination });
}

// Contact form events
export function trackContactFormStart(formVariant: string): void {
  trackEvent("contact_form_start", { form_variant: formVariant });
}

export function trackContactFormSubmit(formVariant: string, hasMessage: boolean): void {
  trackEvent("contact_form_submit", { form_variant: formVariant, has_message: hasMessage });
}

// Email link clicks
export function trackEmailLinkClick(emailAddress: string): void {
  trackEvent("email_link_click", { email_address: emailAddress });
}

// Resource downloads
export function trackResourceDownload(resourceName: string, gated: boolean): void {
  trackEvent("resource_download", { resource_name: resourceName, gated });
}

// Outbound payer/gov links
export function trackOutboundPayerLink(targetDomain: string): void {
  trackEvent("outbound_payer_link", { target_domain: targetDomain });
}

// Denial code lookup searches
export function trackCodeLookupSearch(code: string): void {
  trackEvent("code_lookup_search", { code: code.toLowerCase() });
}

// Benchmark calculator usage
export function trackCalculatorUse(calcName: string, denialRateBand: string): void {
  trackEvent("calculator_use", { calc_name: calcName, denial_rate_band: denialRateBand });
}

// FAQ expansions
export function trackFaqExpand(pagePath: string): void {
  trackEvent("faq_expand", { page_path: pagePath });
}
