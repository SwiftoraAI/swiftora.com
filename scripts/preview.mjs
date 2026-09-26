import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const outputRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const portFlag = process.argv.indexOf('--port');
const port = portFlag >= 0 ? Number(process.argv[portFlag + 1]) : 4321;
if (!Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error('Use --port with an integer between 1024 and 65535.');
}
await stat(path.join(outputRoot, 'index.html')).catch(() => {
  throw new Error('The static build is missing. Run npm run build before preview.');
});

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'], ['.mjs', 'text/javascript; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'], ['.xml', 'application/xml; charset=utf-8'],
  ['.svg', 'image/svg+xml'], ['.png', 'image/png'], ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'], ['.webp', 'image/webp'], ['.avif', 'image/avif'],
  ['.ico', 'image/x-icon'], ['.woff', 'font/woff'], ['.woff2', 'font/woff2'],
  ['.mp4', 'video/mp4'], ['.webm', 'video/webm'], ['.vtt', 'text/vtt; charset=utf-8'],
]);

const server = http.createServer(async (req, res) => {
  const send = (status, body, mime = 'text/plain; charset=utf-8', extra = {}) => {
    const content = Buffer.isBuffer(body) ? body : Buffer.from(body);
    res.writeHead(status, {
      'Content-Type': mime,
      'Content-Length': content.length,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'X-Content-Type-Options': 'nosniff',
      ...extra,
    });
    res.end(req.method === 'HEAD' ? undefined : content);
  };
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    send(405, 'This preview serves static files only.', undefined, { Allow: 'GET, HEAD' });
    return;
  }
  // Keep this local-only server from being used through an unrelated browser origin.
  if (req.headers.host !== `127.0.0.1:${port}` && req.headers.host !== `localhost:${port}`) {
    send(421, 'Use the local preview address.');
    return;
  }
  let pathname;
  let requestUrl;
  try {
    requestUrl = new URL(req.url, `http://127.0.0.1:${port}`);
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    send(400, 'Invalid request path.');
    return;
  }
  const qaMode = requestUrl.searchParams.get('qa') === '1';
  const qaFiles = {
    '/__qa/axe.min.js': path.resolve(outputRoot, '../node_modules/axe-core/axe.min.js'),
    '/__qa/browser.js': path.resolve(outputRoot, '../scripts/qa-browser.js'),
  };
  if (Object.hasOwn(qaFiles, pathname)) {
    if (!qaMode) { send(404, 'Page not found.'); return; }
    try { send(200, await readFile(qaFiles[pathname]), 'text/javascript; charset=utf-8'); }
    catch { send(404, 'Local QA dependency is missing.'); }
    return;
  }
  const qaScripts = '<script src="/__qa/axe.min.js?qa=1" defer></script><script src="/__qa/browser.js?qa=1" defer></script>';
  const instrument = body => qaMode ? Buffer.from(body.toString('utf8').replace(/<\/body>/i, qaScripts + '</body>')) : body;
  if (pathname.includes('\\') || pathname.includes('\0') || pathname.split('/').some(part => part === '..' || part.startsWith('.'))) {
    send(400, 'Invalid request path.');
    return;
  }
  let relative = pathname === '/' ? 'index.html' : pathname.slice(1);
  if (pathname !== '/' && !pathname.endsWith('/') && !path.extname(relative)) relative += '.html';
  const absolute = path.resolve(outputRoot, relative);
  if (!absolute.startsWith(outputRoot + path.sep)) {
    send(400, 'Invalid request path.');
    return;
  }
  try {
    const info = await stat(absolute);
    if (!info.isFile()) throw new Error('Not a file');
    let content = await readFile(absolute);
    if (absolute.endsWith('.html')) content = instrument(content);
    send(relative === '404.html' ? 404 : 200, content, mimeTypes.get(path.extname(absolute)) || 'application/octet-stream');
  } catch {
    const fallback = await readFile(path.join(outputRoot, '404.html')).catch(() => Buffer.from('Page not found.'));
    send(404, instrument(fallback), 'text/html; charset=utf-8');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Local static preview: http://127.0.0.1:${port}`);
  console.log('No production deployment. Responses are no-store and noindex for preview.');
});
server.on('error', error => {
  console.error(`Preview failed: ${error.message}`);
  process.exitCode = 1;
});
