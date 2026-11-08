# VELDARION LEGAL DOCUMENTATION — RESEARCH ANALYSIS

**Prepared:** 6 November 2026  
**Source Directory:** `E:\veldarion-stage3_core\veldarion\research_queue\incoming\Privacy_Policy_Disclaimer_Terms`  
**Status:** Internal work product for review by qualified counsel

---

## 1. SOURCE DOCUMENT INVENTORY

| File | Subject | Key Findings |
|------|---------|--------------|
| `PART_A_Regulatory_Analysis.md` | Business & regulatory analysis | HIPAA BA status confirmed; Gemini Developer API non-compliant for PHI; DPDP phased commencement; state law matrix; commercial risk analysis |
| `PART_B_Missing_Information_Register.md` | 30 missing information items | Legal entity, address, contacts, AI provider config, subprocessors, retention, security, BAA gating, governing law |
| `PART_C_1_Privacy_Policy.md` | Privacy Policy draft (190 lines) | Three-tier scope (website, customer, patient); PHI/BAA gating; AI provider standards; subprocessor table; state & Indian law sections |
| `PART_C_2_Disclaimer.md` | Disclaimer draft (91 lines) | AI output risks; no outcome guarantees; human review required; professional boundaries; third-party source limits; short-form in-app notice |
| `PART_C_3_Terms_of_Service.md` | Terms of Service draft (202 lines) | BAA-gated PHI; review-before-submit model; Order Form pricing; liability cap with carve-outs; arbitration (India/Delhi options); precedence ladder |
| `PART_D_1_BAA_Template.md` | HIPAA BAA template | 45 CFR 164.504(e) compliant; subcontractor flow-down; offshore disclosure; Exhibit 2/3 placeholders |
| `PART_D_2_DPA_Template.md` | Data Processing Agreement template | Processor terms for US state laws + DPDP Act; Annex 3 India applicability note |
| `PART_D_3_MSA_Outline.md` | Master Services Agreement outline | Order Form for contingency fees; exhibits structure; drafting cautions |
| `PART_E_Implementation_Handoff.md` | Website implementation guide | Routes, footer, PHI gating, in-app disclaimer, cookie rules, placeholder checklist, CI fail-on-placeholder |
| `PART_F_QA_Review_and_Risk_Register.md` | QA checklist + risk register | 24 checks passed (conditional); 19 risks (4 Critical, 6 High); sign-off conditions |

---

## 2. REGULATORY FINDINGS SYNTHESIS

### 2.1 HIPAA Business Associate Status
**Finding:** Veldarion **is a Business Associate** when processing customer-uploaded documents containing PHI (denial letters, EOBs, ERA/835, clinical notes).  
**Legal Basis:** 45 CFR 160.103 — claims processing/billing services on behalf of Covered Entities.  
**Requirement:** Separately executed BAA is a **precondition** to any PHI processing (45 CFR 164.502(e), 164.504(e)). Website ToS cannot substitute.  
**Implementation:** Account-level `baa_on_file` flag; upload gating (Part E §5); BAA template provided (Part D-1).

### 2.2 AI Provider Compliance Blocker
**Finding:** **Gemini Developer API (any tier) cannot process PHI.**  
- **Unpaid tier:** Terms prohibit personal data; Google may use content for product improvement with human review.
- **Paid tier:** No training use, but **no BAA** offered — disclosure to subcontractor lacks satisfactory assurances.
- **Compliant path:** Gemini via **Google Cloud Vertex AI / Agent Platform** under executed **Google Cloud BAA** (BAA-covered services list, updated 17 Sept 2025).  
**Status:** Critical publication blocker (Part F C-1). Privacy Policy §11 and ToS §18 use conditional language pending verification.

### 2.3 Indian Data Protection (DPDP Act, 2023)
**Phased Commencement:**
- 13 Nov 2025: Board rules (Rules 17–21) — live
- 13 Nov 2026: Consent Manager registration (Rule 4) — not applicable
- **13 May 2027:** Substantive Fiduciary obligations (Rules 3, 5–16, 22–23) + s.44(2) repealing IT Act s.43A/SPDI Rules
- **As of 6 Nov 2026:** SPDI Rules 2011 / IT Act s.43A **apply today** to sole proprietorships handling health data.

**Territorial Question (Flag for Indian Counsel):** Section 3 plainly reaches processing in India of online-collected data, but legislative history suggests targeting Indian data principals. Conservative approach: draft DPA as if Act applies, note question for counsel.

### 2.4 State Privacy Law Matrix
| Law | Status | Trigger |
|-----|--------|---------|
| CCPA/CPRA | Unlikely direct; processor duties via contract | PHI/HIPAA exempt; thresholds likely unmet |
| WA MHMDA | Not triggered | No consumer health data collected directly from WA consumers |
| NV | Not triggered | No sale of consumer health data |
| TX Medical Records Privacy Act | **Potentially applicable** | Extremely broad "covered entity" definition |
| 20+ comprehensive laws | Mostly inapplicable at scale | PHI exemptions; processor duties via contract |
| State UDAP | **Applicable** | Marketing claims ("3 seconds", "10%", "legally sound") |
| Colorado AI Act | Requires counsel determination | Appeal drafting = administrative, not consequential decision |
| Texas TRAIGA | Requires counsel determination | Healthcare-AI disclosure duties |

