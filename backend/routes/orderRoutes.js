// src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { 
  addToCart, 
  initiatePayment, 
  verifyOrder, 
  getMyCart 
} = require('../controllers/orderController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Protect all routes (User must be logged in)
router.use(verifyToken);

// GET /api/orders/cart -> View current Quotation (Draft Order)
router.get('/cart', getMyCart);

// POST /api/orders/cart -> Add item to Quotation
router.post('/cart', addToCart);

// POST /api/orders/initiate -> Step 1: Create Razorpay Order & Check Stock
router.post('/initiate', initiatePayment);

// POST /api/orders/verify -> Step 2: Verify Payment & Confirm Order
router.post('/verify', verifyOrder);

module.exports = router;