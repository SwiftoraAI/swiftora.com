# Preview implementation — 2026-09-26

Eric approved the audit's implementation scope, then confirmed Swiftora LLC as website operator and info@swiftora.com as public support. The app is released with basic functionality and ROI tracking; no API connectors exist. These confirmations govern this preview. Implementation approval does not authorize production publication.

## Decisions implemented

- Retain Swiftora's original wordmark and favicon bytes. The white wordmark sits on dark plum; orange controls use dark text. Warm paper surfaces, system fonts and editorial layouts provide the shared design system. No brand redraw or invented app imagery.
- Use Astro static output and shared components instead of duplicated final pages. Native app, backend, subscriptions and integrations remain outside scope.
- Send visitors to the exact iPhone App Store listing. Desktop QR is decoded at every displayed size and has an ordinary link. No forced redirect, analytics service, form, upload, fake AI, checkout or replacement signup journey.
- Pricing defers exact plans/quotas to the app until authoritative purchase and entitlement evidence agrees. No fabricated proof, testimonials, financial result or integration claims.
- Preserve `.html` routes, home `/index.html`, extensionless aliases in local preview, `#how` and `#waitlist`. The old fragment reaches the visible download section and receives keyboard focus; an initial index-alias focus timing defect was found and fixed during browser QA. Real 404, `robots.txt`, sitemap, canonical tags and social metadata are generated.
- Centralize public destinations/operator/support in `src/data/site.json`; resolve contact placeholders in copy at build time. Approved product scope and disabled exact plans live in `product.json`.
- Keep previous browser data untouched; the website privacy copy acknowledges older browser-only signup details and describes manual browser-data removal. Retain the audited network-only service worker unchanged and never create a new registration.
- Automatic approval review rejected deleting legacy files because the deletion set included backend-adjacent prototypes. The safe alternative is output isolation: historical source remains in the repository and the verifier excludes it from `dist/`. No removal, prototype invocation or deployment occurred.
- Add read-only PR/manual build validation with pinned actions; no deployment workflow or production credentials. Unknown existing Pages settings prevent a safe remote push/merge decision, so all commits remain local.

## Review stages and evidence

1. `d372af9`: correct the seven existing HTML pages as a discrete factual milestone. Remove waitlist/simulated flows from their page bodies; retain old root CSS/source for history.
2. Shared static site: nine generated pages, shared header/footer/CTA/layout, responsive styling, truthful content, metadata, original assets and generated QR/social card, public-output verification and local preview.
3. Release hardening/documentation: build-only CI, asset/content/visual/QA evidence, change decisions and release/rollback instructions.

Only the director stages/commits shared work. Three independent specialists handled product/copy, brand/visual assets and engineering/security, alongside the director's frontend integration/browser testing. Assignments used distinct files. Review results are in `content-evidence.md`, `visual-review.md`, `qa-browser-results.md`, `asset-validation.json` and the external evidence packet.

## Measurement and privacy

`data-cta` attributes identify potential download/support placements but do not transmit events. No analytics SDK or beacon is installed. If separately approved later, an `app_store_click` may measure an outbound click, and `qr_interaction` may describe a click on the QR link only. A displayed QR does not reveal a scan; neither event proves an install. Walkthrough events are inapplicable until genuine media exists. Never add emails, item photos or unnecessary personal information to event payloads.

## Outstanding work before a full release

- Obtain genuine released-app input, listing-draft and ROI captures plus a short actual workflow recording. Record app build, device/OS, plan, date/state and content rights. No visible placeholders or fabricated substitute are present; the real-product walkthrough remains incomplete.
- Obtain authenticated Pages source/build/environment and domain-control records. Public evidence strongly identifies the base, but exact settings, active deployment and recovery controls are not authenticated.
- Complete physical iPhone/QR, WebKit, screen-reader and actual browser-zoom checks; review reduced-motion behavior with the preference enabled. Local repeat visits do not establish old production service-worker/cache behavior.
- Rehearse an approved truthful rollback artifact, then present the exact candidate/artifact and release action for gate 2. Production publishing and post-deploy checks remain unexecuted.

Recommendation: review this tested conservative preview while those dependencies are collected. Do not publish it as a completed real-app walkthrough, or merge it into a production-connected branch under unknown root-publishing settings.
