/**
 * Veloura Embedded Database Engine
 * Zero-configuration persistent JSON store with automatic file flushing.
 */
const fs = require('fs');
const path = require('path');
const config = require('../config');

const STORAGE_DIR = config.paths.storage;
const ORDERS_FILE = path.join(STORAGE_DIR, 'orders.json');
const SUBSCRIBERS_FILE = path.join(STORAGE_DIR, 'subscribers.json');
const REVIEWS_FILE = path.join(STORAGE_DIR, 'reviews.json');

// Ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

// Helper: Read JSON file safely
function readJson(filePath, defaultVal = []) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), 'utf-8');
      return defaultVal;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
    return defaultVal;
  }
}

// Helper: Write JSON file safely
function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
  }
}

// Initial seed products & promos
const SEED_PRODUCTS = require('./products.json');
const SEED_PROMOS = require('./promoCodes.json');

class Database {
  constructor() {
    this.products = [...SEED_PRODUCTS];
    this.promoCodes = [...SEED_PROMOS];
    this.orders = readJson(ORDERS_FILE, []);
    this.subscribers = readJson(SUBSCRIBERS_FILE, [
      { email: 'elena@velouraskincare.com', subscribedAt: '2026-01-10T10:00:00Z', source: 'founding_list' }
    ]);
    this.reviews = readJson(REVIEWS_FILE, [
      {
        id: 'rev-1',
        productId: 'bloom-serum',
        author: 'Nina R.',
        rating: 5,
        title: 'Finally, a vitamin C that does not irritate',
        comment: 'The first cream and serum combo that did not make my sensitive skin pick a fight with me. My morning glow is unreal.',
        verified: true,
        createdAt: '2026-10-15T14:22:00Z'
      },
      {
        id: 'rev-2',
        productId: 'calm-cream',
        author: 'Julian M.',
        rating: 5,
        title: 'Barrier lifesaver',
        comment: 'Centella and oat milk is the holy grail for dry winter days. Absorbs fast and leaves a silky satin finish.',
        verified: true,
        createdAt: '2026-11-02T09:15:00Z'
      }
    ]);
  }

  // --- PRODUCTS ---
  getProducts(filters = {}) {
    let result = [...this.products];
    if (filters.category && filters.category.toLowerCase() !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
      );
    }
    return result;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id) || null;
  }

  updateProductStock(id, quantityPurchased) {
    const product = this.getProductById(id);
    if (product) {
      product.stockCount = Math.max(0, product.stockCount - quantityPurchased);
      product.inStock = product.stockCount > 0;
      return product;
    }
    return null;
  }

  // --- PROMO CODES ---
  getPromoCodes() {
    return this.promoCodes;
  }

  getPromoByCode(code) {
    if (!code) return null;
    const cleanCode = code.trim().toUpperCase();
    return this.promoCodes.find(p => p.code === cleanCode && p.isActive) || null;
  }

  // --- ORDERS ---
  getOrders() {
    return this.orders;
  }

  getOrderById(orderId) {
    return this.orders.find(o => o.orderId === orderId) || null;
  }

  createOrder(orderData) {
    const orderId = `VEL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      paymentStatus: 'paid_demo',
      ...orderData
    };

    // Deduct stock
    if (Array.isArray(orderData.items)) {
      orderData.items.forEach(item => {
        this.updateProductStock(item.id, item.qty || 1);
      });
    }

    this.orders.unshift(newOrder);
    writeJson(ORDERS_FILE, this.orders);
    return newOrder;
  }

  // --- SUBSCRIBERS ---
  getSubscribers() {
    return this.subscribers;
  }

  addSubscriber(email, source = 'website_footer') {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = this.subscribers.find(s => s.email === normalizedEmail);

    if (existing) {
      return { isNew: false, subscriber: existing };
    }

    const newSubscriber = {
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      source,
      couponCode: 'VELOURA10'
    };

    this.subscribers.unshift(newSubscriber);
    writeJson(SUBSCRIBERS_FILE, this.subscribers);
    return { isNew: true, subscriber: newSubscriber };
  }

  // --- REVIEWS ---
  getReviewsByProduct(productId) {
    return this.reviews.filter(r => r.productId === productId);
  }

  addReview(productId, reviewData) {
    const newReview = {
      id: `rev-${Date.now()}`,
      productId,
      author: reviewData.author || 'Verified Customer',
      rating: parseInt(reviewData.rating, 10) || 5,
      title: reviewData.title || '',
      comment: reviewData.comment || '',
      verified: true,
      createdAt: new Date().toISOString()
    };

    this.reviews.unshift(newReview);
    writeJson(REVIEWS_FILE, this.reviews);
    return newReview;
  }

  // --- METRICS / STATS ---
  getStoreStats() {
    const totalRevenue = this.orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const totalItemsSold = this.orders.reduce((sum, order) => {
      const itemsCount = (order.items || []).reduce((iSum, i) => iSum + (i.qty || 1), 0);
      return sum + itemsCount;
    }, 0);

    return {
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      totalOrders: this.orders.length,
      averageOrderValue: this.orders.length ? parseFloat((totalRevenue / this.orders.length).toFixed(2)) : 0,
      totalItemsSold,
      totalProducts: this.products.length,
      totalSubscribers: this.subscribers.length
    };
  }
}

module.exports = new Database();
