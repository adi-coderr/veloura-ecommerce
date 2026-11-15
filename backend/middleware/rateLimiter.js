/**
 * In-Memory Sliding-Window Rate Limiting Middleware
 * Protects endpoints against DoS, brute-force, and automated spamming without external dependencies.
 */

function createLimiter({ windowMs = 15 * 60 * 1000, max = 100, message = 'Too many requests. Please try again later.' }) {
  const clients = new Map();

  // Periodic cleanup of expired clients every minute to prevent memory leak
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of clients.entries()) {
      if (now > data.resetTime) {
        clients.delete(ip);
      }
    }
  }, 60 * 1000);

  // Unref so the cleanup interval does not block application shutdown
  if (cleanupTimer.unref) {
    cleanupTimer.unref();
  }

  return (req, res, next) => {
    const ip = req.ip ||
               (req.headers['x-forwarded-for'] && req.headers['x-forwarded-for'].split(',')[0].trim()) ||
               req.socket.remoteAddress ||
               '127.0.0.1';

    const now = Date.now();
    let client = clients.get(ip);

    if (!client || now > client.resetTime) {
      client = { count: 1, resetTime: now + windowMs };
      clients.set(ip, client);
    } else {
      client.count++;
    }

    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - client.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(client.resetTime / 1000));

    if (client.count > max) {
      return res.status(429).json({
        success: false,
        error: message,
        retryAfterSeconds: Math.ceil((client.resetTime - now) / 1000)
      });
    }

    next();
  };
}

// Preset Limiters for Different Risk Profiles
module.exports = {
  // General API traffic limiter
  apiLimiter: createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 120,
    message: 'Too many API requests from this IP address. Please try again in a few minutes.'
  }),

  // Order creation limiter (prevents order flood and inventory draining)
  orderLimiter: createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: 'Too many order attempts from this IP address. Please wait a moment before trying again.'
  }),

  // Promo code validation limiter (prevents promo code dictionary brute-forcing)
  promoLimiter: createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: 'Too many promotional code validation attempts. Please try again later.'
  }),

  // Newsletter signup limiter (prevents list spamming and bot signups)
  newsletterLimiter: createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: 'Too many newsletter subscription requests from this IP. Please try again later.'
  }),

  // Customer reviews submission limiter
  reviewLimiter: createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many review submissions from this IP. Please try again later.'
  })
};
