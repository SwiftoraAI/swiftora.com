import { readFile, readdir, lstat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// This checker deliberately accepts no path argument. Recovery publication is
// limited to the reviewed, prebuilt release/fallback directory.
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fallbackRoot = path.join(projectRoot, 'release/fallback');
const origin = 'https://www.swiftora.com';
const appStore = 'https://apps.apple.com/us/app/swiftora/id6760380351';
const workerHash = '6823e4d35e471dc1befd5bc87a95873c89d587b43a08874901b77b6c4994874f';
const errors = [];
const fail = message => errors.push(message);
let settings, guides;
try {
  settings = JSON.parse(await readFile(path.join(projectRoot, 'src/data/site.json'), 'utf8'));
  guides = JSON.parse(await readFile(path.join(projectRoot, 'src/data/guides.json'), 'utf8'));
  if (!Array.isArray(guides) || !guides.length || guides.some(guide => typeof guide.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(guide.slug))) {
    throw new Error('Invalid guide route data.');
  }
  if (new Set(guides.map(guide => guide.slug)).size !== guides.length) throw new Error('Duplicate guide routes.');
} catch {
  console.error('Fallback verification requires valid site and guide route data.');
  process.exit(1);
}
const pages = ['index.html', 'about.html', 'pricing.html', 'demo.html', 'support.html', 'privacy.html', 'thank-you.html', 'offline.html', '404.html', 'guides.html', ...guides.map(guide => `guides/${guide.slug}.html`)];
const indexable = new Set(['index.html', 'privacy.html', 'support.html']);
const allowed = new Set([...pages, 'styles.css', 'service-worker.js', 'CNAME', '.nojekyll', 'robots.txt', 'sitemap.xml']);
const externalLinks = new Set([appStore, settings.appPrivacyUrl, settings.termsUrl, settings.githubPrivacyUrl]);
const files = new Map();

async function walk(directory, prefix = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = prefix + entry.name;
    const absolute = path.join(directory, entry.name);
    const stat = await lstat(absolute);
    if (stat.isSymbolicLink()) fail(`${relative}: symlinks are not allowed.`);
    else if (stat.isDirectory()) {
      if (relative !== 'guides') fail(`${relative}: unexpected public directory.`);
      await walk(absolute, relative + '/');
    } else if (stat.isFile()) files.set(relative, await readFile(absolute));
    else fail(`${relative}: unsupported filesystem entry.`);
  }
}
try {
  if ((await lstat(fallbackRoot)).isSymbolicLink()) throw new Error('Symlink root.');
  await walk(fallbackRoot);
} catch {
  console.error('The fixed release/fallback directory is missing or unreadable.');
  process.exit(1);
}
for (const file of allowed) if (!files.has(file)) fail(`Missing fallback file: ${file}`);
for (const file of files.keys()) if (!allowed.has(file)) fail(`${file}: outside the fallback allowlist.`);
const totalBytes = [...files.values()].reduce((total, content) => total + content.length, 0);
if (totalBytes > 100 * 1024) fail('Fallback exceeds its 100 KiB size budget.');
if (files.get('CNAME')?.toString('utf8').trim() !== 'www.swiftora.com') fail('CNAME: unexpected domain.');
if (files.get('.nojekyll')?.length !== 0) fail('.nojekyll: must be an empty marker.');
if (files.has('service-worker.js') && createHash('sha256').update(files.get('service-worker.js')).digest('hex') !== workerHash) fail('service-worker.js: must preserve the audited network-only worker bytes.');

