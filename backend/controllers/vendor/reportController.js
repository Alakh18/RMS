// backend/controllers/vendor/reportController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get vendor reports with date range filter
 */
const getVendorReports = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    const { start, end } = req.query;

    // Simulated data
    const reports = {
      period: { start, end },
      totalEarnings: 45230,
      rentalsCompleted: 28,
      avgRentalDuration: 3.2,
      mostRentedProducts: [
        { name: 'Sony FX6 Cinema Camera', rentals: 12, revenue: 1740 },
        { name: 'MacBook Pro 16"', rentals: 8, revenue: 680 },
        { name: 'DJI Mavic 3 Pro', rentals: 5, revenue: 325 },
      ],
      monthlyBreakdown: [
        { month: 'January', earnings: 45230, rentals: 28 },
      ],
    };

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    console.error('Get Reports Error:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

module.exports = { getVendorReports };
