const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');
const authMiddleware = require('../middleware/auth');

// Quotation routes
router.get('/', authMiddleware, quotationController.getAllQuotations);
router.post('/', authMiddleware, quotationController.createQuotation);
router.put('/:id/status', authMiddleware, quotationController.updateQuotationStatus);

module.exports = router;