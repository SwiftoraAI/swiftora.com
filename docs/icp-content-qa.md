# ICP and seller-guide content verification

This record covers the local content expansion on the review branch. It does not certify native-app behavior, production publication, search indexing, ranking or field performance.

## Source and claim boundaries

The original `claude.md/Swifora - Onboarding Doc (Remy).docx`, section 2, identifies independent resale sellers: Etsy vintage/collectibles sellers, eBay sellers, Facebook Marketplace sellers and side-hustle flippers. It describes limited evenings/weekends, pricing uncertainty, repetitive listing work and interest in ROI. These are useful audience and problem statements, not evidence of app capabilities or measured customer outcomes.

Other sections of that document describe sold-comparison data, pricing confidence, automation, social content and proposed plans. `Swiftora - phases.docx`, section 8, excludes direct marketplace listing push from the MVP. `Swiftora - Paid Tiers .docx` contains proposed pricing, internal revenue assumptions and future marketplace strategy. Those historical plans must not become current integration promises, guaranteed returns, savings claims or advertised entitlements. General seller guides are editorial advice, not simulated Swiftora output. The current approved product description remains listing assistance and ROI tracking; no marketplace API connector has been established by this website work.

Original business documents, prototype functions and retained legacy source remain outside the `dist/` publication artifact. Authenticated Pages evidence recorded in the publishing guide showed the production source as legacy publishing from `one-pager` at `/`. A merge into that serving branch can therefore publish repository-root contents independently of PR validation. Switching to the reviewed `dist/` publication workflow, merging and deploying remain production release actions requiring approval.

## Output checks added

`scripts/check-output.mjs` derives guide routes from `src/data/guides.json`, requiring unique, safe slug strings and valid related-guide references. The expected artifact includes all nine existing HTML routes, the guide hub and every declared guide. The allowlist accepts only those HTML paths and the existing approved static resources; it does not grant blanket access to a `guides/` directory.

The checks require one nonempty H1, exactly one expected canonical and parseable JSON-LD on every HTML route. Each guide needs an Article or BlogPosting with a headline and canonical page identity. Ordinary links must connect home to the guide hub, the hub to every article, each article back to the hub and each article to its declared related guides. Local resources and fragments must resolve, and sitemap URLs must exactly match the intended indexable routes. Existing output boundaries, legacy anchors, noindex utility routes, App Store destinations, unchanged worker, and exclusions for forms, prototype endpoints, credentials and QA instrumentation are retained.

The sitemap endpoint continues to use `src/data/site.ts` as its route source. No duplicate route-generation logic was introduced into `sitemap.xml.ts`.

## Executed checks

Checked 2026-09-26T20:58:27.397131+00:00 against the final 16:55:24 local build, including the synchronous navigation fix, and its actual `dist/` artifact: **23 files, 13 HTML routes, 3 seller guides**.

- Updated verifier: exit `0`. `Verified 23 public files, 13 HTML routes (3 guides), local references, App Store links, legacy fragments, H1s, JSON-LD, metadata, sitemap and output boundaries.
Source/output checks only; browser, device, QR scanning and release verification remain separate.`
- Local HTTP requests: **50/50 passed** through a separately started preview at `127.0.0.1:4322`; that process was stopped after the checks.
- Independent Python HTML/XML inspection: **61/61 passed** using HTMLParser and ElementTree independently of the JavaScript verifier.
- Final header check: **13/13 routes passed**. Each output has exactly one classic synchronous navigation script immediately after the header and before main, without a navigation module, external source, async or defer attribute. The separate page-layout module remains intentional.
- Source review confirmed `Header.astro` uses `is:inline`, an IIFE, plain JavaScript and listener setup before applying the enhanced state. No-JavaScript navigation remains visible; its toggle remains hidden.
- JavaScript syntax check for the updated verifier passed.

HTTP coverage includes the actual bytes of every visitor-facing artifact, the root, extensionless legacy and guide aliases, HEAD, true 404 responses including a nonexistent guide, source/prototype exclusions, traversal/hidden-file rejection, method/host guards and preview-only QA query behavior. CNAME and `.nojekyll` are checked as artifact control files, not visitor resources. Normal HTML responses contained no injected QA scripts.

