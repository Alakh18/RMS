// backend/routes/vendor/orderRoutes.js
const express = require('express');
const router = express.Router();
const vendorAuth = require('../../middleware/vendorAuth');
const {
  getVendorOrders,
  updateOrderStatus,
  getOrderDetail,
} = require('../../controllers/vendor/orderController');

// All order routes require vendor authentication
router.use(vendorAuth);

// GET /api/vendor/orders
router.get('/', getVendorOrders);

// GET /api/vendor/orders/:orderId
router.get('/:orderId', getOrderDetail);

// PATCH /api/vendor/orders/:orderId/status
router.patch('/:orderId/status', updateOrderStatus);

module.exports = router;
