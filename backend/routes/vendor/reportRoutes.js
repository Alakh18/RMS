// backend/routes/vendor/reportRoutes.js
const express = require('express');
const router = express.Router();
const vendorAuth = require('../../middlewares/vendorAuth');
const { getVendorReports } = require('../../controllers/vendor/reportController');

// All report routes require vendor authentication
router.use(vendorAuth);

// GET /api/vendor/reports?start=DATE&end=DATE
router.get('/', getVendorReports);

module.exports = router;
