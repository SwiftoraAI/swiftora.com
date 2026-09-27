# Independent homepage image review

Reviewed 26 September 2026 using `view_image` on the director's actual browser captures under `outputs/swiftora-preview/evidence/`. This was image inspection only. I did not operate the browser, measure DOM geometry, inspect computed styles, test keyboard interactions, scan the QR, or perform a physical-device test. The capture filenames represent the director's requested widths; bitmap dimensions alone do not establish CSS viewport size.

## Result on replacement captures

The six replacement `home-WIDTH.jpg` files are reliable **viewport-only** evidence. The visible top areas show a coherent retained identity: intact white wordmark and orange/violet mark on plum, clear headline, warm paper background, and an obvious orange App Store action. No headline, logo, navigation or primary-button clipping/overlap was found in these views. This is a visual observation of the captured areas, not whole-page or functional signoff.

| Capture | Concrete observations |
|---|---|
| `home-375.jpg` | Header logo is intact and clearly visible. Headline occupies two lines; the supporting sentence wraps to three lines without collision. The orange download button appears before the secondary explore link and decorative panel. Both actions are visible in the initial viewport. No fake screen or empty media placeholder appears. |
| `home-390.jpg` | Logo and menu button remain separated. Headline and primary action are clear, with the secondary link on a following row. Supporting copy wraps to two lines. The decorative card follows the download action; nothing intersects its text. |
| `home-430.jpg` | Logo is intact. Main and secondary actions fit beside each other with visible separation. Headline remains two lines; the full decorative card is visible with its arcs contained. The next section begins near the viewport bottom naturally. |
| `home-768.jpg` | Menu-style navigation is visible. Hero uses two columns: proposition/action left, QR panel right. Logo, headline, orange button, QR and adjacent text are complete. The feature-section heading and first feature row also appear without collisions. |
| `home-1280.jpg` | Full navigation fits on one line. Large headline and descriptive copy are balanced against the complete QR panel. Primary and secondary actions have clear separation. Feature-section heading is a single line in this capture, with no clipping. |
| `home-1440.jpg` | Full navigation and original logo are visible. Hero copy and QR panel retain clear gutters. The feature-section heading wraps to two intentional-looking lines within its column; it is not clipped. The top composition has no visible overlap. |
| `home-390-features.jpg` | The feature section shows exactly one sequence: 01 Listing assistance, 02 ROI tracking, 03 Your judgment. Each row has its own text, icon and divider; all copy is readable and separated. The lavender section begins cleanly below it. No repeated rows or overlap appear. |

## Discarded full-page capture limitation

The original versions of the six `home-WIDTH.jpg` files used a full-page capture path that produced repeated partial sections, clipped seams, duplicated footer bands and inconsistent blank framing. I flagged these as an evidence-quality concern rather than diagnosing a CSS defect. The director confirmed a full-page screenshot stitching defect and replaced all six files with viewport-only captures. The additional clean `home-390-features.jpg` independently shows that the previously repeated mobile feature rows do not exist in that actual captured viewport.

The initial corrupted outputs are discarded evidence and must not be presented as the site's appearance or as passing full-page screenshots. No CSS change is warranted solely from those discarded artifacts. Describe delivered screenshots as viewport captures; this tool limitation remains relevant when planning lower-page visual coverage.

## Additional reliable viewport review

The following additional images were individually opened and inspected. No clipping, overlapping text, duplicated sections, or missing logo was found within their captured content. Text cut off by a viewport's top/bottom edge is ordinary scroll framing, not evidence of a CSS clipping defect.

| Captures | Concrete observations |
|---|---|
| `home-1440-middle.jpg` | Lavender section has a clean two-column heading/copy arrangement; the review note is separated by a rule. The pricing section starts once below it, with readable heading and explanatory copy. The transition into the peach download section is continuous. |
| `home-1440-download.jpg`, `home-1440-footer.jpg` | These show the same viewport composition and should not be counted as different scroll coverage. The complete peach download block has intact centered headline, copy and orange action. Footer logo, link columns and lower copyright/contact row are readable and separate; no repeated footer band appears. |
| `home-390-footer.jpg` | Mobile footer logo is intact. Brand copy, App Store link, two link columns and bottom copyright/contact/back-to-top content fit without collision. The top of the download heading is outside this viewport, not internally clipped. |
| `legacy-download-390.jpg` | Complete mobile download heading, description, button and purchase note are visible above the footer. The section has accurate availability wording, with no visible waitlist form or signup success state. Image alone does not prove fragment-navigation behavior. |
| `pricing-390.jpg`, `pricing-1440.jpg` | Pricing headline wraps naturally, with a clear App Store action. Numbered explanatory sections have distinct headings/body copy. Mobile body text continues below the viewport without an apparent fixed-height cutoff. No invented pricing-card mockup is shown. |
| `demo-390.jpg`, `demo-1440.jpg` | Written get-started guide is clear; the download action precedes the steps. Step labels/body text remain separated. No upload control, simulated result, fake media player or empty screenshot slot appears. |
| `about-390.jpg`, `about-1440.jpg` | Large three-line editorial headline remains within its content width; introductory text and App Store action are clear. The first fact-checking section wraps naturally with sufficient space between title and body. |
| `privacy-390.jpg`, `privacy-1440.jpg` | Website privacy title, introductory distinction from app privacy and update date are visible. Section headings and paragraph text have readable spacing at both sizes. This is layout review, not verification or approval of legal statements. |
| `support-390.jpg`, `support-1440.jpg` | Contact proposition and email action are obvious. Section headings and support instructions fit their columns on desktop and stack without collisions on mobile. Image review does not verify mailbox delivery. |
| `404-390.jpg`, `404-1440.jpg` | Recovery headline/body and both navigation actions are intact. Buttons stack on mobile and align beside each other on desktop; footer begins cleanly. The image does not establish the response status code. |
| `offline-390.jpg`, `offline-1440.jpg` | Connection-help text and home/App Store actions have the same clear responsive arrangement. No false success or fake connected state appears. Offline behavior was not tested through these images. |
| `thank-you-390.jpg`, `thank-you-1440.jpg` | Page presents current iPhone availability, not a signup confirmation. Both download and home actions fit, with clean transition to the footer. |

## Remaining scope

No confirmed visual defect was found in the replacement and supplemental captured areas. The added images cover selected homepage middle/download/footer sections plus the tops of the supporting routes at 390 and 1440 widths. They do not constitute a complete full-page review of every route or every possible viewport/scroll position. The discarded full-page capture limitation still applies.

Screenshots cannot establish working navigation, accessible menu state, keyboard focus, computed contrast, touch-target dimensions, horizontal overflow measurements, zoom/reflow, reduced-motion behavior, or physical QR-camera success. The director's executed browser tests and asset-validation record address those separate checks. Do not label this image-only review a WCAG conformance assessment, a full-page review, or a physical iPhone test.

No source or CSS changes were made as part of image review. A separately requested asset-generator validation update added local QR decode checks at the actual 112, 125 and 152px CSS display sizes; that evidence remains in `docs/asset-validation.json` and is not a physical camera test.
