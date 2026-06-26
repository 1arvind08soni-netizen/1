const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      'SELECT * FROM products WHERE status = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      ['active', limit, offset]
    );

    const countResult = await pool.query('SELECT COUNT(*) FROM products WHERE status = $1', ['active']);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      data: result.rows,
      total,
      page,
      limit
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const { name, description, metal_type, weight, weight_unit, purity, buying_price, selling_price } = req.body;
    const product_code = `PROD-${uuidv4().substring(0, 8).toUpperCase()}`;
    const barcode_data = `BC-${Date.now()}`;

    const result = await pool.query(
      'INSERT INTO products (product_code, name, description, metal_type, weight, weight_unit, purity, buying_price, selling_price, barcode_data, quantity_in_stock) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [product_code, name, description, metal_type, weight, weight_unit, purity, buying_price, selling_price, barcode_data, 0]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get product by barcode
const getProductByBarcode = async (req, res) => {
  try {
    const { barcode } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE barcode_data = $1', [barcode]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, metal_type, weight, purity, buying_price, selling_price } = req.body;

    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, metal_type = $3, weight = $4, purity = $5, buying_price = $6, selling_price = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
      [name, description, metal_type, weight, purity, buying_price, selling_price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  getProductByBarcode,
  updateProduct
};