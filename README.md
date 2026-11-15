# Veloura — Luxury Botanical Skincare (Fullstack E-Commerce)

A luxury e-commerce platform for Veloura, a slow-made botanical skincare brand formulating plant-based products in refillable glass vessels. Features a client-side frontend paired with a modular Node.js/Express REST API backend and embedded persistent JSON database.

---

## 🌟 Fullstack Features & Architecture

### 🖥️ Frontend Storefront
- **Responsive Multi-Page Experience**: High-end minimalist design with Fraunces serif typography and Work Sans.
- **Cart & Slide-Over Drawer**: Real-time persistent cart with free shipping meter, quantity adjustments, and promo coupon calculation.
- **Interactive Checkout Modal**: Shipping address form with server-side validation and instant receipt confirmation.
- **Dynamic Product Pages (`product.html?id=...`)**: Dynamic metadata, custom glass swatches, real-time quantity pricing, and ingredient accordions.
- **Shop Catalog Filtering (`shop.html`)**: Filter products by Face, Body, Hair, or Gift Sets with instant feedback.
- **Editorial Journal & Article Reader**: Modal reader for skincare formulation essays and circular design.

### ⚙️ Backend REST API Engine (`/api`)
- **Products API (`/api/products`)**:
  - `GET /api/products` — Retrieve full catalog (supports `?category=...` and `?search=...`).
  - `GET /api/products/:id` — Single formula details, ingredients, and variant specs.
  - `GET /api/products/categories` — Live category summary with item counts.
- **Orders & Checkout API (`/api/orders`)**:
  - `POST /api/orders` — Place new orders with server-side price verification, inventory deduction, coupon application, and unique tracking number generation (`VEL-XXXXXX`).
  - `GET /api/orders/:orderId` — Look up order details and delivery status.
  - `GET /api/orders` — Retrieve recent customer orders for the store owner.
- **Promo Code Engine (`/api/promo`)**:
  - `POST /api/promo/apply` — Validates discount codes (`VELOURA10`, `WELCOME15`, `FREESHIP`, `SLOWBEAUTY`) against minimum spend rules and calculates discounts.
- **Newsletter Subscription API (`/api/newsletter`)**:
  - `POST /api/newsletter/subscribe` — Validates email, avoids duplicates, and dispatches the welcome promo code.
  - `GET /api/newsletter/subscribers` — View subscribers list.
- **Customer Reviews API (`/api/reviews`)**:
  - `GET /api/reviews/:productId` — Product reviews with 5-star rating breakdown.
  - `POST /api/reviews/:productId` — Submit verified customer reviews.
- **Analytics & Health (`/api/stats`, `/api/health`)**:
  - Live revenue, order count, average order value (AOV), and uptime metrics.

### 📊 Built-In Admin Dashboard (`/admin.html`)
- Accessible directly at `http://localhost:8000/admin.html`.
- Displays real-time Gross Revenue, Order Count, Average Order Value, and Subscriber counts.
- Live Product Inventory table displaying current units in stock and inventory status.
- Recent orders table showing customer names, items purchased, and paid status.

---

## 🚀 How to Run the Backend & Store

### Method 1: Node.js (Fullstack Express Engine — Recommended)
```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Start the server
npm start
# or
node server.js
```
*Starts on `http://localhost:8000` (or automatically selects the next free port) and opens your browser.*

### Method 2: Python 3 (Zero-Dependency API & Static Server)
```bash
python3 server.py
```
*Built-in standard library server providing both the static storefront and the `/api/...` endpoints without requiring external packages.*

### Method 3: One-Click Shell Script (macOS / Linux)
```bash
./run.sh
```

### Method 4: Double-Click on macOS Finder
Double-click `start.command` in the project folder to start the server in Terminal.

---

## 📁 Directory Structure
```
├── backend/
│   ├── app.js               # Express app configuration & middleware pipeline
│   ├── config/
│   │   └── index.js         # Environment settings, currency, and shipping thresholds
│   ├── controllers/
│   │   ├── orderController.js      # Order placement, price verification, receipts
│   │   ├── productController.js    # Catalog, search, and category listing
│   │   ├── promoController.js      # Discount codes & promo engine
│   │   ├── newsletterController.js # Subscriber validation & registration
│   │   └── reviewController.js     # Reviews & ratings handler
│   ├── data/
│   │   ├── database.js      # Embedded persistent JSON store
│   │   ├── products.json    # Seed catalog (8 botanical products)
│   │   ├── promoCodes.json  # Pre-configured coupons (VELOURA10, FREESHIP, etc.)
│   │   └── storage/         # Auto-generated JSON files (orders.json, subscribers.json)
│   ├── middleware/
│   │   ├── auth.js          # Admin API key validation
│   │   ├── errorHandler.js  # Centralized JSON error response handler
│   │   └── logger.js        # Terminal request logger with status and timing
│   └── routes/
│       ├── api.js           # Master API router (/api/health, /api/stats, /api/config)
│       ├── newsletterRoutes.js
│       ├── orderRoutes.js
│       ├── productRoutes.js
│       ├── promoRoutes.js
│       └── reviewRoutes.js
├── .env                     # Environment variables (PORT, free shipping threshold)
├── .env.example             # Example environment configuration
├── frontend/
│   ├── css/
│   │   └── veloura.css      # Master styling
│   ├── js/
│   │   └── veloura.js       # Frontend store engine (cart, checkout, API integration)
│   ├── about.html           # Brand founding story
│   ├── admin.html           # Real-time store analytics and order management dashboard
│   ├── index.html           # Home page
│   ├── journal.html         # Editorial notes and modal reader
│   ├── product.html         # Dynamic product detail view
│   ├── ritual.html          # 3-step skincare ritual
│   └── shop.html            # Catalog grid with filtering
├── server.js                # Fullstack Node.js server entrypoint
├── server.py                # Zero-dependency Python server & API
├── package.json             # NPM dependencies & scripts
├── run.sh                   # Bash launcher
└── start.command            # macOS Finder double-click launcher
```
