const pool = require('../config/database');

// Get daily summary
const getDailySummary = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const salesResult = await pool.query(
      'SELECT COUNT(*) as total_sales, SUM(net_amount) as total_amount FROM sales WHERE DATE(sale_date) = $1',
      [today]
    );

    const purchasesResult = await pool.query(
      'SELECT COUNT(*) as total_purchases, SUM(net_amount) as total_amount FROM purchases WHERE DATE(purchase_date) = $1',
      [today]
    );

    const paymentsResult = await pool.query(
      'SELECT SUM(payment_amount) as total_payments FROM client_payments WHERE DATE(payment_date) = $1',
      [today]
    );

    res.json({
      success: true,
      data: {
        date: today,
        sales: salesResult.rows[0],
        purchases: purchasesResult.rows[0],
        payments: paymentsResult.rows[0]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get sales summary
const getSalesSummary = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const result = await pool.query(
      'SELECT COUNT(*) as total_sales, SUM(total_amount) as total_amount, SUM(tax_amount) as total_tax, SUM(net_amount) as net_total FROM sales WHERE sale_date BETWEEN $1 AND $2',
      [start_date || new Date(new Date().setDate(new Date().getDate() - 30)), end_date || new Date()]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get inventory report
const getInventoryReport = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, product_code, metal_type, weight, quantity_in_stock, buying_price, selling_price, (quantity_in_stock * buying_price) as stock_value FROM products WHERE status = $1 ORDER BY metal_type',
      ['active']
    );

    let totalValue = 0;
    let goldTotal = 0;
    let silverTotal = 0;

    result.rows.forEach(product => {
      totalValue += product.stock_value || 0;
      if (product.metal_type === 'gold') {
        goldTotal += product.stock_value || 0;
      } else if (product.metal_type === 'silver') {
        silverTotal += product.stock_value || 0;
      }
    });

    res.json({
      success: true,
      data: {
        products: result.rows,
        summary: {
          total_stock_value: totalValue,
          gold_stock_value: goldTotal,
          silver_stock_value: silverTotal,
          total_items: result.rows.length
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get client ledger
const getClientLedger = async (req, res) => {
  try {
    const { client_id } = req.params;

    const client = await pool.query('SELECT * FROM clients WHERE id = $1', [client_id]);
    if (client.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Client not found' });
    }

    const transactions = await pool.query(
      'SELECT * FROM sales WHERE client_id = $1 ORDER BY sale_date DESC',
      [client_id]
    );

    const payments = await pool.query(
      'SELECT * FROM client_payments WHERE client_id = $1 ORDER BY payment_date DESC',
      [client_id]
    );

    res.json({
      success: true,
      data: {
        client: client.rows[0],
        transactions: transactions.rows,
        payments: payments.rows
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getDailySummary,
  getSalesSummary,
  getInventoryReport,
  getClientLedger
};