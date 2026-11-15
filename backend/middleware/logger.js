/**
 * Request Logger Middleware
 * Sanitized against Log Injection / CRLF injection.
 */
module.exports = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString().split('T')[1].replace('Z', '');
    const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    const resetColor = '\x1b[0m';

    // Strip carriage returns and line feeds to prevent log forging (CWE-117)
    const cleanMethod = (req.method || 'GET').replace(/[\r\n]/g, '');
    const cleanUrl = (req.originalUrl || req.url || '').replace(/[\r\n]/g, '').slice(0, 200);

    console.log(
      `[${timestamp}] ${cleanMethod} ${cleanUrl} -> ${statusColor}${res.statusCode}${resetColor} (${duration}ms)`
    );
  });

  next();
};
