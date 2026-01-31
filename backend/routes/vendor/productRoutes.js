// backend/routes/vendor/productRoutes.js
const express = require('express');
const router = express.Router();
const vendorAuth = require('../../middleware/vendorAuth');
const {
  getVendorProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../../controllers/vendor/productController');

// All product routes require vendor authentication
router.use(vendorAuth);

// GET /api/vendor/products
router.get('/', getVendorProducts);

// POST /api/vendor/products
router.post('/', createProduct);

// PUT /api/vendor/products/:productId
router.put('/:productId', updateProduct);

// DELETE /api/vendor/products/:productId
router.delete('/:productId', deleteProduct);

module.exports = router;
