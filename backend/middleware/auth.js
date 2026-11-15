/**
 * Admin Authentication Middleware
 */
const config = require('../config');

module.exports = (req, res, next) => {
  const apiKey = req.headers['x-admin-key'] ||
                 (req.headers.authorization && req.headers.authorization.replace('Bearer ', ''));

  if (!apiKey || apiKey !== config.adminApiKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Valid x-admin-key required for this resource.'
    });
  }

  next();
};
