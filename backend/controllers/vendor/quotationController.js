// backend/controllers/vendor/quotationController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all vendor quotations
 */
const getVendorQuotations = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    // Simulated data
    const quotations = [
      { id: 'Q001', customer: 'ABC Corp', amount: 8500, status: 'Pending', date: '2026-01-29' },
      { id: 'Q002', customer: 'XYZ Studios', amount: 15000, status: 'Approved', date: '2026-01-28' },
      { id: 'Q003', customer: 'Tech Solutions', amount: 5200, status: 'Rejected', date: '2026-01-27' },
    ];

    res.status(200).json({
      success: true,
      data: quotations,
    });
  } catch (error) {
    console.error('Get Quotations Error:', error);
    res.status(500).json({ error: 'Failed to fetch quotations' });
  }
};

/**
 * Approve quotation (convert to order)
 */
const approveQuotation = async (req, res) => {
  try {
    const { quotationId } = req.params;

    res.status(200).json({
      success: true,
      message: 'Quotation approved successfully',
      data: { quotationId, status: 'Approved' },
    });
  } catch (error) {
    console.error('Approve Quotation Error:', error);
    res.status(500).json({ error: 'Failed to approve quotation' });
  }
};

/**
 * Reject quotation
 */
const rejectQuotation = async (req, res) => {
  try {
    const { quotationId } = req.params;
    const { reason } = req.body;

    res.status(200).json({
      success: true,
      message: 'Quotation rejected successfully',
      data: { quotationId, status: 'Rejected', reason },
    });
  } catch (error) {
    console.error('Reject Quotation Error:', error);
    res.status(500).json({ error: 'Failed to reject quotation' });
  }
};

module.exports = {
  getVendorQuotations,
  approveQuotation,
  rejectQuotation,
};
