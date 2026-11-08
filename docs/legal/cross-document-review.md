# VELDARION LEGAL DOCUMENTS — CROSS-DOCUMENT CONSISTENCY REVIEW

**Review Date:** 6 November 2026  
**Documents Reviewed:** Privacy Policy, Disclaimer, Terms of Service  
**Source Package:** `E:\veldarion-stage3_core\veldarion\research_queue\incoming\Privacy_Policy_Disclaimer_Terms`

---

## 1. CONSISTENCY CHECKLIST

| Consistency Area | Privacy Policy | Disclaimer | Terms of Service | Status |
|---|---|---|---|---|
| **Contracting entity** | [LEGAL ENTITY NAME] sole proprietorship India | [LEGAL ENTITY NAME] sole proprietorship India | [LEGAL ENTITY NAME] sole proprietorship India | ✓ Consistent (all placeholders) |
| **Contact emails** | Legal, Privacy, Postal, Grievance | Legal, Postal | Legal, Privacy, Postal, Registered address | ✓ Consistent (all placeholders) |
| **BAA requirement for PHI** | §8, §19: BAA required before PHI upload; BAA prevails | §G: BAA obligations not waived | §11: Separately executed BAA required; BAA governs PHI | ✓ Consistent |
| **AI provider standards** | §11: No training use + BAA coverage required | §A: AI output risks; §G: BAA obligations prevail | §14, §18: AI risks per Disclaimer; Subprocessors under BAA/DPA | ✓ Consistent |
| **Review-before-submit model** | §8: Customer reviews/approves; patients → clinic | §C: Human review required; customer submits | §7, §15: Veldarion does not submit; customer reviews/approves | ✓ Consistent |
| **No outcome guarantees** | Not explicit (BAA-focused) | §B: Explicit no guarantees | §16: Explicit no guarantees | ✓ Consistent (Disclaimer + ToS aligned) |
| **Professional boundaries** | §1: Not healthcare provider/law firm/insurer | §D: Not legal/medical/insurance/billing/medical necessity advice | §7: Not medical/clinical/coverage/payment/representation | ✓ Consistent |
| **Third-party sources** | §12: No sharing for third-party purposes | §E: Third-party sources not controlled; verify | §18: Subprocessors under data-protection terms | ✓ Consistent |
| **Data retention** | §15: Placeholders for periods, deletion, backups | Not addressed | §23: Same placeholders; refs Privacy Policy §15 | ✓ Consistent |
| **Security safeguards** | §16: Placeholder for verified measures | §G: BAA security obligations prevail | §31: Refs BAA/Privacy Policy; placeholder timeline | ✓ Consistent |
| **Breach notification** | §22: Placeholder timeline; BAA 45 CFR 164.410 | §G: BAA breach obligations prevail | §31: Same placeholder; 45 CFR 164.410 + BAA | ✓ Consistent |
| **International transfers** | §14: India/US/other; BAA covers PHI transfers | §G: BAA obligations prevail | §18, §31: Subprocessors in Annex 2/Exhibit 3; cross-border | ✓ Consistent |
| **State privacy disclosures** | §20: CA, WA, NV, TX + general | Not addressed | §32: Customer responsible for program compliance | ✓ Consistent |
| **Indian law (DPDP/SPDI)** | §21: Fiduciary (own data) / Processor (customer data) | Not addressed | §32: Veldarion complies with India framework | ✓ Consistent |
| **Governing law** | Not specified (policy) | Not specified (disclaimer) | §33: Option A (India/N Delhi) or B (Delaware/Singapore) | ✓ Consistent (ToS governs contracts) |
| **Precedence / conflict resolution** | §19: BAA prevails for PHI | §G: BAA/DPA obligations not waived | §37: BAA > DPA > MSA > Order Form > ToS | ✓ Consistent |
| **Liability cap/carve-outs** | Not in policy | §G: Fraud, BAA, non-waivable rights carved out | §29: 12-month fees/$10k floor; carve-outs for fraud, confidentiality, BAA/DPA, indemnities | ✓ Consistent (carve-outs aligned) |
| **Indemnification** | Not in policy | Not in disclaimer | §30: Mutual indemnification with procedure | N/A (ToS only) |
| **Fee terms** | Not in policy | §F: Fees in signed agreement only | §24: Fees in Order Form only; no public numbers | ✓ Consistent |
| **Termination / data return** | §15: Deletion on request; BAA return/destroy | Not addressed | §26: Transition period; BAA return/destroy; survival | ✓ Consistent |

---

## 2. KEY CONSISTENCY FINDINGS

### 2.1 Fully Consistent (✓)
- **BAA gating:** All three documents state PHI processing requires separately executed BAA; website ToS insufficient.
- **Review-before-submit model:** All documents align that Veldarion does not submit appeals; customer reviews, approves, and submits.
- **Professional boundaries:** All documents clearly state Veldarion is not a law firm, healthcare provider, insurer, or billing service.
- **AI output risks:** Disclaimer §A and ToS §14 align on AI-generated output risks; Privacy Policy §11 sets provider standards.
- **Precedence hierarchy:** Privacy Policy §19, ToS §37, BAA §13, DPA §13 all establish BAA > DPA > MSA > Order Form > ToS for PHI/personal data.
- **International transfers:** Privacy Policy §14, ToS §18/§31, BAA §10, DPA §8 all acknowledge India/US/other processing with contractual safeguards.

