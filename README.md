# Swiftora marketing website

Static, iPhone-focused marketing site for Swiftora. The new site is built with Astro from `src/` and approved public assets in `public/`. It has no application backend, login, checkout, arbitrary upload, simulated AI demo, lead form or analytics service.

This work is approved for **preview implementation only**. No production release, production-connected merge or hosting change is authorized. Remote push is held until publishing triggers can be verified safe for the preview branch. Read [the release runbook](docs/release-runbook.md) before any release work.

## Run locally

The implementation was built and checked with Node **24.12.0** on Windows. Dependencies are pinned in `package.json` and `package-lock.json`. Use the lockfile; do not replace it with an unreviewed dependency update.

From the repository directory, in PowerShell:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
npm ci --ignore-scripts
npm run build
npm run verify
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
| `scripts/preview.mjs`, `scripts/qa-browser.js` | Local-only preview and optional browser diagnostics. |
| `design/`, `docs/` | Design sources, asset records and release documentation; never publish these directories. |
| `dist/` | The only intended publication artifact. Generated, ignored by Git and verified before preview/release. |
| Root legacy HTML/CSS/JS, `Logos/`, `claude.md/`, `netlify/`, `_headers`, `netlify.toml` | Retained historical/factual-milestone source. These files are not the new Astro source or a production publication directory. |

The seven root legacy HTML files remain separate from the generated nine-page Astro site. Opening a root HTML file does not preview the new site. Old prototype functions, scripts and business documents also remain in the repository; their presence is not authorization to invoke or deploy them.

Automatic approval review rejected removal of the retained legacy source set because it included backend-adjacent files. The safe alternative is to retain that source outside the public build and verify that it is absent from `dist/`. No backend deletion was performed. Do not publish the repository root.

The retained `public/service-worker.js` is the audited network-only worker, preserved byte-for-byte with LF endings. The new pages do not register a worker. Historical registration/cache behavior must be checked before any retirement change; no cache sweep is implemented.

## Verification

`npm run verify` checks the actual build, including required legacy/new routes, local links/resources/fragments, exact App Store destination, metadata/indexability/sitemap agreement, prohibited public files and the retained worker hash. It permits the intentional `#waitlist` compatibility anchor while rejecting obsolete visible signup copy. It is not a browser, screen-reader, device or production test.

For optional local browser diagnostics, visit [the instrumented preview](http://127.0.0.1:4321/?qa=1). The preview injects locally installed axe-core and the QA script only when requested; neither enters `dist/`. A hidden `#qa-results` element contains JSON when its `data-status` becomes `complete`. Reports include automated accessibility findings, layout/control measurements, image/resource status and limited instrumented initial-load performance observations. They do not establish WCAG conformance, field Core Web Vitals, INP or physical-iPhone behavior. Ordinary preview URLs have no instrumentation.

The `.github/workflows/validate.yml` workflow validates pull requests/manual runs with read-only repository permission, pinned actions, disabled credential persistence and disabled Astro telemetry. It installs locked dependencies, builds and verifies. **No deployment workflow exists.** Existing GitHub Pages branch publishing is independent of this validation workflow and must be checked before any push or merge.

## Known release dependencies

The verified production-correlated base is `one-pager` at `5b3021014948d416098fd47c70188614a3f8bbce`, corroborated by public byte comparisons and [successful Pages run 24211750756](https://github.com/SwiftoraAI/swiftora.com/actions/runs/24211750756). This does not establish the current authenticated Pages source folder, active deployment/environment or rollback controls.

Production still requires authenticated Pages settings, approved publication of **only `dist/`**, historical worker checks, domain/control details, a recorded and rehearsed rollback path, completed QA and explicit approval of the exact release artifact. Real app screenshots/recordings and optional claims remain evidence-gated; they are not replaced with fabricated product imagery.
