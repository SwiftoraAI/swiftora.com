# Swiftora release and recovery runbook

Status: **release preparation complete; explicit gate 2 approval pending.** The review branch and [draft PR #2](https://github.com/SwiftoraAI/swiftora.com/pull/2) exist. The manual workflow and factual fallback are prepared on that branch. No production merge, Pages source change, release dispatch or recovery publication has been performed. Review-branch pushes are distinct from production approval.

## Authenticated baseline

The preflight record was captured at **2026-09-27 01:02:57 UTC** (26 September in the owner's local time):

- Repository `SwiftoraAI/swiftora.com`; authenticated account has admin permission.
- Production/default branch `one-pager` at `5b3021014948d416098fd47c70188614a3f8bbce`.
- Pages `build_type: legacy`, source `one-pager`, path `/`, status `built`, custom domain `www.swiftora.com`, HTTPS enforced.
- Successful active production deployment `4321615712` at that SHA, associated with [Pages run 24211750756](https://github.com/SwiftoraAI/swiftora.com/actions/runs/24211750756).
- Existing `github-pages` environment permits exact branches `main` and `one-pager`, with no reviewer rule. Preserve these settings; the prepared workflow independently restricts both jobs to `one-pager`. No repository webhooks were listed.

These authenticated observations supersede the earlier audit's inaccessible-settings finding. Recheck for drift before approved release actions. No DNS, domain, HTTPS, environment-policy or secret changes are proposed.

## Prepared artifacts and checks

Normal publication is the verified contents of `dist/`. Recovery publication is the separately verified contents of `release/fallback/`: 19 files, 13 HTML routes and 45,127 bytes, with factual availability content, useful privacy/support information, ordinary App Store links and the unchanged network-only worker. Only home, privacy and support are indexable in fallback mode.

`.github/workflows/deploy-pages.yml` accepts only manual `workflow_dispatch` with `release_mode: site` or `fallback`. It requires `one-pager` and an `approved_commit` matching the selected full 40-character SHA. Upload paths are fixed; no arbitrary path can be supplied. Both modes validate the fallback. Site mode installs locked dependencies, builds and verifies `dist/`; fallback mode uses the prebuilt files without npm installation or an Astro build. Pages/OIDC write permissions are confined to the deploy job. The workflow preserves the configured domain and does not enable Pages automatically.

Local checks passed: 18 workflow/guard assertions, the actual fallback validator, and seven artifact-validator cases covering valid output and rejection of unsafe or broken copies. An isolated candidate → fallback → candidate rehearsal passed **48/48 HTTP checks**. It did not deploy to GitHub Pages. PR validation now also checks the fallback; inspect the final PR revision and its checks before approval.

For a fresh local build with the tested Node 24.12.0 runtime:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
npm ci --ignore-scripts
npm run build
npm run verify
node scripts/check-release-fallback.mjs
npm run preview
```

For POSIX shells, set `export ASTRO_TELEMETRY_DISABLED=1` first. Installation scripts remain disabled; the explicit project build runs its approved asset-generation step. Local preview and `?qa=1` diagnostics are not production or field-performance tests.

## Recovery record and release exceptions

The nonpublic audit workspace's `work/release-preflight/` contains the authenticated pre-release settings record, source archive, 15 public resource checks and available snapshots/hash evidence. Preserve this record and the reviewed normal/fallback manifests before publication. Seven-day Actions artifact retention is temporary evidence, not a durable backup.

The old website contains misleading signup/demo/commerce content and exposed source documents, so its snapshot is historical recovery evidence, not the selected safe fallback. Retained legacy root HTML, prototype functions, business documents, design material and QA files must remain outside both publication artifacts. Their removal was previously blocked by automatic approval review as backend-adjacent; retention outside public output remains the safe alternative.

Remaining exceptions to present with release approval: real app media; physical iPhone/WebKit, screen-reader and zoom checks; and historical service-worker registration/cache behavior. The worker is retained unchanged, and the new pages do not register it. Do not clear user caches or registrations blindly. **Production rollback is untested.** The isolated rehearsal does not establish production recovery or repeat-visit behavior.

## Exact sequence after gate 2 approval

1. **Confirm approval and revisions.** Record the final approved PR head, normal and fallback manifests, current production SHA, completed checks and accepted exceptions. Approval must cover the source switch, merge and site publication, and say whether fallback publication is authorized if verification fails. If the PR head or production baseline changes, reconcile it before proceeding.
2. **Switch the publication source before merging.** Set Pages `build_type` to `workflow` (Settings → Pages → GitHub Actions), preserving `www.swiftora.com` and `https_enforced: true`. Read the settings back. Do not merge while the legacy branch-root publisher remains active: a merge can otherwise publish retained root files.
3. **Merge the exact approved PR head.** Merge PR #2 into `one-pager` with an expected-head check. Record the resulting full merge SHA and verify it contains the reviewed release tree. A push or merge does not trigger the prepared manual workflow.
4. **Dispatch the normal site.** Run **Release approved Swiftora Pages artifact** on `one-pager` with `approved_commit` equal to that resulting merge SHA and `release_mode: site`. Keep the existing environment policy; no new reviewer rule is required. The user's recorded release approval is the authorization gate. Record the run, artifact and deployment IDs.
5. **Verify the public release.** Compare served bytes to the approved output, and check www/apex and HTTP/HTTPS behavior, all App Store links/QR, support/privacy, all 13 pages and legacy fragments, genuine 404s, resources, metadata/sitemap/robots, absence of source/prototype/QA files and unexpected data requests, and repeat-visit behavior. A successful workflow is not sufficient launch verification.
6. **Recover only within the approved scope.** If a material defect meets the agreed triggers and fallback publication was authorized, dispatch the same workflow on the reviewed `one-pager` revision with its matching full `approved_commit` and `release_mode: fallback`. Verify actual public bytes and journeys again. If fallback was not authorized, obtain the required recovery approval rather than inferring it.

## Recovery triggers and completion

Material recovery triggers include broken download/support/privacy journeys, materially incorrect product or commerce claims, unintended public files or data requests, and unusable rendering or missing resources. The prepared fallback is an explicit factual recovery publication; it does not restore the previous full site. Do not switch back to legacy root publishing as a shortcut.

Record the recovery run/deployment ID, selected revision and artifact hashes; verify the actual public result, preserve failed-release evidence and document the incident. Returning to the full site requires the reviewed corrected artifact and the applicable approval. No force-push, DNS change, credential rotation, new secret or paid service is part of this procedure.
