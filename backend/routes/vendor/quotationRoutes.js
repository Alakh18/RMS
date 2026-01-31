const express = require('express');
const router = express.Router();
const { 
  getVendorQuotations, 
  approveQuotation, 
  rejectQuotation 
} = require('../../controllers/vendor/quotationController');
const { verifyToken } = require('../../middlewares/authMiddleware');
// You might also have a vendorMiddleware to check role='VENDOR'

router.use(verifyToken);

// GET /api/vendor/quotations
router.get('/', getVendorQuotations);

// PATCH /api/vendor/quotations/:quotationId/approve
router.patch('/:quotationId/approve', approveQuotation);

// PATCH /api/vendor/quotations/:quotationId/reject
router.patch('/:quotationId/reject', rejectQuotation);

module.exports = router;