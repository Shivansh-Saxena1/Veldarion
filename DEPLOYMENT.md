# Deploying veldarion.com — GitHub Pages + Free SSL

This guide takes you from zero to a live **https://veldarion.com** with:

- **Free hosting** on GitHub Pages (a static export of the Next.js site — no server needed)
- **Free SSL** (HTTPS), auto-provisioned and auto-renewed by GitHub via Let's Encrypt
- **Automatic deploys** — every `git push` to `main` rebuilds and republishes the site

The repo is already wired up for this. The only things you must do by hand:

1. Create a GitHub repository and push the code (10 min)
2. Flip two settings in the GitHub UI (2 min)
3. Add DNS records where you bought veldarion.com (5 min)
4. Wait for DNS + SSL to propagate (usually under an hour; worst case 24 h)

---

## What's already in the repo

| File | Purpose |
|---|---|
| `.github/workflows/deploy.yml` | GitHub Actions workflow: installs deps, runs the static export build, publishes `out/` to GitHub Pages on every push to `main` |
| `public/CNAME` | Contains `veldarion.com` — binds the custom domain to the Pages site |
| `public/sitemap.xml` + `robots.txt` | SEO basics for the live domain |
| `next.config.ts` | `NEXT_OUTPUT_MODE=export` switches the build to `output: "export"` (pure static site in `out/`) |
| `package.json` | `npm run build:pages` — the static build command used by the workflow |

The static export has been tested end-to-end: all sections (hero + 3D terrain, payer rules graph, pricing, contact) render, fonts are self-hosted, zero console errors, and `out/CNAME` ships in the published artifact.

---

## Step 1 — Create the GitHub repository

1. Sign up / log in at **https://github.com** (a free account is all you need).
2. Click **+** (top right) → **New repository**.
3. Settings:
   - **Repository name**: `veldarion.com` (any name works — this one is just descriptive)
   - **Visibility**: **Public** — GitHub Pages is free for public repos. (Private repos need a paid GitHub plan for Pages. This is a marketing landing page, so public is normal and fine.)
   - Do **not** tick "Add a README" / ".gitignore" / "license" — the project already has them.
4. Click **Create repository**.

---

## Step 2 — Push the code

