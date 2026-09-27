# Publish the prepared Swiftora site

The rebuild is on `codex/swiftora-postlaunch` in [draft PR #2](https://github.com/SwiftoraAI/swiftora.com/pull/2). The manual release workflow and factual fallback are prepared on the review branch. **Explicit production approval is pending.** Nothing has been merged into production, switched to Actions publishing or deployed as part of this rebuild.

## What is ready

- The normal artifact is verified `dist/`, containing 23 files and 13 HTML routes. Retained repository-root pages, prototypes and documents must not be published.
- The prebuilt `release/fallback/` contains 19 files and the same 13 HTML routes. It passed strict validation; an isolated candidate → fallback → candidate rehearsal passed 48/48 HTTP checks. This was not a production rollback.
- `.github/workflows/deploy-pages.yml` is the prepared release source of truth. It runs only manually from `one-pager`, requires the selected full approved SHA, and accepts only `site` or `fallback`. Each mode uploads a fixed verified directory; fallback needs no dependency installation or Astro build. There is no push, PR or workflow-run deployment trigger. `docs/deploy-pages.yml.example` remains an earlier dormant reference, not the workflow to copy or dispatch.
- A nonpublic pre-release record holds authenticated settings, the prior source archive and 15 public resource checks and available snapshots/hashes. The previous site is not the chosen safe fallback because of its known misleading copy and public source exposure.

The final approval must refer to the PR's complete reviewed head, including release preparation, and its current validation result. An isolated review-branch push does not authorize a production release.

## Current production configuration

Authenticated preflight at **2026-09-27 01:02:57 UTC** (26 September locally) confirmed admin permission and:

| Setting | Verified value |
|---|---|
| Production branch / SHA | `one-pager` / `5b3021014948d416098fd47c70188614a3f8bbce` |
| Pages source | `build_type: legacy`, branch `one-pager`, path `/` |
| Domain / HTTPS | `www.swiftora.com`, HTTPS enforced |
| Active production deployment | `4321615712`, successful at the production SHA |
| `github-pages` environment | Exact `main` and `one-pager` branch policies; no reviewer rule |
| Repository webhooks | None listed |

Preserve the existing environment policy, domain and HTTPS setting. The workflow itself restricts releases to `one-pager`. No new reviewer rule, DNS change or secret is required by this plan. Earlier inaccessible-settings observations are historical and have been superseded.

## Exact steps after approval

1. **Record the approval.** Name the approved PR head and artifact manifests, accepted release exceptions, and whether factual fallback publication is authorized on failure. Recheck that production and the approved PR head have not drifted.
2. **Switch Pages to Actions before merging.** Set Pages `build_type: workflow` in [repository Pages settings](https://github.com/SwiftoraAI/swiftora.com/settings/pages), preserving `cname: www.swiftora.com` and HTTPS enforcement, and read the settings back. The current legacy publisher could publish repository-root contents on merge, so this order is essential. [GitHub publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
3. **Merge PR #2 at its exact approved head.** Use an expected-head check, record the resulting full merge SHA on `one-pager`, and confirm it contains the reviewed release tree.
4. **Dispatch the site release.** Open Actions → **Release approved Swiftora Pages artifact** → Run workflow. Select `one-pager`; enter the resulting full merge SHA as `approved_commit`; choose `release_mode: site`. Record the run, artifact and deployment IDs. The workflow confines Pages and identity-token write permissions to its deploy job. [GitHub custom-workflow requirements](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
5. **Verify the live site.** Check public bytes against the approved artifact, redirects, all 13 routes, App Store actions/QR, legacy anchors, support/privacy, real 404s, assets, metadata/indexability, and absence of source/prototype/QA files or unexpected requests. Check repeat visits; do not equate a successful run with a verified launch.
6. **Use the factual fallback only if authorized.** For a material failure, dispatch the same workflow on the reviewed `one-pager` revision with its matching full `approved_commit` and `release_mode: fallback`, then verify the public result. This is recovery publication, not restoration of the old full site. If the release approval did not include fallback authority, obtain it before that action.

See [the release runbook](release-runbook.md) for triggers, records and verification. Remaining exceptions are real app media, physical iPhone/WebKit, screen-reader and zoom checks, and historical worker/cache behavior. Production rollback remains untested. No DNS, secret or backend change is part of this release sequence.

## Pinned workflow actions

Official release tags and commit mappings were checked on 26 September 2026. The prepared workflow uses these immutable pins:

| Action | Release | Commit |
|---|---|---|
| [checkout](https://github.com/actions/checkout/releases/tag/v7.0.1) | v7.0.1 | `3d3c42e5aac5ba805825da76410c181273ba90b1` |
| [setup-node](https://github.com/actions/setup-node/releases/tag/v7.0.0) | v7.0.0 | `820762786026740c76f36085b0efc47a31fe5020` |
| [configure-pages](https://github.com/actions/configure-pages/releases/tag/v6.0.0) | v6.0.0 | `45bfe0192ca1faeb007ade9deae92b16b8254a0d` |
| [upload-pages-artifact](https://github.com/actions/upload-pages-artifact/releases/tag/v5.0.0) | v5.0.0 | `fc324d3547104276b827a68afc52ff2a11cc49c9` |
| [deploy-pages](https://github.com/actions/deploy-pages/releases/tag/v5.0.1) | v5.0.1 | `368f82528645a54fb793d4d04e342629a3f51346` |

Both selected artifact directories permit only the intentional `.nojekyll` hidden file. Seven-day artifact retention is temporary evidence; preserve the separate recovery record. The workflow does not enable Pages automatically, change DNS or create credentials, and its presence is not evidence of a production deployment or recovery test.
