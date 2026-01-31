const express = require('express');
const router = express.Router();
const { getPublishedProducts } = require('../controllers/productController');

// Public products listing
router.get('/', getPublishedProducts);

module.exports = router;