const credentialPatterns = [/gh[pousr]_[A-Za-z0-9]{30,}/, /github_pat_[A-Za-z0-9_]{30,}/, /sk-(?:proj-)?[A-Za-z0-9_-]{32,}/, /AKIA[A-Z0-9]{16}/, /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/];
for (const [file, content] of files) {
  const text = content.toString('utf8');
  if (credentialPatterns.some(pattern => pattern.test(text))) fail(`${file}: possible credential pattern (value withheld).`);
  if (/__qa\/|qa-browser\.js|axe(?:\.min)?\.js|\.netlify\/functions|\/api\/(?:presign-upload|stream-analyze|image-embed)/.test(text)) fail(`${file}: QA or prototype endpoint reference.`);
  if (/serviceWorker\s*\.\s*register\s*\(|localStorage\s*\.\s*setItem\s*\(/.test(text)) fail(`${file}: new worker registration or browser-storage collection.`);
}
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map(match => [match[1].toLowerCase(), match[2] ?? match[3] ?? match[4]]));
}
function tags(text, name) { return [...text.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(match => attributes(match[0])); }
const canonicalFor = page => origin + (page === 'index.html' ? '/' : '/' + page);
const html = new Map(pages.filter(page => files.has(page)).map(page => [page, files.get(page).toString('utf8')]));
const ids = new Map([...html].map(([page, text]) => [page, new Set([...text.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(match => match[1]))]));
function reference(from, value) {
  if (!value) { fail(`${from}: empty link/resource reference.`); return; }
  let url;
  try { url = new URL(value.replaceAll('&amp;', '&'), canonicalFor(from)); }
  catch { fail(`${from}: invalid URL.`); return; }
  if (url.protocol === 'mailto:' && url.pathname.toLowerCase() === settings.supportEmail.toLowerCase()) return;
  if (url.origin !== origin) {
    if (!externalLinks.has(url.href)) fail(`${from}: unapproved external destination.`);
    return;
  }
  let target;
  try { target = decodeURIComponent(url.pathname).slice(1) || 'index.html'; }
  catch { fail(`${from}: invalid encoded local URL.`); return; }
  if (!files.has(target)) { fail(`${from}: missing local target ${target}`); return; }
  if (url.hash && ids.has(target)) {
    let fragment;
    try { fragment = decodeURIComponent(url.hash.slice(1)); }
    catch { fail(`${from}: invalid encoded fragment.`); return; }
    if (!ids.get(target).has(fragment)) fail(`${from}: missing fragment ${target}#${fragment}`);
  }
}
for (const [page, text] of html) {
  if (/<(?:script|style|form|input|textarea|select|button|iframe|object|embed|base|img|svg|video|audio|source)\b/i.test(text)) fail(`${page}: fallback must use plain HTML, ordinary links and the local stylesheet only.`);
  for (const tag of text.matchAll(/<[a-z][^>]*>/gi)) {
    if (Object.keys(attributes(tag[0])).some(name => /^on[a-z]/.test(name))) fail(`${page}: inline event handlers are forbidden.`);
  }
  const h1s = [...text.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1\s*>/gi)];
  if (h1s.length !== 1 || !h1s[0][1].replace(/<[^>]+>/g, '').trim()) fail(`${page}: one nonempty H1 is required.`);
  if (!/<title>\s*[^<]+<\/title>/i.test(text)) fail(`${page}: title missing.`);
  if (!/\blang=["']en["']/i.test(text)) fail(`${page}: English document language missing.`);
  const meta = tags(text, 'meta');
  if (!meta.some(tag => tag.name === 'description' && tag.content?.trim())) fail(`${page}: description missing.`);
  if (meta.some(tag => tag['http-equiv']?.toLowerCase() === 'refresh')) fail(`${page}: redirect markup is forbidden.`);
  const robots = meta.find(tag => tag.name?.toLowerCase() === 'robots')?.content ?? '';
  if (indexable.has(page) === /\bnoindex\b/i.test(robots)) fail(`${page}: unexpected indexability.`);
  const links = tags(text, 'link');
  const canonicals = links.filter(tag => tag.rel === 'canonical');
  if (canonicals.length !== 1 || canonicals[0].href !== canonicalFor(page)) fail(`${page}: canonical mismatch.`);
  if (!links.some(tag => tag.rel === 'stylesheet' && tag.href === '/styles.css')) fail(`${page}: approved local stylesheet missing.`);
  for (const link of links) {
    if (!['canonical', 'stylesheet'].includes(link.rel)) fail(`${page}: unapproved resource link.`);
    reference(page, link.href);
  }
  const anchors = tags(text, 'a');
  if (!anchors.some(tag => tag.href === appStore)) fail(`${page}: exact App Store link missing.`);
  for (const anchor of anchors) {
    reference(page, anchor.href);
    if (anchor.target === '_blank' && !/\bnoopener\b/.test(anchor.rel ?? '')) fail(`${page}: new-window link requires noopener.`);
  }
}
const css = files.get('styles.css')?.toString('utf8') ?? '';
if (/@import\b|url\s*\(|expression\s*\(/i.test(css)) fail('styles.css: imports, resource loads and expressions are forbidden.');
for (const fragment of ['how', 'waitlist', 'download']) if (!ids.get('index.html')?.has(fragment)) fail(`index.html: missing legacy fragment #${fragment}`);
const robots = files.get('robots.txt')?.toString('utf8') ?? '';
if (/^\s*Disallow:\s*\/\s*$/im.test(robots) || !robots.includes(`Sitemap: ${origin}/sitemap.xml`)) fail('robots.txt: invalid fallback crawl policy.');
const sitemap = files.get('sitemap.xml')?.toString('utf8') ?? '';
const sitemapUrls = [...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(match => match[1].trim());
const expectedSitemap = [...indexable].map(canonicalFor);
if (sitemapUrls.length !== expectedSitemap.length || new Set(sitemapUrls).size !== sitemapUrls.length || expectedSitemap.some(url => !sitemapUrls.includes(url))) fail('sitemap.xml: must list exactly the three indexable fallback canonicals.');

if (errors.length) {
  console.error(`Fallback verification failed (${errors.length}):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`Verified factual fallback: ${files.size} files, ${html.size} HTML routes, ${totalBytes} bytes; strict output boundary, links, legacy anchors, indexability and retained worker.`);
  for (const [file, content] of [...files].sort(([a], [b]) => a.localeCompare(b))) console.log(`${createHash('sha256').update(content).digest('hex')}  ${file}`);
  console.log('Static checks only. No publication, native-app behavior or production recovery test is claimed.');
}
