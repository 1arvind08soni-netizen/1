const pool = require('../config/database');
const { generateQuoteNumber } = require('../utils/barcodeGenerator');

// Create quotation
const createQuotation = async (req, res) => {
  try {
    const { client_id, quote_type, items, expiry_date } = req.body;
    const quote_number = generateQuoteNumber();

    let total_amount = 0;
    items.forEach(item => {
      total_amount += item.quantity * item.unit_price;
    });

    const tax_amount = total_amount * 0.18; // 18% GST
    const net_amount = total_amount + tax_amount;

    const result = await pool.query(
      'INSERT INTO quotations (quote_number, client_id, quote_type, total_amount, tax_amount, net_amount, expiry_date, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [quote_number, client_id, quote_type, total_amount, tax_amount, net_amount, expiry_date, 'pending']
    );

    const quote_id = result.rows[0].id;

    // Insert quote items
    for (const item of items) {
      const line_total = item.quantity * item.unit_price;
      await pool.query(
        'INSERT INTO quote_items (quote_id, product_id, quantity, unit_price, line_total) VALUES ($1, $2, $3, $4, $5)',
        [quote_id, item.product_id, item.quantity, item.unit_price, line_total]
      );
    }

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all quotations
const getAllQuotations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      'SELECT q.*, c.name as client_name FROM quotations q LEFT JOIN clients c ON q.client_id = c.id ORDER BY q.quote_date DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const countResult = await pool.query('SELECT COUNT(*) FROM quotations');
    const total = parseInt(countResult.rows[0].count);

    res.json({ success: true, data: result.rows, total, page, limit });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update quotation status
const updateQuotationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      'UPDATE quotations SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Quotation not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createQuotation,
  getAllQuotations,
  updateQuotationStatus
};