const express = require('express');
const router = express.Router();
const { addToCart, confirmOrder, getMyCart, submitQuotation, getQuotationStatus, payOrder } = require('../controllers/orderController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);

router.get('/cart', getMyCart);
router.post('/cart', addToCart);

// POST /api/orders/submit-quotation -> Move DRAFT to SENT
router.post('/submit-quotation', submitQuotation);

// GET /api/orders/quotation-status -> Customer view quotation status
router.get('/quotation-status', getQuotationStatus);

// POST /api/orders/pay -> Record payment for approved quotation
router.post('/pay', payOrder);

// POST /api/orders/confirm -> Convert Quotation to Rental Order
router.post('/confirm', confirmOrder);

module.exports = router;