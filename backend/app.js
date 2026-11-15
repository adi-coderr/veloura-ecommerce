/**
 * Express Application Setup
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const apiRouter = require('./routes/api');

const app = express();

// Security & Parsing Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Mount API Endpoints
app.use('/api', apiRouter);

// Serve Frontend Static Files from frontend/ directory
app.use(express.static(config.paths.frontend, {
  extensions: ['html'],
  index: 'index.html'
}));

// Route fallback for client pages (Terminal 404/SPA handler)
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