Independent content checks cover each canonical, one nonempty H1 per route, parseable JSON-LD, guide hub and related links, matching Article headline/URL, breadcrumb links, exact XML sitemap membership, the robots sitemap declaration and the guide-directory allowlist.

Manifest SHA-256 (sorted-key compact JSON of the path/bytes/SHA-256 records below): `6a5122672cc899dc662c65e096eeebc62d1efe8bafecadaf5a0ce3c4dae1b068`.

| Artifact | Bytes | SHA-256 |
|---|---:|---|
| `.nojekyll` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `404.html` | 6931 | `3e9de637b0172150d3434acd41238d3862a8e97065382596b3bb66336dd434a6` |
| `_astro/SiteLayout.COzhZPqv.css` | 32292 | `e883984d9303a89cc7d506629d9d8c94bb13001ccf92584eea9b2bc93a8403c0` |
| `about.html` | 12710 | `ee352656760299533342e7ef18270f86f0e9f773e6292a7ef433f4f56ede1c2a` |
| `assets/brand/wordmark.png` | 244915 | `429668f4249deb6002b87174775489b23cf86f812a807db0fd4d583c6c7c24cd` |
| `assets/qr-app-store.svg` | 2007 | `d25e5b1653c29fd13e10c5b125a94f4860a07b546dfba46ce942a458942b3af1` |
| `assets/social-card.png` | 52722 | `29490fa7278f0d3f8cebc6c0504c6eaa8a80edc6954006fae511b1f50886c95b` |
| `CNAME` | 17 | `f870ae19c89a7f55964d3a7ad32c8fb07477c53757d002a383208e4fc14a5fd9` |
| `demo.html` | 13280 | `9d03c6ecb125363934c975873df0c74832bf57cc3262039a2ae4d1126a150494` |
| `favicon.png` | 10011 | `64a5a28a3e0dbbc7fb8af9759c6304a8804f84fad82440f39bfe002c0a5c6c39` |
| `guides/resale-roi-costs.html` | 15443 | `c8bdd36843dfeea379bce52d672985876b51d6cf4a801b1a6ccbb0a7b8b362ae` |
| `guides/secondhand-listing-checklist.html` | 15353 | `2720a087f318645f7b9d1d67f14d0cb3abe91254e16a062fe6aac6906bf44d8e` |
| `guides/thrift-vintage-resale-workflow.html` | 15208 | `7b18213fd8846dd056ddbb2c11f70f393e1503348bdd8bb56f085eb3b7407507` |
| `guides.html` | 10587 | `3364d4f3cda999cdb124c6ff6be054f082899ab90d82ebe4df32fbf1a35db5b1` |
| `index.html` | 21307 | `9db4ca040853ba8ee42b39c89a899848a82d72b317cce064b3f6d22db5fcca0f` |
| `offline.html` | 7002 | `2e92d7f9e01f3bb6c973f25787545e7ac03fa0ee40a3aafd4c11fd9dcd89a0c4` |
| `pricing.html` | 9072 | `83faab842a51debb032bb43e0168f799cf1c4b2938320d7e0071b5f8ee7cb76f` |
| `privacy.html` | 10650 | `600058ac98fd93422ee7de1af1d0842c4264ecdaedf425b41ea9279ddd8971f1` |
| `robots.txt` | 70 | `96fb53fe896c852f3e9d14f26b0e0b4086e4f7f33138a83da85112e0ff0347ba` |
| `service-worker.js` | 676 | `6823e4d35e471dc1befd5bc87a95873c89d587b43a08874901b77b6c4994874f` |
| `sitemap.xml` | 753 | `2baf51d3b89a71aa228c1e7d2c052feeb3dc8569e12f8d345c3451887058bd2a` |
| `support.html` | 9527 | `d81b1b4cc787a48a1308d3c0ba35dfa79d21f27a67a35ac956da7aba94948976` |
| `thank-you.html` | 6920 | `3bfc8a40ab92a970ac609799aeb75a99fcd764003995e33ef93748b775d08204` |

### Local HTTP results

