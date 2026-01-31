// backend/routes/vendor/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const vendorAuth = require('../../middleware/vendorAuth');
const {
  getVendorInvoices,
  getInvoiceDetail,
  downloadInvoicePDF,
} = require('../../controllers/vendor/invoiceController');

// All invoice routes require vendor authentication
router.use(vendorAuth);

// GET /api/vendor/invoices
router.get('/', getVendorInvoices);

// GET /api/vendor/invoices/:invoiceId
router.get('/:invoiceId', getInvoiceDetail);

// GET /api/vendor/invoices/:invoiceId/pdf
router.get('/:invoiceId/pdf', downloadInvoicePDF);

module.exports = router;
