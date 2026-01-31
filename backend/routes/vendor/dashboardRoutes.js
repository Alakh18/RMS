// backend/routes/vendor/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const vendorAuth = require('../../middlewares/vendorAuth');
const { getDashboardStats } = require('../../controllers/vendor/dashboardController');

// GET /api/vendor/dashboard/stats
router.get('/stats', vendorAuth, getDashboardStats);

module.exports = router;
