/**
 * HTTP Security Headers Middleware
 * Protects against MIME-sniffing, Clickjacking, XSS, and Information Disclosure.
 */
module.exports = (req, res, next) => {
  // Prevent browsers from MIME-type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Protect against Clickjacking by denying frame embedding from external origins
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Legacy XSS filter protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Control referrer information leakage
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Disable intrusive device APIs
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');

  // Content Security Policy (allows local assets, Google Fonts, and inline styling for design)
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self';"
  );

  next();
};
