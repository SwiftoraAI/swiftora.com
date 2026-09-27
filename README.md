# Swiftora marketing website

Static, iPhone-focused marketing site for Swiftora. The new site is built with Astro from `src/` and approved public assets in `public/`. It has no application backend, login, checkout, arbitrary upload, simulated AI demo, lead form or analytics service.

The review branch is pushed and [draft PR #2](https://github.com/SwiftoraAI/swiftora.com/pull/2) contains the rebuild. A manual release workflow and factual fallback are now prepared on the review branch. They have not been enabled for production or deployed. Explicit gate 2 approval is still pending for the Pages source change, production merge and publication. Read [the publishing guide](docs/publishing-guide.md) and [release runbook](docs/release-runbook.md) for the exact sequence.

## Run locally

The implementation was built and checked with Node **24.12.0** on Windows. Dependencies are pinned in `package.json` and `package-lock.json`. Use the lockfile; do not replace it with an unreviewed dependency update.

From the repository directory, in PowerShell:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
npm ci --ignore-scripts
npm run build
npm run verify
node scripts/check-release-fallback.mjs
npm run preview
```

For a POSIX shell, set telemetry once with `export ASTRO_TELEMETRY_DISABLED=1`, then run the same npm commands. `--ignore-scripts` disables dependency installation lifecycle scripts. `npm run build` deliberately runs this project's `prebuild` asset-generation script before Astro.

Open [the local preview](http://127.0.0.1:4321). The server binds only to `127.0.0.1`, does not open a browser automatically, serves the generated `dist/` directory, preserves extensionless page aliases, and returns an actual 404 for missing pages. Preview responses include `X-Robots-Tag: noindex` and `Cache-Control: no-store`; these are local preview headers, not production hosting configuration. Stop the server with Ctrl+C. An alternate local port is available with `npm run preview -- --port 4322`.

`npm run dev` is available for source editing, but review the built site through `npm run preview` before recording acceptance results.

## Source and output boundaries

| Location | Purpose |
|---|---|
| `src/pages/`, `src/layouts/`, `src/components/`, `src/styles/` | New Astro page/layout/component/style source. |
| `src/data/` | Shared site destinations, copy and evidence-bounded product information. |
| `public/` | Deliberate public files copied into the build, including the retained network-only worker. |
| `scripts/generate-assets.mjs` | Deterministic brand, social and App Store QR generation. |
| `scripts/check-output.mjs` | Route, reference, canonical, sitemap, App Store, public-file and safety checks. |
| `scripts/check-release-fallback.mjs` | Strict validation of the fixed, prebuilt factual fallback. |
| `scripts/preview.mjs`, `scripts/qa-browser.js` | Local-only preview and optional browser diagnostics. |
| `design/`, `docs/` | Design sources, asset records and release documentation; never publish these directories. |
| `dist/` | Normal site publication artifact. Generated, ignored by Git and verified before preview/release. |
| `release/fallback/` | Separate 19-file factual recovery artifact, retaining all 13 HTML routes. Publish only through the explicitly selected and approved fallback mode. |
| `.github/workflows/deploy-pages.yml` | Prepared manual release workflow; fixed `site`/`fallback` modes, `one-pager` guard and exact approved SHA check. |
| Root legacy HTML/CSS/JS, `Logos/`, `claude.md/`, `netlify/`, `_headers`, `netlify.toml` | Retained historical/factual-milestone source. These files are not the new Astro source or a production publication directory. |

The seven root legacy HTML files remain separate from the generated 13-page Astro site. The new site includes a seller-guide hub and three substantive articles sourced from `src/data/guides.json`. Opening a root HTML file does not preview the new site. Old prototype functions, scripts and business documents also remain in the repository; their presence is not authorization to invoke or deploy them.

Automatic approval review rejected removal of the retained legacy source set because it included backend-adjacent files. The safe alternative is to retain that source outside the public build and verify that it is absent from `dist/`. No backend deletion was performed. Do not publish the repository root.

The retained `public/service-worker.js` is the audited network-only worker, preserved byte-for-byte with LF endings. The new pages do not register a worker. Historical registration/cache behavior must be checked before any retirement change; no cache sweep is implemented.

## Verification

`npm run verify` checks the actual build, including required legacy/new routes, local links/resources/fragments, exact App Store destination, metadata/indexability/sitemap agreement, prohibited public files and the retained worker hash. It permits the intentional `#waitlist` compatibility anchor while rejecting obsolete visible signup copy. It is not a browser, screen-reader, device or production test.

For optional local browser diagnostics, visit [the instrumented preview](http://127.0.0.1:4321/?qa=1). The preview injects locally installed axe-core and the QA script only when requested; neither enters `dist/`. A hidden `#qa-results` element contains JSON when its `data-status` becomes `complete`. Reports include automated accessibility findings, layout/control measurements, image/resource status and limited instrumented initial-load performance observations. They do not establish WCAG conformance, field Core Web Vitals, INP or physical-iPhone behavior. Ordinary preview URLs have no instrumentation.

The `.github/workflows/validate.yml` workflow validates pull requests/manual runs with read-only repository permission, pinned actions, disabled credential persistence and disabled Astro telemetry. It installs locked dependencies, builds, checks the normal output and validates the fallback. The prepared `.github/workflows/deploy-pages.yml` runs only on manual dispatch from `one-pager`; there is no push or PR deployment trigger. Its `site` mode uploads only verified `dist/`, while `fallback` uploads only verified `release/fallback/` without installing dependencies or building Astro. `docs/deploy-pages.yml.example` is an earlier dormant template; the prepared workflow is the release source of truth.

GitHub Pages still publishes the root of `one-pager` independently of PR validation. After explicit release approval, switch Pages to GitHub Actions **before merging** the approved PR head. No DNS or secret changes are proposed.

## Known release dependencies

Authenticated preflight on 26 September 2026 confirms repository admin access, production `one-pager` at `5b3021014948d416098fd47c70188614a3f8bbce`, legacy publishing from `/`, `www.swiftora.com`, HTTPS enforcement, and successful production deployment `4321615712`. The existing `github-pages` environment allows `main` and `one-pager`, has no reviewer rule, and will be preserved; the prepared workflow itself allows only `one-pager`. No repository webhooks were listed.

The pre-release settings record, source archive and 15 public resource checks and available snapshots/hashes have been saved outside the publication artifact. An isolated candidate → factual fallback → candidate recovery rehearsal passed 48/48 HTTP checks. This is not a production rollback test. Final approval must name the reviewed PR head and release artifact, including whether fallback publication is authorized on failure.

Remaining release exceptions are real app media, physical iPhone/WebKit, screen-reader and zoom checks, and historical worker/cache behavior. Production rollback remains untested. Real app screenshots/recordings and optional claims remain evidence-gated; they are not replaced with fabricated product imagery.

See [the search content strategy](docs/search-content-strategy.md) for audience and intent mapping, [content evidence](docs/content-evidence.md) for claim boundaries, and [content QA](docs/icp-content-qa.md) plus [browser checks](docs/content-browser-qa.md) for the expanded site's executed validation. Search visibility and AI citations are not guaranteed by local markup or content checks.
