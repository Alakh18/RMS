// backend/routes/vendor/quotationRoutes.js
const express = require('express');
const router = express.Router();
const vendorAuth = require('../../middleware/vendorAuth');
const {
  getVendorQuotations,
  approveQuotation,
  rejectQuotation,
} = require('../../controllers/vendor/quotationController');

// All quotation routes require vendor authentication
router.use(vendorAuth);

// GET /api/vendor/quotations
router.get('/', getVendorQuotations);

// PATCH /api/vendor/quotations/:quotationId/approve
router.patch('/:quotationId/approve', approveQuotation);

// PATCH /api/vendor/quotations/:quotationId/reject
router.patch('/:quotationId/reject', rejectQuotation);

module.exports = router;
