// backend/controllers/vendor/invoiceController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all vendor invoices
 */
const getVendorInvoices = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    // Simulated data
    const invoices = [
      { id: 'INV001', order: 'ORD001', amount: 8500, paid: 'Yes', date: '2026-01-28' },
      { id: 'INV002', order: 'ORD002', amount: 5200, paid: 'No', date: '2026-01-27' },
      { id: 'INV003', order: 'ORD003', amount: 12000, paid: 'Yes', date: '2026-01-26' },
    ];

    res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    console.error('Get Invoices Error:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};

/**
 * Get invoice details
 */
const getInvoiceDetail = async (req, res) => {
  try {
    const { invoiceId } = req.params;

    // Simulated invoice detail
    const invoiceDetail = {
      id: invoiceId,
      order: 'ORD001',
      customer: 'ABC Corporation',
      items: [
        { name: 'Sony FX6 Cinema Camera', quantity: 1, duration: 3, rate: 145, total: 435 },
        { name: 'Lighting Kit', quantity: 2, duration: 3, rate: 40, total: 240 },
      ],
      subtotal: 675,
      gst: 121.5,
      securityDeposit: 500,
      total: 1296.5,
      paid: 1296.5,
      status: 'Paid',
      date: '2026-01-28',
      vendorGSTIN: 'GSTIN123456',
    };

    res.status(200).json({
      success: true,
      data: invoiceDetail,
    });
  } catch (error) {
    console.error('Get Invoice Detail Error:', error);
    res.status(500).json({ error: 'Failed to fetch invoice details' });
  }
};

/**
 * Download invoice as PDF
 */
const downloadInvoicePDF = async (req, res) => {
  try {
    const { invoiceId } = req.params;

    // In production, generate actual PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice-${invoiceId}.pdf"`);

    // Simulated PDF buffer
    res.send(Buffer.from('PDF content here'));
  } catch (error) {
    console.error('Download Invoice Error:', error);
    res.status(500).json({ error: 'Failed to download invoice' });
  }
};

module.exports = {
  getVendorInvoices,
  getInvoiceDetail,
  downloadInvoicePDF,
};
