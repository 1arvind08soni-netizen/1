const pool = require('../config/database');

// Create new sale
const createSale = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { client_id, items, tax_amount, discount_amount, payment_mode, notes } = req.body;
    const invoice_number = `INV-${Date.now()}`;

    let total_amount = 0;
    items.forEach(item => {
      total_amount += item.quantity * item.unit_price;
    });

    const net_amount = total_amount + tax_amount - discount_amount;

    // Insert sale
    const saleResult = await client.query(
      'INSERT INTO sales (invoice_number, client_id, total_amount, tax_amount, discount_amount, net_amount, payment_status, payment_mode, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [invoice_number, client_id, total_amount, tax_amount, discount_amount, net_amount, 'pending', payment_mode, notes]
    );

    const sale_id = saleResult.rows[0].id;

    // Insert sale items
    for (const item of items) {
      const line_total = item.quantity * item.unit_price;
      await client.query(
        'INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, line_total) VALUES ($1, $2, $3, $4, $5)',
        [sale_id, item.product_id, item.quantity, item.unit_price, line_total]
      );

      // Update product stock
      await client.query(
        'UPDATE products SET quantity_in_stock = quantity_in_stock - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );

      // Record stock transaction
      await client.query(
        'INSERT INTO stock_transactions (product_id, transaction_type, quantity, reference_type, reference_id) VALUES ($1, $2, $3, $4, $5)',
        [item.product_id, 'sale', item.quantity, 'sale', sale_id]
      );
    }

    // Update client due amount
    await client.query(
      'UPDATE clients SET current_due = current_due + $1 WHERE id = $2',
      [net_amount, client_id]
    );

    await client.query('COMMIT');
    res.status(201).json({ success: true, data: saleResult.rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ success: false, error: error.message });
  } finally {
    client.release();
  }
};

// Get all sales
const getAllSales = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      'SELECT s.*, c.name as client_name FROM sales s LEFT JOIN clients c ON s.client_id = c.id ORDER BY s.sale_date DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const countResult = await pool.query('SELECT COUNT(*) FROM sales');
    const total = parseInt(countResult.rows[0].count);

    res.json({ success: true, data: result.rows, total, page, limit });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get sale by ID with items
const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM sales WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Sale not found' });
    }

    const itemsResult = await pool.query('SELECT * FROM sale_items WHERE sale_id = $1', [id]);
    const sale = result.rows[0];
    sale.items = itemsResult.rows;

    res.json({ success: true, data: sale });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById
};