const pool = require('../config/database');

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      'SELECT * FROM clients ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const countResult = await pool.query('SELECT COUNT(*) FROM clients');
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

// Get client by ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Client not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new client
const createClient = async (req, res) => {
  try {
    const { name, phone, email, address, city, state, pincode, gst_number, credit_limit } = req.body;

    const result = await pool.query(
      'INSERT INTO clients (name, phone, email, address, city, state, pincode, gst_number, credit_limit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [name, phone, email, address, city, state, pincode, gst_number, credit_limit || 0]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, address, city, state, pincode, gst_number, credit_limit } = req.body;

    const result = await pool.query(
      'UPDATE clients SET name = $1, phone = $2, email = $3, address = $4, city = $5, state = $6, pincode = $7, gst_number = $8, credit_limit = $9, updated_at = CURRENT_TIMESTAMP WHERE id = $10 RETURNING *',
      [name, phone, email, address, city, state, pincode, gst_number, credit_limit, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Client not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete client
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Client not found' });
    }

    res.json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};