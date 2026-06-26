const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/auth');

// Report routes
router.get('/daily-summary', authMiddleware, reportController.getDailySummary);
router.get('/sales-summary', authMiddleware, reportController.getSalesSummary);
router.get('/inventory', authMiddleware, reportController.getInventoryReport);
router.get('/client-ledger/:client_id', authMiddleware, reportController.getClientLedger);

module.exports = router;