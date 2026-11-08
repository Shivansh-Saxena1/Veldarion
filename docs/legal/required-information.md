# VELDARION LEGAL DOCUMENTS — REQUIRED INFORMATION REGISTER

**Source:** Part B Missing Information Register (30 items)  
**Purpose:** Track every item requiring confirmation before legal document publication  
**Rule:** No document may go live containing any placeholder. Part E §9 is the completion checklist.

---

## 1. LEGAL ENTITY & CONTACT INFORMATION

| # | Item | Placeholder(s) | Why Required | Verified? | Source | Status | Action Needed |
|---|------|----------------|--------------|-----------|--------|--------|---------------|
| 1 | Legal entity name (sole proprietorship trade name) | `[LEGAL ENTITY NAME — TO CONFIRM]` | Contract formation; BAA validity; all preambles | ❌ | Proprietorship registration / GST certificate | **BLOCKER** | Obtain registration docs showing trade name |
| 2 | Proprietor name | `[PROPRIETOR NAME — TO CONFIRM]` | Contracting party identification; BAA signatory | ❌ | PAN / GST / Udyam certificate | **BLOCKER** | Confirm from registration docs |
| 3 | Registered business address (India) | `[REGISTERED BUSINESS ADDRESS — TO CONFIRM]` | Legal notices; Indian tax/GST display; consumer disclosure norms | ❌ | Utility bill/rental agreement matching registration | **BLOCKER** | Obtain registered address proof |
| 4 | Business form decision (Pvt Ltd/LLP vs. sole prop) | Affects all preambles | Liability posture; contracting party; investor readiness | ❌ | Decision memo; incorporation docs if converting | **BLOCKER** | Decide before PHI processing launch |
| 5 | Legal contact email | `[LEGAL CONTACT EMAIL — TO CONFIRM]` | Contract notices; BAA/DPA/ToS notices; legal process | ❌ | Working mailbox with tested intake | **BLOCKER** | Provision & test mailbox |
| 6 | Privacy contact email | `[PRIVACY CONTACT EMAIL — TO CONFIRM]` | Privacy requests; grievances; DPDP grievance officer | ❌ | Working mailbox (may equal legal) | **BLOCKER** | Provision & test mailbox |
| 7 | Data protection contact (India DPDP) | `[DATA PROTECTION CONTACT — TO CONFIRM]` | DPDP Act grievance officer requirement | ❌ | Named individual + contact | **BLOCKER** | Designate & document |

---

## 2. AI PROCESSING CONFIGURATION

| # | Item | Placeholder(s) | Why Required | Verified? | Source | Status | Action Needed |
|---|------|----------------|--------------|-----------|--------|--------|---------------|
| 8 | AI provider product & tier | `[AI PROCESSING PROVIDER & TIER — TO CONFIRM]` | **Critical:** PHI may only go to BAA-covered provider (Part A §A.10) | ❌ | API endpoint; billing account; Google Cloud BAA confirmation | **CRITICAL BLOCKER** | Migrate to Vertex AI/Agent Platform + execute Google Cloud BAA |
| 9 | Training-use prohibition confirmed | Privacy Policy §11 standard | Provider terms must forbid training on submitted content | ❌ | Provider terms review | **BLOCKER** | Verify Vertex AI/Cloud terms |

---

## 3. INFRASTRUCTURE & SUBPROCESSORS

| # | Item | Placeholder(s) | Why Required | Verified? | Source | Status | Action Needed |
|---|------|----------------|--------------|-----------|--------|--------|---------------|
| 10 | Hosting provider & region(s) | `[HOSTING PROVIDER & REGION(S) — TO CONFIRM]` | First subprocessor; transfer disclosures; BAA Exhibit 3 | ❌ | Invoice/console; architecture diagram | **BLOCKER** | Document production hosting |
| 11 | Database/storage provider & region(s) | `[DATABASE / STORAGE PROVIDER & REGION(S) — TO CONFIRM]` | PHI at rest safeguards; encryption; BAA flow-down | ❌ | Console config; encryption settings | **BLOCKER** | Document storage layer |
| 12 | Email service provider | `[EMAIL SERVICE PROVIDER — TO CONFIRM]` | Transactional email; PHI-in-email risk | ❌ | Email architecture; sample emails | **BLOCKER** | Document email provider |
| 13 | Analytics/cookie provider(s) | `[ANALYTICS / COOKIE PROVIDER(S) — TO CONFIRM]` | Cookie notice decision; MHMDA tracker risk | ❌ | Cookie scan output | **BLOCKER** | Scan & document |
| 14 | Payment processor | `[PAYMENT PROCESSOR — TO CONFIRM]` | Contingency fee collection; subprocessor | ❌ | Payment flow; processor agreement | **BLOCKER** | Document payment flow |
| 15 | Complete subprocessor list | `[SUBPROCESSOR LIST — TO CONFIRM]` + URL | Privacy Policy §13; BAA Exhibit 3; DPA Annex 2 | ❌ | Vendor inventory with data-access mapping | **BLOCKER** | Complete inventory + flow-down agreements |

