import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { realpathSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const cwd = normalize(resolve(fileURLToPath(new URL('.', import.meta.url)), '..'));
const root = join(cwd, 'out');
const port = Number(process.env.PORT || 3000);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.woff2': 'font/woff2',
};

console.error('ROOT=', root, 'REALROOT=', realpathSync(root));
const server = createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { allow: 'GET, HEAD' }).end();
    return;
  }

  let path;
  try {
    path = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
  } catch {
    res.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' }).end('Bad request');
    return;
  }

  try {
    let target = normalize(join(root, path));
    // Resolve symlinks to prevent path traversal — compare real paths
    const realRoot = realpathSync(root);
    let resolvedTarget;
    try {
      resolvedTarget = realpathSync(target);
    } catch {
      resolvedTarget = target;
    }
    console.error('REQ', path, 'target=', target, 'resolved=', resolvedTarget, 'realRoot=', realRoot);
if (!resolvedTarget.startsWith(realRoot + path.sep) && resolvedTarget !== realRoot) {
      res.writeHead(403).end();
      return;
    }

    let body;
    try {
      body = await readFile(target);
      console.error('READ OK', path, 'bodyLen=', body && body.length);
    } catch {
      // Next.js static export: route pages become <path>.html, not <path>/index.html.
      // Try the .html fallback first so /cookies serves cookies.html.
      const candidates = [
        normalize(join(root, `${path}.html`)),
        normalize(join(root, path, 'index.html')),
      ];
      let lastErr;
      for (const candidate of candidates) {
        try {
          body = await readFile(candidate);
          target = candidate;
          break;
        } catch (e) {
          lastErr = e;
        }
      }
      console.error('READ FAIL', path, 'lastErr=', lastErr && lastErr.message);
      if (body === undefined) throw lastErr;
    }

    res.writeHead(200, {
      'content-type': types[extname(target)] ?? 'application/octet-stream',
      'cache-control': req.method === 'HEAD' ? 'no-store' : 'public, max-age=3600',
    });
    if (req.method === 'HEAD') res.end();
    else res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('404 Not Found');
  }
});

server.listen(port, () => {
  console.log(`Serving Ember & Wood static export from ./out at http://localhost:${port}`);
});