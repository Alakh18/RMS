// backend/controllers/vendor/dashboardController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get vendor dashboard statistics
 * Returns: total revenue, active rentals, pending returns, monthly earnings
 */
const getDashboardStats = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    // Simulated data - can be extended with actual database queries
    const stats = {
      totalRevenue: 45230,
      activeRentals: 12,
      pendingReturns: 3,
      monthlyEarnings: 8950,
      recentOrders: [
        { id: 1001, date: '2026-01-28', items: 2, status: 'Active' },
        { id: 1002, date: '2026-01-27', items: 1, status: 'Active' },
        { id: 1003, date: '2026-01-25', items: 3, status: 'Returned' },
      ],
      pendingActions: [
        { type: 'returns', count: 3, message: '3 Returns Awaiting Acceptance' },
        { type: 'quotations', count: 5, message: '5 Quotations Pending Review' },
        { type: 'pickups', count: 2, message: '2 Pickups Scheduled Today' },
      ],
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
};

module.exports = { getDashboardStats };
