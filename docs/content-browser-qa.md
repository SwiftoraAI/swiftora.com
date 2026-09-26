# Content revision browser QA — 2026-09-26

This records the final 30 scans for the expanded audience, positioning, and seller-guide revision after the navigation initialization fix, with the earlier baseline retained below. The root agent executed these checks in the real Chrome browser through CUA against the local preview. This document aggregates saved evidence; it does not claim accessibility conformance, production performance, app runtime verification, or a deployment test.

## Evidence and coverage

Final evidence: top-level scan JSON files in `outputs/swiftora-content-revision/evidence/` in the task workspace. Included timestamps run from **2026-09-26T20:55:42.704Z to 20:56:39.234Z**, after the build recorded at 16:55:24 local / 20:55:24 UTC. Include the 26 route scans below plus four additional viewport scans. Exclude `home-1296.json`, which predates the final revision, and `menu-shift-diagnosis.json`, which contains six pre-fix CLS-only diagnosis runs and no axe scans. The original 30-scan baseline, plus those two excluded files, is preserved in `evidence/before-menu-fix/`. Earlier QA reports remain separate records.

| Route | Saved scan prefixes | Actual browser viewports |
| --- | --- | --- |
| `/` | `home` | 390 × 844; 1440 × 900 |
| `/demo.html` | `demo` | 390 × 844; 1440 × 900 |
| `/about.html` | `about` | 390 × 844; 1440 × 900 |
| `/guides.html` | `guides` | 390 × 844; 1440 × 900 |
| `/guides/secondhand-listing-checklist.html` | `guides-secondhand-listing-checklist` | 390 × 844; 1440 × 900 |
| `/guides/resale-roi-costs.html` | `guides-resale-roi-costs` | 390 × 844; 1440 × 900 |
| `/guides/thrift-vintage-resale-workflow.html` | `guides-thrift-vintage-resale-workflow` | 390 × 844; 1440 × 900 |
| `/pricing.html` | `pricing` | 390 × 844; 1440 × 900 |
| `/support.html` | `support` | 390 × 844; 1440 × 900 |
| `/privacy.html` | `privacy` | 390 × 844; 1440 × 900 |
| `/thank-you.html` | `thank-you` | 390 × 844; 1440 × 900 |
| `/offline.html` | `offline` | 390 × 844; 1440 × 900 |
| `/404.html` | `404` | 390 × 844; 1440 × 900 |

Additional scans: `home-320.json` at 320 × 900, `home-768.json` at 768 × 900, `home-900.json` at 900 × 900, and `guides-resale-roi-costs-320.json` at 320 × 900. Thus coverage is 13 scans each at 390 and 1440 pixels, two at 320, one at 768, and one at 900. The 900-pixel check specifically covers the expanded desktop navigation.

All 30 records report axe-core **4.13.0**, language `en-US`, device pixel ratio `1.0000000149011612`, and this user agent:

```text
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36
```

These are desktop Chrome viewport checks, not physical iPhone or Safari results. All recorded preference snapshots have `reducedMotion: false` and `dark: false`.

## Final automated findings

| Observation | Result across 30 scans |
| --- | --- |
| Axe violations | 0 |
| Horizontal document/body overflow | 0 |
| Captured error entries | 0 |
| Incomplete axe rule occurrences | 30, all `color-contrast` |
| Incomplete node occurrences | 117 |
| Captured resource entries | 129; all `127.0.0.1:4321`, all response status 200 |
| Instrumented initial-load LCP observations | 76–140 ms |
| Instrumented initial-load CLS session maxima | 0 in all 30 scans |
| INP | Not measured |

The axe run covers WCAG 2 A/AA, 2.1 A/AA, and 2.2 AA tagged rules. Incomplete results require review and are not passes: 35 node occurrences contain only non-text characters, 42 have a background obscured by a pseudo-element, and 40 have a background gradient. Counts include the same element across different routes and viewports; they are not unique defects.

Resource entries include the local QA scripts. They establish no external requests or non-200 responses among the captured subresources, not every possible interaction or the main document's HTTP status. Rendering `/404.html` does not verify production handling of an unknown URL. Error listeners start when the QA script runs and can miss earlier errors; zero captured entries is not a complete console audit. Nine of 77 image-element snapshots were incomplete or had zero natural width at initial capture, so these records do not establish that every image was loaded.

