const express = require('express');
const router = express.Router();
// ✅ Import must match the export names
const { addToCart, submitQuotation, getMyCart, updateCartItem, removeCartItem } = require('../controllers/orderController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);

router.get('/cart', getMyCart);
router.post('/cart', addToCart);
router.put('/cart/item/:itemId', updateCartItem);
router.delete('/cart/item/:itemId', removeCartItem);
router.post('/confirm', submitQuotation); // ✅ Used here

module.exports = router;