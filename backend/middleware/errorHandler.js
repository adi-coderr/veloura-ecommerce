/**
 * Centralized Error Handler Middleware
 * Mask internal server errors in production to avoid information disclosure (CWE-209).
 */
module.exports = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    console.error('Unhandled Application Error:', err);
  } else {
    console.error(`[Error] ${err.name || 'Error'}: ${err.message}`);
  }

  const statusCode = Number.isInteger(err.statusCode) && err.statusCode >= 400 && err.statusCode < 600
    ? err.statusCode
    : 500;

  // Never leak internal system error traces to users in production
  const message = (!isDev && statusCode === 500)
    ? 'An unexpected error occurred. Please try again later.'
    : (err.message || 'Internal Server Error');

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(isDev && { stack: err.stack })
  });
};
