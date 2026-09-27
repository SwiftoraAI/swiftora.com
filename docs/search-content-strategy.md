# Swiftora search content strategy

Prepared 2026-09-26 for the local preview. No production publication, search-engine submission, indexing, ranking, AI citation, or install outcome is claimed.

## Audience and reason to exist

The original `about.html` names side-hustle flippers, vintage and antique sellers, collectors who sell, and estate-sale resellers. Its useful underlying problem is that secondhand stock is heterogeneous: condition, measurements, era, markings, and missing pieces make each listing different. Preserve that specificity in the home and About narrative. Original conversion, accurate-pricing, sold-comparables, and batch-processing promises are not evidence of released capabilities.

The original `claude.md/Swifora - Onboarding Doc (Remy).docx`, sections 1–3, further identifies independent Etsy vintage/collectibles sellers, eBay sellers of collectibles and hard goods, Facebook Marketplace sellers of local furniture/household items, and side-hustle flippers. It describes constrained nights/weekends, repetitive listing work, pricing uncertainty, and a preference for simple tools. These are audience and problem statements, not proof of marketplace integrations. The document's later product journey includes roadmap claims that were deliberately excluded.

Provenance: original source snapshot `work/source/swiftora.com-5b3021014948d416098fd47c70188614a3f8bbce`, particularly `about.html` lines 57–59 and 94–123; text extract `work/brand-seo/docs-text/Swifora - Onboarding Doc (Remy).txt` sections 1–3. The brand guide's “clear, seller-first, no hype” voice informed the writing. The user's latest product confirmation limits current product claims to basic listing assistance and ROI tracking, with no API connectors. Internal source documents are research inputs, not public downloads for the new site.

## Three useful, distinct articles

| Canonical path | Reader intent and audience | Specific value | Scope boundary |
| --- | --- | --- | --- |
| `/guides/secondhand-listing-checklist.html` | “What should I put in a secondhand listing?” New flippers and mixed-inventory sellers. | Fact sheet, useful photo views, specific condition wording, an illustrative title, final comparison with the object. | Does not authenticate, determine age, promise conversion, or imply automatic condition detection. |
| `/guides/resale-roi-costs.html` | “How do I calculate resale ROI and what costs count?” Sellers comparing individual sale records. | Explicit denominator, cost categories, worked revenue/profit/ROI/margin arithmetic, estimate-versus-actual distinction. | An illustrative item-level cash-cost method; not Swiftora's verified formula, tax advice, full business earnings, or a forecast. |
| `/guides/thrift-vintage-resale-workflow.html` | “How do I organize my resale work after a haul?” Weekend thrift, vintage, collector, and estate-sale sellers. | Intake codes, research queue, a three-item batching example, useful statuses, storage and sale reconciliation. | Editorial workflow; no automatic posting, marketplace connectors, sold-comps integration, or end-to-end app automation. |

The JSON data contains six, five, and six sections respectively. Each guide contains roughly 550–650 words, with complete examples and checklists; the ROI guide also includes a worked transaction table. Length was chosen to complete the practical task, not to meet a supposed ranking threshold. These pages each answer a different question and remain useful without an App Store click. Do not split them into near-duplicate pages for every marketplace, product category, or location.

Examples were newly written for these guides; they are not customer cases, tested app output, marketplace statistics, or claimed firsthand results. The site can identify Swiftora LLC as publisher without inventing a person, credentials, hands-on test, or customer quotation. The drafts were AI-assisted and checked against supplied audience/product evidence. A future named reviewer or experience claim needs an actual reviewer or documented experience; none is asserted here.

## Internal links and page meaning

Use `/guides.html` as the browseable hub. Link it from visible navigation or footer and surface the three guides in a useful home-page section. From listing-assistance copy link the checklist; from ROI copy link the cost guide; from the getting-started workflow link the workflow guide. Use the actual topic as link text. Each article links back to the hub and to the two other existing guide slugs. A restrained product link comes after useful guidance or in the article navigation; the article itself is not a download gate.

