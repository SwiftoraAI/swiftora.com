# Swiftora brand refinement — 26 September 2026

Eric requested a more distinctive, technology-focused presentation that matches the established Swiftora identity. The previous preview remains an archived milestone; this revision supersedes its warm-paper visual direction. It is local preview work, not a production release.

## Changes

- Return to the documented core colors: orange#FF6B35, violet#6C63FF, logo purple#372952, dark plum#140415 and white/#F7F7F8 content surfaces. The guide's warm hero hue#5B182B is used only as a restrained background accent. Links retain the darker accessible violet#4A42E0.
- Keep the original logo/favicons unchanged. Add 16px corners to branded controls/panels, tighter heading proportions and clear orange/violet accents. `brand.css` owns the current identity treatment above the shared layout primitives in `global.css`.
- Replace the vague hero promise with “Listing help for secondhand sellers.” Keep the primary App Store action visible before secondary content on mobile.
- Use the desktop panel for the real QR/download action and two confirmed capabilities. It is not a screenshot, app simulation or performance dashboard. Mobile omits the desktop transfer panel.
- Present listing assistance and ROI tracking as two focused features. Move seller-review advice into a plain note and remove the repetitive “Make it part of your day” section while keeping `#how` meaningful.
- Tighten the App Store link label and pricing/download copy; refresh social artwork to match. No feature, connector, automation, pricing/accuracy or entitlement claim was added.

The design is more closely tied to Swiftora's own identity. A convincing final product presentation still needs genuine released-app captures; cosmetic styling cannot substitute for that evidence.

## Verification and known limits

Build/output verification passes for 19 files/nine HTML routes. Independent real HTTP checks pass 41/41. Revised browser coverage contains 22 scans: home at measured 376, 390, 430, 768, 1280 and 1440px; other eight routes at 390/1440. The 375px target measured 376 because browser/app scale was 90%; it is not labeled an exact 375px pass. No measured overflow or automated axe violation was found.

Keyboard menu Space/Tab/Escape and both legacy download fragments passed. Axe's incomplete contrast reports include gradient/pseudo-element backgrounds; the output packet includes manual worst-case source-color calculations and accent-placement review. That is not a WCAG certification. Full-page/browser-padding capture defects were avoided with documented cropped captures. Device, WebKit, screen-reader, physical QR and production checks remain pending.

No push, PR, merge, deployment, setting/domain change, prototype action or native-app change occurred. `docs/deploy-pages.yml.example` is an inert release template outside `.github/`; only the validation workflow is active.

## Publishing

See [publishing-guide.md](publishing-guide.md) for the current GitHub Pages procedure. First confirm the authenticated Source setting. Uploading the isolated review branch is distinct from the final release. The release should use a manual Actions workflow to publish only verified `dist/`, preserve the current domain, and record the exact approved commit. The repository root is not the publication artifact. Gate2 approval still precedes production-connected merge, source-setting change and deployment.

The original build and review packet are kept unchanged for comparison. Current evidence and screenshots are in `outputs/swiftora-brand-refinement/` in the task workspace.
