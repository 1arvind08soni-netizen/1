const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const authMiddleware = require('../middleware/auth');

// Sales routes
router.get('/', authMiddleware, salesController.getAllSales);
router.post('/', authMiddleware, salesController.createSale);
router.get('/:id', authMiddleware, salesController.getSaleById);

module.exports = router;