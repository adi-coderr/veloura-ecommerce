/**
 * Veloura Botanical Skincare - Core Application Logic
 * Clean, fast, zero-dependency JavaScript powering the complete store experience.
 */

(function () {
  'use strict';

  // Safe HTML Escaping Utility for XSS Prevention (CWE-79)
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // 1. PRODUCT CATALOG DATA
  // =========================================================================
  const PRODUCTS = {
    'bloom-serum': {
      id: 'bloom-serum',
      name: 'Bloom Serum',
      kicker: 'Face · Vitamin C',
      tagline: '12% Lipid Vitamin C + Olive Squalane',
      badge: 'Bestseller',
      image: 'images/serum-dropper.jpg',
      hoverImage: 'images/editorial-texture.jpg',
      price: 42,
      rating: 5.0,
      reviewsCount: 214,
      colorClass: '',
      colorHex: '#A85B4E',
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
      tagline: 'Madecassoside Centella + Oat Milk',
      badge: 'Sensitive Hero',
      image: 'images/cream-jar.jpg',
      hoverImage: 'images/editorial-texture.jpg',
      price: 38,
      rating: 4.9,
      reviewsCount: 189,
      colorClass: 'sage',
      colorHex: '#7A8B66',
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
      tagline: 'Damask Rosewater + Cold Aloe',
      badge: 'pH 5.2 Prep',
      image: 'images/mist-bottle.jpg',
      hoverImage: 'images/ritual-vanity.jpg',
      price: 26,
      rating: 4.8,
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
      tagline: 'Blue Tansy + 1% Botanical Bakuchiol',
      badge: 'Plant Retinol',
      image: 'images/oil-flacon.jpg',
      hoverImage: 'images/editorial-texture.jpg',
      price: 48,
      rating: 5.0,
      reviewsCount: 178,
      colorClass: 'sage',
      colorHex: '#7A8B66',
      category: 'face',
      vessel: 'oil-flacon',
      variants: ['Obsidian Glass (30ml)', 'Classic Amber (30ml)'],
      desc: 'An intensive nocturnal restorative treatment formulated with Moroccan blue tansy and 1% clinical plant bakuchiol to stimulate cellular renewal and soothe reactive skin overnight.',
      ingredients: 'Squalane, Simmondsia Chinensis (Jojoba) Seed Oil, Tanacetum Annuum (Blue Tansy) Flower Oil, Bakuchiol, Helianthus Annuus Seed Oil, Tocopherol, Tetrahexyldecyl Ascorbate.',
      usage: 'Warm 3–4 drops between hands at night and press into slightly damp skin following moisturizer or serum. Non-photosensitizing and pregnancy-safe.',
      shipping: 'Complimentary shipping on orders over $50. Heavy flint glass bottle with precision pipette.'
    },
    'clarity-cleanser': {
      id: 'clarity-cleanser',
      name: 'Clarity Cleansing Oil',
      kicker: 'Face · Camellia',
      tagline: 'Japanese Camellia + Rice Bran',
      badge: 'Step 01 Cleanse',
      image: 'images/cleansing-oil.jpg',
      hoverImage: 'images/ritual-vanity.jpg',
      price: 32,
      rating: 4.9,
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
      tagline: 'French Rose Kaolin + Willow Bark',
      badge: '10-Min Detox',
      image: 'images/clay-mask.jpg',
      hoverImage: 'images/editorial-texture.jpg',
      price: 36,
      rating: 4.8,
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
      tagline: 'Cold-Pressed Jojoba + Sweet Almond',
      badge: 'Dry Finish',
      image: 'images/body-oil.jpg',
      hoverImage: 'images/editorial-texture.jpg',
      price: 34,
      rating: 4.9,
      reviewsCount: 98,
      colorClass: 'ink',
      colorHex: '#1D1714',
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
      tagline: 'Colloidal Oat Milk + Chamomile',
      badge: 'pH 5.2 Cleanse',
      image: 'images/soft-wash.jpg',
      hoverImage: 'images/ritual-vanity.jpg',
      price: 24,
      rating: 4.8,
      reviewsCount: 165,
      colorClass: '',
      colorHex: '#A85B4E',
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
      tagline: 'Whipped Cupuaçu + Organic Shea',
      badge: 'Deep Moisture',
      image: 'images/body-butter.jpg',
      hoverImage: 'images/editorial-texture.jpg',
      price: 36,
      rating: 5.0,
      reviewsCount: 208,
      colorClass: '',
      colorHex: '#A85B4E',
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
      tagline: 'Bamboo Silica + Sweet Orange',
      badge: 'Exfoliant',
      image: 'images/bamboo-scrub.jpg',
      hoverImage: 'images/editorial-texture.jpg',
      price: 28,
      rating: 4.9,
      reviewsCount: 88,
      colorClass: 'sage',
      colorHex: '#7A8B66',
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
      tagline: 'Moroccan Argan + Botanical Keratin',
      badge: 'Bond Repair',
      image: 'images/silk-hair-mask.jpg',
      hoverImage: 'images/hair-collection.jpg',
      price: 30,
      rating: 4.9,
      reviewsCount: 112,
      colorClass: 'sage',
      colorHex: '#7A8B66',
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
      tagline: 'Distilled Rosemary + Peptide Biotin',
      badge: 'Root Vitality',
      image: 'images/hair-collection.jpg',
      hoverImage: 'images/serum-dropper.jpg',
      price: 34,
      rating: 4.9,
      reviewsCount: 156,
      colorClass: 'sage',
      colorHex: '#7A8B66',
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
      badge: 'Heat Shield',
      image: 'images/hair-nectar.jpg',
      hoverImage: 'images/hair-collection.jpg',
      price: 32,
      rating: 4.8,
      reviewsCount: 119,
      colorClass: 'ink',
      colorHex: '#1D1714',
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
      tagline: 'Bloom Serum + Calm Cream Pairing',
      badge: 'Save $8',
      image: 'images/hero-editorial.jpg',
      hoverImage: 'images/gift-ritual-set.jpg',
      price: 72,
      rating: 5.0,
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
      tagline: 'Wash + Cloud Silk Butter + Velvet Oil',
      badge: 'Save $10',
      image: 'images/bath-ceremony-set.jpg',
      hoverImage: 'images/ritual-vanity.jpg',
      price: 88,
      rating: 5.0,
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
      tagline: 'Complete 4-Step Vault + Linen Pouch',
      badge: 'Save $22',
      image: 'images/gift-ritual-set.jpg',
      hoverImage: 'images/hero-editorial.jpg',
      price: 118,
      rating: 5.0,
      reviewsCount: 64,
      colorClass: 'ink',
      colorHex: '#1D1714',
      category: 'gift sets',
      vessel: 'gift-box',
      variants: ['Deluxe Keepsake Box', 'Organic Linen Case'],
      desc: 'The comprehensive botanical ritual: Soft Wash (200ml), Bloom Serum (30ml), Calm Cream (50ml), and Dew Mist (100ml) complete with refill funnel and organic cotton travel pouch.',
      ingredients: 'Soft Wash (200ml), Bloom Serum (30ml), Calm Cream (50ml), Dew Mist (100ml).',
      usage: 'Step 01: Cleanse with Soft Wash. Step 02: Treat with Bloom Serum & Calm Cream. Step 03: Seal hydration with Dew Mist.',
      shipping: 'Ships free! Includes complimentary samples of upcoming seasonal formulas.'
    },
    'peony-eye-elixir': {
      id: 'peony-eye-elixir',
      name: 'Peony Dew Eye Elixir',
      kicker: 'Face · Peptides',
      tagline: 'Peony Root + Botanical Cooling Caffeine',
      badge: 'New Arrival',
      image: 'images/eye-elixir.jpg',
      hoverImage: 'images/ritual-vanity.jpg',
      price: 44,
      rating: 5.0,
      reviewsCount: 48,
      colorClass: 'blush',
      colorHex: '#D79A8C',
      category: 'face',
      vessel: 'bottle',
      variants: ['Classic Rose (15ml)', 'Frosted Sage (15ml)'],
      desc: 'A cooling, fast-absorbing orbital serum powered by white peony root polyphenols, plant peptides, and green coffee bean caffeine to visibly depuff tired under-eyes and brighten delicate skin.',
      ingredients: 'Rosa Damascena Flower Water, Glycerin, Paeonia Lactiflora (Peony) Root Extract, Caffeine, Palmitoyl Tripeptide-1, Sodium Hyaluronate, Squalane, Chamomilla Recutita Extract.',
      usage: 'Glide 1 drop gently along the orbital bone using your ring finger morning and night after cleansing and before facial oil or cream.',
      shipping: 'Complimentary shipping on orders over $50. Packaged in UV-tinted refillable Italian glass.'
    },
    'neroli-hand-balm': {
      id: 'neroli-hand-balm',
      name: 'Neroli Silk Hand & Cuticle Balm',
      kicker: 'Body · Neroli',
      tagline: 'Moroccan Neroli + Raw Tamanu Butter',
      badge: 'Velvet Moisture',
      image: 'images/hand-balm.jpg',
      hoverImage: 'images/editorial-texture.jpg',
      price: 26,
      rating: 4.9,
      reviewsCount: 64,
      colorClass: 'sage',
      colorHex: '#7A8B66',
      category: 'body',
      vessel: 'cream-jar',
      variants: ['Travel Tube (75ml)', 'Vanity Glass Jar (150ml)'],
      desc: 'A deeply conditioning yet powder-dry hand and cuticle balm crafted with cold-pressed tamanu butter, colloidal oat lipids, and wild Moroccan orange blossom water.',
      ingredients: 'Water/Aqua, Butyrospermum Parkii (Shea) Butter, Calophyllum Inophyllum (Tamanu) Seed Oil, Citrus Aurantium Amara (Neroli) Flower Water, Avena Sativa Kernel Flour, Squalane, Tocopherol.',
      usage: 'Massage a pea-sized ribbon into clean hands, knuckles, and nail beds throughout the day. Absorbs within seconds without greasy transfer.',
      shipping: 'Complimentary shipping on orders over $50. Infinitely recyclable brushed aluminum & glass.'
    },
    'camellia-hair-mist': {
      id: 'camellia-hair-mist',
      name: 'Camellia Silk Leave-In Mist',
      kicker: 'Hair · Camellia',
      tagline: 'Fermented Rice Water + White Jasmine',
      badge: 'Weightless Shine',
      image: 'images/hair-mist.jpg',
      hoverImage: 'images/mist-bottle.jpg',
      price: 29,
      rating: 4.9,
      reviewsCount: 57,
      colorClass: 'sage',
      colorHex: '#7A8B66',
      category: 'hair',
      vessel: 'mist-bottle',
      variants: ['Frosted Sage (120ml)', 'Classic Rose (120ml)'],
      desc: 'A superfine leave-in detangling and conditioning hair veil infused with fermented rice amino acids, white camellia seed extract, and pure jasmine hydrolat for silky bounce without buildup.',
      ingredients: 'Oryza Sativa (Fermented Rice) Bran Water, Camellia Japonica Seed Extract, Jasminum Officinale Flower Water, Panthenol (Pro-Vitamin B5), Hydrolyzed Oat Protein, Glycerin.',
      usage: 'Shake gently and mist evenly over damp, towel-dried lengths before combing, or refresh second-day curls and ends anytime.',
      shipping: 'Complimentary shipping on orders over $50. Refillable fine-mist Italian glass bottle.'
    },
    'nocturne-recovery-set': {
      id: 'nocturne-recovery-set',
      name: 'Nocturne Recovery Edit',
      kicker: 'Gift sets · Night Trio',
      tagline: 'Luna Night Oil + Calm Cream + Eye Elixir',
      badge: 'Save $14',
      image: 'images/nocturne-set.jpg',
      hoverImage: 'images/ritual-vanity.jpg',
      price: 116,
      rating: 5.0,
      reviewsCount: 41,
      colorClass: 'ink',
      colorHex: '#1D1714',
      category: 'gift sets',
      vessel: 'gift-box',
      variants: ['Keepsake Linen Box', 'Organic Cotton Travel Roll'],
      desc: 'An evening skin-barrier restorative trio uniting Luna Night Oil (30ml), Calm Cream (50ml), and Peony Dew Eye Elixir (15ml) alongside an organic oatmeal waffle washcloth.',
      ingredients: 'Luna Night Oil (30ml), Calm Cream (50ml), and Peony Dew Eye Elixir (15ml). See individual product listings for full botanical ingredients.',
      usage: 'Cleanse skin gently, pat Peony Dew Eye Elixir around eyes, cocoon face in Calm Cream, and seal overnight with 3 drops of Luna Night Oil.',
      shipping: 'Ships free! Presented in our reusable embossed keepsake box.'
    }
  };

  /** Shared card renderer used across Shop & Product recommendation sections. */
  function renderProductCard(prod) {
    const imgSrc = prod.image || 'images/serum-dropper.jpg';
    const ratingVal = Number(prod.rating || 5.0).toFixed(1);
    const badgeHtml = prod.badge
      ? `<span class="card-badge${prod.badge.includes('Best') || prod.badge.includes('Save') || prod.badge.includes('Plant') ? ' accent' : ''}">${escapeHtml(prod.badge)}</span>`
      : '';

    return `
      <div class="card" data-category="${escapeHtml(prod.category)}" data-id="${escapeHtml(prod.id)}">
        <div class="card-media">
          ${badgeHtml}
          <span class="card-refill-tag">♻ Refillable</span>
          <a class="card-img-link" href="product.html?id=${encodeURIComponent(prod.id)}">
            <img class="card-img" src="${escapeHtml(imgSrc)}" alt="${escapeHtml(prod.name)}" loading="lazy"
              onerror="this.style.display='none';this.parentElement.nextElementSibling.classList.add('show-fallback')">
          </a>
          <div class="svg-fallback"><svg class="bottle ${escapeHtml(prod.colorClass || '')}"><use href="#${escapeHtml(prod.vessel || 'bottle')}"/></svg></div>
          <button class="card-quick-overlay quick-add-btn" data-id="${escapeHtml(prod.id)}">+ Quick Add — $${Number(prod.price).toFixed(0)}</button>
        </div>
        <div class="card-meta-top">
          <span class="card-rating"><span class="star">★</span> ${ratingVal} <span class="cnt">(${escapeHtml(prod.reviewsCount || 90)})</span></span>
          <div class="card-swatches" aria-hidden="true">
            <span class="swatch-dot active" style="background:${escapeHtml(prod.colorHex || '#A85B4E')}"></span>
            <span class="swatch-dot" style="background:#7A8B66"></span>
          </div>
        </div>
        <div class="pname"><a href="product.html?id=${encodeURIComponent(prod.id)}">${escapeHtml(prod.name)}</a></div>
        <div class="pnote">${escapeHtml(prod.tagline || prod.kicker)}</div>
        <div class="prow">
          <span class="price">$${Number(prod.price).toFixed(0)}</span>
          <a class="pill" href="product.html?id=${encodeURIComponent(prod.id)}">Details →</a>
        </div>
      </div>
    `;
  }

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
  // 3. PERSISTENT CART, SAVED & BAG EXTRAS STORE (localStorage)
  // =========================================================================
  const CART_KEY = 'veloura_cart';
  const SAVED_KEY = 'veloura_saved';
  const EXTRAS_KEY = 'veloura_bag_extras';
  const PROMO_KEY = 'veloura_promo_state';
  const FREE_SHIPPING_THRESHOLD = 50;
  const FREE_ELIXIR_THRESHOLD = 65;

  const ATELIER_SAMPLES = [
    { id: 'sample-bloom', name: 'Bloom 12% Vitamin C', size: '2ml Foil', note: 'Olive squalane brightening', img: 'images/serum-dropper.jpg' },
    { id: 'sample-calm', name: 'Calm Centella Cream', size: '3ml Sachet', note: 'Colloidal oat barrier calm', img: 'images/cream-jar.jpg' },
    { id: 'sample-luna', name: 'Luna Blue Tansy Oil', size: '2ml Vial', note: '1% bakuchiol night elixir', img: 'images/oil-flacon.jpg' },
    { id: 'sample-hair', name: 'Camellia Leave-In Mist', size: '3ml Vial', note: 'Rice water & white jasmine', img: 'images/hair-mist.jpg' }
  ];

  const LOCAL_PROMOS = {
    VELOURA10: { code: 'VELOURA10', type: 'percentage', value: 0.10, minSpend: 0, description: '10% off entire order' },
    WELCOME10: { code: 'WELCOME10', type: 'percentage', value: 0.10, minSpend: 0, description: '10% off your first order' },
    WELCOME15: { code: 'WELCOME15', type: 'percentage', value: 0.15, minSpend: 40, description: '15% off welcome gift ($40+)' },
    FREESHIP: { code: 'FREESHIP', type: 'shipping', value: 0, minSpend: 0, description: 'Complimentary standard shipping on any order' },
    SLOWBEAUTY: { code: 'SLOWBEAUTY', type: 'fixed', value: 5.00, minSpend: 30, description: '$5.00 off orders over $30' }
  };

  function readStorageJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeStorageJson(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  const Cart = {
    getItems: function () {
      const items = readStorageJson(CART_KEY, []);
      return Array.isArray(items) ? items : [];
    },

    saveItems: function (items) {
      writeStorageJson(CART_KEY, items);
      this.notify();
    },

    getSaved: function () {
      const saved = readStorageJson(SAVED_KEY, []);
      return Array.isArray(saved) ? saved : [];
    },

    saveSaved: function (saved) {
      writeStorageJson(SAVED_KEY, saved);
      this.notify();
    },

    getExtras: function () {
      const extras = readStorageJson(EXTRAS_KEY, {});
      return {
        samples: Array.isArray(extras.samples) ? extras.samples.slice(0, 2) : [],
        giftWrap: Boolean(extras.giftWrap),
        giftNote: typeof extras.giftNote === 'string' ? extras.giftNote.slice(0, 140) : ''
      };
    },

    saveExtras: function (nextExtras) {
      writeStorageJson(EXTRAS_KEY, nextExtras);
      BagPage.renderSummaryAndExtras();
    },

    getPromo: function () {
      return readStorageJson(PROMO_KEY, null);
    },

    savePromo: function (promoObj) {
      writeStorageJson(PROMO_KEY, promoObj);
      this.notify();
    },

    clearPromo: function () {
      try {
        localStorage.removeItem(PROMO_KEY);
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
          image: product.image || 'images/serum-dropper.jpg',
          colorClass: product.colorClass || '',
          variant: variantName,
          kicker: product.kicker || 'Botanical Formula'
        });
      }

      this.saveItems(items);
      const isOnBagPage = Boolean(document.getElementById('bag-items-container'));
      if (isOnBagPage) {
        Toast.show(`Added ${quantity}× ${product.name} to your ritual bag`);
      } else {
        Toast.show(`Added ${quantity}× ${product.name} to your bag`, 'View Bag', () => {
          Drawer.open();
        });
      }
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
      const items = this.getItems().filter(
        item => !(item.id === productId && (!variant || item.variant === variant))
      );
      this.saveItems(items);
    },

    saveForLater: function (productId, variant) {
      const items = this.getItems();
      const target = items.find(i => i.id === productId && (!variant || i.variant === variant));
      if (!target) return;

      const remaining = items.filter(i => !(i.id === productId && (!variant || i.variant === variant)));
      const saved = this.getSaved();
      if (!saved.some(s => s.id === target.id && s.variant === target.variant)) {
        saved.unshift(Object.assign({}, target, { qty: 1 }));
      }
      writeStorageJson(SAVED_KEY, saved);
      this.saveItems(remaining);
      Toast.show(`Saved ${target.name} for later`);
    },

    moveSavedToCart: function (productId, variant) {
      const saved = this.getSaved();
      const target = saved.find(s => s.id === productId && (!variant || s.variant === variant));
      if (!target) return;

      const remainingSaved = saved.filter(s => !(s.id === productId && (!variant || s.variant === variant)));
      writeStorageJson(SAVED_KEY, remainingSaved);
      this.addItem(target.id, 1, target.variant);
    },

    removeSaved: function (productId, variant) {
      const saved = this.getSaved().filter(
        s => !(s.id === productId && (!variant || s.variant === variant))
      );
      this.saveSaved(saved);
    },

    clear: function () {
      writeStorageJson(CART_KEY, []);
      try {
        localStorage.removeItem(PROMO_KEY);
      } catch (e) {}
      this.notify();
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

  /** Calculate authoritative totals matching backend PromoController & OrderController rules. */
  function calculateCartTotals() {
    const count = Cart.getCount();
    const subtotal = Number(Cart.getSubtotal().toFixed(2));
    const promo = Cart.getPromo();

    let discount = 0;
    let activePromo = null;
    let isFreeShippingPromo = false;

    if (promo && subtotal > 0) {
      const minSpend = Number(promo.minSpend || 0);
      if (subtotal >= minSpend) {
        activePromo = promo;
        if (promo.type === 'percentage') {
          discount = Number((subtotal * Number(promo.value || 0)).toFixed(2));
        } else if (promo.type === 'fixed') {
          discount = Math.min(subtotal, Number(promo.value || 0));
        } else if (promo.type === 'shipping') {
          isFreeShippingPromo = true;
        }
      }
    }

    const freeShippingUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD || isFreeShippingPromo;
    const elixirUnlocked = subtotal >= FREE_ELIXIR_THRESHOLD;
    const shipping = subtotal === 0 ? 0 : (freeShippingUnlocked ? 0 : 4.95);
    const total = Number(Math.max(0, subtotal - discount + shipping).toFixed(2));

    return {
      count,
      subtotal,
      discount,
      activePromo,
      promoPendingMinSpend: promo && subtotal > 0 && subtotal < Number(promo.minSpend || 0) ? promo : null,
      freeShippingUnlocked,
      elixirUnlocked,
      shipping,
      total
    };
  }

  /** Validate a promo code against Express API with local catalog fallback. */
  async function applyPromoCode(rawCode) {
    const code = (rawCode || '').trim().toUpperCase();
    if (!code) {
      Cart.clearPromo();
      return { ok: true, cleared: true, message: '' };
    }

    const subtotal = Cart.getSubtotal();
    try {
      const res = await fetch('/api/promo/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal })
      });
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        const localMeta = LOCAL_PROMOS[json.data.code] || {};
        const promoData = {
          code: json.data.code,
          type: json.data.type || localMeta.type || 'percentage',
          value: localMeta.value !== undefined ? localMeta.value : (subtotal > 0 ? json.data.discountAmount / subtotal : 0),
          minSpend: localMeta.minSpend || 0,
          description: json.data.description
        };
        Cart.savePromo(promoData);
        return { ok: true, message: `✓ ${json.data.description}` };
      }
      return { ok: false, message: json.error || 'Invalid or expired code.' };
    } catch (err) {
      const localPromo = LOCAL_PROMOS[code];
      if (!localPromo) {
        return { ok: false, message: 'Invalid code. Try VELOURA10 or FREESHIP.' };
      }
      if (localPromo.minSpend && subtotal < localPromo.minSpend) {
        return { ok: false, message: `Code requires a minimum spend of $${localPromo.minSpend.toFixed(2)}.` };
      }
      Cart.savePromo(localPromo);
      return { ok: true, message: `✓ ${localPromo.description}` };
    }
  }

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
  // 5. FULL-PAGE SHOPPING BAG CONTROLLER (+ Drawer Navigation Adapter)
  // =========================================================================
  const Drawer = {
    init: function () {},

    open: function () {
      if (document.getElementById('bag-items-container')) {
        BagPage.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.href = 'bag.html';
      }
    },

    close: function () {},

    render: function () {
      BagPage.render();
    }
  };

  const BagPage = {
    initialized: false,

    init: function () {
      const container = document.getElementById('bag-items-container');
      if (!container) return;

      this.bindStaticControls();
      this.initialized = true;
      this.render();
    },

    bindStaticControls: function () {
      const promoInput = document.getElementById('bag-promo-input');
      const promoApplyBtn = document.getElementById('bag-promo-apply');
      const promoFeedback = document.getElementById('bag-promo-feedback');

      const handleApply = async (codeValue) => {
        const result = await applyPromoCode(codeValue);
        if (promoFeedback) {
          promoFeedback.textContent = result.message;
          promoFeedback.className = `promo-feedback ${result.ok ? 'success' : 'error'}`;
        }
        if (promoInput && result.ok && codeValue) {
          promoInput.value = codeValue.trim().toUpperCase();
        }
      };

      if (promoApplyBtn && promoInput) {
        promoApplyBtn.addEventListener('click', () => handleApply(promoInput.value));
        promoInput.addEventListener('keydown', e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleApply(promoInput.value);
          }
        });
      }

      document.querySelectorAll('.bag-offer-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const code = chip.getAttribute('data-code') || '';
          if (promoInput) promoInput.value = code;
          handleApply(code);
        });
      });

      const giftToggle = document.getElementById('bag-gift-wrap-toggle');
      const giftNoteWrap = document.getElementById('bag-gift-note-wrap');
      const giftNoteInput = document.getElementById('bag-gift-note-input');
      const giftCharCount = document.getElementById('bag-gift-char-count');

      const savedExtras = Cart.getExtras();
      if (giftToggle) {
        giftToggle.checked = savedExtras.giftWrap;
        if (giftNoteWrap) giftNoteWrap.style.display = savedExtras.giftWrap ? 'block' : 'none';
        giftToggle.addEventListener('change', () => {
          const extras = Cart.getExtras();
          extras.giftWrap = giftToggle.checked;
          if (giftNoteWrap) giftNoteWrap.style.display = giftToggle.checked ? 'block' : 'none';
          Cart.saveExtras(extras);
        });
      }

      if (giftNoteInput) {
        giftNoteInput.value = savedExtras.giftNote;
        if (giftCharCount) giftCharCount.textContent = String(savedExtras.giftNote.length);
        giftNoteInput.addEventListener('input', () => {
          const val = giftNoteInput.value.slice(0, 140);
          if (giftCharCount) giftCharCount.textContent = String(val.length);
          const extras = Cart.getExtras();
          extras.giftNote = val;
          Cart.saveExtras(extras);
        });
      }

      const checkoutBtn = document.getElementById('bag-checkout-btn');
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
          if (Cart.getCount() === 0) {
            Toast.show('Add at least one botanical formula before checking out.');
            return;
          }
          CheckoutModal.open();
        });
      }

      document.querySelectorAll('.bag-faq-list .accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
          const isOpen = trigger.getAttribute('aria-expanded') === 'true';
          document.querySelectorAll('.bag-faq-list .accordion-trigger').forEach(t => {
            t.setAttribute('aria-expanded', 'false');
            const sym = t.querySelector('.symbol');
            if (sym) sym.textContent = '+';
            t.parentElement.classList.remove('open');
          });
          if (!isOpen) {
            trigger.setAttribute('aria-expanded', 'true');
            const sym = trigger.querySelector('.symbol');
            if (sym) sym.textContent = '−';
            trigger.parentElement.classList.add('open');
          }
        });
      });
    },

    render: function () {
      if (!document.getElementById('bag-items-container')) return;
      this.renderProgressBanner();
      this.renderItemsList();
      this.renderSavedList();
      this.renderSamplesGrid();
      this.renderSummaryAndExtras();
      this.renderUpsells();
    },

    renderProgressBanner: function () {
      const totals = calculateCartTotals();
      const fillEl = document.getElementById('bag-progress-fill');
      const msgEl = document.getElementById('bag-tier-message');
      const shipMile = document.getElementById('bag-milestone-shipping');
      const elixirMile = document.getElementById('bag-milestone-elixir');
      const pct = Math.min(100, Math.round((totals.subtotal / FREE_ELIXIR_THRESHOLD) * 100));

      if (fillEl) fillEl.style.width = `${pct}%`;

      if (msgEl) {
        if (totals.subtotal >= FREE_ELIXIR_THRESHOLD) {
          msgEl.innerHTML = '✦ You unlocked <strong>Free Carbon-Neutral Shipping</strong> &amp; your <strong>Complimentary Travel Elixir Gift</strong>!';
        } else if (totals.subtotal >= FREE_SHIPPING_THRESHOLD) {
          const left = (FREE_ELIXIR_THRESHOLD - totals.subtotal).toFixed(2);
          msgEl.innerHTML = `✓ <strong>Free Shipping unlocked!</strong> Add <strong>$${left}</strong> more to receive a complimentary 10ml travel elixir.`;
        } else {
          const leftShip = (FREE_SHIPPING_THRESHOLD - totals.subtotal).toFixed(2);
          msgEl.innerHTML = `Add <strong>$${leftShip}</strong> more to unlock <strong>Free Standard Shipping</strong> ($50+), or reach $65 for a free travel elixir.`;
        }
      }

      if (shipMile) {
        const unlocked = totals.subtotal >= FREE_SHIPPING_THRESHOLD;
        shipMile.classList.toggle('active', unlocked);
        shipMile.textContent = `${unlocked ? '✓' : '○'} $50 Free Shipping`;
      }
      if (elixirMile) {
        const unlocked = totals.subtotal >= FREE_ELIXIR_THRESHOLD;
        elixirMile.classList.toggle('active', unlocked);
        elixirMile.textContent = `${unlocked ? '✓' : '○'} $65 Travel Elixir Gift`;
      }
    },

    renderItemsList: function () {
      const container = document.getElementById('bag-items-container');
      const countPill = document.getElementById('bag-page-count-pill');
      if (!container) return;

      const items = Cart.getItems();
      const totalCount = Cart.getCount();
      if (countPill) {
        countPill.textContent = `${totalCount} Item${totalCount === 1 ? '' : 's'}`;
      }

      if (items.length === 0) {
        const starters = ['bloom-serum', 'calm-cream', 'peony-eye-elixir'].map(id => PRODUCTS[id]).filter(Boolean);
        container.innerHTML = `
          <div class="bag-empty-panel">
            <div class="bag-empty-badge">✦ Refillable Small-Batch Storefront</div>
            <h2>Your ritual bag is currently empty</h2>
            <p>Begin with one of our slow-made botanical essentials below or explore all 20 formulas in the apothecary.</p>
            <a href="shop.html" class="btn" style="margin-top:0.8rem">Explore All 20 Formulas →</a>

            <div class="bag-starter-grid">
              ${starters.map(prod => `
                <div class="bag-starter-card">
                  <a href="product.html?id=${encodeURIComponent(prod.id)}" class="bag-starter-media">
                    <img src="${escapeHtml(prod.image)}" alt="${escapeHtml(prod.name)}">
                  </a>
                  <div class="bag-starter-meta">
                    <span class="bag-starter-kicker">${escapeHtml(prod.kicker)}</span>
                    <a href="product.html?id=${encodeURIComponent(prod.id)}" class="bag-starter-name">${escapeHtml(prod.name)}</a>
                    <span class="bag-starter-tag">${escapeHtml(prod.tagline)}</span>
                    <div class="bag-starter-foot">
                      <strong>$${Number(prod.price).toFixed(0)}</strong>
                      <button type="button" class="pill bag-starter-add" data-id="${escapeHtml(prod.id)}">+ Add to Bag</button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

        container.querySelectorAll('.bag-starter-add').forEach(btn => {
          btn.addEventListener('click', () => {
            Cart.addItem(btn.getAttribute('data-id'), 1);
          });
        });
        return;
      }

      container.innerHTML = `
        <div class="bag-section-head">
          <div>
            <h3>Selected Formulations</h3>
            <p>Small-batch vessels sealed for peak antioxidant potency.</p>
          </div>
          <button type="button" id="bag-clear-all-btn" class="bag-text-link">Clear Bag</button>
        </div>
        <div class="bag-items-stack">
          ${items.map(item => {
            const prodInfo = PRODUCTS[item.id] || {};
            const thumbImg = item.image || prodInfo.image || 'images/serum-dropper.jpg';
            const lineTotal = (item.price * item.qty).toFixed(2);
            return `
              <article class="bag-page-item" data-id="${escapeHtml(item.id)}" data-variant="${escapeHtml(item.variant)}">
                <a href="product.html?id=${encodeURIComponent(item.id)}" class="bag-item-media">
                  <img src="${escapeHtml(thumbImg)}" alt="${escapeHtml(item.name)}"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                  <div class="svg-fallback"><svg class="bottle ${escapeHtml(item.colorClass || '')}"><use href="#${escapeHtml(prodInfo.vessel || 'bottle')}"/></svg></div>
                </a>

                <div class="bag-item-details">
                  <div class="bag-item-top">
                    <div>
                      <span class="bag-item-kicker">${escapeHtml(item.kicker || prodInfo.kicker || 'Botanical Formula')}</span>
                      <h4><a href="product.html?id=${encodeURIComponent(item.id)}">${escapeHtml(item.name)}</a></h4>
                      <div class="bag-item-variant">Edition: <strong>${escapeHtml(item.variant)}</strong> · $${Number(item.price).toFixed(0)} each</div>
                    </div>
                    <div class="bag-item-line-price">$${lineTotal}</div>
                  </div>

                  <div class="bag-item-status-row">
                    <span class="bag-stock-tag">✓ In Stock · Ships within 24h</span>
                    <span class="bag-refill-note">♻ Refillable Glass</span>
                  </div>

                  <div class="bag-item-controls">
                    <div class="cart-qty-ctrl bag-qty-ctrl">
                      <button type="button" class="qty-btn dec" aria-label="Decrease quantity">−</button>
                      <span class="qty-num">${escapeHtml(item.qty)}</span>
                      <button type="button" class="qty-btn inc" aria-label="Increase quantity">+</button>
                    </div>
                    <div class="bag-item-links">
                      <button type="button" class="bag-action-link save-later-btn">Save for later</button>
                      <span aria-hidden="true">·</span>
                      <button type="button" class="bag-action-link danger remove-item-btn">Remove</button>
                    </div>
                  </div>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      `;

      const clearBtn = document.getElementById('bag-clear-all-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          Cart.clear();
          Toast.show('Cleared your shopping bag.');
        });
      }

      container.querySelectorAll('.bag-page-item').forEach(row => {
        const id = row.dataset.id;
        const variant = row.dataset.variant;

        row.querySelector('.qty-btn.dec').addEventListener('click', () => {
          const item = Cart.getItems().find(i => i.id === id && i.variant === variant);
          if (item) Cart.updateQty(id, variant, item.qty - 1);
        });

        row.querySelector('.qty-btn.inc').addEventListener('click', () => {
          const item = Cart.getItems().find(i => i.id === id && i.variant === variant);
          if (item) Cart.updateQty(id, variant, item.qty + 1);
        });

        row.querySelector('.save-later-btn').addEventListener('click', () => {
          Cart.saveForLater(id, variant);
        });

        row.querySelector('.remove-item-btn').addEventListener('click', () => {
          Cart.removeItem(id, variant);
        });
      });
    },

    renderSavedList: function () {
      const section = document.getElementById('bag-saved-section');
      const list = document.getElementById('bag-saved-list');
      const countBadge = document.getElementById('bag-saved-count');
      if (!section || !list) return;

      const saved = Cart.getSaved();
      if (!saved.length) {
        section.style.display = 'none';
        list.innerHTML = '';
        return;
      }

      section.style.display = 'block';
      if (countBadge) countBadge.textContent = `${saved.length} Saved`;

      list.innerHTML = saved.map(item => `
        <div class="bag-saved-row" data-id="${escapeHtml(item.id)}" data-variant="${escapeHtml(item.variant)}">
          <img src="${escapeHtml(item.image || 'images/serum-dropper.jpg')}" alt="${escapeHtml(item.name)}" class="bag-saved-thumb">
          <div class="bag-saved-info">
            <a href="product.html?id=${encodeURIComponent(item.id)}" class="bag-saved-title">${escapeHtml(item.name)}</a>
            <span>${escapeHtml(item.variant)} · $${Number(item.price).toFixed(0)}</span>
          </div>
          <div class="bag-saved-actions">
            <button type="button" class="pill move-to-bag-btn">Move to Bag</button>
            <button type="button" class="bag-action-link danger remove-saved-btn">Remove</button>
          </div>
        </div>
      `).join('');

      list.querySelectorAll('.bag-saved-row').forEach(row => {
        const id = row.dataset.id;
        const variant = row.dataset.variant;
        row.querySelector('.move-to-bag-btn').addEventListener('click', () => Cart.moveSavedToCart(id, variant));
        row.querySelector('.remove-saved-btn').addEventListener('click', () => Cart.removeSaved(id, variant));
      });
    },

    renderSamplesGrid: function () {
      const grid = document.getElementById('bag-samples-grid');
      const counter = document.getElementById('bag-samples-counter');
      if (!grid) return;

      const extras = Cart.getExtras();
      if (counter) counter.textContent = `${extras.samples.length} / 2 Selected`;

      grid.innerHTML = ATELIER_SAMPLES.map(s => {
        const isSelected = extras.samples.includes(s.id);
        return `
          <button type="button" class="bag-sample-tile${isSelected ? ' selected' : ''}" data-sample-id="${escapeHtml(s.id)}" aria-pressed="${isSelected}">
            <img src="${escapeHtml(s.img)}" alt="${escapeHtml(s.name)}" class="bag-sample-img">
            <div class="bag-sample-copy">
              <div class="bag-sample-head">
                <strong>${escapeHtml(s.name)}</strong>
                <span class="bag-sample-state">${isSelected ? '✓ Added' : '+ Select'}</span>
              </div>
              <span>${escapeHtml(s.size)} · ${escapeHtml(s.note)}</span>
            </div>
          </button>
        `;
      }).join('');

      grid.querySelectorAll('.bag-sample-tile').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-sample-id');
          const cur = Cart.getExtras();
          if (cur.samples.includes(id)) {
            cur.samples = cur.samples.filter(x => x !== id);
          } else {
            if (cur.samples.length >= 2) {
              Toast.show('Select up to 2 complimentary samples (deselect one first).');
              return;
            }
            cur.samples.push(id);
          }
          Cart.saveExtras(cur);
          this.renderSamplesGrid();
        });
      });
    },

    renderSummaryAndExtras: function () {
      const totals = calculateCartTotals();
      const extras = Cart.getExtras();

      const subtotalEl = document.getElementById('bag-subtotal-val');
      const discountRow = document.getElementById('bag-discount-row');
      const discountLabel = document.getElementById('bag-discount-label');
      const discountVal = document.getElementById('bag-discount-val');
      const shippingEl = document.getElementById('bag-shipping-val');
      const totalEl = document.getElementById('bag-total-val');
      const checkoutBtn = document.getElementById('bag-checkout-btn');
      const samplesCountEl = document.getElementById('bag-summary-samples-count');
      const elixirRow = document.getElementById('bag-elixir-bonus-row');
      const giftRow = document.getElementById('bag-gift-summary-row');
      const promoFeedback = document.getElementById('bag-promo-feedback');

      if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
      if (samplesCountEl) samplesCountEl.textContent = String(extras.samples.length);
      if (elixirRow) elixirRow.style.display = totals.elixirUnlocked ? 'flex' : 'none';
      if (giftRow) giftRow.style.display = extras.giftWrap ? 'flex' : 'none';

      if (discountRow && discountVal && discountLabel) {
        if (totals.activePromo && totals.discount > 0) {
          discountRow.style.display = 'flex';
          discountLabel.innerHTML = `Promo (${escapeHtml(totals.activePromo.code)}) <button type="button" id="bag-remove-promo-btn" class="bag-promo-clear">Remove</button>`;
          discountVal.textContent = `-$${totals.discount.toFixed(2)}`;
          const removePromoBtn = document.getElementById('bag-remove-promo-btn');
          if (removePromoBtn) {
            removePromoBtn.addEventListener('click', () => {
              const promoInput = document.getElementById('bag-promo-input');
              if (promoInput) promoInput.value = '';
              if (promoFeedback) promoFeedback.textContent = '';
              Cart.clearPromo();
            });
          }
        } else if (totals.activePromo && totals.activePromo.type === 'shipping') {
          discountRow.style.display = 'flex';
          discountLabel.innerHTML = `Promo (${escapeHtml(totals.activePromo.code)}) <button type="button" id="bag-remove-promo-btn" class="bag-promo-clear">Remove</button>`;
          discountVal.textContent = 'Free Shipping';
          const removePromoBtn = document.getElementById('bag-remove-promo-btn');
          if (removePromoBtn) {
            removePromoBtn.addEventListener('click', () => {
              const promoInput = document.getElementById('bag-promo-input');
              if (promoInput) promoInput.value = '';
              if (promoFeedback) promoFeedback.textContent = '';
              Cart.clearPromo();
            });
          }
        } else {
          discountRow.style.display = 'none';
        }
      }

      if (totals.promoPendingMinSpend && promoFeedback) {
        promoFeedback.textContent = `Add $${(totals.promoPendingMinSpend.minSpend - totals.subtotal).toFixed(2)} more to activate ${totals.promoPendingMinSpend.code}.`;
        promoFeedback.className = 'promo-feedback error';
      } else if (totals.activePromo && promoFeedback && !promoFeedback.textContent) {
        promoFeedback.textContent = `✓ ${totals.activePromo.description}`;
        promoFeedback.className = 'promo-feedback success';
      }

      document.querySelectorAll('.bag-offer-chip').forEach(chip => {
        const chipCode = chip.getAttribute('data-code');
        chip.classList.toggle('active', Boolean(totals.activePromo && totals.activePromo.code === chipCode));
      });

      if (shippingEl) {
        if (totals.subtotal === 0) {
          shippingEl.textContent = '$0.00';
          shippingEl.style.color = '';
        } else if (totals.freeShippingUnlocked) {
          shippingEl.textContent = 'FREE';
          shippingEl.style.color = '#465339';
          shippingEl.style.fontWeight = '600';
        } else {
          shippingEl.textContent = `$${totals.shipping.toFixed(2)}`;
          shippingEl.style.color = '';
          shippingEl.style.fontWeight = '';
        }
      }

      if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;
      if (checkoutBtn) {
        checkoutBtn.textContent = totals.count > 0
          ? `Proceed to Checkout — $${totals.total.toFixed(2)}`
          : 'Proceed to Checkout';
      }
    },

    renderUpsells: function () {
      const grid = document.getElementById('bag-upsell-grid');
      if (!grid) return;

      const inCartIds = new Set(Cart.getItems().map(i => i.id));
      const candidates = Object.values(PRODUCTS).filter(p => !inCartIds.has(p.id));
      const picks = (candidates.length >= 4 ? candidates : Object.values(PRODUCTS)).slice(0, 4);

      grid.innerHTML = picks.map(renderProductCard).join('');
      grid.querySelectorAll('.quick-add-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          Cart.addItem(btn.getAttribute('data-id'), 1);
        });
      });
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
        const checkoutTotals = calculateCartTotals();
        let orderId = `VEL-${Math.floor(100000 + Math.random() * 900000)}`;

        // Attempt backend order placement
        try {
          const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items,
              customer: { firstName: fname, lastName: lname, email, address, city, state, zip },
              promoCode: checkoutTotals.activePromo ? checkoutTotals.activePromo.code : null
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
      const totals = calculateCartTotals();

      if (totals.count === 0) {
        Toast.show('Your bag is empty.');
        return;
      }

      root.querySelector('.chk-final-total').textContent = `$${totals.total.toFixed(2)}`;
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
  // 7B. HEADER QUICK SEARCH MODAL
  // =========================================================================
  const SearchModal = {
    init: function () {
      if (document.getElementById('veloura-search-modal')) return;

      const html = `
        <div id="veloura-search-modal" class="modal-root" aria-hidden="true">
          <div class="modal-backdrop"></div>
          <div class="modal-container search-modal-box" role="dialog" aria-modal="true" aria-label="Search botanical catalog">
            <button class="modal-close-btn" aria-label="Close search">&times;</button>
            <span class="kicker" style="margin-bottom:0.6rem">Instant Catalog Search</span>
            <div class="search-input-row">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--mute);flex-shrink:0">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="search" id="veloura-global-search-input" class="search-modal-input" placeholder="Search serums, bakuchiol, rosewater..." autocomplete="off">
            </div>
            <div id="veloura-search-results" class="search-results-grid"></div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', html);

      const root = document.getElementById('veloura-search-modal');
      const backdrop = root.querySelector('.modal-backdrop');
      const closeBtn = root.querySelector('.modal-close-btn');
      const input = document.getElementById('veloura-global-search-input');

      backdrop.addEventListener('click', () => this.close());
      closeBtn.addEventListener('click', () => this.close());
      input.addEventListener('input', () => this.renderResults(input.value));

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && root.classList.contains('active')) {
          this.close();
        }
      });

      this.renderResults('');
    },

    renderResults: function (query) {
      const box = document.getElementById('veloura-search-results');
      if (!box) return;
      const q = (query || '').toLowerCase().trim();
      const matches = Object.values(PRODUCTS).filter(p => {
        if (!q) return ['bloom-serum', 'calm-cream', 'luna-night-oil', 'peony-eye-elixir', 'camellia-hair-mist', 'nocturne-recovery-set'].includes(p.id);
        return (
          p.name.toLowerCase().includes(q) ||
          (p.tagline || '').toLowerCase().includes(q) ||
          (p.category || '').toLowerCase().includes(q) ||
          (p.ingredients || '').toLowerCase().includes(q)
        );
      });

      if (!matches.length) {
        box.innerHTML = `<p style="color:var(--mute);grid-column:1/-1;padding:1.5rem 0;text-align:center">No formulas matching "${escapeHtml(query)}".</p>`;
        return;
      }

      box.innerHTML = matches.slice(0, 6).map(p => `
        <a href="product.html?id=${encodeURIComponent(p.id)}" class="search-result-card">
          <img class="search-result-thumb" src="${escapeHtml(p.image || 'images/serum-dropper.jpg')}" alt="${escapeHtml(p.name)}">
          <div>
            <div style="font-family:'Fraunces',serif;font-weight:600;color:var(--ink);font-size:0.95rem">${escapeHtml(p.name)}</div>
            <div style="font-size:0.76rem;color:var(--mute)">${escapeHtml(p.tagline)}</div>
            <div style="font-size:0.84rem;font-weight:600;color:var(--rose);margin-top:2px">$${Number(p.price).toFixed(0)}</div>
          </div>
        </a>
      `).join('');
    },

    open: function () {
      this.init();
      const root = document.getElementById('veloura-search-modal');
      root.classList.add('active');
      root.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const input = document.getElementById('veloura-global-search-input');
        if (input) input.focus();
      }, 60);
    },

    close: function () {
      const root = document.getElementById('veloura-search-modal');
      if (!root) return;
      root.classList.remove('active');
      root.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // =========================================================================
  // 8. MOBILE NAVIGATION & HEADER ENHANCEMENTS
  // =========================================================================
  function setupHeader() {
    let bar = document.querySelector('.announcement-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'announcement-bar';
      document.body.insertBefore(bar, document.body.firstChild);
    }
    bar.innerHTML = `
      <div class="wrap">
        <span class="announcement-star">✦</span>
        <span>Complimentary botanical travel elixir on orders over $65 · Code <span class="announcement-code">VELOURA15</span> · Carbon-neutral shipping</span>
        <span class="announcement-star">✦</span>
      </div>
    `;

    const navin = document.querySelector('.navin');
    if (!navin) return;

    // 1. Bespoke Brand Lockup
    const brand = navin.querySelector('.brand');
    if (brand && !brand.querySelector('.brand-monogram')) {
      brand.innerHTML = `
        <span class="brand-monogram" aria-hidden="true">
          <svg viewBox="0 0 40 40" class="monogram-svg" width="36" height="36">
            <circle cx="20" cy="20" r="18" fill="rgba(238, 214, 204, 0.45)" stroke="#A85B4E" stroke-width="1.2" stroke-dasharray="2 3" stroke-linecap="round"/>
            <circle cx="20" cy="20" r="14.5" fill="#FBF8F3" stroke="#1D1714" stroke-width="0.8"/>
            <path d="M20 7.5 C20.8 8.8, 22.2 9.5, 20 11.5 C17.8 9.5, 19.2 8.8, 20 7.5 Z" fill="#A85B4E"/>
            <text x="20" y="24.8" font-family="'Fraunces', Georgia, serif" font-size="14.5" font-weight="600" text-anchor="middle" fill="#1D1714">V</text>
          </svg>
        </span>
        <span class="brand-text-group">
          <span class="brand-wordmark">VELOURA</span>
          <span class="brand-sub">BOTANIQUE · EST. 2019</span>
        </span>
      `;
    }

    // 2. Synchronize active nav link and add micro-chips
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = navin.querySelectorAll('.navlinks a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isMatch = href && (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath.startsWith('product.html') && href.startsWith('product.html')));
      if (isMatch) {
        link.classList.add('on');
      } else {
        link.classList.remove('on');
      }

      if (href && href.startsWith('shop.html') && !link.querySelector('.nav-chip')) {
        const chip = document.createElement('span');
        chip.className = 'nav-chip';
        chip.textContent = '20';
        link.appendChild(chip);
      }
      if (href && href.startsWith('ritual.html') && !link.querySelector('.nav-sparkle')) {
        const sparkle = document.createElement('span');
        sparkle.className = 'nav-sparkle';
        sparkle.textContent = '✦';
        link.appendChild(sparkle);
      }
    });

    // 3. User actions wrapper, quick search, shipping perk, and bag pill
    let actionsWrapper = navin.querySelector('.nav-user-actions');
    let bagEl = navin.querySelector('.bag');

    if (!actionsWrapper) {
      actionsWrapper = document.createElement('div');
      actionsWrapper.className = 'nav-user-actions';
      if (bagEl) {
        bagEl.parentNode.insertBefore(actionsWrapper, bagEl);
        actionsWrapper.appendChild(bagEl);
      } else {
        navin.appendChild(actionsWrapper);
      }
    }

    if (!actionsWrapper.querySelector('.nav-perk-badge')) {
      const perkBadge = document.createElement('div');
      perkBadge.className = 'nav-perk-badge';
      perkBadge.innerHTML = `
        <span class="perk-bullet"></span>
        <span>Free Shipping $50+</span>
      `;
      actionsWrapper.insertBefore(perkBadge, actionsWrapper.firstChild);
    }

    if (!actionsWrapper.querySelector('.nav-search-btn')) {
      const searchBtn = document.createElement('button');
      searchBtn.className = 'nav-search-btn';
      searchBtn.setAttribute('type', 'button');
      searchBtn.setAttribute('aria-label', 'Search catalog');
      searchBtn.setAttribute('title', 'Search catalog');
      searchBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      `;
      searchBtn.addEventListener('click', () => SearchModal.open());
      if (bagEl) {
        actionsWrapper.insertBefore(searchBtn, bagEl);
      } else {
        actionsWrapper.appendChild(searchBtn);
      }
    }

    // Enhance bag button
    if (bagEl) {
      const bagCount = Cart.getCount();
      bagEl.classList.toggle('on', currentPath === 'bag.html');
      bagEl.setAttribute('role', 'button');
      bagEl.setAttribute('tabindex', '0');
      bagEl.setAttribute('aria-label', 'Shopping bag');
      bagEl.innerHTML = `
        <svg class="bag-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <span class="bag-label">Bag</span>
        <span class="bag-count" style="${bagCount > 0 ? 'display:flex' : 'display:none'}">${bagCount}</span>
      `;

      if (!bagEl._hasBagListener) {
        bagEl._hasBagListener = true;
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
    }

    // 4. Mobile hamburger button
    let menuBtn = actionsWrapper.querySelector('.menu-toggle');
    if (!menuBtn) {
      menuBtn = document.createElement('button');
      menuBtn.className = 'menu-toggle';
      menuBtn.setAttribute('aria-label', 'Toggle menu');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = `
        <span class="bar top"></span>
        <span class="bar mid"></span>
        <span class="bar bot"></span>
      `;
      actionsWrapper.appendChild(menuBtn);
    }

    // Mobile drawer
    let mobileNav = document.querySelector('.mobile-menu-drawer');
    if (!mobileNav) {
      mobileNav = document.createElement('div');
      mobileNav.className = 'mobile-menu-drawer';
      mobileNav.innerHTML = `
        <ul class="mobile-nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="shop.html">Shop All (20 Formulas)</a></li>
          <li><a href="product.html?id=bloom-serum">Featured Product</a></li>
          <li><a href="ritual.html">The Ritual ✦</a></li>
          <li><a href="about.html">About Veloura</a></li>
          <li><a href="journal.html">Journal</a></li>
          <li><a href="bag.html">Your Ritual Bag</a></li>
        </ul>
        <div class="mobile-menu-footer">
          <a href="shop.html" class="btn" style="width:100%;text-align:center">Explore Collection</a>
        </div>
      `;
      document.querySelector('nav').appendChild(mobileNav);
    }

    if (!menuBtn._hasMenuListener) {
      menuBtn._hasMenuListener = true;
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

  // --- A. SHOP PAGE HANDLER (Dynamic Render + Filter + Search + Sort) ---
  function initShopPage() {
    const gridRoot = document.getElementById('shop-grid-root');
    const chips = document.querySelectorAll('.chips .chip');
    if (!gridRoot || !chips.length) return;

    const searchInput = document.getElementById('shop-search-input');
    const sortSelect = document.getElementById('shop-sort-select');
    const emptyState = document.getElementById('shop-empty-state');
    const resetBtn = document.getElementById('shop-reset-filters');

    let catalog = Object.values(PRODUCTS);
    let activeCat = 'all';
    let searchQuery = '';
    let sortBy = 'featured';

    function renderGrid() {
      let filtered = catalog.filter(p => {
        const catMatch = activeCat === 'all' || (p.category || '').toLowerCase() === activeCat;
        if (!catMatch) return false;
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          (p.tagline || '').toLowerCase().includes(q) ||
          (p.desc || '').toLowerCase().includes(q) ||
          (p.ingredients || '').toLowerCase().includes(q)
        );
      });

      if (sortBy === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5) || (b.reviewsCount || 0) - (a.reviewsCount || 0));
      }

      if (!filtered.length) {
        gridRoot.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
      }

      if (emptyState) emptyState.style.display = 'none';
      gridRoot.innerHTML = filtered.map(renderProductCard).join('');

      gridRoot.querySelectorAll('.quick-add-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          Cart.addItem(btn.getAttribute('data-id'), 1);
        });
      });
    }

    function applyFilter(catVal) {
      activeCat = (catVal || 'all').toLowerCase().trim();
      chips.forEach(c => {
        const chipCat = (c.getAttribute('data-cat') || c.textContent).toLowerCase().trim();
        c.classList.toggle('on', chipCat === activeCat);
      });
      renderGrid();
    }

    chips.forEach(chip => {
      chip.addEventListener('click', e => {
        e.preventDefault();
        applyFilter(chip.getAttribute('data-cat') || chip.textContent);
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value.trim();
        renderGrid();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        sortBy = sortSelect.value;
        renderGrid();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        searchQuery = '';
        sortBy = 'featured';
        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'featured';
        applyFilter('all');
      });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    applyFilter(catParam || 'all');

    // Sync live inventory from Express API cleanly without blocking initial paint
    fetch('/api/products')
      .then(r => (r.ok ? r.json() : null))
      .then(json => {
        if (json && json.success && Array.isArray(json.data) && json.data.length) {
          json.data.forEach(remote => {
            if (PRODUCTS[remote.id]) {
              PRODUCTS[remote.id] = Object.assign({}, PRODUCTS[remote.id], remote);
            }
          });
          catalog = Object.values(PRODUCTS);
          renderGrid();
        }
      })
      .catch(() => {});
  }

  // --- B. PRODUCT DETAIL PAGE HANDLER ---
  function initProductPage() {
    const pd = document.querySelector('.pd');
    if (!pd) return;

    const params = new URLSearchParams(window.location.search);
    const prodId = params.get('id') || 'bloom-serum';
    const prod = PRODUCTS[prodId] || PRODUCTS['bloom-serum'];

    document.title = `${prod.name} — Veloura`;

    const crumb = document.getElementById('pd-crumb-name');
    if (crumb) crumb.textContent = prod.name;

    const visual = pd.querySelector('.pd-visual');
    const mainPhoto = prod.image || 'images/serum-dropper.jpg';
    if (visual) {
      visual.innerHTML = `
        <img class="pd-main-img" src="${escapeHtml(mainPhoto)}" alt="${escapeHtml(prod.name)}"
          onerror="this.style.display='none';this.nextElementSibling.classList.add('show-fallback')">
        <div class="svg-fallback"><svg class="bottle ${escapeHtml(prod.colorClass || '')}" style="width:170px"><use href="#${escapeHtml(prod.vessel || 'bottle')}"/></svg></div>
      `;
    }

    // Update gallery thumbnail buttons dynamically
    const thumbBtns = pd.querySelectorAll('.pd-thumb-btn');
    if (thumbBtns.length) {
      const firstThumbImg = thumbBtns[0].querySelector('img');
      thumbBtns[0].setAttribute('data-img', mainPhoto);
      if (firstThumbImg) firstThumbImg.src = mainPhoto;

      if (thumbBtns[1] && prod.hoverImage) {
        thumbBtns[1].setAttribute('data-img', prod.hoverImage);
        const secondImg = thumbBtns[1].querySelector('img');
        if (secondImg) secondImg.src = prod.hoverImage;
      }

      thumbBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          thumbBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const imgEl = pd.querySelector('.pd-main-img');
          if (imgEl) {
            imgEl.style.display = 'block';
            imgEl.src = btn.getAttribute('data-img');
          }
        });
      });
    }

    const titleEl = pd.querySelector('h1');
    if (titleEl) titleEl.textContent = prod.name;

    const priceEl = pd.querySelector('.price');
    if (priceEl) priceEl.textContent = `$${Number(prod.price).toFixed(0)}`;

    const starsEl = pd.querySelector('.stars');
    if (starsEl) {
      starsEl.innerHTML = `★★★★★ <a href="#reviews-section" style="color:var(--mute);font-size:.85rem;text-decoration:underline">(${escapeHtml(prod.reviewsCount || 90)} verified reviews)</a>`;
    }

    const descEl = pd.querySelector('.desc');
    if (descEl) descEl.textContent = prod.desc;

    let currentQty = 1;
    let selectedVariant = prod.variants ? prod.variants[0] : 'Classic Glass';
    const variantLabel = document.getElementById('pd-variant-label');
    if (variantLabel) variantLabel.textContent = selectedVariant;

    const qtyContainer = pd.querySelector('.qty');
    if (qtyContainer) {
      qtyContainer.innerHTML = `
        <div class="qty-control-box">
          <button class="pd-qty-btn dec" aria-label="Decrease quantity">−</button>
          <span class="pd-qty-val">1</span>
          <button class="pd-qty-btn inc" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn pd-add-btn" style="flex:1">Add to bag — $${Number(prod.price).toFixed(0)}</button>
      `;

      const qtyVal = qtyContainer.querySelector('.pd-qty-val');
      const addBtn = qtyContainer.querySelector('.pd-add-btn');

      qtyContainer.querySelector('.dec').addEventListener('click', () => {
        if (currentQty > 1) {
          currentQty--;
          qtyVal.textContent = currentQty;
          addBtn.textContent = `Add to bag — $${(prod.price * currentQty).toFixed(0)}`;
        }
      });

      qtyContainer.querySelector('.inc').addEventListener('click', () => {
        currentQty++;
        qtyVal.textContent = currentQty;
        addBtn.textContent = `Add to bag — $${(prod.price * currentQty).toFixed(0)}`;
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
            if (variantLabel) variantLabel.textContent = selectedVariant;
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
            <p>${escapeHtml(prod.ingredients)}</p>
          </div>
        </div>

        <div class="accordion-item">
          <button class="accordion-trigger" aria-expanded="false">
            <span>How to use</span>
            <span class="symbol">+</span>
          </button>
          <div class="accordion-content">
            <p>${escapeHtml(prod.usage)}</p>
          </div>
        </div>

        <div class="accordion-item">
          <button class="accordion-trigger" aria-expanded="false">
            <span>Shipping &amp; Refill Program</span>
            <span class="symbol">+</span>
          </button>
          <div class="accordion-content">
            <p>${escapeHtml(prod.shipping)}</p>
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

    // Live Reviews System wired to /api/reviews/:productId
    const reviewsGrid = document.getElementById('pd-reviews-grid');
    const scoreEl = document.getElementById('pd-review-score');
    const countNoteEl = document.getElementById('pd-review-count-note');
    const toggleFormBtn = document.getElementById('toggle-review-form-btn');
    const formWrap = document.getElementById('pd-review-form-wrap');
    const reviewForm = document.getElementById('pd-review-form');
    const cancelFormBtn = document.getElementById('cancel-review-form-btn');

    const FALLBACK_REVIEWS = [
      {
        author: 'Nina R.',
        rating: 5,
        title: `Why ${prod.name} stays on my vanity`,
        comment: 'Absorbs immediately without any sticky silicone residue. Sensitive cheeks stay calm all day.',
        createdAt: '2026-10-28T12:00:00Z'
      },
      {
        author: 'Julian M.',
        rating: 5,
        title: 'Heavy glass & clean botanical purity',
        comment: 'You can feel the freshness of cold-pressed extracts right away. The refill system saves so much waste.',
        createdAt: '2026-11-04T15:30:00Z'
      },
      {
        author: 'Sophie C.',
        rating: 5,
        title: 'Effortless daily staple',
        comment: 'Completely simplified my routine down to three intentional steps with visible glow.',
        createdAt: '2026-11-12T09:45:00Z'
      }
    ];

    function renderReviewsList(list) {
      if (!reviewsGrid) return;
      const items = list && list.length ? list : FALLBACK_REVIEWS;
      if (scoreEl) scoreEl.textContent = Number(prod.rating || 4.9).toFixed(1);
      if (countNoteEl) countNoteEl.textContent = `Based on ${prod.reviewsCount || items.length} verified reviews`;

      reviewsGrid.innerHTML = items.map(rev => {
        const initials = (rev.author || 'V').split(/\s+/).map(s => s[0] || '').join('').slice(0, 2).toUpperCase() || 'V';
        const stars = '★'.repeat(Math.min(5, Math.max(1, rev.rating || 5))) + '☆'.repeat(Math.max(0, 5 - (rev.rating || 5)));
        const dateStr = rev.createdAt ? new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Verified Ritual';
        return `
          <div class="review-card">
            <div class="review-card-head">
              <div class="review-author-info">
                <div class="author-avatar">${escapeHtml(initials)}</div>
                <div>
                  <div class="author-name">${escapeHtml(rev.author || 'Verified Customer')}</div>
                  <div class="verified-tag">✓ Verified Buyer</div>
                </div>
              </div>
              <div style="color:var(--rose);font-size:0.85rem">${stars}</div>
            </div>
            <h4>${escapeHtml(rev.title || 'Botanical Ritual Review')}</h4>
            <p>"${escapeHtml(rev.comment)}"</p>
            <div class="review-date">${escapeHtml(dateStr)}</div>
          </div>
        `;
      }).join('');
    }

    renderReviewsList(FALLBACK_REVIEWS);

    fetch(`/api/reviews/${encodeURIComponent(prod.id)}`)
      .then(r => (r.ok ? r.json() : null))
      .then(json => {
        if (json && json.success && Array.isArray(json.data) && json.data.length) {
          renderReviewsList([...json.data, ...FALLBACK_REVIEWS].slice(0, 6));
        }
      })
      .catch(() => {});

    if (toggleFormBtn && formWrap) {
      toggleFormBtn.addEventListener('click', () => {
        formWrap.style.display = formWrap.style.display === 'none' ? 'block' : 'none';
      });
    }
    if (cancelFormBtn && formWrap) {
      cancelFormBtn.addEventListener('click', () => {
        formWrap.style.display = 'none';
      });
    }
    if (reviewForm) {
      reviewForm.addEventListener('submit', async e => {
        e.preventDefault();
        const author = document.getElementById('rev-author').value.trim();
        const rating = parseInt(document.getElementById('rev-rating').value, 10) || 5;
        const title = document.getElementById('rev-title').value.trim();
        const comment = document.getElementById('rev-comment').value.trim();

        const newReview = { author, rating, title, comment, createdAt: new Date().toISOString() };
        try {
          const res = await fetch(`/api/reviews/${encodeURIComponent(prod.id)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReview)
          });
          const json = await res.json();
          if (res.ok && json.success) {
            Toast.show(json.message || 'Thank you! Your review has been published.');
            renderReviewsList([json.data || newReview, ...FALLBACK_REVIEWS]);
          } else {
            Toast.show(json.error || 'Could not submit review.');
            return;
          }
        } catch (err) {
          Toast.show('Review saved locally for preview.');
          renderReviewsList([newReview, ...FALLBACK_REVIEWS]);
        }

        reviewForm.reset();
        if (formWrap) formWrap.style.display = 'none';
      });
    }

    // Dynamic "Pairs beautifully with" recommendations
    const relatedSection = document.querySelector('.related-products-section');
    if (relatedSection) {
      const allProductKeys = Object.keys(PRODUCTS).filter(k => k !== prod.id && k !== 'ritual-duo' && k !== 'full-ritual-set');
      const recommendations = allProductKeys.slice(0, 3).map(k => PRODUCTS[k]);

      const grid = relatedSection.querySelector('.grid.g3');
      if (grid && recommendations.length >= 3) {
        grid.innerHTML = recommendations.map(renderProductCard).join('');
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

  // --- E. HOME PAGE INTERACTIVE FEATURES ---
  const INGREDIENT_SPOTLIGHTS = {
    vitc: {
      title: '12% THD Vitamin C + Olive Squalane',
      copy: 'Lipid-soluble vitamin C penetrates the moisture barrier gently without sting or oxidation, paired with cold-pressed olive squalane to illuminate tone and prevent transepidermal water loss.'
    },
    centella: {
      title: 'Madecassoside Centella + Colloidal Oat Milk',
      copy: 'Concentrated Asian Centella fractions calm flushed sensitivity within hours while colloidal beta-glucans replenish essential skin lipids without blocking pores.'
    },
    bakuchiol: {
      title: 'Moroccan Blue Tansy + 1% Botanical Bakuchiol',
      copy: 'Cold-pressed blue chamomile naturally cools redness alongside 1% clinically validated babchi plant bakuchiol—delivering retinol-grade overnight smoothing without photosensitivity or peeling.'
    },
    marula: {
      title: 'Cold-Pressed Marula + Distilled Rosemary',
      copy: 'Nutrient-dense omega-9 marula oil seals dry strands and shields thermal damage while steam-distilled Grasse rosemary stimulates scalp microcirculation cleanly.'
    }
  };

  const ROUTINE_MODES = {
    am: [
      { id: 'soft-wash', step: 'Step 01 · Cleanse', name: 'Soft Wash Gel', desc: 'pH-balanced oat milk cleanse', price: 24, img: 'images/soft-wash.jpg' },
      { id: 'bloom-serum', step: 'Step 02 · Treat', name: 'Bloom Vitamin C Serum', desc: 'Antioxidant glow + squalane', price: 42, img: 'images/serum-dropper.jpg' },
      { id: 'calm-cream', step: 'Step 03 · Seal', name: 'Calm Barrier Cream', desc: 'Ceramide + centella cocoon', price: 38, img: 'images/cream-jar.jpg' }
    ],
    pm: [
      { id: 'clarity-cleanser', step: 'Step 01 · Melt SPF', name: 'Clarity Cleansing Oil', desc: 'Camellia double-cleanse melt', price: 32, img: 'images/cleansing-oil.jpg' },
      { id: 'luna-night-oil', step: 'Step 02 · Renew', name: 'Luna Night Oil', desc: 'Blue tansy + 1% bakuchiol renewal', price: 48, img: 'images/oil-flacon.jpg' },
      { id: 'calm-cream', step: 'Step 03 · Barrier', name: 'Calm Barrier Cream', desc: 'Nocturnal lipid recovery', price: 38, img: 'images/cream-jar.jpg' }
    ]
  };

  function initHomePage() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // 1. Quick Add buttons (Hero Spotlight, Bestseller Overlay, Routine Bar)
    document.querySelectorAll('.home-quick-add').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        Cart.addItem(id, 1);
      });
    });

    // 2. Signature Bestsellers filter pills
    const homeChips = document.querySelectorAll('.home-filter-chip');
    const homeCards = document.querySelectorAll('.home-products-grid .card');
    homeChips.forEach(chip => {
      chip.addEventListener('click', () => {
        homeChips.forEach(c => c.classList.remove('on'));
        chip.classList.add('on');
        const filter = chip.getAttribute('data-filter');
        homeCards.forEach(card => {
          const cat = card.getAttribute('data-home-cat');
          card.style.display = (filter === 'all' || cat === filter) ? 'flex' : 'none';
        });
      });
    });

    // 3. Interactive Botanical Ingredient Tabs
    const ingTabs = document.querySelectorAll('.ingredient-tab');
    const ingPanel = document.getElementById('ingredient-spotlight-panel');
    ingTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        ingTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const info = INGREDIENT_SPOTLIGHTS[tab.getAttribute('data-ing')];
        if (info && ingPanel) {
          ingPanel.innerHTML = `<h4>${escapeHtml(info.title)}</h4><p>${escapeHtml(info.copy)}</p>`;
        }
      });
    });

    // 4. Interactive AM / PM Routine Mode Switcher
    const modeBtns = document.querySelectorAll('.routine-mode-btn');
    const routineList = document.getElementById('home-routine-list');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const items = ROUTINE_MODES[btn.getAttribute('data-mode')] || ROUTINE_MODES.am;
        if (routineList) {
          routineList.innerHTML = items.map(step => `
            <a href="product.html?id=${encodeURIComponent(step.id)}" class="routine-step-row">
              <img class="routine-step-thumb" src="${escapeHtml(step.img)}" alt="${escapeHtml(step.name)}">
              <div>
                <span class="routine-step-num">${escapeHtml(step.step)}</span>
                <div class="routine-step-name">${escapeHtml(step.name)}</div>
                <div class="routine-step-desc">${escapeHtml(step.desc)}</div>
              </div>
              <span class="routine-step-price">$${step.price}</span>
            </a>
          `).join('');
        }
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

    initScrollReveal: function () {
      const revealAll = () => {
        document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right').forEach(el => {
          el.classList.add('revealed');
        });
      };

      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealAll();
        return;
      }

      document.body.classList.add('veloura-anim-ready');

      document.querySelectorAll('.section-head').forEach(el => {
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
      });

      const gridSelectors = ['.home-products-grid', '.category-grid', '.reviews-strip-grid', '.steps', '.ing', '.stats'];
      gridSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(container => {
          const children = Array.from(container.children);
          children.forEach((child, idx) => {
            if (!child.classList.contains('reveal')) {
              child.classList.add('reveal');
              child.classList.add(`reveal-delay-${Math.min(6, (idx % 6) + 1)}`);
            }
          });
        });
      });

      const revealElements = Array.from(document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right'));
      if (!revealElements.length) return;

      const sweepVisibleOrPassed = () => {
        const triggerBottom = window.innerHeight + 80;
        revealElements.forEach(el => {
          if (el.classList.contains('revealed')) return;
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerBottom) {
            el.classList.add('revealed');
          }
        });
      };

      // Immediately reveal anything visible or above fold
      sweepVisibleOrPassed();

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              obs.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.01,
          rootMargin: '80px 0px 80px 0px'
        });

        revealElements.forEach(el => {
          if (!el.classList.contains('revealed')) {
            observer.observe(el);
          }
        });
      }

      window.addEventListener('scroll', sweepVisibleOrPassed, { passive: true });
      window.addEventListener('resize', sweepVisibleOrPassed, { passive: true });

      // Hard safety guarantee: reveal any remaining elements if user loads mid-page or observer lags
      setTimeout(sweepVisibleOrPassed, 400);
    }
  };

  // =========================================================================
  // 12. INITIALIZATION ON DOM READY
  // =========================================================================
  function runSafe(fn) {
    try {
      fn();
    } catch (err) {
      console.error('[Veloura Init]', err);
    }
  }

  function init() {
    runSafe(() => setupHeader());
    runSafe(() => setupFooter());
    runSafe(() => updateCartBadges());
    runSafe(() => initNewsletterForms());

    runSafe(() => initShopPage());
    runSafe(() => initProductPage());
    runSafe(() => initJournalPage());
    runSafe(() => initRitualPage());
    runSafe(() => initHomePage());
    runSafe(() => BagPage.init());

    runSafe(() => Drawer.init());
    runSafe(() => CheckoutModal.init());
    runSafe(() => ArticleModal.init());
    runSafe(() => SearchModal.init());
    runSafe(() => ScrollManager.init());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.Veloura = {
    Cart: Cart,
    BagPage: BagPage,
    Drawer: Drawer,
    Toast: Toast,
    Checkout: CheckoutModal,
    Article: ArticleModal,
    Search: SearchModal
  };
})();
