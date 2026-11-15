/**
 * Request Logger Middleware
 */
module.exports = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString().split('T')[1].replace('Z', '');
    const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    const resetColor = '\x1b[0m';

    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} -> ${statusColor}${res.statusCode}${resetColor} (${duration}ms)`
    );
  });

  next();
};
