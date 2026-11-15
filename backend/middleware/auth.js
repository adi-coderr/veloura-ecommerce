/**
 * Admin Authentication Middleware
 * Validates admin API keys using constant-time cryptographic comparison
 * to eliminate timing attack vectors (CWE-208).
 */
const crypto = require('crypto');
const config = require('../config');

/**
 * Constant-time string comparison to prevent timing analysis attacks
 */
function safeCompare(providedKey, expectedKey) {
  if (typeof providedKey !== 'string' || typeof expectedKey !== 'string') {
    return false;
  }

  const bufProvided = Buffer.from(providedKey);
  const bufExpected = Buffer.from(expectedKey);

  // If buffer lengths differ, perform a dummy comparison to preserve constant execution time
  if (bufProvided.length !== bufExpected.length) {
    crypto.timingSafeEqual(bufProvided, bufProvided);
    return false;
  }

  return crypto.timingSafeEqual(bufProvided, bufExpected);
}

module.exports = (req, res, next) => {
  const headerKey = req.headers['x-admin-key'];
  const authHeader = req.headers.authorization;
  const bearerKey = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : null;

  const apiKey = headerKey || bearerKey;

  if (!apiKey || !safeCompare(apiKey, config.adminApiKey)) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Valid x-admin-key required for this resource.'
    });
  }

  next();
};
