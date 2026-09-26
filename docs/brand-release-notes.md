# Swiftora brand and asset handoff

Status: preview implementation only. Production publication still requires Eric's explicit release approval. These notes cover assets; they do not certify the entire website, native app, privacy policy, or final responsive layout.

## Completed

The current refinement retains the existing orange/violet Swiftora identity and resets content surfaces to white `#FFFFFF` and `#F7F7F8`. The hero/header use dark plum `#140415`, with a restrained warm maroon `#5B182B` hero treatment. Original orange `#FF6B35`, violet `#6C63FF` and purple `#372952` define the actions and accents. The original white wordmark is used on dark header/footer surfaces; orange actions have dark lettering. No logo pixels were altered, recolored, cropped, or redrawn. No app screen, product result, testimonial, price example, or customer photograph was fabricated.

The earlier warm-paper/pastel editorial preview is superseded history, not the current design direction. Its previous social-card slogan and 51,501-byte PNG are also superseded. The current asset values below come from the authoritative `docs/asset-manifest.json` and `docs/asset-validation.json` generated on 26 September 2026 at 20:10:13 UTC.

`scripts/generate-assets.mjs` reads the authoritative App Store URL and social copy from `src/data/site.json`. It generates a functional black/white QR and a typography/geometric social composition from an editable SVG. `docs/asset-manifest.json` records source, rights context, placement, dimensions, budgets and limitations.

| Asset | Actual result | SHA256 |
|---|---|---|
| `public/assets/brand/wordmark.png` | Original 1536×453 PNG, 244,915 bytes; exact source bytes preserved | `429668f4249deb6002b87174775489b23cf86f812a807db0fd4d583c6c7c24cd` |
| `public/favicon.png` | Existing 192×192 PNG, 10,011 bytes; exact source bytes preserved | `64a5a28a3e0dbbc7fb8af9759c6304a8804f84fad82440f39bfe002c0a5c6c39` |
| `public/assets/qr-app-store.svg` | 256×256 SVG, 2,007 bytes; four-module white quiet zone; error correction M; no embedded mark | `d25e5b1653c29fd13e10c5b125a94f4860a07b546dfba46ce942a458942b3af1` |
| `public/assets/social-card.png` | 1200×630 PNG, 52,722 bytes, below the 200,000-byte limit | `29490fa7278f0d3f8cebc6c0504c6eaa8a80edc6954006fae511b1f50886c95b` |

Executed evidence is in `docs/asset-validation.json`; consult its current generation timestamp. The actual generated QR SVG was rasterized through sharp and decoded through jsQR at 112, 125, 152, 160, 256 and 512px, including the actual CSS display sizes identified by the integration owner. All six results exactly matched `https://apps.apple.com/us/app/swiftora/id6760380351`. The QR hash and original brand-image hashes are unchanged from the earlier preview; the social PNG was regenerated for the new copy and has the current hash listed above. This was a local decode test, not a physical iPhone camera scan or app install test.

The current social PNG was opened and visually inspected: complete logo, readable headline “For the way you sell secondhand.” and description “Listing assistance and ROI tracking. Available for iPhone.”, no clipped text or overlap, and no product UI. The SVG embeds the original logo unchanged. Social-platform crop/debugger testing has not run. A subsequent copy, font/runtime or composition change requires regeneration and visual review; consult the latest manifest for refreshed hashes. A nonfatal Fontconfig cache warning occurred during an earlier sandbox generation; that historical run succeeded and the latest asset evidence remains authoritative.

## Missing real product media

Eric can provide raw captures of the released app:

- **Home/input:** actual start screen and item photo/details entry, with owned test-item content.
- **Draft result:** complete real listing output and the review/copy step if available. Check condition, maker, provenance, authenticity, price and comparable-sale statements before using that result publicly.
- **ROI:** actual inputs and displayed calculation. Identify manually entered versus automatic values and projected versus realized figures; do not imply connected marketplace sales.
- **Recording:** a short real workflow from input through draft review and copy, preferably using the same item. Preserve the original, label shortened sequences, and provide captions/transcript. Do not add UI or output in editing.

For each capture supply app version/build, device model, OS, plan/entitlement, capture date, exact screen state and content rights. Use owner-approved test data without personal information. These assets remain needed to fulfill the original screenshot/real-recording portion of the brief; the present preview does not claim that portion is complete.

## Missing masters and optional assets

No exact editable icon-only/master logo source or external rights record was supplied. The current favicon is a padded lockup and remains a small-size quality limitation. Request original SVG/vector masters and ownership/license confirmation before improving light-surface, monochrome or compact variants. Do not reconstruct the mark from memory. Master absence does not prevent using the existing unchanged logo on dark surfaces.

A factual text-first release could omit product screenshots/recording if Eric explicitly chooses that narrower release, with no visible placeholders or “watch”/“play” claims. It can also omit item photography, decorative illustration, device bezels, a new logo family, and an official Apple badge: an ordinary clearly labeled App Store link is sufficient for the action. No invented substitute proof is acceptable. The original full visual brief remains pending unless completed or deliberately reduced.

## Remaining asset release checks

Selected current screenshot checks, including hero, supporting pages, and mobile features/download areas, are recorded in `docs/brand-refinement-review.md`. They do not establish every width, scroll position or interaction. The integration owner records the broader logo, intrinsic image dimensions, alternative text, wrapping, contrast, focus, overflow and text-zoom checks separately. Keep the QR quiet zone and ordinary clickable link; a physical iPhone camera scan and actual social-platform crop/debugger verification remain unperformed in this asset review. Verify actual public social-image URL/content type and crops only against an approved preview/release destination.