## Historical layout-shift finding and follow-up

The original 30-scan baseline ran from **20:48:05.794Z to 20:51:39.133Z**. Its aggregate was zero axe violations, horizontal overflow, and captured errors; 30 incomplete color-contrast rule occurrences covering 117 nodes; 129 local HTTP 200 resource entries; LCP 92–148 ms; and CLS 0–0.3361649558635251. Three historical mobile records each contain one nonzero layout-shift entry:

| Evidence file | Recorded CLS session maximum | Entry start time |
| --- | --- | --- |
| `before-menu-fix/guides-390.json` | 0.3361649558635251 | 63.9 ms |
| `before-menu-fix/support-390.json` | 0.3361649558635251 | 102.3 ms |
| `before-menu-fix/thank-you-390.json` | 0.3361649558635251 | 65.6 ms |

The other 27 historical scans recorded zero. Six additional pre-fix diagnosis loads (two each for these three routes) also recorded zero CLS, so they did not reproduce the original shifts. They are retained in `menu-shift-diagnosis.json` and are not included in either 30-scan aggregate.

Source review identified deferred menu enhancement as a plausible late layout change. `src/components/Header.astro` now initializes the custom navigation element with a synchronous inline script immediately after the header, before the main content. This removes the deferred initialization path; the saved evidence does not prove it caused the three historical shifts. The final 30 fresh scans, including all three affected mobile routes, recorded zero CLS. Retain both results rather than rewriting the historical run as a pass.

LCP and CLS are short observations of instrumented localhost page loads, including QA script overhead. They are not field data, p75 Core Web Vitals, a controlled performance benchmark, or evidence about production network conditions.

## Manual browser checks executed by the root agent

These checks are recorded from the root agent's CUA session and task notes, separately from the 30 automated scans:

- Mobile menu: Space opens it, Tab reaches “How it works,” and Escape closes it and returns focus to Menu.
- Home “Who it's for” anchor: destination is approximately 24 pixels below the viewport top.
- Marketplace FAQ: Enter opens the answer explaining that Swiftora does not connect to marketplaces or automatically publish listings.
- ROI guide table of contents: clicking the worked-example link reaches `#worked-example` approximately 24 pixels below the top. The two-column example table was readable with no horizontal overflow at 390 pixels.
- Home primary mobile CTA: top 447.64 pixels and bottom 499.64 pixels, both inside the 844-pixel viewport.
- Legacy `/index.html#waitlist` at the final 320-pixel viewport: download target received focus and appeared approximately 24.10 pixels below the top.

After the navigation initialization fix, the root agent repeated the Space → Tab → Escape keyboard-menu sequence at 320 pixels and confirmed the same opening, link focus, closing, and returned Menu focus. The other manual checks above belong to the content-revision session before that initialization change; they are not represented as individually repeated after it.

Saved `home-mobile-crop.png`, `audience-mobile-crop.png`, and `roi-example-mobile-crop.png` are each **312 × 672 pixels**, cropped from a 390-pixel-wide browser viewport because of the compositor capture restriction. They are not full-page or full-viewport screenshots.

## Supplemental solid-color contrast calculations

The following are arithmetic checks of the specified solid foreground/background pairs using sRGB relative luminance. They are not measurements of composited gradient pixels and do not resolve every axe incomplete result.

| Foreground | Background | Calculated ratio |
| --- | --- | --- |
| `#ffac89` | `#372952` | 7.19:1 |
| `#e0dbe9` | `#372952` | 9.67:1 |
| `#cecaff` | `#372952` | 8.44:1 |
| `#49424e` | `#ffffff` | 9.67:1 |
| `#5b535f` | `#f7f7f8` | 6.89:1 |
| `#4a42e0` | `#ffffff` | 6.67:1 |

Each specified pair exceeds 4.5:1. The gradient and pseudo-element backgrounds still require contextual review; these calculations are not a site-wide contrast or accessibility conformance claim.

## Remaining validation boundaries

Screen-reader testing, WebKit/Safari, physical iPhone behavior, physical QR scanning, verified 200% browser zoom, and toggling the operating-system reduced-motion setting are not established by this run. Reduced-motion CSS review is distinct from exercising that preference. Production deployment, cache and legacy service-worker behavior, and production response/header checks also remain outside this localhost evidence. Product screenshots or recordings and app runtime claims require separate provenance.