### 2.5 Commercial & Structural Risks
| Risk | Severity | Action |
|------|----------|--------|
| Site claims "file appeals end-to-end" vs. ToS review-and-submit model | **Critical** | Reconcile before publication (Part F C-3) |
| Sole proprietorship — unlimited personal liability | High | Form Pvt Ltd/LLP; cyber/E&O insurance (Part A §A.12.7) |
| 10% contingency fee — state-by-state review needed | High | Counsel review; define "Recovered Revenue" in Order Form (Part D-3) |
| UPL exposure from "legally sound" + end-to-end filing | High | Drop "legally sound"; human-review architecture (Part F R-45) |
| Retention/deletion undefined | High | Complete B-9 to B-11; implement deletion jobs (Part F R-46) |

---

## 3. DOCUMENT ARCHITECTURE

### 3.1 Privacy Policy (Part C-1) — 26 Sections
**Structure:**
1. Introduction & Company Identity (placeholder entity)
2. Scope — three tiers: website, customer, patient
3. Categories Table
4. Website Visitor Info
5. Business Contact Info
6. Customer Account Info
7. Uploaded Documents
8. **PHI / BAA Gating** (central)
9. Purposes
10. Legal Bases
11. **AI Processing Standards** (two-part: no training + BAA coverage)
12. Data Sharing
13. **Subprocessor Table** (6 categories, all placeholders)
14. International Transfers (India/US/other)
15. **Retention/Deletion** (all placeholders)
16. Security Safeguards (placeholder)
17. Cookies/Analytics (placeholder)
18. Privacy Rights (business contacts, customers, patients)
19. HIPAA Responsibilities (BAA prevails)
20. State-Specific (CA, WA, NV, TX)
21. **Indian DPDP/SPDI** (Fiduciary for own data, Processor for customer data)
22. Breach Response (placeholder timeline)
23. Children's Privacy
24. External Links
25. Changes
26. Contact Block (4 placeholders)

### 3.2 Disclaimer (Part C-2) — 7 Sections + Short Form
**Sections:** A) AI-generated info risks; B) No outcome guarantees; C) Human review required; D) No professional advice (legal/medical/insurance/billing/coding/medical necessity); E) Third-party sources; F) Financial representations; G) Limits of disclaimer (carve-outs for fraud, BAA, non-waivable rights).

**Short-form in-app notice** (verbatim, Part E §6): "AI-generated draft — review required. This output was generated with artificial intelligence and may contain errors..."

### 3.3 Terms of Service (Part C-3) — 42 Sections
**Key Architectural Decisions:**
- **BAA-gated PHI:** §11 requires executed BAA before upload; click-through insufficient
- **Review-before-submit model:** §7, §15 — Veldarion does not submit; customer controls
- **Pricing in Order Forms only:** §24 — no numbers in public ToS; contingency terms defined there
- **Liability cap:** 12-month fees or $10k floor; carve-outs (fraud, confidentiality, BAA/DPA breaches, indemnities)
- **Governing law:** **Option A** (India law, New Delhi arbitration) or **Option B** (Delaware law, Singapore arbitration) — must select one
- **Precedence ladder:** BAA > DPA > MSA > Order Form > ToS (§37)

---

## 4. CONFLICTS & UNCERTAINTIES

| Conflict | Resolution in Documents |
|----------|------------------------|
| Site copy: "file appeals end-to-end" vs. briefed: "clinic reviews/approves/submits" | ToS §7/§15 and Disclaimer §C adopt **review-and-submit model**; Part E §3 flags site copy as publication blocker |
| "Legally sound appeal letters" marketing vs. Disclaimer §D "not legal advice" | Disclaimer wins; marketing claim must be removed (Part E §3, Part F R-45) |
| DPDP territorial applicability uncertain | DPA Annex 3 and Privacy Policy §21 note the question; drafted conservatively |
| Gemini API vs. Vertex AI path | Privacy Policy §11: "current configuration [TO CONFIRM] — must be verified against Part A §A.10 before publication" |
| Retention periods unknown | All placeholders; Part E §10 forbids publishing deletion claims until jobs exist |

---

## 5. PLACEHOLDER REGISTER (from Part B)

**30 items** across 6 placeholder categories. Key publication blockers:

