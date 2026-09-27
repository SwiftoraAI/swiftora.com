import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import QRCode from 'qrcode';
import sharp from 'sharp';
import jsQR from 'jsqr';

const root = fileURLToPath(new URL('../', import.meta.url));
const resolve = (relative) => path.join(root, relative);
const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');
const expectedWordmark = '429668f4249deb6002b87174775489b23cf86f812a807db0fd4d583c6c7c24cd';
const expectedFavicon = '64a5a28a3e0dbbc7fb8af9759c6304a8804f84fad82440f39bfE002c0a5c6c39'.toLowerCase();
const [siteText, wordmark, favicon] = await Promise.all([
  readFile(resolve('src/data/site.json'), 'utf8'),
  readFile(resolve('public/assets/brand/wordmark.png')),
  readFile(resolve('public/favicon.png')),
]);
const site = JSON.parse(siteText);
const appStoreUrl = new URL(site.appStoreUrl);
if (appStoreUrl.protocol !== 'https:' || appStoreUrl.hostname !== 'apps.apple.com'
  || !appStoreUrl.pathname.endsWith(`/id${site.appStoreId}`)) {
  throw new Error('site.appStoreUrl must be the HTTPS Apple App Store URL for site.appStoreId.');
}
if (sha256(wordmark) !== expectedWordmark || sha256(favicon) !== expectedFavicon) {
  throw new Error('An original brand asset changed. Restore the approved bytes before generating assets.');
}
if (typeof site.socialTitle !== 'string' || typeof site.socialDescription !== 'string'
  || !site.socialTitle.trim() || !site.socialDescription.trim()) {
  throw new Error('A truthful socialTitle and socialDescription are required in site.json.');
}

