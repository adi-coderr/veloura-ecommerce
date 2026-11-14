#!/usr/bin/env node
/**
 * Veloura Botanical Skincare - Node.js Static Server
 * Zero dependencies, built-in http, fs, and path modules.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = process.env.PORT || 8000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(ROOT, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 handler
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 Not Found — Veloura</title><link rel="stylesheet" href="veloura.css"></head>
        <body style="padding:4rem 6vw;text-align:center">
          <h1 style="font-size:2.5rem;margin-bottom:1rem">Page Not Found</h1>
          <p style="color:var(--mute);margin-bottom:2rem">The formula or page you are looking for does not exist.</p>
          <a href="index.html" class="btn">Return to Home</a>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}/index.html`;
  console.log('='.repeat(60));
  console.log('  ✦ VELOURA BOTANICAL SKINCARE — NODE.JS SERVER ✦');
  console.log('='.repeat(60));
  console.log(`  Local URL : ${url}`);
  console.log('  Press Ctrl+C to stop.');
  console.log('='.repeat(60));

  // Automatically open browser on macOS, Windows, or Linux
  const startCmd = process.platform === 'darwin' ? 'open' :
                   process.platform === 'win32' ? 'start' : 'xdg-open';
  exec(`${startCmd} ${url}`);
});