Google describes crawlable links as HTML anchors with resolvable `href` values and recommends concise, descriptive link text with context. The proposed rendered routes and related-guide links should use normal anchors. [Google Search Central: link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

Every article has its own descriptive title, description, H1, stable section IDs, and self-canonical `.html` URL. Root owns static rendering, the hub, `Article`/breadcrumb structured data, the sitemap, and canonical implementation. Schema must agree with visible content. Do not add invented publication history, star ratings, author credentials, performance numbers, or product features to markup. Do not label editorial listing examples as Swiftora screenshots or product results.

## Current official search guidance and its limits

Google's people-first guidance emphasizes a real intended audience, a clear site purpose, satisfying answers, accurate authorship, and substantive value. It cautions against mass-produced material created primarily for traffic and explicitly says it has no preferred word count. Our response is a small set of complete, relevant tasks with concrete examples and clear limits. This is an editorial application of the guidance, not proof that these pages will rank. [Google Search Central: creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

Google says its existing SEO practices apply to AI Overviews and AI Mode; no special AI files or special schema are required. Supporting pages must be indexed and eligible for snippets, but crawling, indexing, and appearance remain unguaranteed. Useful text, internal links, crawl access, and accurate structured data support eligibility. Google reports this AI-feature traffic within Search Console's Web performance reporting. Do not promise a separate AI-citation metric or claim that adding these guides guarantees inclusion. [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features).

OpenAI distinguishes `OAI-SearchBot`, which supports ChatGPT search discovery, from `GPTBot`, which crawls content that may be used for model training. Their robots controls are independent. `ChatGPT-User` handles user-initiated visits and is not the control for automatic search crawling. For discovery, avoid unintentionally blocking OAI-SearchBot or its published IP ranges; allowing access does not promise citation. [OpenAI: overview of crawlers](https://developers.openai.com/api/docs/bots).

The current source `src/pages/robots.txt.ts` allows all user agents and references the sitemap. That permits more than just search bots; the guide work does not silently change the owner's training-crawler preference. No special crawler rule or `llms.txt` was added by this task. Any future crawler choice should be intentional and validated against current official documentation and live hosting behavior.

## Verification and measurement handoff

Local data validation passed: JSON parses; all three slugs are unique; each section ID is unique within its article; each related slug resolves to another guide. Arithmetic checked independently: $60 + $8 = $68 revenue; $12 + $2 + $2 + $8 + $9 = $33 direct costs; profit $35; defined cost ROI 106.1%; margin 51.5%. The guide states the denominator and omitted costs so these values cannot reasonably be read as guaranteed business earnings or the app's own formula.

The engineering verifier owns build-output checks: rendered route presence, one H1, canonical/title/description coherence, parseable Article markup, working hub/related links, and sitemap inclusion. Browser review remains root-owned. This document does not certify tests not run by this subtask.

The original public-site audit found `/robots.txt` and `/sitemap.xml` returning 404, with a singular `/robot.txt` instead. The preview includes proper generators; validate actual production responses after a separately authorized release. Local output cannot establish what search crawlers have indexed.

After release, use a verified Search Console property to inspect the canonical guide URLs, submit the sitemap, and watch index coverage and page/query impressions and clicks. Review intent quality as well as volume: does the checklist attract listing-preparation questions, and does the cost guide attract calculation questions? Keep a dated baseline and review changes without attributing every fluctuation to one edit. Search Console access and live submission have not been performed.

If analytics is later chosen and configured, distinguish article-to-product clicks from installs. An outbound App Store click is not an install, account, or purchase. The current preview adds no analytics vendor. Avoid creating a conversion claim from unconnected website and app data. Expand the guide set when actual support questions or search data reveal a useful unanswered task, and correct existing articles when product or marketplace details change.
