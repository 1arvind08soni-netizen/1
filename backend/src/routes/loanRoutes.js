const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const authMiddleware = require('../middleware/auth');

// Loan routes
router.get('/', authMiddleware, loanController.getAllLoans);
router.post('/', authMiddleware, loanController.createLoan);
router.post('/:id/payments', authMiddleware, loanController.recordLoanPayment);
router.get('/:id/balance', authMiddleware, loanController.getLoanBalance);

module.exports = router;