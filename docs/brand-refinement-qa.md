# Brand refinement QA

## Evidence and scope

This is a separate record for the brand refinement. It does not overwrite or extend the earlier results in `qa-browser-results.md` by assumption. The director collected 22 real-browser scan reports through CUA from the instrumented local preview. Raw JSON and cropped images are in the workspace deliverable folder `outputs/swiftora-brand-refinement/evidence/`.

- Current scan records span **2026-09-26 20:07:01.483–20:11:26.005 UTC**. The six home scans were refreshed at 20:11:18.737–20:11:26.005 after the final link-label correction; the 16 unchanged non-home route scans retain their earlier results.
- Origin: `http://127.0.0.1:4321`; diagnostic scans use `?qa=1` and locally injected QA scripts.
- Browser: Chrome/Chromium **153.0.0.0** on Windows; axe-core **4.13.0**.
- Reported device pixel ratio: **0.9000000134110451** in every scan, reflecting the 90% app/browser scale used for this run.
- All captured preferences: light mode; `prefers-reduced-motion: false`.
- Axe scope: WCAG 2 A/AA, 2.1 A/AA and 2.2 AA tagged rules. This is not a conformance certification.

Exact user agent:

```text
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36
```

Browser-reported viewport dimensions are authoritative for coverage. In particular, **`home-375.json` reports 376 × 844, not 375 × 844**. The target rounded under the 90% scale; this run must not be reported as an exact 375 px pass. The earlier 375 px evidence concerns the earlier design.

## Actual coverage and results

The scan set has nine reports at 390 px, nine at 1440 px, and one each at **376, 430, 768 and 1280 px**. No 320 px refinement scan is included.

| Home report | Actual viewport px | LCP observation ms | CLS | Incomplete node occurrences |
|---|---:|---:|---:|---:|
| `home-375.json` | **376 × 844** | 124 | 0 | 11 |
| `home-390.json` | 390 × 844 | 152 | 0 | 11 |
| `home-430.json` | 430 × 844 | 176 | 0 | 11 |
| `home-768.json` | 768 × 900 | 160 | 0 | 11 |
| `home-1280.json` | 1280 × 900 | 152 | 0 | 11 |
| `home-1440.json` | 1440 × 900 | 156 | 0 | 12 |

Eight further routes were scanned at **390 × 844** and **1440 × 900**. Filenames use `<name>-390.json` and `<name>-1440.json`.

| Route / evidence name | LCP ms at 390 / 1440 | Incomplete node occurrences at 390 / 1440 |
|---|---:|---:|
| `/demo.html` / `demo` | 212 / 220 | 2 / 6 |
| `/pricing.html` / `pricing` | 152 / 160 | 2 / 6 |
| `/about.html` / `about` | 176 / 148 | 2 / 6 |
| `/support.html` / `support` | 156 / 176 | 2 / 6 |
| `/privacy.html` / `privacy` | 108 / 156 | 2 / 6 |
| `/thank-you.html` / `thank-you` | 180 / 172 | 1 / 1 |
| `/offline.html` / `offline` | 136 / 172 | 1 / 1 |
| `/404.html` / `404` | 124 / 156 | 1 / 1 |

Every one of the 22 scans recorded:

- **Zero axe violations.**
- **No measured horizontal document overflow.**
- **No captured `window.error` or `unhandledrejection` entries.**
- CLS observation **0** and one incomplete `color-contrast` rule result.

Error listeners started with the diagnostic script; these records do not include a complete browser-console history or prove absence of earlier errors. Overflow observations apply to the captured states and dimensions.

## Contrast review remains open

There are **22 incomplete `color-contrast` rule results covering 113 repeated node occurrences**, divided by axe's recorded reason:

| Reason | Node occurrences |
|---|---:|
| Background color could not be determined because of a gradient | 48 |
| Background color could not be determined because of a pseudo-element | 37 |
| Content contains only non-text characters | 28 |

