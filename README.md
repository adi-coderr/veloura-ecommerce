# Veloura — Clean Botanical Skincare

An e-commerce website for Veloura, a luxury botanical skincare brand formulating plant-based products in refillable glass vessels.

---

## 🌟 Key Features & Integrations

- **Unified Navigation & Header**:
  - Sticky frosted header with brand logo, dynamic active nav indicator, and interactive shopping bag with live counter badge.
  - Top announcement banner highlighting complimentary carbon-neutral shipping and refillable glass guarantees.
  - Fully responsive mobile drawer navigation with animated hamburger button.

- **Persistent Shopping Bag & Cart Drawer**:
  - Slide-out cart drawer accessible from every page.
  - Real-time `localStorage` synchronization across all pages (`index.html`, `shop.html`, `product.html`, `ritual.html`, `about.html`, `journal.html`).
  - Quantity controls (increment, decrement, remove).
  - Dynamic free shipping progress meter (unlocks at $50+).
  - Promo discount support (try code `VELOURA10` for 10% off).
  - Toast feedback notification whenever an item is added.

- **Integrated Checkout Flow**:
  - Seamless simulated checkout modal.
  - Form validation for customer shipping address and payment details.
  - Instant order confirmation view with unique order tracking ID (e.g. `#VEL-849201`).

- **Dynamic Product Detail Page (`product.html`)**:
  - Supports deep links and URL parameters (e.g. `product.html?id=calm-cream`, `product.html?id=dew-mist`, `product.html?id=silk-mask`).
  - Interactive vessel color swatches (Rose, Sage, Blush) that dynamically update bottle styling.
  - Live quantity adjustment calculating real-time pricing on the "Add to bag" button.
  - Expandable accordions for ingredients, application rituals, and refill services.
  - "Pairs beautifully with" recommendations personalized per product.

- **Shop Filter System (`shop.html`)**:
  - Dynamic category chips (`All`, `Face`, `Body`, `Hair`, `Gift sets`).
  - Direct 1-click "Add" buttons to bag without navigating away.
  - Clickable product cards linking directly into the product detail view.

- **The Ritual Experience (`ritual.html`)**:
  - Interactive 3-step morning and evening protocol.
  - Direct links to recommended step products (Cleanse, Treat, Seal).
  - 1-click "Add Ritual Set to Bag" bundle callout.

- **The Journal & Article Reader (`journal.html`)**:
  - Interactive cards opening dedicated article reader modals.
  - VIP newsletter signup with email validation and welcome discount code confirmation.

- **Unified Brand Footer**:
  - Cohesive site-wide footer with brand mission, collection navigation, brand philosophy, newsletter subscription, and refill program information.

---

## 🚀 How to Run the Website

You can launch the site using any of the following convenient methods:

### Method 1: Using Python (Recommended)
```bash
python3 server.py
```
*Automatically starts a local development server at `http://localhost:8000` and opens your default browser.*

### Method 2: Using Node.js
```bash
node server.js
# or
npm start
```
*Zero-dependency Node.js HTTP server that opens the site automatically.*

### Method 3: One-Click Shell Script
```bash
./run.sh
```
*Automatically detects Python 3 or Node.js and starts the server.*

### Method 4: Double-Click in macOS Finder
Double-click `start.command` directly from the macOS Finder to start the server and view the site.

### Method 5: Direct Browser Access
You can also open `index.html` directly in any modern browser:
```bash
open index.html
```

---

## 📁 File Structure
```
├── index.html        # Home page with hero, values, and loved bestsellers
├── shop.html         # Full collection grid with interactive category filtering
├── product.html      # Dynamic product detail page with swatches and accordions
├── ritual.html       # 3-step daily protocol and complete bundle offer
├── about.html        # Brand founding story, metrics, and commitments
├── journal.html      # Editorial essays with interactive reading modal
├── veloura.css       # Master stylesheet with luxury beauty brand aesthetics
├── veloura.js        # Core store engine (cart, drawer, checkout, filters, modal)
├── server.py         # Python 3 local server with browser auto-launch
├── server.js         # Zero-dependency Node.js static server
├── package.json      # NPM scripts configuration
├── run.sh            # Launch bash script
└── start.command     # Double-clickable macOS launcher
```
