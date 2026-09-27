# Local browser QA results

## Method and evidence

The director exercised the built local preview in a real Chromium browser through CUA. This report aggregates the resulting evidence; it does not add new test executions. The 23 instrumented scan JSON files and viewport screenshots are in the workspace deliverable folder `outputs/swiftora-preview/evidence/`. Manual interactions are recorded in `manual-browser-checks.json`.

- Scan timestamps: **2026-09-26 19:23:33.531–19:27:23.170 UTC**.
- Origin: `http://127.0.0.1:4321`; scan URLs use `?qa=1` to inject local diagnostic scripts.
- Browser: Chrome/Chromium **153.0.0.0**, Windows; reported device pixel ratio **1.0000000149011612**, language `en-US`.
- Axe: **axe-core 4.13.0**, tagged rules `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`.
- No network or CPU throttling was applied. All recorded preferences were light mode and `prefers-reduced-motion: false`.

Exact user agent in every scan:

```text
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36
```

The compatibility tokens in this user agent do not establish Safari or WebKit-engine testing. Narrow viewports are desktop-browser resizing, not physical iPhone testing.

## Scan coverage

Home was scanned at the six specified widths plus an additional 320 px check. Every scan below recorded zero axe violations, zero horizontal document overflow and zero captured error events.

| Home evidence | Viewport px | Observed LCP ms | Observed CLS | Incomplete rule results / node occurrences |
|---|---:|---:|---:|---:|
| `home-320.json` | 320 × 844 | 172 | 0 | 1 / 3 |
| `home-375.json` | 375 × 844 | 148 | 0 | 1 / 3 |
| `home-390.json` | 390 × 844 | 156 | 0 | 1 / 3 |
| `home-430.json` | 430 × 844 | 148 | 0 | 1 / 3 |
| `home-768.json` | 768 × 1000 | 156 | 0 | 1 / 3 |
| `home-1280.json` | 1280 × 1000 | 140 | 0 | 1 / 3 |
| `home-1440.json` | 1440 × 1000 | 172 | 0 | 1 / 3 |

Eight further routes were each scanned at **390 × 844** and **1440 × 1000**, adding 16 scans. Each recorded CLS 0 and one incomplete rule result containing one node occurrence. Evidence filenames are `<name>-390.json` and `<name>-1440.json`.

| Route | Evidence name | LCP ms at 390 / 1440 |
|---|---|---:|
| `/demo.html` | `demo` | 156 / 196 |
| `/pricing.html` | `pricing` | 132 / 148 |
| `/about.html` | `about` | 112 / 152 |
| `/support.html` | `support` | 156 / 144 |
| `/privacy.html` | `privacy` | 132 / 128 |
| `/thank-you.html` | `thank-you` | 160 / 144 |
| `/offline.html` | `offline` | 128 / 164 |
| `/404.html` | `404` | 136 / 136 |

The `.jpg` evidence consists of viewport captures, including supplemental scrolled home views and menu/keyboard/legacy-fragment states. It is not a set of full-page stitched screenshots and does not establish behavior outside the captured views.

## Accessibility, layout, errors and resources

| Check | Recorded result | Interpretation |
|---|---|---|
| Axe violations | **0 across 23 scans** | No violations detected by the selected automated rules in these states; not WCAG conformance certification. |
| Axe incomplete | **23 `color-contrast` rule results; 37 node occurrences** | One incomplete category, reported with `serious` impact. These require manual adjudication and are not recorded as resolved violations. |
| Horizontal overflow | **0/23** | `document.scrollWidth` did not exceed `document.clientWidth` at capture time. This is not proof of every interactive or zoomed state. |
| Captured errors | **0/23 nonempty error arrays** | Local listeners recorded no `window.error` or `unhandledrejection` entries after instrumentation began. This is not a complete browser-console log; earlier errors could be missed. |
| Observed resource requests | **110 timing entries, all same-origin, all status 200** | No external, HTTP error or unknown/zero-status resource entry was recorded. Entries include local QA scripts and repeat across scans. |

The 37 incomplete node occurrences are repeated elements across viewports: **23 back-to-top arrows, 7 home secondary-action arrows and 7 home decorative checkmarks**. Axe's reason for all was that the element contained only non-text characters. The source marks these symbols `aria-hidden`; that observation alone does not replace manual contrast/accessibility review. They are not 37 distinct defects.

Resource results cover the recorded Resource Timing entries, including local CSS, images and QA scripts. They exclude the main document's HTTP status and do not establish production endpoint status, all deferred requests, external destination health, or correct server handling of a missing URL. A direct visit to `/404.html` is not a test that an arbitrary missing path returns HTTP 404.

## Performance observations

Across the 23 instrumented initial loads, observed **LCP ranged from 112 to 196 ms** and recorded **CLS was 0** throughout. These are unthrottled localhost diagnostics with QA-script overhead, collected during short initial-load windows. They are not field data, a 75th-percentile result, a mobile-network benchmark, or proof that production meets Core Web Vitals targets. **INP was not measured.** No performance score is inferred.

## Manual interactions and retests

The following results come from the director's real-browser interactions recorded in `manual-browser-checks.json`.

| Interaction | Recorded result |
|---|---|
| Skip link + Enter | Focus became `main`; fragment became `#main`. |
| Tab to Menu + Space | Menu expanded; focus stayed on Menu. |
| Tab within open Menu | Focus reached Get started with `/demo.html` destination. |
| Escape in open Menu | Menu closed; focus returned to Menu. |
| Initial `/#waitlist` | Download section scrolled into view and received focus. |
| **Initial `/index.html#waitlist`** | **Focus failure:** download section was visible, but focus remained `top`. This initial attempt did not pass the focus requirement. |
| Local repeat legacy visit | Download section received focus. This was a focus check, not production service-worker/cache migration testing. |
| **After fix: both `/#waitlist` and `/index.html#waitlist`** | **Retest passed the recorded scroll/focus check:** both focused `download`, with its top approximately 23.66 px below the viewport top. |
| Back to top | Fragment became `#top`; header top was 0. |
| Mobile Pricing navigation | Opened the local `/pricing.html` page with the expected title. |
| Primary App Store link | Opened `https://apps.apple.com/us/app/swiftora/id6760380351`; the page heading was Swiftora. |
| Desktop QR's ordinary clickable link | Opened the same exact App Store URL. This was not a camera scan of the QR image. |
| Browser zoom shortcut probe | No measured viewport change: before/after width 1425 and height 1000. Actual zoom was **not verified**; this is not a 200% zoom pass. |

The full 23-scan matrix is not represented as a newly executed scan suite after the fragment-focus change. The evidence separately records the targeted post-fix manual checks.

## Remaining verification

- Manual screen-reader testing and complete keyboard/focus review beyond the recorded interactions.
- WebKit/Safari and a physical iPhone; actual physical camera scanning of the QR destination.
- Actual 200% browser zoom/text enlargement. Resizing to 320 px is useful reflow evidence but does not substitute for zoom testing.
- Toggling the reduced-motion preference and exercising the page with it enabled. Reduced-motion handling has only CSS review here; all captured browser states reported the setting disabled.
- Manual resolution of the incomplete contrast category and broader visual/touch-target review.
- Production-origin cache headers, old service-worker/cache retirement, and returning-visitor behavior under the prior production worker.
- A deployed preview/release and rollback exercise, production HTTP/redirect/indexability checks, and critical journeys on the actual deployed site.

No App Store install, native-app runtime workflow, purchase, support-email delivery or app entitlement test is implied by this website QA.