const escapeXML = (text) => text.replace(/[<>&"']/g, (character) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[character]);
function wrap(text, maxCharacters) {
  const lines = [];
  let line = '';
  for (const word of text.trim().split(/\s+/)) {
    if (word.length > maxCharacters) throw new Error('Social copy contains an overlong word. Review its layout.');
    if (line && `${line} ${word}`.length > maxCharacters) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}
const titleLines = wrap(site.socialTitle, 26);
const descriptionLines = wrap(site.socialDescription, 65);
if (titleLines.length > 2 || descriptionLines.length > 2) {
  throw new Error('Social copy exceeds the two-line card layout. Review text or adjust this editable SVG composition.');
}
const titleText = titleLines.map((text, i) => `<tspan x="64" y="${258 + i * 90}">${escapeXML(text)}</tspan>`).join('');
const descriptionText = descriptionLines.map((text, i) => `<tspan x="68" y="${431 + i * 40}">${escapeXML(text)}</tspan>`).join('');
const siteHost = new URL(site.canonicalOrigin).hostname.replace(/^www\./, '');

// This is an editable typographic composition, not a screenshot or product mockup.
// The original PNG is embedded unchanged; no filter, recolor or crop is applied.
const socialSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <title>${escapeXML(site.socialTitle)}</title>
  <desc>${escapeXML(site.socialDescription)}</desc>
  <rect width="1200" height="630" fill="#140415"/>
  <circle cx="1160" cy="88" r="170" fill="#372952"/>
  <circle cx="1160" cy="88" r="126" fill="none" stroke="#6C63FF" stroke-width="2"/>
  <circle cx="1124" cy="210" r="20" fill="#FF6B35"/>
  <image x="64" y="55" width="250" height="73.73046875" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,${wordmark.toString('base64')}"/>
  <text fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="80" font-weight="700" letter-spacing="-2.8">${titleText}</text>
  <text fill="#D8CDD9" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="400">${descriptionText}</text>
  <path d="M68 530 H1132" stroke="#49384D" stroke-width="1"/>
  <text x="68" y="580" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="26">${escapeXML(siteHost)}</text>
  <path d="M1052 574 H1132" stroke="#FF6B35" stroke-width="5"/>
</svg>\n`;

const qrSvg = await QRCode.toString(site.appStoreUrl, {
  type: 'svg', errorCorrectionLevel: 'M', margin: 4, width: 256,
  color: { dark: '#000000ff', light: '#ffffffff' },
});
const socialPng = await sharp(Buffer.from(socialSvg)).png({ compressionLevel: 9 }).toBuffer();
const socialMetadata = await sharp(socialPng).metadata();
if (socialMetadata.width !== 1200 || socialMetadata.height !== 630 || socialPng.length > 200_000) {
  throw new Error(`Social card must be 1200x630 and <=200000 bytes; got ${socialMetadata.width}x${socialMetadata.height}, ${socialPng.length} bytes.`);
}

await Promise.all(['public/assets', 'design', 'docs'].map((directory) => mkdir(resolve(directory), { recursive: true })));
await Promise.all([
  writeFile(resolve('public/assets/qr-app-store.svg'), qrSvg),
  writeFile(resolve('public/assets/social-card.png'), socialPng),
  writeFile(resolve('design/social-card.svg'), socialSvg),
]);

// Decode the actual generated SVG at current rendered CSS sizes and larger reference sizes.
// This proves its payload locally; it does not claim a physical camera scan.
const qrChecks = [];
const qrValidationSizes = [112, 125, 152, 160, 256, 512];
for (const size of qrValidationSizes) {
  const { data, info } = await sharp(resolve('public/assets/qr-app-store.svg'))
    .resize(size, size, { kernel: 'nearest' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const decoded = jsQR(new Uint8ClampedArray(data), info.width, info.height, { inversionAttempts: 'dontInvert' });
  const matches = decoded?.data === site.appStoreUrl;
  qrChecks.push({ width: info.width, height: info.height, decodedUrl: decoded?.data ?? null, matches });
  if (!matches) throw new Error(`QR payload failed exact URL validation at ${size}px.`);
}

const validation = {
  generatedAt: new Date().toISOString(),
  method: `Local generated-file verification; QR SVG rasterized by sharp and decoded by jsQR at ${qrValidationSizes.join('/')}px, including current CSS display sizes`,
  source: 'src/data/site.json',
  appStoreUrl: site.appStoreUrl,
  appStoreId: site.appStoreId,
  originalWordmarkPreserved: sha256(wordmark) === expectedWordmark,
  originalFaviconPreserved: sha256(favicon) === expectedFavicon,
  qr: { path: 'public/assets/qr-app-store.svg', sha256: sha256(Buffer.from(qrSvg)), errorCorrection: 'M', quietZoneModules: 4, checks: qrChecks, physicalScanTested: false },
  social: { path: 'public/assets/social-card.png', width: socialMetadata.width, height: socialMetadata.height, bytes: socialPng.length, maxBytes: 200_000, sha256: sha256(socialPng), title: site.socialTitle, description: site.socialDescription, productScreenshot: false },
};
const manifest = {
  sourceCommit: '5b3021014948d416098fd47c70188614a3f8bbce',
  approvedScope: 'Preview website assets; no production publication or native app changes',
  assets: [
    { path: 'public/assets/brand/wordmark.png', source: 'Original swiftora_logo_transparent.png', rights: 'Existing Swiftora brand asset reused for authorized website preview', decision: 'Keep exact original bytes', owner: 'Swiftora / Eric Elder', width: 1536, height: 453, format: 'PNG RGBA', bytes: wordmark.length, budgetBytes: 244915, sha256: sha256(wordmark), placement: 'Dark plum header and footer', crop: 'None; preserve aspect ratio; no color or filter changes', alt: 'Swiftora; home link has accessible name Swiftora home', productScreen: false },
    { path: 'public/favicon.png', source: 'Original Logos/swiftora_icon_192x192.png', rights: 'Existing Swiftora identity reused unchanged', decision: 'Keep existing interim favicon', owner: 'Swiftora / Eric Elder', width: 192, height: 192, format: 'PNG RGBA', bytes: favicon.length, budgetBytes: 10011, sha256: sha256(favicon), placement: 'rel=icon metadata', crop: 'None', alt: 'Browser metadata, not an HTML content image', limitation: 'Padded lockup; no exact icon-only source available for a faithful replacement', productScreen: false },
    { path: 'public/assets/qr-app-store.svg', source: 'Deterministic qrcode output from site.appStoreUrl', rights: 'Project-generated functional QR geometry', decision: 'Generate on build', owner: 'Website engineering', width: 256, height: 256, format: 'SVG', bytes: Buffer.byteLength(qrSvg), budgetBytes: 15000, sha256: sha256(Buffer.from(qrSvg)), placement: 'Desktop download area with ordinary clickable App Store link', crop: 'None; retain white four-module quiet zone; no embedded logo', alt: 'Scan to open Swiftora on the App Store', decodedUrl: site.appStoreUrl, physicalScanTested: false, productScreen: false },
    { path: 'public/assets/social-card.png', source: 'Editable design/social-card.svg composed by scripts/generate-assets.mjs from site.json and unchanged logo', rights: 'Swiftora brand plus project-authored typography and geometric composition; no third-party photography', decision: 'Generate on build', owner: 'Brand / website engineering', width: 1200, height: 630, format: 'PNG', bytes: socialPng.length, budgetBytes: 200000, sha256: sha256(socialPng), placement: 'Open Graph and social card metadata', crop: 'Full 1200x630 composition; test platform crops before production release', alt: `${site.name}: ${site.socialTitle} ${site.socialDescription}`, productScreen: false, productMediaProvenanceRequired: false },
  ],
  productMedia: { status: 'Not supplied; no screenshots, recordings, or visible placeholders fabricated', required: ['Actual home/input screen', 'Actual listing draft result', 'Actual ROI screen'], provenance: ['App version/build', 'Device', 'OS', 'Plan', 'Capture date', 'Screen state', 'Content rights'] },
};
await Promise.all([
  writeFile(resolve('docs/asset-validation.json'), `${JSON.stringify(validation, null, 2)}\n`),
  writeFile(resolve('docs/asset-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`),
]);
console.log(`Assets generated: original brand bytes preserved; QR decodes exactly at ${qrValidationSizes.join('/')}px; social card ${socialPng.length} bytes (1200x630). Physical QR scan not tested.`);
