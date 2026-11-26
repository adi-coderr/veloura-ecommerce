/**
 * Express Application Setup
 * Hardened with Security Headers, CORS, Rate Limiting, and Payload Boundaries.
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const logger = require('./middleware/logger');
const securityHeaders = require('./middleware/securityHeaders');
const errorHandler = require('./middleware/errorHandler');
const apiRouter = require('./routes/api');

const app = express();

// Disable Express banner to prevent technology fingerprinting
app.disable('x-powered-by');

// Trust first proxy if running behind a reverse proxy (e.g. Nginx, Cloudflare)
app.set('trust proxy', 1);

// Attach standard HTTP Security Headers (CSP, X-Content-Type-Options, etc.)
app.use(securityHeaders);

// CORS configuration: Safe origin handling
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : null;

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, mobile apps, same-origin)
    if (!origin || !allowedOrigins || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Cross-Origin Request Blocked by CORS Policy.'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
  maxAge: 86400
}));

// Strictly limit JSON & URL-encoded request payload sizes to prevent memory exhaustion DoS
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '50kb' }));

// Request logging with CRLF injection sanitization
app.use(logger);

// Mount API Endpoints
app.use('/api', apiRouter);

// Serve Frontend Static Files safely (disallowing dotfiles like .env or .git)
app.use(express.static(config.paths.frontend, {
  extensions: ['html'],
  index: 'index.html',
  dotfiles: 'ignore',
  etag: true,
  lastModified: true,
  maxAge: 0,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  }
}));

// Route fallback for client pages (Terminal 404 / SPA handler)
app.use((req, res) => {
  // If request is for an unmatched API route, return JSON 404
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      error: `API route '${req.originalUrl}' not found.`
    });
  }

  // Otherwise, serve index.html from frontend
  const indexFile = path.join(config.paths.frontend, 'index.html');
  res.sendFile(indexFile);
});

// Centralized Error Handling
app.use(errorHandler);

module.exports = app;
