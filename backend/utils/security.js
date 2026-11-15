/**
 * Security & Sanitization Utilities
 */

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Sanitizes input string to prevent XSS and limits string length
 */
function sanitizeText(value, maxLength = 250) {
  if (value === null || value === undefined) return '';
  const str = String(value).trim();
  return str
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Strip direct script/tag injection characters
}

/**
 * Strictly validates email format and limits length
 */
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 150) return false;
  return EMAIL_REGEX.test(trimmed);
}

/**
 * Validates and clamps integer quantities safely
 */
function clampInt(value, min = 1, max = 50, fallback = 1) {
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

/**
 * Masks an email for privacy when showing customer receipt lookups
 */
function maskEmail(email) {
  if (!email || typeof email !== 'string' || !email.includes('@')) return 'customer@***';
  const [local, domain] = email.split('@');
  const visible = local.length > 2 ? local[0] + '***' + local[local.length - 1] : local[0] + '***';
  return `${visible}@${domain}`;
}

module.exports = {
  sanitizeText,
  isValidEmail,
  clampInt,
  maskEmail
};
