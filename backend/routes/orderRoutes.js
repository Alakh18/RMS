// src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();

const { 
  addToCart, 
  initiatePayment, 
  verifyOrder, 
  getMyCart,
  // confirmOrder,       <-- COMMENTED OUT: Missing in controller
  submitQuotation, 
  getQuotationStatus, 
  payOrder 
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

// POST /api/orders/submit-quotation -> Move DRAFT to SENT
router.post('/submit-quotation', submitQuotation);

// GET /api/orders/quotation-status -> Customer view quotation status
router.get('/quotation-status', getQuotationStatus);

// POST /api/orders/pay -> Record payment for approved quotation
router.post('/pay', payOrder);

// POST /api/orders/confirm -> Convert Quotation to Rental Order
// router.post('/confirm', confirmOrder);  <-- COMMENTED OUT until controller is fixed

module.exports = router;