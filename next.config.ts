import type { NextConfig } from "next";

/*
  Two build modes:

  1. Default (dev / self-host):
       next build            -> output: "standalone" (server deployment)

  2. GitHub Pages (static export):
       NEXT_OUTPUT_MODE=export next build
                             -> output: "export", static site written to ./out
       Used by .github/workflows/deploy.yml.
       Also sets a separate distDir (.next-export) so a local export test
       never clobbers the dev server's .next cache.

  Optional: NEXT_PUBLIC_BASE_PATH=/repo-name
       Only needed if you want to preview the site at
       https://<username>.github.io/<repo-name>/ BEFORE the custom domain
       (veldarion.com) is connected. Leave unset for the live domain.
*/
const isExport = process.env.NEXT_OUTPUT_MODE === "export";

const nextConfig: NextConfig = {
  output: isExport ? "export" : "standalone",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Optional: redirect export build cache so a local export test never
  // clobbers the dev server's .next cache. NOTE: when a custom distDir is
  // set, Next.js writes the final static site INTO the distDir instead of
  // ./out — so only use this for local testing, never in CI.
  ...(isExport && process.env.NEXT_EXPORT_DIST_DIR
    ? { distDir: process.env.NEXT_EXPORT_DIST_DIR }
    : {}),
};

export default nextConfig;