---

## 4. DATA LIFECYCLE

| # | Item | Placeholder(s) | Why Required | Verified? | Source | Status | Action Needed |
|---|------|----------------|--------------|-----------|--------|--------|---------------|
| 16 | Document/upload storage location & mechanics | (informs retention) | Retention accuracy; deletion feasibility | ❌ | Storage schema/architecture doc | **BLOCKER** | Document storage architecture |
| 17 | Retention period (documents, extracted data, outputs) | `[DATA RETENTION PERIOD — TO CONFIRM]` | Privacy Policy §15; ToS §23; BAA §9; customer BAAs require it | ❌ | Written retention policy; backup config | **BLOCKER** | Define & implement retention policy |
| 18 | Deletion procedure & timeline | `[DELETION PROCEDURE & TIMELINE — TO CONFIRM]` | "Delete" claims must be operationally true | ❌ | Runbook; test evidence | **BLOCKER** | Implement deletion jobs + test |
| 19 | Backup retention period | `[BACKUP RETENTION PERIOD — TO CONFIRM]` | Deletion claims must account for backups | ❌ | Backup policy; last restore test | **BLOCKER** | Define backup expiry |

---

## 5. SECURITY PROGRAM

| # | Item | Placeholder(s) | Why Required | Verified? | Source | Status | Action Needed |
|---|------|----------------|--------------|-----------|--------|--------|---------------|
| 20 | Authentication mechanism & MFA status | (informs safeguards) | Access control; subprocessor question | ❌ | Auth architecture; screenshots | **BLOCKER** | Document auth + implement MFA |
| 21 | PHI in logs/error trackers/monitoring | (informs safeguards) | PHI-in-logs = Security Rule finding | ❌ | Log samples (redacted); logging config | **BLOCKER** | Review & scrub PHI from logs |
| 22 | Access controls: roles, least privilege, admin logging | (informs safeguards) | Security Rule 164.312(a) | ❌ | IAM policy export | **BLOCKER** | Document access control model |
| 23 | Encryption in transit (TLS) & at rest | (informs safeguards) | Required safeguard statements | ❌ | TLS scan; storage encryption config | **BLOCKER** | Verify & document encryption |
| 24 | Documented security risk analysis | (informs safeguards) | 164.308(a)(1)(ii)(A) — most-cited OCR deficiency | ❌ | Dated risk-analysis document | **BLOCKER** | Perform & document risk analysis |
| 25 | Incident response plan & breach notification workflow | `[BREACH NOTIFICATION TIMELINE — TO CONFIRM]` | BA→customer notification; DPDP Board intimation | ❌ | IR plan; tabletop exercise record | **BLOCKER** | Create IR plan; define timeline |
| 26 | Human reviewers/QA staff access to customer docs | (informs safeguards) | Workforce safeguards; offshore disclosure | ❌ | Access-control matrix; training records | **BLOCKER** | Document reviewer access + training |

---

## 6. COMMERCIAL & OPERATIONAL

| # | Item | Placeholder(s) | Why Required | Verified? | Source | Status | Action Needed |
|---|------|----------------|--------------|-----------|--------|--------|---------------|
| 27 | Cyber liability / tech E&O insurance | N/A (affects liability cap sizing) | Customer security reviews; insurance limits | ❌ | Policy declarations page | High Priority | Bind policies sized to PHI scenarios |
| 28 | Customer onboarding: BAA execution before PHI upload | N/A (functional gating) | **Publication blocker C-2** | ❌ | Screenshots/workflow spec | **CRITICAL BLOCKER** | Implement `baa_on_file` flag + gating |
| 29 | Pricing terms: contingency fee mechanics | `[PRICING / ORDER FORM TERMS — TO CONFIRM]` | "10% of recovered revenue" needs defined measurement | ❌ | Commercial policy; draft order form | **BLOCKER** | Define "Recovered Revenue" + audit mechanics |
| 30 | Operating model: Veldarion submits appeals? | Affects ToS §7/§15, Disclaimer §C | UPL/adjuster/representative exposure | ❌ | Decision memo; workflow spec | **CRITICAL BLOCKER** | Reconcile site copy to review-and-submit model |
| 31 | Governing law / dispute forum selection | `[GOVERNING LAW / DISPUTE FORUM — LEGAL REVIEW REQUIRED]` | ToS §33/§34; must mirror in MSA/BAA/DPA | ❌ | Counsel decision (Option A or B) | **BLOCKER** | Select with counsel |
| 32 | Liability floor amount | `[USD 10,000 — CONFIRM BEFORE PUBLICATION]` | ToS §29 floor; counsel review vs. insurance | ❌ | Counsel + insurance limits | **BLOCKER** | Confirm with counsel |

---

