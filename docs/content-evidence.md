# Content evidence and route decisions

Reviewed 26 September 2026. This document records the basis for the website copy; it is not native-app testing, browser verification or publication approval.

## Copy boundaries

| Public statement | Evidence category and basis | Boundary |
|---|---|---|
| Swiftora is available for iPhone | **Store-published:** [official US App Store listing](https://apps.apple.com/us/app/swiftora/id6760380351), read 2026-09-26 | No Android promise, worldwide-availability claim or assertion that other Apple platforms are optimized. Device requirements are referred to the listing. |
| Listing assistance | **Store-published**, consistent with Eric's confirmation of basic functionality | No specific output format, photo-identification accuracy, processing time or tested workflow is asserted. |
| ROI tracking | **Source-only, owner-confirmed:** Eric identified ROI tracking as current functionality on 2026-09-26 | Not runtime-verified. No claim about calculator inputs, sale-data synchronization, realized profit or financial return. |
| Free download; in-app purchases; renewing paid subscriptions | **Store-published:** US listing, read 2026-09-26 | Download price is not an unlimited free plan or free trial. Exact plan names, prices and quotas are omitted. Purchase details are deferred to the app. |
| Swiftora LLC operates the website; `info@swiftora.com` is public support | **Source-only, owner-confirmed:** Eric, 2026-09-26 | No response-time promise or claim that the website operator and App Store seller are the same entity. The app policy retains its separate contact. |
| No API connectors | **Source-only, owner-confirmed:** Eric, 2026-09-26 | No connector, cross-posting, account-linking, marketplace partnership or API-access benefit appears in public copy. |
| Website data handling | **Source/configuration evidence:** intended GitHub Pages hosting, local assets/system fonts, no forms or advertising/analytics scripts | Confirm the actual release configuration and network behavior. [GitHub documents IP logging for Pages security](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection). No retention or deletion guarantee is invented. |

No product claim is classified as runtime-verified. “Source-only” includes direct owner statements; it does not diminish their authority over project scope or imply an independent test occurred. Sold comparables and confidence remain **unknown** for the current release despite broader store advertising. Bulk workflows, social content, priority queues, advanced analytics and the old paid-only tiers remain **roadmap/source claims**, excluded from this site.

Copy also omits scarcity, launch waitlists, locked rates, popularity badges, fabricated reviews, competitor prices, guaranteed accuracy/profit, speed promises, arbitrary website uploads and simulated AI results. Advice to review an item's details and asking price is an editorial expectation, not proof of an app editing feature.

## Original audience and purpose restored

The copy revision draws on the original website at commit `5b3021014948d416098fd47c70188614a3f8bbce`, not an invented new customer profile. Original Home and About copy was read in full alongside the repository's onboarding, monetization and brand documents.

| Audience or positioning | Provenance | Treatment in current copy |
|---|---|---|
| Side-hustle flippers, vintage/antique sellers, collectors who sell, estate-sale resellers | Original `about.html` audience section | Restore all four audiences with distinct listing situations. Thrift-store wording also reflects the owner's current instruction. |
| Independent sellers doing listing work nights/weekends; repetitive descriptions; concern about pricing and return | `claude.md/Swifora - Onboarding Doc (Remy).docx`, section 2 | Explain the work after sourcing and why listing assistance and ROI matter. Do not turn these intended customer needs into measured customer outcomes. |
| eBay hard goods/general resale, Etsy vintage/collectibles, Facebook Marketplace furniture/household | Onboarding section 2; marketplace context in original `index.html` (also Ruby Lane) | Use as audience examples. No account connection, affiliation, direct publishing or supported marketplace-specific output is implied. |
| Each item's condition, era and quirks need attention | Original Home/About purpose and workflow | Describe practical seller tasks: inspecting, measuring, photographing, explaining condition and reviewing item facts. These are editorial advice, not claims about particular app inputs or controls. |
| Seller effort and return on investment belong together | Original Home/About ROI benefit; onboarding sections 2–4; `Swiftora - Paid Tiers .docx` business rationale | Explain why the asking price alone does not tell the whole story. Current ROI tracking is owner-confirmed; fee inputs, automated sale records and calculation behavior remain unverified. |
| Clear, seller-first, concrete voice without hype | `Swiftora_Brand_Guidelines_v1.docx`, writing guidance | Use recognizable resale situations and useful detail. Do not restore the documents' unsupported comps, speed, pricing or future-feature promises. |

These are **source-only audience/positioning facts**, not market-size research, testimonials, proof of customer adoption or product-runtime evidence. The current owner-confirmed scope still controls feature claims. An intended benefit may be explained without promising a measurable time saving, sale or profit.

Home now includes `why`, `audience`, `workflow` and `questions` sections alongside two actual feature descriptions. The seller-review workflow is editorial; it does not pretend to show a tested app sequence. About explains the product's purpose without inventing a founder biography. The legacy demo page explains how Swiftora fits into resale work and links to practical guides, with no simulated live processing.

The detailed working provenance map is in the workspace at `work/implementation-copy/audience-positioning-map.md`. Descriptive titles and contextual guide links improve the site's relevance to its intended audience; this revision makes no ranking, traffic or conversion forecast.

## Media and commercial dependencies

No released-app screenshots or workflow recording have been supplied for this build. Public pages contain no simulated product screen, preset valuation or claimed recording. `/demo.html` describes the app's role and practical seller preparation; it is not proof of a particular app-control sequence.

For later product media, obtain original captures with app version/build, capture date, device/iOS, plan and visible screen state. A useful small set is the starting screen, a representative draft, the ROI screen and optionally plan/usage information. Use an owned or rights-cleared item, preserve the actual inputs/output, remove personal details, and verify item facts before publication. A recording needs the same provenance and a transcript/captions. Screenshots prove visible states, not processing quality, completed-sales provenance or entitlement enforcement.

Exact price/allowance cards require agreement among current App Store Connect products/price schedules, the released purchase UI and actual entitlements/reset rules. This website scope does not authorize changing native plans, quotas, AI processing or marketplace functionality.

## Routes and legacy behavior

These are source-defined destinations and intended indexability, not claims about tested production HTTP responses.

| Page / URL | Current purpose and legacy decision | Indexing |
|---|---|---|
| Home `/` (`/index.html` file alias) | Released iPhone product and App Store action. Canonical `/`. | Index; include `/` in sitemap |
| How it works `/demo.html` | Preserve the old demo URL with product-role explanation and substantive seller preparation. No upload or live-processing UI. | Index; sitemap |
| Pricing `/pricing.html` | Refer users to current in-app purchase details; remove conflicting legacy cards. | Index; sitemap |
| About `/about.html` | Original audience, purpose, secondhand-work context and current product scope; no invented biography. | Index; sitemap |
| Support `/support.html` | Confirmed email and app/privacy/terms links. | Index; sitemap |
| Website privacy `/privacy.html` | Website-specific practices; link the separate app policy. | Index; sitemap |
| Availability `/thank-you.html` | Preserve the legacy URL as an accurate download destination. Never claim a signup was received. | `noindex,follow`; exclude from sitemap |
| Connection help `/offline.html` | Reconnect/home/App Store guidance. No offline-analysis or streaming promise. | `noindex,follow`; exclude from sitemap |
| Not found `/404.html` | Useful home/App Store links; configure as the real missing-page response. | `noindex,follow`; exclude from sitemap |

The audience/content expansion also integrates these editorial destinations. Their rendering, sitemap/schema integration and link checks belong to the implementation/guide owners; this table is a route intent, not a test result.

| Editorial destination | Purpose | Intended indexing |
|---|---|---|
| `/guides.html` | Seller guide index | Index; sitemap |
| `/guides/secondhand-listing-checklist.html` | Item facts, condition and listing review | Index; sitemap |
| `/guides/resale-roi-costs.html` | Explain per-item costs and ROI | Index; sitemap |
| `/guides/thrift-vintage-resale-workflow.html` | A practical intake-to-sale seller routine | Index; sitemap |

Home retains `#waitlist` as an invisible compatibility anchor in the download section. `/index.html#waitlist` uses that same destination; no visible waitlist is restored. `#download`, `#features` and `#how` are meaningful homepage sections. Fragments are handled in the page, not by a server redirect alone. Confirm canonical host, apex behavior and missing-page HTTP status during release verification.

The privacy page acknowledges that the previous signup form saved details in browser storage. It states that those details may remain, this version does not read/send them, and browser site-data controls can remove them. No automatic deletion is claimed.

## Maintenance

- `src/data/site.json`: canonical origin, App Store identity/URL, contacts, operator and policy destinations.
- `src/data/site.ts`: named destination resolution and indexable routes.
- `src/data/content.json`: page copy, navigation and link keys.
- `src/data/product.json`: approved product scope and held commerce/media data.
- `src/pages/[page].astro`: utility routes and their `noindex` decision.

When a claim changes, record its dated owner/store/runtime basis here before adding it to public copy, metadata or social artwork. Keep exact unsupported product evidence out of production assets. Production publishing requires separate release approval.
