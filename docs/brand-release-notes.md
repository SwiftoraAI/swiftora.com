# Swiftora brand and asset handoff

Status: preview implementation only. Production publication still requires Eric's explicit release approval. These notes cover assets; they do not certify the entire website, native app, privacy policy, or final responsive layout.

## Completed

The existing orange/violet Swiftora identity is retained. The original white wordmark is intended for dark plum header/footer surfaces, with warm paper content and accessible dark text on orange actions. No logo pixels were altered, recolored, cropped, or redrawn. No app screen, product result, testimonial, price example, or customer photograph was fabricated.

`scripts/generate-assets.mjs` reads the authoritative App Store URL and social copy from `src/data/site.json`. It generates a functional black/white QR and a typography/geometric social composition from an editable SVG. `docs/asset-manifest.json` records source, rights context, placement, dimensions, budgets and limitations.

| Asset | Actual result | SHA256 |
|---|---|---|
| `public/assets/brand/wordmark.png` | Original 1536×453 PNG, 244,915 bytes; exact source bytes preserved | `429668f4249deb6002b87174775489b23cf86f812a807db0fd4d583c6c7c24cd` |
| `public/favicon.png` | Existing 192×192 PNG, 10,011 bytes; exact source bytes preserved | `64a5a28a3e0dbbc7fb8af9759c6304a8804f84fad82440f39bfe002c0a5c6c39` |
| `public/assets/qr-app-store.svg` | 256×256 SVG, 2,007 bytes; four-module white quiet zone; error correction M; no embedded mark | `d25e5b1653c29fd13e10c5b125a94f4860a07b546dfba46ce942a458942b3af1` |
| `public/assets/social-card.png` | 1200×630 PNG, 51,501 bytes, below the 200,000-byte limit | `c829d820194404480fd713e73d8b26fae22e1c7866360070224aaf2937fc929b` |

Executed evidence is in `docs/asset-validation.json`; consult its current generation timestamp. The actual generated QR SVG was rasterized through sharp and decoded through jsQR at 112, 125, 152, 160, 256 and 512px, including the actual CSS display sizes identified by the integration owner. All six results exactly matched `https://apps.apple.com/us/app/swiftora/id6760380351`. The expanded checks preserved the QR and social-card hashes listed above. This was a local decode test, not a physical iPhone camera scan or app install test.

The generated social PNG was opened and visually inspected: complete logo, readable headline and description, no clipped text or overlap, and no product UI. The SVG embeds the original logo unchanged. Social-platform crop/debugger testing has not run. A subsequent copy, font/runtime or composition change requires regeneration and visual review; consult the latest manifest for refreshed hashes. A nonfatal Fontconfig cache warning occurred in this sandbox; asset generation and visual inspection succeeded.

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

After styling stabilizes, verify intact logo visibility, intrinsic image dimensions, alternative text, wrapping, contrast, focus and overflow at 375/390/430/768/1280/1440px and text zoom. Keep the QR quiet zone and ordinary clickable link; physically scan the rendered QR on an iPhone before relying on that desktop-to-phone journey. Verify actual public social-image URL/content type and preview crops only after an approved preview/release destination exists. These checks are outstanding here; the integration owner records their executed results separately.
