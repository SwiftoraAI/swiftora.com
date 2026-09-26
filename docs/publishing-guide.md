# Publishing the new Swiftora site on GitHub Pages

Prepared 26 September 2026 from read-only repository checks and current official documentation. No remote push, PR, merge, settings change or deployment was performed. The requested style revision is still preview work; asking how to publish does not approve a final production release.

## What is ready and what must be confirmed

The new site builds with `npm run build`; `npm run verify` checks the intended **`dist/` artifact**. The repository root contains retained legacy pages, prototypes and documents and must not be the new publication directory. GitHub recommends an Actions build for generators such as this Astro project. [GitHub publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [Astro Pages guide](https://docs.astro.build/en/guides/deploy/github/).

Current public evidence:

- Repository: [SwiftoraAI/swiftora.com](https://github.com/SwiftoraAI/swiftora.com), default branch `one-pager`, `has_pages: true`.
- Default head: `5b3021014948d416098fd47c70188614a3f8bbce`; latest observed [successful Pages run 24211750756](https://github.com/SwiftoraAI/swiftora.com/actions/runs/24211750756) used that branch/revision. Repository last-pushed metadata remains April 9, 2026.
- Remote branches are `one-pager` and `homepage-refresh`. Neither current tree contains a checked-in `.github/` workflow. The new local `codex/swiftora-postlaunch` branch is not yet on the remote.
- Local `validate.yml` runs only on pull requests/manual invocation and has no deployment step. The optional `deploy-pages.yml.example` beside this guide is dormant documentation, not an active workflow.

Authenticated [repository Pages settings](https://github.com/SwiftoraAI/swiftora.com/settings/pages) were unavailable. Before relying on branch isolation, read **Settings → Pages → Build and deployment** and record Source, branch/folder or workflow, current deployment, custom domain and HTTPS state. Also inspect existing deployment/environment protections and integrations. The public record strongly supports `one-pager` branch publishing, but does not prove the current account settings.

## Upload the review branch

A feature-branch push is a code-review step, not inherently a production release. Once the current Pages source is confirmed to exclude this branch, and no other deployment integration targets it, an authorized feature-branch push can proceed without treating it as gate 2. No checked-in automatic deployment path for this new branch was found in the inspected source.

After committing the reviewed changes on the existing local feature branch, the upload command is:

```powershell
git push -u origin codex/swiftora-postlaunch
```

This command is supplied for the review step and has not been executed. Keep the existing production branch unchanged while the revised design and QA are reviewed. Earlier blanket “no push” wording in the runbook was a conservative hold while the publishing configuration was unknown; the actual production gate applies to production-connected changes and release actions, not a verified isolated review branch.

## First production release, after approving the final preview

1. **Capture recovery information.** Record the current Pages settings/deployment, public files/hashes, domain settings and a reviewed safe recovery artifact. Confirm the release/rollback operator and any remaining product, privacy, historical-worker or QA exceptions. Use [the release runbook](release-runbook.md) for the recovery record.
2. **Prepare the manual workflow for review.** During the approved release preparation, copy `docs/deploy-pages.yml.example` to `.github/workflows/deploy-pages.yml`. It builds/validates with the lockfile, uploads only `dist/`, runs only manually from `one-pager`, checks the selected full commit SHA and uses the `github-pages` environment. It has no push or PR deployment trigger. Inspect the diff before activation.
3. **Configure Pages during the approved release window.** In Settings → Pages → Build and deployment, select **GitHub Actions**. Preserve the existing `www.swiftora.com` custom domain and HTTPS settings. No DNS change is needed merely to change the static build. Confirm the `github-pages` environment permits only `one-pager`; configure an available reviewer/approval rule before publishing. Switching source is a production setting change and belongs to gate 2. [GitHub's publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
4. **Merge the approved source only after the source switch is verified.** This avoids the old root-based publisher deploying the repository contents on merge. Once the reviewed source and manual workflow are on default branch `one-pager`, record the final full commit SHA and confirm its tree/artifact matches the approved release. The manual-only workflow does not deploy merely because it was merged.
5. **Run the release.** Open Actions → **Release approved Swiftora Pages artifact** → Run workflow. Select `one-pager` and enter its approved full commit SHA. Review the build/verification result and the `github-pages` environment approval before allowing the deploy job. Save the resulting deployment/run ID and artifact manifest. The deploy job requires scoped Pages and identity-token permissions; the template confines these to that job. [GitHub custom-workflow requirements](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
6. **Check the actual website.** Verify `https://www.swiftora.com/`, apex redirection, all App Store links, legacy `.html` routes and fragments, support/privacy, real 404s, assets, metadata/indexability, retained-worker/repeat-visit behavior and absence of documents/prototypes/QA files. Compare public bytes to the approved artifact. A successful workflow alone is not launch verification.

The example does not enable Pages automatically, change a domain or DNS, create a production credential, or supply a proven rollback mechanism. Account-specific controls and the final artifact still require review. GitHub states that a `CNAME` file alone does not configure a custom domain; preserve the actual settings. [GitHub Pages source/domain notes](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Verified workflow references

Official release tags, tag-to-commit mappings and action inputs were checked on 26 September 2026. Recheck before activating the example if the release is delayed.

| Action | Verified release | Pinned commit |
|---|---|---|
| [checkout](https://github.com/actions/checkout/releases/tag/v7.0.1) | v7.0.1 | `3d3c42e5aac5ba805825da76410c181273ba90b1` |
| [setup-node](https://github.com/actions/setup-node/releases/tag/v7.0.0) | v7.0.0 | `820762786026740c76f36085b0efc47a31fe5020` |
| [configure-pages](https://github.com/actions/configure-pages/releases/tag/v6.0.0) | v6.0.0 | `45bfe0192ca1faeb007ade9deae92b16b8254a0d` |
| [upload-pages-artifact](https://github.com/actions/upload-pages-artifact/releases/tag/v5.0.0) | v5.0.0 | `fc324d3547104276b827a68afc52ff2a11cc49c9` |
| [deploy-pages](https://github.com/actions/deploy-pages/releases/tag/v5.0.1) | v5.0.1 | `368f82528645a54fb793d4d04e342629a3f51346` |

The upload action excludes hidden files by default. The example includes them **only within the already-verified `dist/` directory**, preserving its deliberate `.nojekyll` marker; output verification rejects unexpected hidden files. Seven-day artifact retention is temporary release evidence, not a durable backup. Keep the recovery artifact separately in an approved nonpublic location.