These are repeated observations across routes/viewports, not 113 distinct defects. They include actual hero and download text, action labels and fine print as well as decorative arrows. Unlike the earlier design's incomplete results, they cannot all be described as decorative symbols. Automated detection did not prove these text/background combinations pass; manually assess contrast over the gradients and pseudo-elements before treating the category as resolved.

## Resources and performance limits

All **99 recorded Resource Timing entries** in the current 22 reports were same-origin and returned **status 200**. No external, error-status or unknown/zero-status resource was recorded. This includes local QA scripts and repeated resources across scans; it excludes the main document's HTTP status and may not include deferred requests outside the observation window. It is not production network verification, a missing-URL HTTP 404 test, or an external-link health check.

Observed LCP ranged from **108 to 220 ms**, with CLS **0** across this unthrottled, instrumented localhost run. QA scripts add overhead. These are short initial-load diagnostics, not field data, 75th-percentile Core Web Vitals, a mobile-network benchmark or a production performance guarantee. **INP was not measured.** The altered scale, viewport heights and design also prevent a controlled performance comparison with the earlier run.

## Screenshot and manual-check limits

The JPEGs are **cropped captures**, not full-page or complete-viewport evidence. Their image dimensions are distinct from CSS viewport dimensions: for example, `home-375.jpg` is 333 × 692 image pixels while its report records a 376 × 844 CSS viewport; `home-1440.jpg` is 1281 × 738 image pixels for a 1440 × 900 CSS viewport. Do not infer device, zoom level or uncaptured page coverage from JPEG size alone.

Refinement-specific manual results are now recorded in `manual-checks.json`:

| Interaction | Recorded result |
|---|---|
| Menu + Space | Passed the recorded check: menu expanded; focus was Menu. |
| Tab in the open menu | Next recorded item was Get started, destination `/demo.html`. |
| Escape | Passed the recorded check: menu closed; focus returned to Menu. |
| `/#waitlist` | Passed the recorded scroll/focus check: focus was `download`, with the section top approximately 23.90 px below the viewport top. |
| `/index.html#waitlist` | Passed the same recorded scroll/focus check: focus was `download`, top approximately 23.90 px. |

The prior run's other keyboard and App Store click results are not automatically counted as repeated passes for this refinement. Supplemental menu/features screenshots alone do not establish behavior beyond these recorded interactions.

Pending or not established by this record: exact 375 px and 320 px refinement checks; manual screen-reader testing; WebKit/Safari; physical iPhone; physical QR scan; actual 200% zoom/text enlargement; reduced-motion preference toggling; manual contrast adjudication; deployed preview/production cache headers and service-worker migration; real production HTTP/redirect/indexability checks. The 90% scale is not evidence of a 200% zoom test.

## Current copy review

Read-only review covered `src/pages/index.astro`, `src/data/content.json`, `src/data/product.json` and `src/data/site.json`. The revised public claims remain within listing assistance, owner-confirmed ROI tracking, iPhone availability and store-published free download with in-app purchases. Exact plan entitlements stay deferred to the app. No sold-comparable, calibrated-confidence, connector/API, cross-posting, processing-time, guaranteed-return or verified-product-screen claim was introduced. Operator and support identity remain owner-confirmed.

The QR-card label **“Open listing”** was identified as ambiguous and has been corrected by the integration owner to **“Open App Store”**. The six refreshed home scans follow that correction. No source edits were made by this reviewer. Real product screenshots and workflow recording remain absent; the design must not be described as product-runtime evidence.

Director's subsequent contrast adjudication is saved as `evidence/contrast-review.json` in the refinement packet. Sixteen actual CSS foreground/background pairs, including the brightest composited hero background, exceed 4.5:1 (minimum 5.363:1). The accent pseudo-elements sit above the text areas. This resolves the reviewed source-color concerns without erasing axe's incomplete results or claiming full accessibility conformance.
