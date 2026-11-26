# Veloura — Luxury Botanical Skincare (Fullstack E-Commerce)

An editorial e-commerce platform for **Veloura Maison Botanique**, a slow-made botanical skincare house formulating clean plant-based formulas in infinitely refillable Italian glass vessels. Built with a multi-page frontend storefront, custom studio photography, a modular Node.js/Express REST API backend (plus a zero-dependency Python fallback server), and an embedded persistent JSON database.

---

## 🌟 Fullstack Features & Architecture

### 🖥️ Frontend Storefront (`frontend/`)
- **Editorial Luxury UI**: Built with alabaster (`#FBF8F3`), warm limestone (`#F3EDE4`), and espresso obsidian (`#1D1714`) surfaces using optical **Fraunces** serif-italic typography paired with **Work Sans**.
- **Bespoke Navigation Header & Instant Search**: Monogram crest lockup, frosted capsule pill navigation, pulsing free-shipping badge, interactive slide-over Bag button, and a global **Quick Search modal** across ingredients and formulas.
- **Interactive Homepage Showcase (`index.html`)**: Asymmetric editorial hero with featured spotlight quick-add, continuous press & standards marquee, 4 ritual category tiles, filterable signature formulas grid, clinical efficacy & botanical ingredient spotlight tabs, interactive **AM / PM 3-Step Routine Builder**, atelier sustainability split, and verified community stories.
- **Shop Catalog with Live Search & Sort (`shop.html`)**: Filter 16 formulas by *Face*, *Body*, *Hair*, or *Gift sets*, search by active ingredient or product name, sort by Featured, Top Rated, or Price, and sync live catalog updates from `/api/products`.
- **Dynamic Product Gallery & Live Reviews (`product.html?id=...`)**: Multi-angle product photo gallery switcher, vessel finish swatches, real-time quantity pricing, botanical INCI/usage accordions, paired recommendations, and a live review submission form wired directly to `/api/reviews/:productId`.
- **Slide-Over Cart Drawer & Checkout Modal**: Persistent `localStorage` cart with free-shipping progress meter (`$50` threshold), promo code validation, shipping form validation, and instant receipt confirmation (`VEL-XXXXXX`).
- **The Ritual, About & Journal (`ritual.html`, `about.html`, `journal.html`)**: Interactive Morning/Evening protocol tabs, rotating refill seal brand showcase, and category-filtered journal essays with modal reader.

---

### ⚙️ Backend REST API Engine (`/api`)
- **Products API (`/api/products`)**:
  - `GET /api/products` — Retrieve all **16 formulas** (supports `?category=...` and `?search=...`).
  - `GET /api/products/:id` — Single formula specs, ingredients, variants, and stock status.
  - `GET /api/products/categories` — Live category summary with item counts.
- **Orders & Checkout API (`/api/orders`)**:
  - `POST /api/orders` — Place orders with server-side pricing validation, stock updates, coupon calculation, and unique tracking number (`VEL-XXXXXX`).
  - `GET /api/orders/:orderId` — Order lookup with masked customer email privacy.
  - `GET /api/orders` — *(Protected: Admin)* Retrieve customer orders for the store dashboard.
- **Promo Code Engine (`/api/promo`)**:
  - `POST /api/promo/apply` — Validates active coupon codes (`VELOURA10`, `WELCOME10`, `WELCOME15`, `FREESHIP`, `SLOWBEAUTY`) against minimum spend rules.
- **Newsletter Subscription API (`/api/newsletter`)**:
  - `POST /api/newsletter/subscribe` — Validates email format, prevents duplicates, and returns welcome coupon details.
  - `GET /api/newsletter/subscribers` — *(Protected: Admin)* View subscriber list.
- **Customer Reviews API (`/api/reviews`)**:
  - `GET /api/reviews/:productId` — Fetch reviews for a specific formula.
  - `POST /api/reviews/:productId` — Sanitize and publish verified customer reviews.
- **Analytics, Config & Health**:
  - `GET /api/health` — Server status and uptime check.
  - `GET /api/config` — Public store currency and shipping threshold configuration.
  - `GET /api/stats` — *(Protected: Admin)* Live revenue, order count, average order value (AOV), and subscriber counts.

---

### 🔒 Security Architecture
- **Timing-Safe Admin Authentication**: Protected routes validate `x-admin-key` (or `Authorization: Bearer <key>`) against `ADMIN_API_KEY` using `crypto.timingSafeEqual` in `backend/middleware/auth.js` (and `hmac.compare_digest` in `server.py`).
- **HTTP Security Headers & CSP**: Configured via `backend/middleware/securityHeaders.js` (`X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`, and strict `Content-Security-Policy`).
- **Sliding-Window Rate Limiting**: Endpoint-specific in-memory rate limiters in `backend/middleware/rateLimiter.js` protecting general API routes, orders, promo checks, newsletter signups, and review submissions.
- **XSS & Payload Protection**: Server-side input length clamping and tag stripping (`backend/utils/security.js`), strict `100kb` JSON / `50kb` form payload bounds, CRLF-safe request logging, client-side `escapeHtml` rendering, and `.env` exclusion via `.gitignore`.