## 7. PLACEHOLDER-TO-DOCUMENT MAPPING

| Placeholder | Privacy Policy | Disclaimer | Terms of Service | BAA Template | DPA Template |
|---|---|---|---|---|---|
| `[LEGAL ENTITY NAME]` | §1, §26 | Header, §G | §2, §38 | Preamble, §14 | Preamble, §13 |
| `[PROPRIETOR NAME]` | §1 | — | §2 | Preamble | — |
| `[REGISTERED BUSINESS ADDRESS]` | §1, §26 | §G | §2, §38 | Preamble, §14 | Preamble |
| `[LEGAL CONTACT EMAIL]` | §19, §26 | §G | §6, §11, §38, §41 | §14 | §13 |
| `[PRIVACY CONTACT EMAIL]` | §1, §18, §26 | — | §38 | — | — |
| `[DATA PROTECTION CONTACT]` | §21, §26 | — | — | — | — |
| `[EFFECTIVE DATE]` / `[LAST UPDATED]` | Header | Header | Header | — | — |
| `[AI PROCESSING PROVIDER & TIER]` | §11 | — | §18 | Exhibit 3 | Annex 2 |
| `[HOSTING PROVIDER & REGION(S)]` | §13 table | — | — | Exhibit 3 | Annex 2 |
| `[DATABASE / STORAGE PROVIDER & REGION(S)]` | §13 table | — | — | Exhibit 3 | Annex 2 |
| `[EMAIL SERVICE PROVIDER]` | §13 table | — | — | Exhibit 3 | Annex 2 |
| `[ANALYTICS / COOKIE PROVIDER(S)]` | §13 table, §17 | — | — | — | Annex 2 |
| `[PAYMENT PROCESSOR]` | §13 table | — | §24 (indirect) | — | — |
| `[SUBPROCESSOR LIST]` / URL | §13, §13 table | — | §18 | Exhibit 3 | Annex 2 |
| `[DATA RETENTION PERIOD]` | §15 | — | §23 | §9 | §9 |
| `[DELETION PROCEDURE & TIMELINE]` | §15 | — | §23 | §9 | §9 |
| `[BACKUP RETENTION PERIOD]` | §15 | — | §23 | §9 | §9 |
| `[SECURITY SAFEGUARDS]` | §16 | — | §31 (indirect) | Exhibit 2 | Annex 1 |
| `[BREACH NOTIFICATION TIMELINE]` | §22 | — | §31 | §6.1 | §7 |
| `[GOVERNING LAW / DISPUTE FORUM]` | — | — | §33, §34 | §14 | §13 |
| `[PRICING / ORDER FORM TERMS]` | — | §F | §24 | — | — |
| `[INCIDENT RESPONSE PLAN]` | §22 | — | — | — | — |

---

## 8. PUBLICATION GATES (from Part E §9 + Part F §4)

| Gate | Requirement | Status |
|---|---|---|
| 1 | Legal entity + proprietor + address verified (B-1, B-2, B-4) | ❌ |
| 2 | Legal/Privacy contact emails live & monitored (B-3) | ❌ |
| 3 | Effective Date / Last Updated set (same across all 3 docs) | ❌ |
| 4 | AI provider verified as BAA-covered (B-12, Part A §A.10) | ❌ **CRITICAL** |
| 5 | Subprocessor table + URL completed (B-6 to B-16) | ❌ |
| 6 | Retention period, deletion procedure, backup retention filled (B-9 to B-11) | ❌ |
| 7 | Security safeguards paragraph filled with verified measures (B-17 to B-20) | ❌ |
| 8 | Analytics/cookie provider completed + cookie decision implemented (B-14, Part E §7) | ❌ |
| 9 | Breach notification timeline set (B-21) across ToS §31, Privacy §22, BAA §6.1, DPA §7 | ❌ |
| 10 | Governing law option selected + mirrored (Part A §A.12.8) | ❌ |
| 11 | ToS §24 confirms no public fee numbers (B-24) | ❌ |
| 12 | Liability floor reviewed by counsel (Part A §A.12.6) | ❌ |

**All 12 gates must be GREEN before any legal page goes live.**

---

## 9. DOCUMENT PUBLICATION READINESS

| Document | Draft Complete | Placeholders Resolved | Counsel Review | Functional Gates | Ready to Publish |
|---|---|---|---|---|---|
| Privacy Policy | ✓ | ❌ (24 placeholders) | ❌ | ❌ (BAA gating, security, retention) | **NO** |
| Disclaimer | ✓ | ❌ (4 placeholders) | ❌ | ❌ (model reconciliation) | **NO** |
| Terms of Service | ✓ | ❌ (18 placeholders) | ❌ | ❌ (BAA gating, governing law, fees) | **NO** |

---

*This register is derived from Part B and Part E. No document may be published with unresolved placeholders. The CI placeholder check (regex `— TO CONFIRM]`) must be active in the build pipeline.*