import { readFile, readdir, lstat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const outputRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const origin = 'https://www.swiftora.com';
const appStore = 'https://apps.apple.com/us/app/swiftora/id6760380351';
const indexablePages = ['index.html', 'about.html', 'pricing.html', 'demo.html', 'privacy.html', 'support.html'];
const noindexPages = ['thank-you.html', 'offline.html', '404.html'];
const pages = [...indexablePages, ...noindexPages];
const required = [...pages, 'robots.txt', 'sitemap.xml', 'CNAME', '.nojekyll', 'favicon.png', 'assets/qr-app-store.svg', 'assets/social-card.png', 'service-worker.js'];
const allowedRootFiles = new Set([...required, 'social-card.png', 'social-card.webp', 'social-card.jpg', 'social-card.svg']);
// Retain only this existing network-only worker until historical registrations
// have been inventoried. Current pages must not create a new registration.
allowedRootFiles.add('service-worker.js');
const allowedAssetExtensions = new Set(['.js', '.css', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.ico', '.woff', '.woff2', '.mp4', '.webm', '.vtt']);
const errors = [];
const files = new Map();
const fail = message => errors.push(message);

async function walk(directory, prefix = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = prefix + entry.name;
    const absolute = path.join(directory, entry.name);
    if ((await lstat(absolute)).isSymbolicLink()) {
      fail(`${relative}: symbolic links are not allowed in the public artifact.`);
    } else if (entry.isDirectory()) {
      await walk(absolute, relative + '/');
    } else if (entry.isFile()) {
      files.set(relative, await readFile(absolute));
    }
  }
}

try { await walk(outputRoot); } catch {
  console.error('Static output is missing or unreadable. Run npm run build first.');
  process.exit(1);
}
for (const filename of required) if (!files.has(filename)) fail(`Missing required public file: ${filename}`);
const retainedWorker = files.get('service-worker.js');
if (retainedWorker && createHash('sha256').update(retainedWorker).digest('hex') !== '6823e4d35e471dc1befd5bc87a95873c89d587b43a08874901b77b6c4994874f') {
  fail('service-worker.js: preserve the audited network-only worker unchanged until retirement is separately tested.');
}

const secretPatterns = [
  /gh[pousr]_[A-Za-z0-9]{30,}/, /github_pat_[A-Za-z0-9_]{30,}/,
  /sk-(?:proj-)?[A-Za-z0-9_-]{32,}/, /AKIA[A-Z0-9]{16}/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
];
for (const [filename, content] of files) {
  const asset = /^(?:assets|_astro)\//.test(filename) && allowedAssetExtensions.has(path.extname(filename));
  if (!allowedRootFiles.has(filename) && !asset) fail(`${filename}: file is outside the public output allowlist.`);
  if (filename.split('/').some(part => part.startsWith('.')) && filename !== '.nojekyll') fail(`${filename}: hidden source/configuration must not be published.`);
  if (/\.(?:html|js|css|svg|txt|xml|vtt)$/.test(filename)) {
    const text = content.toString('utf8');
    if (secretPatterns.some(pattern => pattern.test(text))) fail(`${filename}: possible credential pattern found (value withheld).`);
    if (/(?:\.netlify\/functions|\/api\/(?:presign-upload|stream-analyze|image-embed))/.test(text)) fail(`${filename}: obsolete prototype endpoint reference.`);
    if (/serviceWorker\s*\.\s*register\s*\(/.test(text)) fail(`${filename}: new service-worker registration is outside this release scope.`);
    if (/__qa\/|qa-browser\.js|axe(?:\.min)?\.js/.test(text)) fail(`${filename}: local QA instrumentation must not enter public output.`);
    if (/localStorage\s*\.\s*setItem\s*\(\s*['"]swiftora_waitlist/.test(text)) fail(`${filename}: legacy lead collection must not write to browser storage.`);
  }
}

function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    result[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4];
  }
  return result;
}
function tags(text, name) { return [...text.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(match => attributes(match[0])); }
const html = new Map(pages.filter(page => files.has(page)).map(page => [page, files.get(page).toString('utf8')]));
const ids = new Map([...html].map(([page, text]) => [page, new Set([...text.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(match => match[1]))]));
const canonicalFor = page => origin + (page === 'index.html' ? '/' : '/' + page);

function checkReference(from, reference, context) {
  if (!reference || reference.startsWith('data:') || reference.startsWith('mailto:') || reference.startsWith('tel:')) return;
  let url;
  try { url = new URL(reference.replaceAll('&amp;', '&'), canonicalFor(from)); }
  catch { fail(`${from}: invalid ${context} URL.`); return; }
  if (!['http:', 'https:'].includes(url.protocol)) { fail(`${from}: unsupported ${context} URL scheme ${url.protocol}`); return; }
  if (url.origin !== origin) return;
  let target;
  try { target = decodeURIComponent(url.pathname).replace(/^\//, '') || 'index.html'; }
  catch { fail(`${from}: invalid encoded ${context} path.`); return; }
  if (!path.posix.extname(target) && !target.endsWith('/')) target += '.html';
  if (!files.has(target)) { fail(`${from}: missing local ${context} target ${target}`); return; }
  if (url.hash && ids.has(target)) {
    let fragment;
    try { fragment = decodeURIComponent(url.hash.slice(1)); } catch { fragment = url.hash.slice(1); }
    if (!ids.get(target).has(fragment)) fail(`${from}: missing fragment ${target}#${fragment}`);
  }
}

const forbiddenCopy = [
  /\bjoin\s+(?:the|our)\s+waitlist\b/i, /\bget early access\b/i,
  /\bclaim my spot\b/i, /\bcoming soon\b/i, /\blaunching soon\b/i,
  /\bno more underpricing\b/i, /\breading your photos\b/i,
  /\byou['’]re on (?:the|our) list\b/i,
];
for (const [page, text] of html) {
  const canonical = tags(text, 'link').find(tag => tag.rel?.toLowerCase() === 'canonical');
  if (canonical?.href !== canonicalFor(page)) fail(`${page}: canonical must be ${canonicalFor(page)}`);
  if (!/<title>\s*[^<]+<\/title>/i.test(text)) fail(`${page}: meaningful title missing.`);
  const meta = tags(text, 'meta');
  if (!meta.some(tag => tag.name?.toLowerCase() === 'description' && tag.content?.trim())) fail(`${page}: description missing.`);
  if (!meta.some(tag => tag.property === 'og:image' && tag.content)) fail(`${page}: social image metadata missing.`);
  for (const tag of meta) if (['og:image', 'twitter:image'].includes(tag.property ?? tag.name)) checkReference(page, tag.content, 'social image');
  const robots = meta.find(tag => tag.name?.toLowerCase() === 'robots')?.content ?? '';
  if (noindexPages.includes(page) !== /\bnoindex\b/i.test(robots)) fail(`${page}: indexability does not match the approved route map.`);
  const visible = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  if (forbiddenCopy.some(pattern => pattern.test(visible))) fail(`${page}: obsolete prelaunch or simulated-analysis copy remains.`);
  if (/<form\b|<input\b[^>]*\btype\s*=\s*["']?file\b/i.test(text)) fail(`${page}: collection/upload controls are outside the approved scope.`);
  const anchors = tags(text, 'a');
  if (!anchors.some(tag => tag.href === appStore)) fail(`${page}: ordinary App Store download link missing.`);
  for (const tag of anchors) {
    if (tag.href?.includes('apps.apple.com') && tag.href !== appStore) fail(`${page}: unexpected App Store destination.`);
    if (tag.target === '_blank' && !/\bnoopener\b/.test(tag.rel ?? '')) fail(`${page}: new-window link lacks noopener.`);
    checkReference(page, tag.href, 'link');
  }
  for (const tag of tags(text, 'img')) {
    if (!Object.hasOwn(tag, 'alt')) fail(`${page}: image needs an alt attribute (empty for decorative imagery).`);
    checkReference(page, tag.src, 'image');
  }
  for (const tagName of ['script', 'source', 'video', 'audio']) {
    for (const tag of tags(text, tagName)) {
      checkReference(page, tag.src, tagName);
      if (tag.poster) checkReference(page, tag.poster, 'poster');
    }
  }
  for (const tag of tags(text, 'link')) if (tag.rel !== 'canonical') checkReference(page, tag.href, 'resource');
  for (const tag of [...tags(text, 'img'), ...tags(text, 'source')]) {
    for (const candidate of (tag.srcset ?? '').split(',').filter(Boolean)) checkReference(page, candidate.trim().split(/\s+/)[0], 'srcset');
  }
}

for (const [filename, content] of files) {
  if (!filename.endsWith('.css')) continue;
  for (const match of content.toString('utf8').matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/g)) {
    checkReference(filename, match[1] ?? match[2] ?? match[3], 'stylesheet asset');
  }
}

// Legacy compatibility is intentional: forbid obsolete visible marketing copy,
// while requiring the old fragment alongside the new download destination.
for (const id of ['waitlist', 'download', 'how']) if (!ids.get('index.html')?.has(id)) fail(`index.html: missing retained/approved fragment #${id}`);
if (files.get('CNAME')?.toString('utf8').trim() !== 'www.swiftora.com') fail('CNAME: unexpected domain.');
const robots = files.get('robots.txt')?.toString('utf8') ?? '';
if (/^\s*Disallow:\s*\/\s*$/im.test(robots)) fail('robots.txt: production must not disallow the entire site.');
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) fail('robots.txt: canonical sitemap declaration missing.');
const sitemap = files.get('sitemap.xml')?.toString('utf8') ?? '';
const sitemapUrls = [...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(match => match[1].trim());
const expectedSitemap = new Set(indexablePages.map(canonicalFor));
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail('sitemap.xml: duplicate URLs.');
for (const url of sitemapUrls) if (!expectedSitemap.has(url)) fail(`sitemap.xml: unexpected or nonindexable URL ${url}`);
for (const url of expectedSitemap) if (!sitemapUrls.includes(url)) fail(`sitemap.xml: missing canonical URL ${url}`);

if (errors.length) {
  console.error(`Public output verification failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Verified ${files.size} public files, ${html.size} HTML routes, local references, App Store links, legacy fragments, metadata, sitemap and output boundaries.`);
  console.log('Source/output checks only; browser, device, QR scanning and release verification remain separate.');
}
