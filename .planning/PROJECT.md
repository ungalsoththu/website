# UngalSoththu

## What This Is

A bilingual (Tamil + English) static website for urban transit accountability in Chennai and Tamil Nadu. The site publishes content about public transit initiatives and provides data apps that let citizens explore master data about fleets, depots, routes, and performance metrics.

## Core Value

**Data-as-accountability**: Citizens deserve verifiable data on public assets they fund. When buses sit idle or tracking fails, it's not just inconvenience—it's a failure to utilize assets that belong to the public.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Bilingual static site (Tamil + English content)
- [ ] Markdown-based content publishing (initiative, campaigns, news, blog, reports)
- [ ] GitHub Pages hosting
- [ ] Mini app: Search fleets, depots, and master data
- [ ] Static data via JSON/CSV (open sources + manual curation)
- [ ] WCAG accessibility compliance
- [ ] LLM/agent-friendly content workflow for translation

### Out of Scope

- **User authentication** — Public accountability initiative, no login required
- **Live/real-time tracking** — v1 uses static master data; live tracking deferred
- **Backend/database** — Static data in repo, no runtime API dependencies
- **Dynamic CMS** — Direct markdown authoring via git, not through a CMS backend

## Context

**Public Transit as Community Asset**

Chennai's MTC and broader Tamil Nadu transit systems are vital community assets that enable mobility, reduce inequality, and provide environmental benefits. Programs like "Vidiyal Payanam" (free travel for schoolgirls) demonstrate the social value of these systems.

**Financing and Accountability**

Bus fleet modernization is financed through international loans (World Bank Chennai City Partnership, others). The Gross Cost Contract (GCC) model pays private operators per kilometer (reportedly ₹77/km) — debt that future generations will repay. Poor utilization means wasting borrowed money.

**The Mission**

"Ithu Ungal Soththu" (This is Your Asset) reminds citizens that public transit belongs to them. The project provides data tools to:
- Explore fleet, depot, and route master data
- File RTI requests with specific questions
- Spread awareness via #IthuUngalSoththu
- Advocate for transparent, verifiable metrics

**Technical Philosophy**

No user data collection. Open-source approach with credits to Google Gemini and XAI Grok for development support.

## Constraints

- **Hosting**: GitHub Pages — must be pure static, no server-side code
- **Languages**: Tamil and English content parity required
- **Accessibility**: WCAG compliance — critical for public service in India (low-end devices, screen readers)
- **Content workflow**: LLM/agent friendly — direct file operations, no API-based CMS

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static site generator (Astro/11ty) | LLM-friendly markdown workflow, GitHub Pages compatible | — Pending |
| /content/{lang}/ structure | Separates languages, enables translation automation | — Pending |
| Static data in /data/ | No API dependencies, data version-controlled with code | — Pending |

---
*Last updated: 2026-01-11 after initialization*