---

### 📊 Built-In Admin Dashboard (`/admin.html`)
- Accessible at `http://localhost:8000/admin.html` (authenticate with `ADMIN_API_KEY` from `.env`, default fallback configured in `backend/config/index.js`).
- Displays live Gross Revenue, Order Count, Average Order Value, Subscriber counts, Product Inventory stock status, and recent customer orders.

---

## 🚀 How to Run the Backend & Store

Both server entrypoints automatically ensure studio assets inside `frontend/images/` are prepared before listening and open the storefront in your browser.

### Method 1: Node.js (Fullstack Express Engine — Recommended)
```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. (Optional) Create local environment config from example
cp .env.example .env

# 3. Start the server (auto-prepares images and opens browser)
npm start
# or
node server.js
```
*Runs on `http://localhost:8000` (or automatically selects the next open port).*

### Method 2: Python 3 (Zero-Dependency API & Static Server)
```bash
npm run serve
# or
python3 server.py
```
*Standard-library server providing the static storefront, studio image sync, and `/api/...` endpoints without Node packages.*

### Method 3: One-Click Launchers (macOS / Linux)
```bash
./run.sh
```
Or double-click `start.command` in Finder on macOS.

---

## 📁 Directory Structure
```text
├── backend/
│   ├── app.js                       # Express app config, CORS, payload limits, no-cache static headers
│   ├── config/
│   │   └── index.js                 # Environment settings, currency, shipping rules, paths
│   ├── controllers/
│   │   ├── newsletterController.js  # Subscriber validation & registration
│   │   ├── orderController.js       # Server-side price check, inventory update, masked receipts
│   │   ├── productController.js     # Catalog, search, and category listing
│   │   ├── promoController.js       # Discount codes & promo validation engine
│   │   └── reviewController.js      # Sanitized product reviews & ratings handler
│   ├── data/
│   │   ├── database.js              # Embedded persistent JSON store
│   │   ├── products.json            # Seed catalog (16 botanical formulas across 4 categories)
│   │   ├── promoCodes.json          # Pre-configured coupons (VELOURA10, WELCOME15, FREESHIP, etc.)
│   │   └── storage/                 # Auto-generated JSON files (orders.json, subscribers.json, reviews.json)
│   ├── middleware/
│   │   ├── auth.js                  # Constant-time Admin API key authentication
│   │   ├── errorHandler.js          # Centralized JSON error response handler
│   │   ├── logger.js                # CRLF-sanitized terminal request logger
│   │   ├── rateLimiter.js           # Sliding-window IP rate limiters
│   │   └── securityHeaders.js       # CSP, frame protection, and security headers
│   ├── routes/
│   │   ├── api.js                   # Master API router (/api/health, /api/stats, /api/config)
│   │   ├── newsletterRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── promoRoutes.js
│   │   └── reviewRoutes.js
│   └── utils/
│       ├── ensureImages.js          # Automatic startup sync for studio images into frontend/images/
│       └── security.js              # Text sanitization, email validation, clamping, email masking
├── frontend/
│   ├── css/
│   │   └── veloura.css              # Editorial luxury stylesheet & responsive breakpoints
│   ├── images/                      # Auto-populated studio product & editorial .jpg photography
│   ├── js/
│   │   └── veloura.js               # Storefront logic (cart drawer, quick search, routine builder, live reviews)
│   ├── about.html                   # Brand founding story & refill milestones
│   ├── admin.html                   # Store analytics, inventory, and order dashboard
│   ├── index.html                   # Editorial homepage storefront
│   ├── journal.html                 # Formulation essays & modal reader
│   ├── product.html                 # Gallery product detail page with live reviews
│   ├── ritual.html                  # AM/PM 3-step skincare protocol showcase
│   └── shop.html                    # Full 16-formula catalog with search, filter & sort
├── .env.example                     # Sample environment template (.env itself is gitignored)
├── .gitignore                       # Excludes node_modules, .env, storage outputs, OS artifacts
├── package.json                     # NPM scripts & Express dependencies
├── README.md                        # Project documentation
├── run.sh                           # Bash launcher script
├── server.js                        # Node.js server entrypoint
├── server.py                        # Zero-dependency Python dev server & API
└── start.command                    # macOS Finder double-click launcher
```