| Request | Expected / actual status | Passed |
|---|---|---|
| `GET /` | 200 / 200 | Yes |
| `HEAD /` | 200 / 200 | Yes |
| `GET /404.html` | 404 / 404 | Yes |
| `GET /_astro/SiteLayout.COzhZPqv.css` | 200 / 200 | Yes |
| `GET /about.html` | 200 / 200 | Yes |
| `GET /assets/brand/wordmark.png` | 200 / 200 | Yes |
| `GET /assets/qr-app-store.svg` | 200 / 200 | Yes |
| `GET /assets/social-card.png` | 200 / 200 | Yes |
| `GET /demo.html` | 200 / 200 | Yes |
| `GET /favicon.png` | 200 / 200 | Yes |
| `GET /guides/resale-roi-costs.html` | 200 / 200 | Yes |
| `GET /guides/secondhand-listing-checklist.html` | 200 / 200 | Yes |
| `GET /guides/thrift-vintage-resale-workflow.html` | 200 / 200 | Yes |
| `GET /guides.html` | 200 / 200 | Yes |
| `GET /index.html` | 200 / 200 | Yes |
| `GET /offline.html` | 200 / 200 | Yes |
| `GET /pricing.html` | 200 / 200 | Yes |
| `GET /privacy.html` | 200 / 200 | Yes |
| `GET /robots.txt` | 200 / 200 | Yes |
| `GET /service-worker.js` | 200 / 200 | Yes |
| `GET /sitemap.xml` | 200 / 200 | Yes |
| `GET /support.html` | 200 / 200 | Yes |
| `GET /thank-you.html` | 200 / 200 | Yes |
| `GET /about` | 200 / 200 | Yes |
| `GET /pricing` | 200 / 200 | Yes |
| `GET /demo` | 200 / 200 | Yes |
| `GET /privacy` | 200 / 200 | Yes |
| `GET /support` | 200 / 200 | Yes |
| `GET /thank-you` | 200 / 200 | Yes |
| `GET /offline` | 200 / 200 | Yes |
| `GET /guides` | 200 / 200 | Yes |
| `GET /guides/secondhand-listing-checklist` | 200 / 200 | Yes |
| `GET /guides/resale-roi-costs` | 200 / 200 | Yes |
| `GET /guides/thrift-vintage-resale-workflow` | 200 / 200 | Yes |
| `GET /about/` | 404 / 404 | Yes |
| `GET /not-a-real-page` | 404 / 404 | Yes |
| `GET /guides/not-a-real-guide.html` | 404 / 404 | Yes |
| `GET /netlify.toml` | 404 / 404 | Yes |
| `GET /netlify/functions/stream-analyze.js` | 404 / 404 | Yes |
| `GET /claude.md/MVP%20-%20Insights.docx` | 404 / 404 | Yes |
| `GET /api/presign-upload` | 404 / 404 | Yes |
| `GET /package.json` | 404 / 404 | Yes |
| `POST /` | 405 / 405 | Yes |
| `GET /..%2fpackage.json` | 400 / 400 | Yes |
| `GET /.git/config` | 400 / 400 | Yes |
| `GET /__qa/browser.js` | 404 / 404 | Yes |
| `GET /__qa/browser.js?qa=1` | 200 / 200 | Yes |
| `GET /__qa/axe.min.js?qa=1` | 200 / 200 | Yes |
| `GET /?qa=1` | 200 / 200 | Yes |
| `GET /` (Host: unrelated.example) | 421 / 421 | Yes |

### Independent HTML/XML results

