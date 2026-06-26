const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// Product routes
router.get('/', authMiddleware, productController.getAllProducts);
router.post('/', authMiddleware, productController.createProduct);
router.get('/:id', authMiddleware, productController.getProductById);
router.get('/barcode/:barcode', authMiddleware, productController.getProductByBarcode);
router.put('/:id', authMiddleware, productController.updateProduct);

module.exports = router;