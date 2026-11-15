/**
 * Application Configuration
 */
const path = require('path');
require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT, 10) || 8000,
  env: process.env.NODE_ENV || 'development',
  currency: process.env.CURRENCY || 'USD',
  freeShippingThreshold: parseFloat(process.env.FREE_SHIPPING_THRESHOLD) || 50.00,
  standardShippingFee: parseFloat(process.env.STANDARD_SHIPPING_FEE) || 4.95,
  taxRate: parseFloat(process.env.TAX_RATE) || 0.00,
  adminApiKey: process.env.ADMIN_API_KEY || 'veloura_admin_secret_2026',
  autoOpenBrowser: process.env.AUTO_OPEN_BROWSER !== 'false',
  paths: {
    root: path.resolve(__dirname, '../../'),
    data: path.resolve(__dirname, '../data'),
    storage: path.resolve(__dirname, '../data/storage')
  }
};
