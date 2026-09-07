import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
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
    if (!target.startsWith(root)) {
      res.writeHead(403).end();
      return;
    }

    let body;
    try {
      body = await readFile(target);
    } catch {
      target = normalize(join(root, path, 'index.html'));
      body = await readFile(target);
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
  console.log(`Serving TaskFlow static export from ./out at http://localhost:${port}`);
});