| Check | Passed |
|---|---|
| 404.html: canonical | Yes |
| 404.html: one nonempty H1 | Yes |
| 404.html: parseable JSON-LD present | Yes |
| about.html: canonical | Yes |
| about.html: one nonempty H1 | Yes |
| about.html: parseable JSON-LD present | Yes |
| demo.html: canonical | Yes |
| demo.html: one nonempty H1 | Yes |
| demo.html: parseable JSON-LD present | Yes |
| guides/resale-roi-costs.html: canonical | Yes |
| guides/resale-roi-costs.html: one nonempty H1 | Yes |
| guides/resale-roi-costs.html: parseable JSON-LD present | Yes |
| guides/secondhand-listing-checklist.html: canonical | Yes |
| guides/secondhand-listing-checklist.html: one nonempty H1 | Yes |
| guides/secondhand-listing-checklist.html: parseable JSON-LD present | Yes |
| guides/thrift-vintage-resale-workflow.html: canonical | Yes |
| guides/thrift-vintage-resale-workflow.html: one nonempty H1 | Yes |
| guides/thrift-vintage-resale-workflow.html: parseable JSON-LD present | Yes |
| guides.html: canonical | Yes |
| guides.html: one nonempty H1 | Yes |
| guides.html: parseable JSON-LD present | Yes |
| index.html: canonical | Yes |
| index.html: one nonempty H1 | Yes |
| index.html: parseable JSON-LD present | Yes |
| offline.html: canonical | Yes |
| offline.html: one nonempty H1 | Yes |
| offline.html: parseable JSON-LD present | Yes |
| pricing.html: canonical | Yes |
| pricing.html: one nonempty H1 | Yes |
| pricing.html: parseable JSON-LD present | Yes |
| privacy.html: canonical | Yes |
| privacy.html: one nonempty H1 | Yes |
| privacy.html: parseable JSON-LD present | Yes |
| support.html: canonical | Yes |
| support.html: one nonempty H1 | Yes |
| support.html: parseable JSON-LD present | Yes |
| thank-you.html: canonical | Yes |
| thank-you.html: one nonempty H1 | Yes |
| thank-you.html: parseable JSON-LD present | Yes |
| home links guide hub | Yes |
| guides/secondhand-listing-checklist.html: linked from hub | Yes |
| guides/secondhand-listing-checklist.html: links hub | Yes |
| guides/secondhand-listing-checklist.html: declared related links | Yes |
| guides/secondhand-listing-checklist.html: Article headline matches H1 | Yes |
| guides/secondhand-listing-checklist.html: Article URL matches canonical | Yes |
| guides/secondhand-listing-checklist.html: valid breadcrumb item links | Yes |
| guides/resale-roi-costs.html: linked from hub | Yes |
| guides/resale-roi-costs.html: links hub | Yes |
| guides/resale-roi-costs.html: declared related links | Yes |
| guides/resale-roi-costs.html: Article headline matches H1 | Yes |
| guides/resale-roi-costs.html: Article URL matches canonical | Yes |
| guides/resale-roi-costs.html: valid breadcrumb item links | Yes |
| guides/thrift-vintage-resale-workflow.html: linked from hub | Yes |
| guides/thrift-vintage-resale-workflow.html: links hub | Yes |
| guides/thrift-vintage-resale-workflow.html: declared related links | Yes |
| guides/thrift-vintage-resale-workflow.html: Article headline matches H1 | Yes |
| guides/thrift-vintage-resale-workflow.html: Article URL matches canonical | Yes |
| guides/thrift-vintage-resale-workflow.html: valid breadcrumb item links | Yes |
| sitemap XML is exact indexable route set | Yes |
| robots has canonical sitemap | Yes |
| guide directory contains only declared article HTML | Yes |
| 404.html: one classic synchronous header script before main; no header module | Yes |
| about.html: one classic synchronous header script before main; no header module | Yes |
| demo.html: one classic synchronous header script before main; no header module | Yes |
| guides/resale-roi-costs.html: one classic synchronous header script before main; no header module | Yes |
| guides/secondhand-listing-checklist.html: one classic synchronous header script before main; no header module | Yes |
| guides/thrift-vintage-resale-workflow.html: one classic synchronous header script before main; no header module | Yes |
| guides.html: one classic synchronous header script before main; no header module | Yes |
| index.html: one classic synchronous header script before main; no header module | Yes |
| offline.html: one classic synchronous header script before main; no header module | Yes |
| pricing.html: one classic synchronous header script before main; no header module | Yes |
| privacy.html: one classic synchronous header script before main; no header module | Yes |
| support.html: one classic synchronous header script before main; no header module | Yes |
| thank-you.html: one classic synchronous header script before main; no header module | Yes |

These are source/output and local HTTP checks; no live deployment, remote form submission or browser automation was performed by this check. Preview noindex/cache headers are local test behavior, not verified production headers. Browser accessibility and interaction checks, native devices, historical service-worker behavior, production rollback and final live-publication verification remain separate.
