# Swiftora release and rollback runbook

Status: **proposal for a future authorized release; no deployment or rollback has been executed.** Implementation approval covers the preview. Gate 2 approval is required before any production-connected merge, production publication, hosting/settings change or DNS change. Remote push is held until publishing triggers can be verified safe for the preview branch.

## Verified baseline and unresolved controls

The exact website repository is `SwiftoraAI/swiftora.com`. The audited default branch is `one-pager` and its verified head is `5b3021014948d416098fd47c70188614a3f8bbce`. Public content hashes match sampled files from that revision. The latest observed successful [Pages build/deployment run 24211750756](https://github.com/SwiftoraAI/swiftora.com/actions/runs/24211750756) references the same branch/revision. DNS and HTTP evidence identify GitHub Pages, consistent with the owner's confirmation.

The active Pages settings, current deployment ID/environment, actual publishing branch/folder or Actions configuration, exact production build command, environment protection and domain verification/control have not been authenticated and inspected. The public Pages settings API returned an unauthenticated 404; browser settings required login. Those access results are not evidence that hosting is missing.

There is one checked-in workflow, `validate.yml`, for build verification only. There is **no deploy workflow**. This does not disable GitHub's existing branch-based Pages publishing. A merge into the serving branch under old root-publishing settings could publish legacy/root files rather than the intended static artifact.

The new source is under `src/`; intended public assets are under `public/`; **only the verified contents of `dist/` may be published**. Retained root HTML, `netlify/` prototype source, business documents, build configuration, design sources, QA scripts and audit material must not be published. Automatic approval review rejected removal of the legacy source set because it included backend-adjacent files. Keeping those files outside the public artifact is the approved safe alternative; their deletion or deployment is not part of this release.

## Gate 2 prerequisites

1. Obtain authenticated read access to Pages settings and record the current source branch/folder or workflow, active deployment/environment, build settings, permissions, domain verification and auto-publish triggers. Identify the authorized release operator and approver. Do not request or paste secret values.
2. Confirm registrar/DNS account control, exact www/apex records, TLS/domain status and responsible owner. Preserve the domain/provider unless an unavoidable change is separately approved.
3. Inspect current and historical service-worker scopes/caches in appropriate browser profiles. The existing network-only worker is retained unchanged and is not newly registered. Do not assume a clean local preview proves repeat-visit behavior on the production origin; do not delete registrations/caches blindly.
4. Establish an approved publishing mechanism that deploys only `dist/`. Any Pages source/settings conversion or new deploy workflow is a separately reviewed part of gate 2. Do not add deployment permissions/secrets or push/merge while these controls remain unknown.
5. Complete the accepted copy/product/privacy/support/asset review and the QA matrix. Record missing device/browser/assistive-technology coverage and obtain a decision on any unresolved release exception rather than marking unexecuted checks passed.
6. Agree rollback triggers, operator, authority and the last-known-safe artifact/fallback. Rehearse recovery on an isolated preview before requesting release approval. Neither an old successful workflow badge nor this document proves rollback has been tested.

If a prerequisite is unresolved, continue local preview work and **stop remote push, production-connected merge, settings changes and publication**.

## Prepare the reviewable artifact

Use the tested Node 24.12.0 runtime and committed lockfile. From the repository root in PowerShell:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
npm ci --ignore-scripts
npm run build
npm run verify
npm run preview
```

For a POSIX shell, use `export ASTRO_TELEMETRY_DISABLED=1` before the same npm commands. Dependency installation scripts stay disabled; the project's explicit build runs approved asset generation. Do not install, update or enable services as an incidental release step.

Save the exact candidate source commit, lockfile hash, runtime/tool versions, build command/log, `dist/` file manifest/hashes, approved claims/assets, test logs and screenshots. Ensure the release identifier actually includes the complete source changes; a prior factual-correction commit alone does not identify a still-uncommitted rebuild.

Test the generated site through the local-only preview. Verify all App Store actions/QR destination, page and legacy-fragment behavior, actual missing-page 404, responsive/keyboard/accessibility behavior, required metadata, output boundaries and repeat visits. Optional `?qa=1` diagnostics must remain local-only. Their timings include instrumentation overhead and are not field measurements.

## Preserve the pre-deployment recovery record

Immediately before an authorized release, snapshot:

- Actual active deployment ID, deployed source revision, Pages source/build/environment settings, approval controls and exact publishing procedure.
- Actual public HTML/assets and a file/hash manifest, headers/cache observations and critical URL behavior; retain only authorized copies in a nonpublic recovery location.
- Current DNS/canonical/TLS details and any release-approved setting changes.
- The deployable last-known-safe artifact, its lockfile/runtime where rebuilding is necessary, and a minimal truthful availability fallback.
- Named release/rollback operator, approver, triggers and the approved scope for recovery actions.

Older live files contain known misleading signup/demo/commerce content. Do not automatically select those as the safe business fallback. Review/sanitize the fallback first, identify its exact bytes and test it on the isolated preview. Preserve any prior asset versions needed by cached HTML. Do not assume an expired Actions artifact or a rerun of an old job can recover the required files.

## Request approval, then publish only as authorized

Present the exact commit/PR or source reference, immutable artifact manifest, preview, completed checks, remaining risks, proposed publishing/settings action and rehearsed recovery choice. **Stop for gate 2 approval.** A local build success or implementation approval is not release approval.

After approval, the authorized operator uses the verified publishing method to deploy precisely the approved artifact. Do not infer a deploy command from `netlify.toml`; the observed host is GitHub Pages. Record the resulting deployment ID, source/artifact hashes, time, operator and any explicitly approved setting changes. No such publishing method has been configured or executed by this local implementation.

Verify the actual public website after publication: www/apex and HTTP/HTTPS behavior, served artifact hashes, every critical download/support/privacy destination, legacy fragments, 404s, metadata/indexability, absence of business/source/QA files and obsolete service requests, response headers, resource loads and existing-cache/repeat visits. A successful build/deploy job alone is insufficient.

## Rollback after a release

Use the agreed rollback scope if a primary download journey breaks, material claims/commerce are wrong, unexpected data requests/files become public, or rendering/resources fail materially. The authorized operator restores the recorded last-known-safe artifact or rehearsed truthful fallback through the **actual approved publishing method**.

For branch publishing, recovery may require a reviewed revert/recovery revision on the confirmed serving branch. For artifact publishing, recovery may mean republishing the retained safe artifact. Choose only the path that was authenticated and rehearsed; this runbook does not assert either mechanism is currently configured. Do not force-push history, change DNS, rotate credentials or enable paid services without the relevant approval.

Record the recovery source/deployment ID and artifact hashes. Recheck the public site after the restore/revert, including App Store actions, canonical redirects, pages/fragments, useful 404, assets, metadata, absence of unwanted files/requests, headers and repeat visits. Confirm recovery from actual public behavior and bytes, not merely the revert commit or workflow status. Preserve the failed release evidence for diagnosis, then document the incident and next review step.

Rollback remains **untested in production**. Missing authenticated configuration and historical worker evidence remain explicit release dependencies.