### 2.2 Conditionally Consistent (Placeholders Must Resolve Identically)
| Placeholder | Documents | Resolution Required |
|---|---|---|
| `[LEGAL ENTITY NAME]`, `[PROPRIETOR NAME]`, `[REGISTERED BUSINESS ADDRESS]` | All 3 + BAA + DPA | Single verified legal identity |
| `[LEGAL CONTACT EMAIL]`, `[PRIVACY CONTACT EMAIL]` | All 3 + BAA + DPA | Same monitored mailboxes |
| `[AI PROCESSING PROVIDER & TIER]` | Privacy §11, ToS §18, BAA Exh 3, DPA Annex 2 | Single verified BAA-covered configuration |
| `[SUBPROCESSOR LIST]` / `[SUBPROCESSOR LIST URL]` | Privacy §13, BAA Exh 3, DPA Annex 2 | Single current list |
| `[DATA RETENTION PERIOD]`, `[DELETION PROCEDURE & TIMELINE]`, `[BACKUP RETENTION PERIOD]` | Privacy §15, ToS §23, BAA §9, DPA §9 | Single retention policy |
| `[SECURITY SAFEGUARDS]` | Privacy §16, BAA Exh 2, DPA Annex 1 | Single verified safeguards description |
| `[BREACH NOTIFICATION TIMELINE]` | Privacy §22, ToS §31, BAA §6.1, DPA §7 | Single contractual timeline |
| `[GOVERNING LAW / DISPUTE FORUM]` | ToS §33/§34, MSA §22, BAA §14, DPA §13 | Single selection (Option A or B) |

### 2.3 Intentional Differences (By Design)
| Area | Privacy Policy | Disclaimer | Terms of Service | Rationale |
|---|---|---|---|---|
| **Fee disclosure** | None | §F: Fees in signed agreement | §24: Fees in Order Form only | ToS is the contractual vehicle; Disclaimer notes marketing ≠ contract |
| **Patient rights routing** | §18: Patients → clinic; Veldarion assists per BAA | Not addressed | §10: Requests referred to Customer | Privacy Policy is the primary patient-facing disclosure |
| **State law detail** | §20: CA, WA, NV, TX specifics | None | §32: Customer responsible for program compliance | Privacy Policy handles consumer-facing obligations |
| **Indian law detail** | §21: Fiduciary/Processor roles, grievance officer | None | §32: Compliance statement | Privacy Policy is the primary DPDP disclosure |
| **Short-form notice** | None | End of document: approved in-app text | None | Disclaimer carries the in-app verbatim requirement |

---

## 3. UNRESOLVED LEGAL & OPERATIONAL DEPENDENCIES

| Dependency | Documents Affected | Resolution Required |
|---|---|---|
| **AI provider BAA coverage** | Privacy §11, ToS §18, BAA Exh 3, DPA Annex 2 | Migrate to Vertex AI/Agent Platform + Google Cloud BAA (or equivalent); verify before filling placeholder |
| **Executed customer BAAs** | Privacy §8/§19, ToS §11, BAA template | Implement `baa_on_file` gating (Part E §5); BAA execution before PHI upload |
| **Retention/deletion implementation** | Privacy §15, ToS §23, BAA §9, DPA §9 | Define periods; implement deletion jobs + backup expiry; then fill placeholders |
| **Security program verification** | Privacy §16, BAA Exh 2, DPA Annex 1 | Complete risk analysis, encryption, MFA, logging, workforce training; evidence before filling |
| **Subprocessor inventory** | Privacy §13, BAA Exh 3, DPA Annex 2 | Complete B-6 to B-16; execute flow-down agreements; publish list |
| **Governing law selection** | ToS §33/§34, MSA §22, BAA §14, DPA §13 | Select Option A or B with counsel; mirror across all contracts |
| **Marketing copy reconciliation** | Homepage claims vs. ToS §7/§15, Disclaimer §C | Remove "file on behalf", "legally sound", "3 seconds" or substantiate + counsel review |
| **Contact email setup** | All documents + BAA + DPA | Provision monitored mailboxes for legal/privacy/grievance |
| **Legal entity verification** | All documents + BAA + DPA | Obtain proprietorship/GST/PAN docs; confirm proprietor name |
| **BAA template finalization** | BAA template (Part D-1) | Counsel review of all 45 CFR 164.504(e) elements; Exhibit 2/3 completion |

---

## 4. CONTRADICTION RISK AREAS (Monitored)

| Risk | Current Status | Mitigation |
|---|---|---|
| Site claims "file appeals end-to-end" vs. ToS review-and-submit | **Publication blocker** (Part F C-3) | Must reconcile before any document publishes |
| "Legally sound appeal letters" vs. Disclaimer "not legal advice" | **Publication blocker** (Part E §3) | Remove marketing claim; Disclaimer controls |
| Gemini Developer API vs. BAA-covered path | **Critical blocker** (Part F C-1) | Migration to Vertex AI + Google Cloud BAA required before PHI |
| Retention placeholders vs. "we delete" claims | **Blocked by Part E §10** | No deletion claims until jobs implemented |
| Security claims vs. unverified program | **Blocked by Part E §9 item 7** | No specific safeguard claims until verified |

---

## 5. SIGN-OFF REQUIREMENTS

Before any document is published:

1. [ ] US healthcare privacy counsel review (Privacy Policy, Disclaimer, ToS, BAA, liability/governing law)
2. [ ] Indian counsel review (DPA, DPDP applicability, entity/formation)
3. [ ] All Part E §9 placeholders resolved to real values
4. [ ] CI placeholder check active (regex `— TO CONFIRM]`)
5. [ ] AI provider confirmed on BAA-covered path with executed Google Cloud BAA
6. [ ] Marketing copy reconciled to review-and-submit model
7. [ ] Security verification items (B-17 to B-20) evidenced before security page/claims
8. [ ] Governing law option selected and mirrored across ToS, MSA, BAA, DPA

---

*This review confirms internal consistency of the three Part C documents against each other and the Part D templates. It does not constitute legal advice. All items marked "Requires counsel determination" or carrying placeholders must be resolved by qualified attorneys before publication.*