| Placeholder | Documents Affected | Blocker? |
|-------------|-------------------|----------|
| `[LEGAL ENTITY NAME]` + proprietor + address | All 3 Part C + BAA + DPA + MSA | Yes (B-1, B-2, B-4) |
| `[LEGAL/PRIVACY CONTACT EMAIL]` | All 3 Part C + BAA + DPA | Yes (B-3) |
| `[AI PROCESSING PROVIDER & TIER]` — **must be BAA-covered** | Privacy Policy §11; ToS §18; BAA Exhibit 3 | **Yes — Critical** (B-12, C-1) |
| `[SUBPROCESSOR LIST]` — 6 categories | Privacy Policy §13; BAA Exhibit 3; DPA Annex 2 | Yes (B-6 to B-16) |
| `[DATA RETENTION PERIOD]` / `[DELETION PROCEDURE]` | Privacy Policy §15; ToS §23; BAA §9 | Yes (B-9 to B-11) |
| `[SECURITY SAFEGUARDS]` | Privacy Policy §16; BAA Exhibit 2 | Yes (B-17 to B-20) |
| `[BREACH NOTIFICATION TIMELINE]` | Privacy Policy §22; ToS §31; BAA §6.1; DPA §7 | Yes (B-21) |
| `[GOVERNING LAW / DISPUTE FORUM]` — select A or B | ToS §33/§34; MSA §22 | Yes (Part A §A.12.8) |

---

## 6. IMPLEMENTATION REQUIREMENTS (from Part E)

### 6.1 Routes to Publish
| Route | Content | Gate |
|-------|---------|------|
| `/privacy` | Privacy Policy | Part E §9 checklist complete |
| `/terms` | Terms of Service | Checklist + governing law selected |
| `/disclaimer` | Disclaimer | Checklist complete |
| `/security` | **Do not publish** until B-17 to B-20 verified | Reserved |
| `/subprocessors` | **Do not publish** until lists real | Reserved |
| `/health-data-privacy` | **Do not create** unless model changes | Reserved |

### 6.2 Footer Links
Already implemented: Privacy Policy · Terms of Service · Disclaimer in `FOOTER_LEGAL` array.

### 6.3 PHI Upload Gating (Functional — Publication Blocker C-2)
- Account flag `baa_on_file` (default `false`), admin-settable after BAA execution
- When false: persistent notice + block/intercept PHI-capable uploads
- When true: standing pre-upload notice + BAA date in account settings
- Standing notice always shown for PHI-capable uploads

### 6.4 In-Application Disclaimer Placement
Short-form notice (verbatim) at: generated reports, exported outputs, review/edit screens, evidence panels.

### 6.5 CI Placeholder Check
Regex check for `— TO CONFIRM]` — fail build if detected.

---

## 7. QA RESULTS (Part F)

**24 Checks — All Pass (16 conditional on placeholders/resolution):**
- No invented entity/registration ✓
- No "HIPAA compliant/certified" claims ✓
- BA status correctly conditional on executed BAA ✓
- BAA required before PHI upload ✓
- AI provider promises conditional on verification ✓
- Retention figures as placeholders ✓
- International transfers disclosed ✓
- State privacy coverage (CA, WA, NV, TX + general) ✓
- Precedence ladder consistent (BAA > DPA > MSA > Order Form > ToS) ✓
- Liability cap with reasonable carve-outs ✓
- No unverified security claims ✓
- Customer responsibilities comprehensive ✓
- No fee numbers in public ToS ✓
- Definitions consistent across all documents ✓
- Placeholders tied to Part B register ✓

**4 Critical Risks (Publication Blockers):**
1. PHI → non-BAA-covered AI service
2. PHI uploads before executed BAA
3. Site copy / document model contradiction
4. Security program unverified

**6 High Risks:** Contingency fee state review; unsubstantiated claims; UPL; retention/deletion; subprocessor chain; PHI in logs.

---

## 8. SIGN-OFF CONDITIONS (Part F §4)

Before publication, the following must be satisfied:

1. **US healthcare privacy counsel review** of Part C documents, BAA, liability/governing-law choices
2. **Indian counsel review** of DPA, DPDP applicability, entity/formation
3. **All Part E §9 placeholders resolved**; CI placeholder check active
4. **AI provider confirmed on BAA-covered path** with executed Google Cloud BAA (or equivalent)
5. **Marketing copy reconciled** to review-and-submit model (or documents re-drafted after counsel)
6. **Security verification items** (B-17 to B-20) evidenced before any security page/claim

---

## 9. RECOMMENDED NEXT STEPS

1. **Resolve legal entity details** (B-1, B-2, B-4) — obtain proprietorship/GST/PAN documents
2. **Confirm contact emails** (B-3) — set up monitored mailboxes
3. **Execute AI provider migration** to Vertex AI/Agent Platform + Google Cloud BAA (B-12)
4. **Complete security program** — risk analysis, encryption, MFA, logging, backups (B-17 to B-20)
5. **Define retention/deletion** with implemented jobs (B-9 to B-11)
6. **Select governing law option** (A or B) with counsel (Part A §A.12.8)
7. **Reconcile homepage copy** to review-and-submit model (remove "file on behalf", "legally sound", "3 seconds" or substantiate)
8. **Implement PHI upload gating** (`baa_on_file` flag + notices)
9. **Add in-app short disclaimer** to generated outputs
10. **Run CI placeholder check** and resolve all before deploy

---

*This analysis is internal work product. It does not constitute legal advice. All conclusions marked "Requires counsel determination" or "Placeholder" must be resolved by qualified attorneys before the public documents are published or relied upon.*