"use client";

import { useEffect } from "react";
import { initGA4 } from "@/lib/analytics/ga4";

/**
 * GA4 Provider - Initializes GA4 on client-side mount
 * Wrap the application root or include in layout
 */
export function GA4Provider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initGA4();
  }, []);

  return <>{children}</>;
}
