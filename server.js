#!/usr/bin/env node
/**
 * Veloura Botanical Skincare - Node.js Express Backend & Server
 * Full-stack e-commerce server running REST APIs, persistent JSON storage, and static assets.
 */

const http = require('http');
const net = require('net');
const { exec } = require('child_process');
const app = require('./backend/app');
const config = require('./backend/config');
const ensureFrontendImages = require('./backend/utils/ensureImages');

// Helper to verify port availability or find next available port
function findAvailablePort(startPort) {
  return new Promise((resolve) => {
    const testServer = net.createServer();
    testServer.once('error', () => {
      resolve(findAvailablePort(startPort + 1));
    });
    testServer.once('listening', () => {
      testServer.close(() => resolve(startPort));
    });
    testServer.listen(startPort);
  });
}

async function startServer() {
  ensureFrontendImages();
  const port = await findAvailablePort(config.port);
  const server = http.createServer(app);

  server.listen(port, () => {
    const baseUrl = `http://localhost:${port}`;

    console.log('\n' + '='.repeat(68));
    console.log('  ✦ VELOURA BOTANICAL SKINCARE — FULLSTACK BACKEND ✦');
    console.log('='.repeat(68));
    if (port !== config.port) {
      console.warn(`  ⚠ Port ${config.port} is already in use by an older process!`);
      console.warn(`  ⚠ Open the NEW URL below (${baseUrl}), OR stop the old server on port ${config.port}.`);
      console.log('-'.repeat(68));
    }
    console.log(`  🌐 Storefront      : ${baseUrl}/index.html`);
    console.log(`  📊 Admin Dashboard : ${baseUrl}/admin.html`);
    console.log(`  📦 Products API    : ${baseUrl}/api/products`);
    console.log(`  🧾 Orders API      : ${baseUrl}/api/orders`);
    console.log(`  💌 Newsletter API  : ${baseUrl}/api/newsletter/subscribe`);
    console.log(`  ⚡ Health Check    : ${baseUrl}/api/health`);
    console.log('='.repeat(68));
    console.log('  Database Storage   : backend/data/storage/*.json (Persistent)');
    console.log('  Press Ctrl+C to gracefully shut down the server.');
    console.log('='.repeat(68) + '\n');

    // Automatically open browser in development if configured
    if (config.autoOpenBrowser) {
      const openCmd = process.platform === 'darwin' ? 'open' :
                      process.platform === 'win32' ? 'start' : 'xdg-open';
      exec(`${openCmd} ${baseUrl}/index.html`, (err) => {
        if (err) {
          // Silent fallback if running headless or background
        }
      });
    }
  });

  // Graceful shutdown
  const handleExit = (signal) => {
    console.log(`\n  Received ${signal}. Shutting down Veloura server gracefully...`);
    server.close(() => {
      console.log('  Server closed. Goodbye!');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => handleExit('SIGINT'));
  process.on('SIGTERM', () => handleExit('SIGTERM'));
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
