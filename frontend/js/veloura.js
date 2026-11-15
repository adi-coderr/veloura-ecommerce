/**
 * Veloura Botanical Skincare - Core Application Logic
 * Clean, fast, zero-dependency JavaScript powering the complete store experience.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. PRODUCT CATALOG DATA
  // =========================================================================
  const PRODUCTS = {
    'bloom-serum': {
      id: 'bloom-serum',
      name: 'Bloom Serum',
      kicker: 'Face · Vitamin C',
      tagline: 'Vitamin C + squalane',
      price: 42,
      rating: '★★★★★',
      reviewsCount: 214,
      colorClass: '',
      colorHex: '#B5695C',
      category: 'face',
      vessel: 'bottle',
      variants: ['Classic Rose (30ml)', 'Frosted Sage (30ml)', 'Clay Blush (30ml)'],
      desc: "A lightweight vitamin C serum with squalane, built to brighten without stripping your skin's own moisture. Formulated in slow small batches to preserve botanical antioxidant potency.",
      ingredients: 'Water/Aqua, Squalane, Tetrahexyldecyl Ascorbate (Lipid-Soluble Vitamin C), Glycerin, Rosa Damascena Flower Water, Simmondsia Chinensis (Jojoba) Seed Oil, Sodium Hyaluronate, Tocopherol (Vitamin E), Centella Asiatica Extract.',
      usage: 'Warm 3–4 drops between clean palms and press gently into face, neck, and décolletage every morning before moisturizer and SPF. Safe for daily morning use on all skin types.',
      shipping: 'Complimentary shipping on orders over $50. All orders ship in 100% recyclable, plastic-free packaging with free returns within 30 days.'
    },
    'calm-cream': {
      id: 'calm-cream',
      name: 'Calm Cream',
      kicker: 'Face · Centella',
      tagline: 'Centella + oat milk',
      price: 38,
      rating: '★★★★★',
      reviewsCount: 189,
      colorClass: 'sage',
      colorHex: '#9DAC87',
      category: 'face',
      vessel: 'cream-jar',
      variants: ['Frosted Sage (50ml)', 'Classic Rose (50ml)', 'Clay Blush (50ml)'],
      desc: 'A rich yet breathable soothing emulsion powered by madecassoside and soothing oat milk to calm inflammation, replenish lipids, and support natural skin barrier repair.',
      ingredients: 'Avena Sativa (Oat) Kernel Milk, Centella Asiatica Leaf Extract, Squalane, Butyrospermum Parkii (Shea) Butter, Ceramide NP, Panthenol (Vitamin B5), Allantoin, Chamomile Recutita Flower Extract.',
      usage: 'Smooth a hazelnut-sized dollop over face and neck as the last step in your evening ritual, or morning and night during dry seasonal transitions.',
      shipping: 'Complimentary shipping on orders over $50. Refill pods available at a 20% discount.'
    },
    'dew-mist': {
      id: 'dew-mist',
      name: 'Dew Mist',
      kicker: 'Face · Rosewater',
      tagline: 'Rosewater + aloe',
      price: 26,
      rating: '★★★★★',
      reviewsCount: 142,
      colorClass: 'blush',
      colorHex: '#D79A8C',
      category: 'face',
      vessel: 'mist-bottle',
      variants: ['Clay Blush (100ml)', 'Classic Rose (100ml)', 'Frosted Sage (100ml)'],
      desc: 'Micro-fine revitalizing hydrator infused with steam-distilled Bulgarian rose petals and fresh aloe leaf to awaken tired complexions and lock in moisture.',
      ingredients: 'Organic Rosa Damascena Floral Water, Aloe Barbadensis Leaf Juice, Hamamelis Virginiana (Witch Hazel) Distillate, Glycerin, Sodium PCA, Chamomile Extract.',
      usage: 'Hold 8–10 inches from face with eyes closed and mist liberally. Use post-cleanse to prep skin, over makeup for a dewy finish, or throughout the day for hydration.',
      shipping: 'Complimentary shipping on orders over $50. Easy 30-day returns.'
    },
    'luna-night-oil': {
      id: 'luna-night-oil',
      name: 'Luna Night Oil',
      kicker: 'Face · Blue Tansy',
      tagline: 'Blue Tansy + 1% Bakuchiol',
      price: 48,
      rating: '★★★★★',
      reviewsCount: 178,
      colorClass: 'sage',
      colorHex: '#9DAC87',
      category: 'face',
      vessel: 'oil-flacon',
      variants: ['Deep Indigo (30ml)', 'Classic Amber (30ml)'],
      desc: 'An intensive nocturnal restorative treatment formulated with Moroccan blue tansy and 1% clinical plant bakuchiol to stimulate cellular renewal and soothe reactive skin overnight.',
      ingredients: 'Squalane, Simmondsia Chinensis (Jojoba) Seed Oil, Tanacetum Annuum (Blue Tansy) Flower Oil, Bakuchiol, Helianthus Annuus Seed Oil, Tocopherol, Tetrahexyldecyl Ascorbate.',
      usage: 'Warm 3–4 drops between hands at night and press into slightly damp skin following moisturizer or serum. Non-photosensitizing and pregnancy-safe.',
      shipping: 'Complimentary shipping on orders over $50. Heavy flint glass bottle with precision pipette.'
    },
    'clarity-cleanser': {
      id: 'clarity-cleanser',
      name: 'Clarity Cleansing Oil',
      kicker: 'Face · Camellia',
      tagline: 'Camellia + Rice Bran Oil',
      price: 32,
      rating: '★★★★★',
      reviewsCount: 134,
      colorClass: 'blush',
      colorHex: '#D79A8C',
      category: 'face',
      vessel: 'bottle',
      variants: ['Clay Blush (150ml)', 'Classic Rose (150ml)'],
      desc: 'A silky Japanese camellia seed cleansing oil that effortlessly dissolves waterproof sunscreen, airborne pollution, and makeup without disrupting the acid barrier.',
      ingredients: 'Camellia Japonica Seed Oil, Oryza Sativa (Rice) Bran Oil, Polyglyceryl-4 Oleate, Squalane, Tocopherol, Citrus Aurantium Amara (Neroli) Flower Extract.',
      usage: 'Massage 2 to 3 pumps onto dry skin in circular motions. Add warm water to emulsify into a milky veil, then rinse cleanly. Perfect step one of a double cleanse.',
      shipping: 'Complimentary shipping on orders over $50. 100% recyclable aluminum refill pods available.'
    },
    'clay-purify-mask': {
      id: 'clay-purify-mask',
      name: 'Earth Glow Kaolin Mask',
      kicker: 'Face · Rose Clay',
      tagline: 'Rose Kaolin + Willow Bark',
      price: 36,
      rating: '★★★★☆',
      reviewsCount: 95,
      colorClass: 'blush',
      colorHex: '#D79A8C',
      category: 'face',
      vessel: 'cream-jar',
      variants: ['Clay Blush (75ml)', 'Classic Frosted (75ml)'],
      desc: 'A non-drying French pink clay treatment enriched with natural willow bark BHA and colloidal oats to gently draw out pore congestion and restore satin-smooth radiance in 10 minutes.',
      ingredients: 'Kaolin (Pink Clay), Water/Aqua, Glycerin, Avena Sativa (Oat) Kernel Flour, Salix Alba (Willow) Bark Extract, Cetearyl Alcohol, Rosa Canina (Rosehip) Seed Oil, Allantoin.',
      usage: 'Smooth an even layer over cleansed skin avoiding direct eye area. Allow to set for 8–10 minutes, then rinse gently with warm water and a washcloth. Use 1–2 times weekly.',
      shipping: 'Complimentary shipping on orders over $50. Comes with natural birch applicator spatula.'
    },
    'velvet-oil': {
      id: 'velvet-oil',
      name: 'Velvet Oil',
      kicker: 'Body · Jojoba',
      tagline: 'Body · Jojoba',
      price: 34,
      rating: '★★★★★',
      reviewsCount: 98,
      colorClass: 'ink',
      colorHex: '#2A211D',
      category: 'body',
      vessel: 'oil-flacon',
      variants: ['Obsidian Glass (100ml)', 'Classic Rose (100ml)'],
      desc: 'Silky dry body elixir formulated with cold-pressed golden jojoba and sweet almond oils that melts in without any sticky or greasy residue.',
      ingredients: 'Simmondsia Chinensis (Jojoba) Seed Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Helianthus Annuus (Sunflower) Seed Oil, Citrus Aurantium Bergamia Fruit Oil, Tocopherol.',
      usage: 'Massage over slightly damp skin right out of the bath or shower, focusing on elbows, collarbones, and legs.',
      shipping: 'Complimentary shipping on orders over $50. Glass bottle is infinitely refillable.'
    },
    'soft-wash': {
      id: 'soft-wash',
      name: 'Soft Wash',
      kicker: 'Body · Oat milk',
      tagline: 'Body · Oat milk',
      price: 24,
      rating: '★★★★☆',
      reviewsCount: 165,
      colorClass: '',
      colorHex: '#B5695C',
      category: 'body',
      vessel: 'bottle',
      variants: ['Classic Rose (200ml)', 'Frosted Sage (200ml)'],
      desc: 'A sulfate-free, pH-balanced gentle cleanser that transforms into a comforting creamy foam, leaving sensitive skin clean, supple, and nourished.',
      ingredients: 'Water/Aqua, Cocamidopropyl Hydroxysultaine, Colloidal Oatmeal, Sodium Lauroyl Methyl Isethionate, Glycerin, Hydrolyzed Rice Protein, Anthemis Nobilis (Chamomile) Oil.',
      usage: 'Dispense into wet hands or a natural sponge, lather across body or face in circular motions, and rinse cleanly with lukewarm water.',
      shipping: 'Complimentary shipping on orders over $50. Free returns within 30 days.'
    },
    'nourish-body-butter': {
      id: 'nourish-body-butter',
      name: 'Cloud Silk Body Butter',
      kicker: 'Body · Cupuaçu',
      tagline: 'Whipped Cupuaçu + Shea',
      price: 36,
      rating: '★★★★★',
      reviewsCount: 208,
      colorClass: '',
      colorHex: '#B5695C',
      category: 'body',
      vessel: 'cream-jar',
      variants: ['Classic Rose (150ml)', 'Frosted Sage (150ml)'],
      desc: 'An airy whipped barrier balm crafted with Amazonian cupuaçu butter, shea, and squalane. Melt-in hydration for dry elbows, knees, and parched winter skin.',
      ingredients: 'Theobroma Grandiflorum (Cupuaçu) Seed Butter, Butyrospermum Parkii (Shea) Butter, Squalane, Water/Aqua, Cetearyl Olivate, Sorbitan Olivate, Vanilla Planifolia Fruit Extract.',
      usage: 'Massage generously into clean skin post-shower or whenever deep hydration is needed. Melts to an oil-in-cream finish within seconds.',
      shipping: 'Complimentary shipping on orders over $50. Heavy reusable glass jar with aluminum lid.'
    },
    'botanical-scrub': {
      id: 'botanical-scrub',
      name: 'Bamboo Polishing Scrub',
      kicker: 'Body · Bamboo Stem',
      tagline: 'Bamboo Stem + Sweet Orange',
      price: 28,
      rating: '★★★★★',
      reviewsCount: 88,
      colorClass: 'sage',
      colorHex: '#9DAC87',
      category: 'body',
      vessel: 'cream-jar',
      variants: ['Frosted Sage (180ml)', 'Classic Rose (180ml)'],
      desc: 'Micro-fine pulverized bamboo silica suspended in a nourishing squalane and sweet orange oil base to buff away rough dry patches and reveal silky smooth skin.',
      ingredients: 'Bambusa Arundinacea (Bamboo) Stem Extract, Caprylic/Capric Triglyceride, Simmondsia Chinensis (Jojoba) Seed Oil, Citrus Aurantium Dulcis (Orange) Peel Oil, Tocopherol.',
      usage: 'Apply to damp skin in circular upward motions in the shower. Rinse with warm water. Gentle enough for use two to three times per week.',
      shipping: 'Complimentary shipping on orders over $50. Plastic-free glass packaging.'
    },
    'silk-mask': {
      id: 'silk-mask',
      name: 'Silk Mask',
      kicker: 'Hair · Argan',
      tagline: 'Hair · Argan',
      price: 30,
      rating: '★★★★★',
      reviewsCount: 112,
      colorClass: 'sage',
      colorHex: '#9DAC87',
      category: 'hair',
      vessel: 'cream-jar',
      variants: ['Frosted Sage (150ml)', 'Classic Rose (150ml)'],
      desc: 'Deep conditioning restorative hair treatment enriched with pure Moroccan argan oil and botanical keratin to revive strands from roots to tips.',
      ingredients: 'Cetearyl Alcohol, Argania Spinosa (Argan) Kernel Oil, Hydrolyzed Pea Protein, Behentrimonium Methosulfate, Camellia Sinensis Leaf Extract, Rosmarinus Officinalis Extract.',
      usage: 'Apply generously from mid-lengths to ends after shampooing. Leave on for 5 to 10 minutes, then rinse thoroughly with cool water.',
      shipping: 'Complimentary shipping on orders over $50. Free returns within 30 days.'
    },
    'scalp-elixir': {
      id: 'scalp-elixir',
      name: 'Botanical Scalp Tonic',
      kicker: 'Hair · Rosemary',
      tagline: 'Distilled Rosemary + Biotin',
      price: 34,
      rating: '★★★★★',
      reviewsCount: 156,
      colorClass: 'sage',
      colorHex: '#9DAC87',
      category: 'hair',
      vessel: 'bottle',
      variants: ['Frosted Sage (60ml)', 'Classic Rose (60ml)'],
      desc: 'A weightless water-based scalp treatment formulated with steam-distilled rosemary hydrolat, caffeine, and peptide actives to nourish follicles and support root density.',
      ingredients: 'Rosmarinus Officinalis (Rosemary) Leaf Water, Water/Aqua, Glycerin, Caffeine, Biotinoyl Tripeptide-1, Panthenol, Niacinamide, Mentha Piperita (Peppermint) Oil.',
      usage: 'Section towel-dried or dry hair and dispense 1 full dropper directly along the scalp. Gently massage with fingertips. Do not rinse out.',
      shipping: 'Complimentary shipping on orders over $50. UV-protective Italian glass bottle.'
    },
    'hair-nectar': {
      id: 'hair-nectar',
      name: 'Golden Gloss Nectar',
      kicker: 'Hair · Marula',
      tagline: 'Cold-Pressed Marula + Camellia',
      price: 32,
      rating: '★★★★☆',
      reviewsCount: 119,
      colorClass: 'ink',
      colorHex: '#2A211D',
      category: 'hair',
      vessel: 'oil-flacon',
      variants: ['Obsidian Glass (50ml)', 'Classic Rose (50ml)'],
      desc: 'A multi-use featherweight glossing elixir that seals split ends, shields against thermal heat styling up to 450°F, and imparts a luminous mirror sheen.',
      ingredients: 'Sclerocarya Birrea (Marula) Seed Oil, Camellia Japonica Seed Oil, Isoamyl Laurate, Argania Spinosa Kernel Oil, Pelargonium Graveolens Flower Oil, Tocopherol.',
      usage: 'Warm 1 to 2 drops between palms and sweep through damp lengths before blow-drying, or smooth over dry ends to tame flyaways and enhance shine.',
      shipping: 'Complimentary shipping on orders over $50. Includes glass dropper collar.'
    },
    'ritual-duo': {
      id: 'ritual-duo',
      name: 'Daily Glow Duo',
      kicker: 'Gift sets · Serum + Cream',
      tagline: 'Gift sets · Serum + Cream',
      price: 72,
      rating: '★★★★★',
      reviewsCount: 86,
      colorClass: 'blush',
      colorHex: '#D79A8C',
      category: 'gift sets',
      vessel: 'gift-box',
      variants: ['Classic Gift Box', 'Linen Keepsake Pouch'],
      desc: 'Our bestselling morning-to-night pairing: full-size Bloom Serum (30ml) and Calm Cream (50ml) packaged in a reusable keepsake box at an exclusive bundle savings.',
      ingredients: 'Bloom Serum (30ml) and Calm Cream (50ml). See individual product listings for comprehensive botanical ingredients.',
      usage: 'Step 1: Apply 3–4 drops of Bloom Serum in the morning. Step 2: Apply a dollop of Calm Cream in the evening.',
      shipping: 'Ships free! Packaged in gift-ready FSC-certified sustainable box.'
    },
    'bath-ceremony-set': {
      id: 'bath-ceremony-set',
      name: 'Evening Bath Ceremony Set',
      kicker: 'Gift sets · Body Trio',
      tagline: 'Gift sets · Wash + Butter + Oil',
      price: 88,
      rating: '★★★★★',
      reviewsCount: 72,
      colorClass: 'blush',
      colorHex: '#D79A8C',
      category: 'gift sets',
      vessel: 'gift-box',
      variants: ['Linen Keepsake Box', 'Natural Wood Caddy'],
      desc: 'An indulgent bath ceremony: Soft Wash Cleanser (200ml), Cloud Silk Body Butter (150ml), and Velvet Body Oil (100ml) paired with an organic loofah wash pad.',
      ingredients: 'Soft Wash (200ml), Cloud Silk Body Butter (150ml), Velvet Body Oil (100ml), Natural Loofah Slice.',
      usage: 'Step 01: Cleanse with Soft Wash. Step 02: Massage Velvet Oil into warm damp skin. Step 03: Seal elbows and dry areas with Cloud Silk Butter.',
      shipping: 'Ships free! Packaged in artisanal embossed gift box.'
    },
    'full-ritual-set': {
      id: 'full-ritual-set',
      name: 'The Slow Ritual Complete Box',
      kicker: 'Gift sets · 4 Full Sizes',
      tagline: 'Gift sets · 4 Full Sizes',
      price: 118,
      rating: '★★★★★',
      reviewsCount: 64,
      colorClass: 'ink',
      colorHex: '#2A211D',
      category: 'gift sets',
      vessel: 'gift-box',
      variants: ['Deluxe Keepsake Box', 'Organic Linen Case'],
      desc: 'The comprehensive botanical ritual: Soft Wash (200ml), Bloom Serum (30ml), Calm Cream (50ml), and Dew Mist (100ml) complete with refill funnel and organic cotton travel pouch.',
      ingredients: 'Soft Wash (200ml), Bloom Serum (30ml), Calm Cream (50ml), Dew Mist (100ml).',
      usage: 'Step 01: Cleanse with Soft Wash. Step 02: Treat with Bloom Serum & Calm Cream. Step 03: Seal hydration with Dew Mist.',
      shipping: 'Ships free! Includes complimentary samples of upcoming seasonal formulas.'
    }
  };

  // =========================================================================
  // 2. JOURNAL ARTICLES DATA
  // =========================================================================
  const ARTICLES = {
    'refill': {
      title: 'Why we refill, not recycle',
      readTime: '4 min read',
      date: 'October 12, 2026',
      author: 'Elena Vance, Founder',
      colorClass: '',
      summary: 'Less than 9% of all cosmetic plastics ever get recycled. Here is why we built Veloura around infinite aluminum and heavy-weight refillable glass.',
      content: `
        <p>When we started Veloura in a rented kitchen back in 2019, our first discovery was heartbreaking: almost 91% of cosmetic packaging ends up in municipal landfills or oceans, despite having a little chasing-arrows recycling symbol stamped on the base.</p>
        <p>Most cosmetic packaging mixes pumps with internal metal springs, multi-layer tinted plastics, and non-recyclable caps that municipal recycling sorting facilities simply discard.</p>
        <p>We chose a different path: slow, deliberate, and truly circular. Every Veloura formula is poured into heavy Italian glass vessels designed to last a lifetime. When you run out, you don't throw away the pump or the bottle—you order an ultra-lightweight refill pod that snaps in effortlessly.</p>
        <p>Our refill pods use 86% less material than a new jar and reduce carbon emissions during shipping by more than half. It is a slower way to make beauty products, but our skin and planet breathe a lot easier for it.</p>
      `
    },
    'ingredients': {
      title: 'Reading an ingredient label without a chemistry degree',
      readTime: '6 min read',
      date: 'November 03, 2026',
      author: 'Dr. Maya Lin, Formulator',
      colorClass: 'sage',
      summary: 'The INCI system looks intimidating at first glance. Here is our straightforward guide to decoding what is truly active in your skincare.',
      content: `
        <p>Skincare packaging is notorious for buzzwords: "clinical strength", "miracle elixir", "clean cellular extract". But the only place where the truth lives is the INCI (International Nomenclature of Cosmetic Ingredients) list on the back of the bottle.</p>
        <p>By international law, ingredients must be listed in order of concentration up to the 1% threshold. The first five ingredients make up roughly 80% to 90% of the entire formulation.</p>
        <p>Look for nourishing bases like floral waters or squalane rather than cheap petroleum fillers. Active ingredients like niacinamide or sodium hyaluronate are effective even at 1–5%, so don't be alarmed if they appear midway through the list. What matters is bioavailability and gentle delivery.</p>
        <p>At Veloura, we print our ingredients on the box in plain English alongside the INCI name, because transparency shouldn't require a master's degree.</p>
      `
    },
    'morning': {
      title: 'A simpler morning routine that actually works',
      readTime: '3 min read',
      date: 'November 10, 2026',
      author: 'Elena Vance, Founder',
      colorClass: 'blush',
      summary: 'You do not need a ten-step routine before 8 AM. How stripping back your morning ritual restores your skin barrier and saves twenty minutes.',
      content: `
        <p>The ten-step skincare craze taught us that more products equal better skin. In reality, stacking half a dozen active acids, retinoids, and peptides every morning often overwhelms the lipid barrier, leading to irritation, redness, and dehydration.</p>
        <p>Your morning routine has two jobs: hydrate and protect. Your skin did the heavy repair work while you slept, so there is no need to aggressively strip it at dawn.</p>
        <p>Try our three-minute morning protocol: a splash of lukewarm water or gentle Soft Wash, three drops of antioxidant-rich Bloom Serum pressed into damp skin, followed by your favorite mineral SPF. That is it. Your barrier stays intact, your glow is natural, and you have time to actually drink your morning tea.</p>
      `
    }
  };

  // =========================================================================
  // 3. PERSISTENT CART STORE (localStorage)
  // =========================================================================
  const CART_KEY = 'veloura_cart';
  const FREE_SHIPPING_THRESHOLD = 50;

  const Cart = {
    getItems: function () {
      try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    },

    saveItems: function (items) {
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
      } catch (e) {}
      this.notify();
    },

    addItem: function (productId, quantity, variant) {
      quantity = parseInt(quantity, 10) || 1;
      const product = PRODUCTS[productId] || PRODUCTS['bloom-serum'];
      const items = this.getItems();
      const variantName = variant || (product.variants && product.variants[0]) || 'Standard';

      const existingIndex = items.findIndex(
        item => item.id === product.id && item.variant === variantName
      );

      if (existingIndex > -1) {
        items[existingIndex].qty += quantity;
      } else {
        items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          qty: quantity,
          colorClass: product.colorClass || '',
          variant: variantName,
          kicker: product.kicker || 'Botanical Formula'
        });
      }

      this.saveItems(items);
      Toast.show(`Added ${quantity}× ${product.name} to your bag`, 'View Bag', () => {
        Drawer.open();
      });
      return items;
    },

    updateQty: function (productId, variant, newQty) {
      newQty = parseInt(newQty, 10);
      let items = this.getItems();
      if (newQty <= 0) {
        items = items.filter(
          item => !(item.id === productId && (!variant || item.variant === variant))
        );
      } else {
        items = items.map(item => {
          if (item.id === productId && (!variant || item.variant === variant)) {
            return Object.assign({}, item, { qty: newQty });
          }
          return item;
        });
      }
      this.saveItems(items);
    },

    removeItem: function (productId, variant) {
      let items = this.getItems();
      items = items.filter(
        item => !(item.id === productId && (!variant || item.variant === variant))
      );
      this.saveItems(items);
    },

    clear: function () {
      this.saveItems([]);
    },

    getCount: function () {
      return this.getItems().reduce((acc, item) => acc + item.qty, 0);
    },

    getSubtotal: function () {
      return this.getItems().reduce((acc, item) => acc + item.price * item.qty, 0);
    },

    notify: function () {
      updateCartBadges();
      Drawer.render();
    }
  };

  function updateCartBadges() {
    const count = Cart.getCount();
    const badges = document.querySelectorAll('.bag-count');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // =========================================================================
  // 4. TOAST NOTIFICATION SYSTEM
  // =========================================================================
  const Toast = {
    container: null,

    init: function () {
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
      }
    },

    show: function (message, actionText, actionCallback) {
      this.init();
      const toast = document.createElement('div');
      toast.className = 'toast-message';

      const textSpan = document.createElement('span');
      textSpan.textContent = message;
      toast.appendChild(textSpan);

      if (actionText && actionCallback) {
        const actionBtn = document.createElement('button');
        actionBtn.className = 'toast-action-btn';
        actionBtn.textContent = actionText;
        actionBtn.addEventListener('click', () => {
          actionCallback();
          toast.remove();
        });
        toast.appendChild(actionBtn);
      }

      this.container.appendChild(toast);

      requestAnimationFrame(() => {
        toast.classList.add('visible');
      });

      setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 350);
      }, 3800);
    }
  };

  // =========================================================================
  // 5. CART DRAWER COMPONENT
  // =========================================================================
  let promoApplied = null;
  let promoAppliedCode = null;

  const Drawer = {
    init: function () {
      if (document.getElementById('veloura-cart-drawer')) return;

      const html = `
        <div id="veloura-cart-drawer" class="cart-drawer-root" aria-hidden="true">
          <div class="cart-backdrop"></div>
          <div class="cart-panel" role="dialog" aria-label="Shopping Bag">
            <div class="cart-head">
              <div class="cart-head-title">
                <h3>Your Bag</h3>
                <span class="cart-item-count-label">0 items</span>
              </div>
              <button class="cart-close-btn" aria-label="Close bag">&times;</button>
            </div>

            <div class="cart-shipping-bar">
              <div class="shipping-msg">Add $50.00 more for free shipping</div>
              <div class="shipping-track"><div class="shipping-fill" style="width:0%"></div></div>
            </div>

            <div class="cart-body"></div>

            <div class="cart-footer">
              <div class="promo-box">
                <input type="text" class="promo-input" placeholder="Promo code (e.g. VELOURA10)">
                <button class="promo-apply-btn">Apply</button>
              </div>
              <div class="promo-feedback"></div>
              
              <div class="cart-summary-row">
                <span>Subtotal</span>
                <span class="cart-subtotal-val">$0.00</span>
              </div>
              <div class="cart-summary-row cart-discount-row" style="display:none;color:var(--rose)">
                <span>Discount (10%)</span>
                <span class="cart-discount-val">-$0.00</span>
              </div>
              <div class="cart-summary-row">
                <span>Estimated Shipping</span>
                <span class="cart-shipping-val">Calculated next</span>
              </div>
              <div class="cart-summary-row total-row">
                <span>Total</span>
                <span class="cart-total-val">$0.00</span>
              </div>

              <button class="btn checkout-btn" style="width:100%;margin-top:1rem;text-align:center;">
                Proceed to Checkout
              </button>
              <p class="cart-guarantee">✦ Refillable glass guarantee · 30-day effortless returns</p>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', html);

      const root = document.getElementById('veloura-cart-drawer');
      const backdrop = root.querySelector('.cart-backdrop');
      const closeBtn = root.querySelector('.cart-close-btn');
      const checkoutBtn = root.querySelector('.checkout-btn');
      const promoBtn = root.querySelector('.promo-apply-btn');
      const promoInput = root.querySelector('.promo-input');

      backdrop.addEventListener('click', () => this.close());
      closeBtn.addEventListener('click', () => this.close());

      checkoutBtn.addEventListener('click', () => {
        const count = Cart.getCount();
        if (count === 0) {
          Toast.show('Your bag is currently empty.');
          return;
        }
        this.close();
        CheckoutModal.open();
      });

      promoBtn.addEventListener('click', async () => {
        const code = promoInput.value.trim().toUpperCase();
        const feedback = root.querySelector('.promo-feedback');
        if (!code) {
          promoApplied = null;
          promoAppliedCode = null;
          feedback.textContent = '';
          this.render();
          return;
        }

        try {
          const res = await fetch('/api/promo/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, subtotal: Cart.getSubtotal() })
          });
          const json = await res.json();
          if (json.success && json.data) {
            promoApplied = json.data.discountAmount / (Cart.getSubtotal() || 1);
            promoAppliedCode = json.data.code;
            feedback.textContent = `✓ ${json.data.description}`;
            feedback.className = 'promo-feedback success';
            this.render();
            return;
          } else {
            feedback.textContent = json.error || 'Invalid code.';
            feedback.className = 'promo-feedback error';
            return;
          }
        } catch (err) {
          // Fallback to local codes
          if (code === 'VELOURA10' || code === 'WELCOME10') {
            promoApplied = 0.10;
            promoAppliedCode = code;
            feedback.textContent = '✓ 10% discount applied to your order!';
            feedback.className = 'promo-feedback success';
            this.render();
          } else {
            feedback.textContent = 'Invalid code. Try "VELOURA10" for 10% off.';
            feedback.className = 'promo-feedback error';
          }
        }
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && root.classList.contains('active')) {
          this.close();
        }
      });

      this.render();
    },

    open: function () {
      this.init();
      const root = document.getElementById('veloura-cart-drawer');
      this.render();
      root.classList.add('active');
      root.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    },

    close: function () {
      const root = document.getElementById('veloura-cart-drawer');
      if (!root) return;
      root.classList.remove('active');
      root.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    },

    render: function () {
      const root = document.getElementById('veloura-cart-drawer');
      if (!root) return;

      const items = Cart.getItems();
      const body = root.querySelector('.cart-body');
      const footer = root.querySelector('.cart-footer');
      const countLabel = root.querySelector('.cart-item-count-label');
      const subtotalVal = root.querySelector('.cart-subtotal-val');
      const totalVal = root.querySelector('.cart-total-val');
      const discountRow = root.querySelector('.cart-discount-row');
      const discountVal = root.querySelector('.cart-discount-val');
      const shippingMsg = root.querySelector('.shipping-msg');
      const shippingFill = root.querySelector('.shipping-fill');
      const shippingVal = root.querySelector('.cart-shipping-val');

      const count = Cart.getCount();
      const subtotal = Cart.getSubtotal();

      countLabel.textContent = `${count} item${count === 1 ? '' : 's'}`;

      if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        shippingMsg.innerHTML = '✦ You have unlocked <strong>Free Standard Shipping</strong>!';
        shippingFill.style.width = '100%';
        shippingVal.textContent = 'Free';
      } else {
        const remaining = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);
        const percent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
        shippingMsg.innerHTML = `Add <strong>$${remaining}</strong> more for free shipping`;
        shippingFill.style.width = `${percent}%`;
        shippingVal.textContent = subtotal > 0 ? '$4.95' : '$0.00';
      }

      if (items.length === 0) {
        body.innerHTML = `
          <div class="empty-cart-state">
            <svg class="bottle" style="width:54px;opacity:0.35;margin:0 auto 1.2rem"><use href="#bottle"/></svg>
            <h4>Your bag is empty</h4>
            <p>Every bottle is slow made and freshly poured. Explore our botanical collection to begin.</p>
            <a href="shop.html" class="btn" style="margin-top:1.2rem;display:inline-block">Shop All Formulas</a>
          </div>
        `;
        footer.style.display = 'none';
      } else {
        footer.style.display = 'block';

        let discountAmount = 0;
        if (promoApplied) {
          discountAmount = subtotal * promoApplied;
          discountRow.style.display = 'flex';
          discountVal.textContent = `-$${discountAmount.toFixed(2)}`;
        } else {
          discountRow.style.display = 'none';
        }

        const finalTotal = subtotal - discountAmount + (subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 4.95);

        subtotalVal.textContent = `$${subtotal.toFixed(2)}`;
        totalVal.textContent = `$${finalTotal.toFixed(2)}`;

        let itemsHtml = '<div class="cart-items-list">';
        items.forEach(item => {
          itemsHtml += `
            <div class="cart-line-item" data-id="${item.id}" data-variant="${item.variant}">
              <div class="cart-thumb">
                <svg class="bottle ${item.colorClass}"><use href="#bottle"/></svg>
              </div>
              <div class="cart-line-info">
                <div class="cart-line-head">
                  <span class="cart-item-title">${item.name}</span>
                  <button class="cart-remove-btn" title="Remove item" aria-label="Remove ${item.name}">&times;</button>
                </div>
                <div class="cart-item-variant">${item.variant}</div>
                <div class="cart-line-bottom">
                  <div class="cart-qty-ctrl">
                    <button class="qty-btn dec" aria-label="Decrease quantity">−</button>
                    <span class="qty-num">${item.qty}</span>
                    <button class="qty-btn inc" aria-label="Increase quantity">+</button>
                  </div>
                  <span class="cart-line-price">$${(item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
            </div>
          `;
        });
        itemsHtml += '</div>';
        body.innerHTML = itemsHtml;

        body.querySelectorAll('.cart-line-item').forEach(el => {
          const id = el.dataset.id;
          const variant = el.dataset.variant;

          el.querySelector('.cart-remove-btn').addEventListener('click', () => {
            Cart.removeItem(id, variant);
          });

          el.querySelector('.qty-btn.dec').addEventListener('click', () => {
            const currentItem = Cart.getItems().find(i => i.id === id && i.variant === variant);
            if (currentItem) {
              Cart.updateQty(id, variant, currentItem.qty - 1);
            }
          });

          el.querySelector('.qty-btn.inc').addEventListener('click', () => {
            const currentItem = Cart.getItems().find(i => i.id === id && i.variant === variant);
            if (currentItem) {
              Cart.updateQty(id, variant, currentItem.qty + 1);
            }
          });
        });
      }
    }
  };

  // =========================================================================
  // 6. CHECKOUT MODAL SYSTEM
  // =========================================================================
  const CheckoutModal = {
    init: function () {
      if (document.getElementById('veloura-checkout-modal')) return;

      const html = `
        <div id="veloura-checkout-modal" class="modal-root" aria-hidden="true">
          <div class="modal-backdrop"></div>
          <div class="modal-container" role="dialog" aria-modal="true">
            <button class="modal-close-btn" aria-label="Close checkout">&times;</button>
            <div class="checkout-view-form">
              <div class="checkout-header">
                <span class="kicker">Secure Checkout</span>
                <h2>Complete Your Order</h2>
                <p>Refillable slow skincare poured fresh for you.</p>
              </div>

              <form class="checkout-form" onsubmit="return false;">
                <div class="form-section-title">1. Shipping Information</div>
                <div class="form-row">
                  <input type="text" id="chk-fname" placeholder="First name" required>
                  <input type="text" id="chk-lname" placeholder="Last name" required>
                </div>
                <div class="form-row">
                  <input type="email" id="chk-email" placeholder="Email address (for order updates)" required>
                </div>
                <div class="form-row">
                  <input type="text" id="chk-address" placeholder="Shipping address" required>
                </div>
                <div class="form-row three-col">
                  <input type="text" id="chk-city" placeholder="City" required>
                  <input type="text" id="chk-state" placeholder="State/Region" required>
                  <input type="text" id="chk-zip" placeholder="Postal Code" required>
                </div>

                <div class="form-section-title" style="margin-top:1.5rem">2. Payment Method</div>
                <div class="mock-card-box">
                  <div class="mock-card-row">
                    <span class="card-chip">💳 Card</span>
                    <span style="font-size:.85rem;color:var(--mute)">256-bit encrypted demo mode</span>
                  </div>
                  <input type="text" placeholder="Card number (4242 •••• •••• 4242)" value="4242 •••• •••• 4242" readonly style="margin-top:.6rem">
                  <div class="form-row" style="margin-top:.6rem">
                    <input type="text" placeholder="MM / YY" value="12/28" readonly>
                    <input type="text" placeholder="CVC" value="888" readonly>
                  </div>
                </div>

                <div class="checkout-order-summary-box">
                  <div class="summary-line"><span>Order Total:</span><strong class="chk-final-total">$0.00</strong></div>
                  <div class="summary-note">Includes carbon-neutral shipping and zero-waste gift box.</div>
                </div>

                <button type="submit" class="btn place-order-btn" style="width:100%;margin-top:1.2rem;padding:1rem">
                  Place Order Now
                </button>
              </form>
            </div>

            <div class="checkout-view-success" style="display:none;text-align:center;padding:2rem 1rem">
              <div class="success-icon">✓</div>
              <p class="kicker">Thank You For Choosing Slow Beauty</p>
              <h2>Order Confirmed!</h2>
              <p class="order-id-display">Order #VEL-${Math.floor(100000 + Math.random() * 900000)}</p>
              <p style="color:var(--mute);max-width:28em;margin:1rem auto 2rem">
                We have received your order and will carefully bottle, seal, and pack your fresh formulas in refillable glass within 24 hours.
              </p>
              <a href="index.html" class="btn">Return to Home</a>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', html);

      const root = document.getElementById('veloura-checkout-modal');
      const backdrop = root.querySelector('.modal-backdrop');
      const closeBtn = root.querySelector('.modal-close-btn');
      const form = root.querySelector('.checkout-form');

      backdrop.addEventListener('click', () => this.close());
      closeBtn.addEventListener('click', () => this.close());

      form.addEventListener('submit', async e => {
        e.preventDefault();
        const fname = document.getElementById('chk-fname').value.trim();
        const lname = document.getElementById('chk-lname').value.trim();
        const email = document.getElementById('chk-email').value.trim();
        const address = document.getElementById('chk-address').value.trim();
        const city = document.getElementById('chk-city').value.trim();
        const state = document.getElementById('chk-state').value.trim();
        const zip = document.getElementById('chk-zip').value.trim();

        if (!fname || !email || !address) {
          Toast.show('Please fill in required shipping fields');
          return;
        }

        const items = Cart.getItems();
        let orderId = `VEL-${Math.floor(100000 + Math.random() * 900000)}`;

        // Attempt backend order placement
        try {
          const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items,
              customer: { firstName: fname, lastName: lname, email, address, city, state, zip },
              promoCode: promoAppliedCode || null
            })
          });
          const json = await res.json();
          if (json.success && json.data && json.data.orderId) {
            orderId = json.data.orderId;
          }
        } catch (err) {
          console.warn('Backend unavailable, processed locally:', err);
        }

        const formView = root.querySelector('.checkout-view-form');
        const successView = root.querySelector('.checkout-view-success');
        const orderIdDisplay = root.querySelector('.order-id-display');
        if (orderIdDisplay) orderIdDisplay.textContent = `Order #${orderId}`;

        formView.style.display = 'none';
        successView.style.display = 'block';

        Cart.clear();
      });
    },

    open: function () {
      this.init();
      const root = document.getElementById('veloura-checkout-modal');
      const subtotal = Cart.getSubtotal();
      const count = Cart.getCount();

      if (count === 0) {
        Toast.show('Your bag is empty.');
        return;
      }

      let discount = promoApplied ? subtotal * promoApplied : 0;
      let shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.95;
      let total = subtotal - discount + shipping;

      root.querySelector('.chk-final-total').textContent = `$${total.toFixed(2)}`;
      root.querySelector('.checkout-view-form').style.display = 'block';
      root.querySelector('.checkout-view-success').style.display = 'none';

      root.classList.add('active');
      root.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    },

    close: function () {
      const root = document.getElementById('veloura-checkout-modal');
      if (!root) return;
      root.classList.remove('active');
      root.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // =========================================================================
  // 7. ARTICLE READER MODAL (For Journal)
  // =========================================================================
  const ArticleModal = {
    init: function () {
      if (document.getElementById('veloura-article-modal')) return;

      const html = `
        <div id="veloura-article-modal" class="modal-root" aria-hidden="true">
          <div class="modal-backdrop"></div>
          <div class="modal-container article-dialog" role="dialog" aria-modal="true">
            <button class="modal-close-btn" aria-label="Close article">&times;</button>
            <div class="article-modal-content">
              <span class="kicker article-meta-kicker">Slow Skincare</span>
              <h2 class="article-modal-title">Article Title</h2>
              <div class="article-byline">By <span class="article-author"></span> · <span class="article-time"></span></div>
              <div class="article-body-text"></div>
              <div class="article-footer-cta">
                <button class="btn ghost close-article-btn">Back to Journal</button>
                <a href="shop.html" class="btn">Explore Formulas</a>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', html);

      const root = document.getElementById('veloura-article-modal');
      const backdrop = root.querySelector('.modal-backdrop');
      const closeBtn = root.querySelector('.modal-close-btn');
      const backBtn = root.querySelector('.close-article-btn');

      const closeHandler = () => {
        root.classList.remove('active');
        root.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      };

      backdrop.addEventListener('click', closeHandler);
      closeBtn.addEventListener('click', closeHandler);
      backBtn.addEventListener('click', closeHandler);
    },

    open: function (articleKey) {
      this.init();
      const article = ARTICLES[articleKey] || ARTICLES['refill'];
      const root = document.getElementById('veloura-article-modal');

      root.querySelector('.article-modal-title').textContent = article.title;
      root.querySelector('.article-author').textContent = article.author;
      root.querySelector('.article-time').textContent = `${article.date} · ${article.readTime}`;
      root.querySelector('.article-body-text').innerHTML = article.content;

      root.classList.add('active');
      root.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  // =========================================================================
  // 8. MOBILE NAVIGATION & HEADER ENHANCEMENTS
  // =========================================================================
  function setupHeader() {
    if (!document.querySelector('.announcement-bar')) {
      const bar = document.createElement('div');
      bar.className = 'announcement-bar';
      bar.innerHTML = `
        <div class="wrap">
          <span>✦ Complimentary carbon-neutral shipping on orders over $50 · Refillable glass vessels</span>
        </div>
      `;
      document.body.insertBefore(bar, document.body.firstChild);
    }

    const navin = document.querySelector('.navin');
    if (!navin) return;

    // Synchronize active nav link based on current filename
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = navin.querySelectorAll('.navlinks a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === 'product.html' && href.startsWith('product.html')))) {
        link.classList.add('on');
      } else {
        link.classList.remove('on');
      }
    });

    // Enhance bag icon button
    let bagEl = navin.querySelector('.bag');
    if (bagEl) {
      const bagCount = Cart.getCount();
      bagEl.setAttribute('role', 'button');
      bagEl.setAttribute('tabindex', '0');
      bagEl.setAttribute('aria-label', 'Shopping bag');
      bagEl.innerHTML = `
        <svg class="bag-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <span class="bag-count" style="${bagCount > 0 ? 'display:flex' : 'display:none'}">${bagCount}</span>
      `;

      bagEl.addEventListener('click', e => {
        e.preventDefault();
        Drawer.open();
      });
      bagEl.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          Drawer.open();
        }
      });
    }

    // Add mobile hamburger button if not present
    if (!navin.querySelector('.menu-toggle')) {
      const menuBtn = document.createElement('button');
      menuBtn.className = 'menu-toggle';
      menuBtn.setAttribute('aria-label', 'Toggle menu');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = `
        <span class="bar top"></span>
        <span class="bar mid"></span>
        <span class="bar bot"></span>
      `;

      const actionsWrapper = document.createElement('div');
      actionsWrapper.className = 'nav-user-actions';
      if (bagEl) {
        bagEl.parentNode.insertBefore(actionsWrapper, bagEl);
        actionsWrapper.appendChild(bagEl);
      }
      actionsWrapper.appendChild(menuBtn);

      const mobileNav = document.createElement('div');
      mobileNav.className = 'mobile-menu-drawer';
      mobileNav.innerHTML = `
        <ul class="mobile-nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="shop.html">Shop All</a></li>
          <li><a href="product.html?id=bloom-serum">Featured Product</a></li>
          <li><a href="ritual.html">The Ritual</a></li>
          <li><a href="about.html">About Veloura</a></li>
          <li><a href="journal.html">Journal</a></li>
        </ul>
        <div class="mobile-menu-footer">
          <a href="shop.html" class="btn" style="width:100%;text-align:center">Explore Collection</a>
        </div>
      `;
      document.querySelector('nav').appendChild(mobileNav);

      menuBtn.addEventListener('click', () => {
        const isOpen = menuBtn.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileNav.classList.toggle('open', isOpen);
      });
    }
  }

  // =========================================================================
  // 9. FOOTER UNIFICATION
  // =========================================================================
  function setupFooter() {
    const existingFooter = document.querySelector('footer');
    const footerHtml = `
      <footer class="veloura-site-footer">
        <div class="wrap">
          <div class="footer-top">
            <div class="footer-brand-col">
              <a href="index.html" class="footer-logo">Veloura</a>
              <p class="footer-tagline">
                Clean, botanical skincare slow-made in refillable glass vessels. Formulated without compromise to let your natural skin barrier breathe.
              </p>
              <div class="footer-badges">
                <span class="pill">100% Vegan</span>
                <span class="pill">Cruelty-Free</span>
                <span class="pill">Refillable</span>
              </div>
            </div>

            <div class="footer-nav-col">
              <h4>Collection</h4>
              <ul>
                <li><a href="shop.html?cat=all">Shop All</a></li>
                <li><a href="shop.html?cat=face">Face Botanicals</a></li>
                <li><a href="shop.html?cat=body">Body Care</a></li>
                <li><a href="shop.html?cat=hair">Hair Elixirs</a></li>
                <li><a href="shop.html?cat=gift%20sets">Gift Sets</a></li>
              </ul>
            </div>

            <div class="footer-nav-col">
              <h4>Philosophy</h4>
              <ul>
                <li><a href="ritual.html">The 3-Step Ritual</a></li>
                <li><a href="about.html">Our Story</a></li>
                <li><a href="journal.html">The Journal</a></li>
                <li><a href="product.html?id=bloom-serum">Bloom Serum</a></li>
              </ul>
            </div>

            <div class="footer-nav-col">
              <h4>Inner Circle</h4>
              <p style="font-size:0.88rem;color:var(--mute);margin-bottom:0.8rem">
                Receive first access to slow seasonal runs and 10% off your first refill.
              </p>
              <form class="newsform footer-news" onsubmit="return false">
                <input type="email" placeholder="Your email address" required>
                <button type="submit" class="btn">Join</button>
              </form>
            </div>
          </div>

          <div class="footer-bottom">
            <div>&copy; 2026 Veloura Skincare Inc. All rights reserved. Patch test before first use.</div>
            <div class="footer-legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Refill Program</a>
            </div>
          </div>
        </div>
      </footer>
    `;

    if (existingFooter) {
      existingFooter.outerHTML = footerHtml;
    } else {
      document.body.insertAdjacentHTML('beforeend', footerHtml);
    }
  }

  // =========================================================================
  // 10. PAGE SPECIFIC HANDLERS
  // =========================================================================

  // --- A. SHOP PAGE HANDLER ---
  function initShopPage() {
    const chips = document.querySelectorAll('.chips .chip');
    if (!chips.length) return;

    function applyFilter(filterText) {
      filterText = filterText.toLowerCase().trim();
      chips.forEach(c => {
        if (c.textContent.trim().toLowerCase() === filterText) {
          c.classList.add('on');
        } else {
          c.classList.remove('on');
        }
      });

      const cards = document.querySelectorAll('.grid .card');
      cards.forEach(card => {
        const cat = (card.getAttribute('data-category') || '').toLowerCase();
        if (filterText === 'all' || cat === filterText) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', e => {
        e.preventDefault();
        applyFilter(chip.textContent);
      });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
      applyFilter(catParam);
    }

    // Bind Quick Add buttons
    document.querySelectorAll('.quick-add-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        Cart.addItem(id, 1);
      });
    });
  }

  // --- B. PRODUCT DETAIL PAGE HANDLER ---
  function initProductPage() {
    const pd = document.querySelector('.pd');
    if (!pd) return;

    const params = new URLSearchParams(window.location.search);
    const prodId = params.get('id') || 'bloom-serum';
    const prod = PRODUCTS[prodId] || PRODUCTS['bloom-serum'];

    document.title = `${prod.name} — Veloura`;

    const visual = pd.querySelector('.pd-visual');
    if (visual) {
      const vessel = prod.vessel || 'bottle';
      visual.innerHTML = `<svg class="bottle ${prod.colorClass}"><use href="#${vessel}"/></svg>`;
    }

    const titleEl = pd.querySelector('h1');
    if (titleEl) titleEl.textContent = prod.name;

    const priceEl = pd.querySelector('.price');
    if (priceEl) priceEl.textContent = `$${prod.price}`;

    const starsEl = pd.querySelector('.stars');
    if (starsEl) {
      starsEl.innerHTML = `${prod.rating} <span style="color:var(--mute);font-size:.85rem">(${prod.reviewsCount} verified reviews)</span>`;
    }

    const descEl = pd.querySelector('.desc');
    if (descEl) descEl.textContent = prod.desc;

    let currentQty = 1;
    let selectedVariant = prod.variants ? prod.variants[0] : 'Classic Glass';

    const qtyContainer = pd.querySelector('.qty');
    if (qtyContainer) {
      qtyContainer.innerHTML = `
        <div class="qty-control-box">
          <button class="pd-qty-btn dec" aria-label="Decrease quantity">−</button>
          <span class="pd-qty-val">1</span>
          <button class="pd-qty-btn inc" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn pd-add-btn" style="flex:1">Add to bag — $${prod.price}</button>
      `;

      const qtyVal = qtyContainer.querySelector('.pd-qty-val');
      const addBtn = qtyContainer.querySelector('.pd-add-btn');

      qtyContainer.querySelector('.dec').addEventListener('click', () => {
        if (currentQty > 1) {
          currentQty--;
          qtyVal.textContent = currentQty;
          addBtn.textContent = `Add to bag — $${prod.price * currentQty}`;
        }
      });

      qtyContainer.querySelector('.inc').addEventListener('click', () => {
        currentQty++;
        qtyVal.textContent = currentQty;
        addBtn.textContent = `Add to bag — $${prod.price * currentQty}`;
      });

      addBtn.addEventListener('click', e => {
        e.preventDefault();
        Cart.addItem(prod.id, currentQty, selectedVariant);
      });

      const swatches = pd.querySelectorAll('.swatches .swatch');
      swatches.forEach((swatch, idx) => {
        swatch.addEventListener('click', () => {
          swatches.forEach(s => s.classList.remove('on'));
          swatch.classList.add('on');
          if (prod.variants && prod.variants[idx]) {
            selectedVariant = prod.variants[idx];
          }
          const bottleSvg = pd.querySelector('.pd-visual .bottle');
          if (bottleSvg) {
            bottleSvg.className = `bottle ${idx === 1 ? 'sage' : idx === 2 ? 'blush' : prod.colorClass}`;
          }
        });
      });
    }

    const accordion = pd.querySelector('.accordion');
    if (accordion) {
      accordion.innerHTML = `
        <div class="accordion-item">
          <button class="accordion-trigger" aria-expanded="false">
            <span>Full ingredient list</span>
            <span class="symbol">+</span>
          </button>
          <div class="accordion-content">
            <p>${prod.ingredients}</p>
          </div>
        </div>

        <div class="accordion-item">
          <button class="accordion-trigger" aria-expanded="false">
            <span>How to use</span>
            <span class="symbol">+</span>
          </button>
          <div class="accordion-content">
            <p>${prod.usage}</p>
          </div>
        </div>

        <div class="accordion-item">
          <button class="accordion-trigger" aria-expanded="false">
            <span>Shipping &amp; Refill Program</span>
            <span class="symbol">+</span>
          </button>
          <div class="accordion-content">
            <p>${prod.shipping}</p>
          </div>
        </div>
      `;

      accordion.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
          const isOpen = trigger.getAttribute('aria-expanded') === 'true';
          accordion.querySelectorAll('.accordion-trigger').forEach(t => {
            t.setAttribute('aria-expanded', 'false');
            t.querySelector('.symbol').textContent = '+';
            t.parentElement.classList.remove('open');
          });

          if (!isOpen) {
            trigger.setAttribute('aria-expanded', 'true');
            trigger.querySelector('.symbol').textContent = '−';
            trigger.parentElement.classList.add('open');
          }
        });
      });
    }

    // Dynamic "Pairs beautifully with" recommendations (excluding current product)
    const relatedSection = document.querySelector('.related-products-section');
    if (relatedSection) {
      const allProductKeys = Object.keys(PRODUCTS).filter(k => k !== prod.id && k !== 'ritual-duo' && k !== 'full-ritual-set');
      const recommendations = allProductKeys.slice(0, 3).map(k => PRODUCTS[k]);

      const grid = relatedSection.querySelector('.grid.g3');
      if (grid && recommendations.length >= 3) {
        grid.innerHTML = recommendations.map(rec => `
          <div class="card">
            <a href="product.html?id=${rec.id}"><svg class="bottle ${rec.colorClass}"><use href="#bottle"/></svg></a>
            <div class="pname"><a href="product.html?id=${rec.id}">${rec.name}</a></div>
            <div class="pnote">${rec.tagline}</div>
            <div class="prow">
              <span class="price">$${rec.price}</span>
              <div style="display:flex;gap:0.4rem">
                <a class="pill" href="product.html?id=${rec.id}">View</a>
                <button class="pill quick-add-btn" data-id="${rec.id}" style="background:var(--ink);color:var(--cream);border-color:var(--ink)">+ Bag</button>
              </div>
            </div>
          </div>
        `).join('');

        grid.querySelectorAll('.quick-add-btn').forEach(btn => {
          btn.addEventListener('click', e => {
            e.preventDefault();
            Cart.addItem(btn.dataset.id, 1);
          });
        });
      }
    }
  }

  // --- C. JOURNAL PAGE HANDLER ---
  function initJournalPage() {
    const heroCard = document.querySelector('.journal-hero-card');
    if (heroCard) {
      heroCard.addEventListener('click', () => {
        const articleKey = heroCard.getAttribute('data-article') || 'refill';
        ArticleModal.open(articleKey);
      });
      heroCard.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const articleKey = heroCard.getAttribute('data-article') || 'refill';
          ArticleModal.open(articleKey);
        }
      });
    }

    const jcards = document.querySelectorAll('.jcard');
    const keys = ['refill', 'ingredients', 'morning'];
    jcards.forEach((card, index) => {
      const key = card.getAttribute('data-article') || keys[index] || 'refill';
      card.style.cursor = 'pointer';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.addEventListener('click', () => {
        ArticleModal.open(key);
      });
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          ArticleModal.open(key);
        }
      });
    });

    const filterBtns = document.querySelectorAll('.jfilter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        jcards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- D. RITUAL PAGE HANDLER ---
  function initRitualPage() {
    const protocolTabs = document.querySelectorAll('.protocol-tab');
    protocolTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-target');
        protocolTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll('.protocol-panel').forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.remove('hidden');
          } else {
            panel.classList.add('hidden');
          }
        });
      });
    });

    const bundleBtn = document.querySelector('.add-bundle-btn');
    if (bundleBtn) {
      bundleBtn.addEventListener('click', e => {
        e.preventDefault();
        Cart.addItem('full-ritual-set', 1);
      });
    }
  }

  // --- E. HOME PAGE BESTSELLERS ---
  function initHomePage() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    document.querySelectorAll('.home-quick-add').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        Cart.addItem(id, 1);
      });
    });
  }

  // --- F. NEWSLETTER FORMS ---
  function initNewsletterForms() {
    document.querySelectorAll('.newsform').forEach(form => {
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          const email = input.value.trim();
          input.value = '';

          try {
            const res = await fetch('/api/newsletter/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email })
            });
            const json = await res.json();
            Toast.show(json.message || `Welcome to Veloura! Your 10% coupon code is VELOURA10`);
          } catch (err) {
            Toast.show(`Welcome to Veloura! Your 10% coupon code is VELOURA10`);
          }

          const container = form.closest('.news');
          if (container) {
            const h2 = container.querySelector('h2');
            if (h2) h2.textContent = '✓ You are on the private formula list.';
          }
        }
      });
    });
  }

  // =========================================================================
  // 11. SCROLL ANIMATIONS & INTERACTIONS MANAGER
  // =========================================================================
  const ScrollManager = {
    init: function () {
      this.initProgressBar();
      this.initBackToTop();
      this.initNavScroll();
      this.initScrollReveal();
    },

    // 1. Reading / Page scroll progress bar at the very top
    initProgressBar: function () {
      if (document.querySelector('.scroll-progress-bar')) return;
      const bar = document.createElement('div');
      bar.className = 'scroll-progress-bar';
      document.body.prepend(bar);

      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
              const progress = (window.scrollY / docHeight) * 100;
              bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
            }
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    },

    // 2. Sticky navigation elevation on scroll
    initNavScroll: function () {
      const nav = document.querySelector('nav');
      if (!nav) return;

      const onScroll = () => {
        if (window.scrollY > 30) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    },

    // 3. Floating back-to-top button
    initBackToTop: function () {
      if (document.querySelector('.back-to-top')) return;

      const btn = document.createElement('button');
      btn.className = 'back-to-top';
      btn.setAttribute('aria-label', 'Scroll to top');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      `;
      document.body.appendChild(btn);

      window.addEventListener('scroll', () => {
        if (window.scrollY > 320) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      }, { passive: true });

      btn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    },

    // 4. Scroll Reveal via IntersectionObserver
    initScrollReveal: function () {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      // Auto-assign animation classes across all pages
      const heroText = document.querySelector('.hero > div:first-child');
      if (heroText && !heroText.classList.contains('reveal-left')) {
        heroText.classList.add('reveal-left');
      }

      const heroVisual = document.querySelector('.hero-visual');
      if (heroVisual && !heroVisual.classList.contains('reveal-scale')) {
        heroVisual.classList.add('reveal-scale');
      }

      const pdVisual = document.querySelector('.pd-visual');
      if (pdVisual && !pdVisual.classList.contains('reveal-scale')) {
        pdVisual.classList.add('reveal-scale');
      }

      const abPort = document.querySelector('.ab-port');
      if (abPort && !abPort.classList.contains('reveal-scale')) {
        abPort.classList.add('reveal-scale');
      }

      const quote = document.querySelector('.quote');
      if (quote && !quote.classList.contains('reveal')) {
        quote.classList.add('reveal');
      }

      const bundleCard = document.querySelector('.ritual-bundle-card');
      if (bundleCard && !bundleCard.classList.contains('reveal-scale')) {
        bundleCard.classList.add('reveal-scale');
      }

      const newsBanner = document.querySelector('.news');
      if (newsBanner && !newsBanner.classList.contains('reveal-scale')) {
        newsBanner.classList.add('reveal-scale');
      }

      const values = document.querySelector('.values');
      if (values && !values.classList.contains('reveal')) {
        values.classList.add('reveal');
      }

      document.querySelectorAll('.section-head').forEach(el => {
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
      });

      const gridSelectors = ['.grid.g3', '.grid.g6', '.steps', '.ing', '.stats'];
      gridSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(container => {
          const children = Array.from(container.children);
          children.forEach((child, idx) => {
            if (!child.classList.contains('reveal')) {
              child.classList.add('reveal');
              const delayClass = `reveal-delay-${Math.min(6, (idx % 6) + 1)}`;
              child.classList.add(delayClass);
            }
          });
        });
      });

      const revealElements = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
      if (!revealElements.length) return;

      if (!('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('revealed'));
        return;
      }

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    }
  };

  // =========================================================================
  // 12. INITIALIZATION ON DOM READY
  // =========================================================================
  function init() {
    setupHeader();
    setupFooter();
    updateCartBadges();
    initNewsletterForms();

    initShopPage();
    initProductPage();
    initJournalPage();
    initRitualPage();
    initHomePage();

    Drawer.init();
    CheckoutModal.init();
    ArticleModal.init();
    ScrollManager.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.Veloura = {
    Cart: Cart,
    Drawer: Drawer,
    Toast: Toast,
    Checkout: CheckoutModal,
    Article: ArticleModal
  };
})();
