// backend/routes/vendor/index.js
const express = require('express');
const router = express.Router();

// Import vendor route modules
const dashboardRoutes = require('./dashboardRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const quotationRoutes = require('./quotationRoutes');
const invoiceRoutes = require('./invoiceRoutes');
const reportRoutes = require('./reportRoutes');

// Register vendor sub-routes
// Each route is prefixed with /api/vendor/
router.use('/dashboard', dashboardRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/quotations', quotationRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/reports', reportRoutes);

module.exports = router;
