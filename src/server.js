import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT ?? 3000);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const homePagePath = resolve(__dirname, 'home.html');
const assetsDir = resolve(__dirname, 'assets');
const stylesDir = resolve(__dirname, 'styles');

const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.css': 'text/css; charset=utf-8',
};

async function getHomePage() {
  try {
    return await readFile(homePagePath, 'utf8');
  } catch (error) {
    console.error('Failed to load home.html:', error);
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  const requestPath = req.url.split('?')[0];

  if (requestPath === '/' || requestPath === '/index.html') {
    const html = await getHomePage();
    if (!html) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Failed to load homepage.');
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
    });
    res.end(html);
    return;
  }

  const staticDirectories = [
    { prefix: '/assets/', directory: assetsDir },
    { prefix: '/styles/', directory: stylesDir },
  ];

  for (const { prefix, directory } of staticDirectories) {
    if (!requestPath.startsWith(prefix)) {
      continue;
    }

    const relativePath = requestPath.slice(prefix.length);
    const filePath = resolve(directory, relativePath);

    if (!filePath.startsWith(directory)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    try {
      const file = await readFile(filePath);
      const ext = extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(file);
      return;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Failed to read asset ${requestPath}:`, error);
      }
      break;
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Home page available at http://localhost:${PORT}/`);
});

