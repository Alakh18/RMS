const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getVendorReports = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    const { startDate, endDate } = req.query;

    // Parse dates (default to current month if not provided)
    const start = startDate ? new Date(startDate) : new Date(new Date().setDate(1));
    const end = endDate ? new Date(endDate) : new Date();
    // Set end date to end of day
    end.setHours(23, 59, 59, 999);

    // 1. Get all OrderItems for this vendor within the date range
    // We assume the date to check is the Order's creation date
    const items = await prisma.orderItem.findMany({
      where: {
        product: {
          vendorId: vendorId,
        },
        order: {
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      },
      include: {
        product: true,
        order: {
          select: {
            createdAt: true,
            // Assuming start/end dates exist on Order for duration calc.
            // If they are on OrderItem, adjust this select.
            startDate: true, 
            endDate: true,
            id: true,
          }
        }
      },
    });

    // 2. Calculate Metrics
    let totalEarnings = 0;
    let totalRentals = items.length;
    let totalDurationDays = 0;
    const productMap = {};

    items.forEach(item => {
      // Sum Earnings (Handle Decimal by converting to float)
      const price = parseFloat(item.priceAtBooking) || 0;
      totalEarnings += price;

      // Calculate Duration (Fallback to 1 day if dates missing)
      if (item.order.startDate && item.order.endDate) {
        const diffTime = Math.abs(new Date(item.order.endDate) - new Date(item.order.startDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        totalDurationDays += diffDays;
      } else {
        totalDurationDays += 1;
      }

      // Group for "Most Rented"
      if (!productMap[item.productId]) {
        productMap[item.productId] = {
          name: item.product.name,
          rentals: 0,
          revenue: 0
        };
      }
      productMap[item.productId].rentals += 1;
      productMap[item.productId].revenue += price;
    });

    const avgDuration = totalRentals > 0 ? (totalDurationDays / totalRentals).toFixed(1) : 0;

    // Sort Top Products
    const topProducts = Object.values(productMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5); // Top 5

    // 3. Prepare Raw Data for Exports
    // Flatten the data so it's easy to convert to CSV/Excel on frontend
    const exportData = items.map(item => ({
      orderId: item.orderId,
      productName: item.product.name,
      date: item.order.createdAt,
      rentalStart: item.order.startDate,
      rentalEnd: item.order.endDate,
      amount: parseFloat(item.priceAtBooking)
    }));

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalEarnings,
          totalRentals,
          avgDuration
        },
        topProducts,
        exportData // This payload is used by the frontend to generate PDF/CSV
      }
    });

  } catch (error) {
    console.error('Report Error:', error);
    res.status(500).json({ error: 'Failed to fetch report data' });
  }
};

module.exports = { getVendorReports };