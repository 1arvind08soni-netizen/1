const pool = require('../config/database');
const { generateLoanNumber } = require('../utils/barcodeGenerator');

// Create loan account
const createLoan = async (req, res) => {
  try {
    const { client_id, principal_amount, interest_rate, loan_start_date, total_duration_months } = req.body;
    const loan_number = generateLoanNumber();
    const loan_end_date = new Date(loan_start_date);
    loan_end_date.setMonth(loan_end_date.getMonth() + total_duration_months);

    const result = await pool.query(
      'INSERT INTO loan_accounts (loan_number, client_id, principal_amount, interest_rate, loan_start_date, loan_end_date, total_duration_months, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [loan_number, client_id, principal_amount, interest_rate, loan_start_date, loan_end_date, total_duration_months, 'active']
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all loans
const getAllLoans = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      'SELECT l.*, c.name as client_name FROM loan_accounts l LEFT JOIN clients c ON l.client_id = c.id ORDER BY l.created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const countResult = await pool.query('SELECT COUNT(*) FROM loan_accounts');
    const total = parseInt(countResult.rows[0].count);

    res.json({ success: true, data: result.rows, total, page, limit });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Record loan payment
const recordLoanPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { principal_paid, interest_paid, payment_date, payment_mode } = req.body;
    const total_paid = principal_paid + interest_paid;

    const result = await pool.query(
      'INSERT INTO loan_payments (loan_id, principal_paid, interest_paid, total_paid, payment_date, payment_mode) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, principal_paid, interest_paid, total_paid, payment_date, payment_mode]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get loan balance
const getLoanBalance = async (req, res) => {
  try {
    const { id } = req.params;

    const loanResult = await pool.query('SELECT * FROM loan_accounts WHERE id = $1', [id]);
    if (loanResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Loan not found' });
    }

    const paymentsResult = await pool.query(
      'SELECT SUM(principal_paid) as total_principal, SUM(interest_paid) as total_interest FROM loan_payments WHERE loan_id = $1',
      [id]
    );

    const loan = loanResult.rows[0];
    const payments = paymentsResult.rows[0];

    const principalPaid = parseFloat(payments.total_principal) || 0;
    const interestPaid = parseFloat(payments.total_interest) || 0;
    const principalRemaining = loan.principal_amount - principalPaid;

    res.json({
      success: true,
      data: {
        loan_id: loan.id,
        principal_amount: loan.principal_amount,
        principal_paid: principalPaid,
        principal_remaining: principalRemaining,
        interest_rate: loan.interest_rate,
        interest_paid: interestPaid,
        status: loan.status
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createLoan,
  getAllLoans,
  recordLoanPayment,
  getLoanBalance
};