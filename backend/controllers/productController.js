/**
 * Product Controller
 */
const db = require('../data/database');

exports.getAllProducts = (req, res, next) => {
  try {
    const { category, search } = req.query;
    const products = db.getProducts({ category, search });

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = (req, res, next) => {
  try {
    const { id } = req.params;
    const product = db.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product with id '${id}' not found.`
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

exports.getCategories = (req, res, next) => {
  try {
    const products = db.getProducts();
    const categoryCounts = {};

    products.forEach(p => {
      const cat = p.category;
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const categories = Object.keys(categoryCounts).map(name => ({
      name,
      count: categoryCounts[name]
    }));

    res.json({
      success: true,
      data: [
        { name: 'all', count: products.length },
        ...categories
      ]
    });
  } catch (err) {
    next(err);
  }
};
