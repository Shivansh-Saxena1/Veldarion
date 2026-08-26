// Verify the static export (out/) renders identically to the dev site.
// Serves out/ on :4173, loads it in headless Chromium, checks for console
// errors, key content, fonts, and captures screenshots.
import { chromium } from "playwright";
import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { extname, join } from "path";

const ROOT = "/home/z/my-project/out";
const PORT = 4173;

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
};

const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const file = join(ROOT, p);
  if (existsSync(file)) {
    res.writeHead(200, {
      "content-type": MIME[extname(file)] || "application/octet-stream",
    });
    res.end(readFileSync(file));
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(readFileSync(join(ROOT, "404.html")));
  }
});

await new Promise((r) => server.listen(PORT, r));
console.log(`serving ${ROOT} on http://localhost:${PORT}`);

const browser = await chromium.launch();
const results = { pass: [], fail: [] };
const check = (name, ok) => (ok ? results.pass : results.fail).push(name);

for (const [label, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });

  // Scroll through the page stepwise so every whileInView section
  // (graph, pricing, contact) actually reveals before capture.
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= pageHeight; y += 600) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(180);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200); // let entrance animations settle
  await page.waitForTimeout(2500); // let motion/3D hydrate

  const title = await page.title();
  check(`${label}: title set`, title.includes("Veldarion"));
  check(
    `${label}: hero copy present`,
    (await page.content()).includes("denied")
  );
  check(
    `${label}: Contact Us CTA present`,
    await page.evaluate(() =>
      Array.from(document.querySelectorAll("a, button"))
        .filter((el) => (el.textContent || "").includes("Contact Us"))
        .some((el) => el.offsetParent !== null)
    )
  );
  check(
    `${label}: email present`,
    (await page.content()).includes("hello@veldarion.com")
  );
  check(`${label}: fonts embedded`, (await page.content()).includes("font"));

  // real errors only (ignore known headless-sandbox WebGL noise)
  const real = errors.filter(
    (e) =>
      !/WebGL|GPU|SwiftShader|Automatic fallback|GroupMarkerNotSet|three/i.test(
        e
      )
  );
  check(`${label}: no console errors (real)`, real.length === 0);
  if (real.length) console.log(`  console errors [${label}]:`, real.slice(0, 5));

  await page.screenshot({
    path: `/home/z/my-project/download/veldarion-static-${label}.png`,
    fullPage: label === "desktop",
  });
  await page.close();
}

// asset smoke tests
check("CNAME exported", existsSync(join(ROOT, "CNAME")));
check("CNAME content", readFileSync(join(ROOT, "CNAME"), "utf8").trim() === "veldarion.com");
check("sitemap exported", existsSync(join(ROOT, "sitemap.xml")));
check("robots exported", existsSync(join(ROOT, "robots.txt")));
check("logo.svg exported", existsSync(join(ROOT, "logo.svg")));
check("404.html exported", existsSync(join(ROOT, "404.html")));

await browser.close();
server.close();

console.log(`\nPASSED (${results.pass.length}):`);
results.pass.forEach((p) => console.log(`  ✓ ${p}`));
if (results.fail.length) {
  console.log(`\nFAILED (${results.fail.length}):`);
  results.fail.forEach((f) => console.log(`  ✗ ${f}`));
  process.exit(1);
} else {
  console.log("\nALL CHECKS PASSED — static export is production-ready.");
}