On your machine (with [Git](https://git-scm.com/downloads) installed), from inside the unzipped project folder:

```bash
cd veldarion            # the folder containing package.json
git init
git add .
git commit -m "Veldarion landing page — initial deploy"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/veldarion.com.git
git push -u origin main
```

Replace `<YOUR_USERNAME>` with your GitHub username. If you cloned with SSH, use `git@github.com:<YOUR_USERNAME>/veldarion.com.git` instead.

> The included `.gitignore` already excludes `node_modules/`, `.next/`, `out/`, `.env*`, and logs — so `git add .` is safe. To verify before pushing: `git status` should list source files only.

---

## Step 3 — Enable GitHub Pages (GitHub Actions mode)

1. In your repo: **Settings** → left sidebar **Pages**.
2. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not "Deploy from a branch").
3. Done. The workflow from `.github/workflows/deploy.yml` runs automatically on every push to `main` — check the **Actions** tab: the "Deploy to GitHub Pages" run should go green within a few minutes of your first push.

Your site is now live at `https://<YOUR_USERNAME>.github.io/veldarion.com/` — it may look unstyled at that URL (assets expect the domain root). That's expected and fixed by the next step.

---

## Step 4 — Connect the custom domain veldarion.com

Still in **Settings → Pages**, under **Custom domain**:

1. Type `veldarion.com` and click **Save**.
2. GitHub immediately starts checking DNS. It will show a DNS check spinner until your records (next step) propagate.

---

## Step 5 — Add DNS records at your domain registrar

Log in to wherever you bought **veldarion.com** (GoDaddy, Namecheap, Google Domains/Squarespace, Cloudflare, etc.) and open its **DNS management** page. Remove any default/parking records the registrar created, then add:

| Type | Host / Name | Value | TTL |
|---|---|---|---|
| `A` | `@` | `185.199.108.153` | default / 600 |
| `A` | `@` | `185.199.109.153` | default / 600 |
| `A` | `@` | `185.199.110.153` | default / 600 |
| `A` | `@` | `185.199.111.153` | default / 600 |
| `CNAME` | `www` | `<YOUR_USERNAME>.github.io` | default / 600 |

Notes:

- `@` means the root domain `veldarion.com`. All **four** A records are required — GitHub serves Pages from four IP addresses.
- The `www` CNAME makes `https://www.veldarion.com` work; GitHub automatically redirects it to `https://veldarion.com`.
- Some registrars call the Host field "Name", and some pre-fill the domain (so you'd type just `www` instead of `www.veldarion.com`). For the A records leave the host empty or type `@`.
- If your registrar supports **ALIAS/ANAME** records at the root, you may use one ALIAS → `<YOUR_USERNAME>.github.io` instead of the four A records. The A-record approach above works everywhere.

You can verify propagation from a terminal:

```bash
dig +short veldarion.com A          # should list the four 185.199.x.x IPs
dig +short www.veldarion.com CNAME  # should show <YOUR_USERNAME>.github.io
```

---

## Step 6 — Free SSL (HTTPS)

GitHub automatically provisions a Let's Encrypt certificate for `veldarion.com` (and `www.veldarion.com`) once the DNS check in Step 4 turns green. You don't request or pay for anything.

1. Back in **Settings → Pages**, wait until the message next to your custom domain shows **a green check mark** ("DNS check was successful"). This can take from a few minutes to a few hours after your DNS changes.
2. Once the check passes, tick **Enforce HTTPS**. If it's greyed out, the certificate is still being issued — check again in ~15–60 minutes.
3. Done. `https://veldarion.com` is live with a padlock. The certificate auto-renews; HTTPS redirects are enforced.

---

## Step 7 — Verify

Visit **https://veldarion.com** (hard-refresh: Ctrl/Cmd+Shift+R). You should see the full site: hero with the 3D terrain, payer rules graph, pricing, and contact section. Also check `https://www.veldarion.com` redirects to the apex domain.

From now on, **every `git push` to `main` redeploys the site automatically** (Actions tab shows each run, typically 2–4 minutes).

---

## Important — make hello@veldarion.com actually receive email

The site's Contact CTAs are `mailto:hello@veldarion.com`. Buying the domain does **not** give you email — until you set up mail routing, messages sent there vanish. Free options:

- **Cloudflare Email Routing** — free, unlimited, forwards `hello@veldarion.com` (and a wildcard `*@veldarion.com`) to your personal inbox. Requires moving the domain's DNS to Cloudflare (free plan).
- **ImprovMX** — free forwarding with no DNS migration: point your domain's MX records at ImprovMX per their setup page, then forward to any inbox.
- Your **registrar** may include free email forwarding (Namecheap and Porkbun do, for example) — check its dashboard.

Any of these takes ~10 minutes. Until then, consider the contact CTA a placeholder.

---

## Troubleshooting

| Symptom | Cause & fix |
|---|---|
| Actions run is red | Open the failed run in the **Actions** tab and read the failing step. Most common: lockfile out of sync — run `npm install` locally, commit the updated `package-lock.json`, push again. |
| Site 404s at `username.github.io/veldarion.com/` | **Settings → Pages → Source** must be **GitHub Actions**, and the latest workflow run must be green. |
| Page loads but looks unstyled at the `github.io` URL | Normal before the custom domain is attached — asset URLs expect the domain root. Finish Steps 4–6, or preview correctly with `NEXT_PUBLIC_BASE_PATH=/veldarion.com` added to the workflow's build env. |
| Custom domain DNS check never turns green | Verify the records with `dig` (Step 5). Typical causes: a leftover A record from the registrar's parking page, or only some of the four IPs added. DNS changes can take up to 24 h to propagate (usually minutes). |
| "Enforce HTTPS" stays greyed out | The certificate isn't issued yet — it can take up to an hour after the DNS check passes. Re-check later; don't delete the domain entry. |
| HTTPS warning ("certificate mismatch") | You're visiting `www.veldarion.com` before its record propagated, or the CNAME is missing. Confirm the `www` record, wait, and hard-refresh. |
| An old version of the site is showing | GitHub's CDN cache — wait ~5 minutes or hard-refresh. The Actions run finishing means the new version is deployed. |
| You see "There isn't a GitHub Pages site here" | The custom domain is set in Settings but DNS doesn't point at GitHub yet — finish Step 5. |

---

## Reference — how the pipeline works

```
git push to main
   └─ GitHub Actions (deploy.yml)
        ├─ npm ci
        ├─ NEXT_OUTPUT_MODE=export npm run build:pages   → static site in out/
        ├─ verify out/index.html + out/CNAME exist
        ├─ upload out/ as the Pages artifact
        └─ deploy to GitHub Pages
              └─ served at veldarion.com (A records) / www (CNAME)
                     └─ GitHub auto-issues Let's Encrypt cert → Enforce HTTPS
```

DNS reference (GitHub Pages):

- Apex A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `www` CNAME: `<YOUR_USERNAME>.github.io`

If GitHub's IPs ever change, they're published at https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site — re-checking once a year is more than enough.
