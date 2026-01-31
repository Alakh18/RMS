// backend/controllers/vendor/dashboardController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get vendor dashboard statistics
 * Returns: total products, total orders, total revenue
 * All metrics are calculated from real database data
 */
const getDashboardStats = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    // 1. Get total products count
    const totalProducts = await prisma.product.count({
      where: {
        vendorId: vendorId,
      },
    });

    // 2. Get vendor's product IDs
    const vendorProducts = await prisma.product.findMany({
      where: {
        vendorId: vendorId,
      },
      select: {
        id: true,
      },
    });

    const vendorProductIds = vendorProducts.map(p => p.id);

    // 3. Get total orders (orders containing vendor's products)
    const totalOrders = await prisma.order.count({
      where: {
        items: {
          some: {
            productId: {
              in: vendorProductIds,
            },
          },
        },
      },
    });

    // 4. Calculate total revenue from all orders containing vendor's products
    const ordersWithRevenue = await prisma.order.findMany({
      where: {
        items: {
          some: {
            productId: {
              in: vendorProductIds,
            },
          },
        },
      },
      select: {
        totalAmount: true,
      },
    });

    const totalRevenue = ordersWithRevenue.reduce((sum, order) => {
      return sum + parseFloat(order.totalAmount);
    }, 0);

    // 5. Get recent orders (last 5)
    const recentOrders = await prisma.order.findMany({
      where: {
        items: {
          some: {
            productId: {
              in: vendorProductIds,
            },
          },
        },
      },
      include: {
        items: {
          where: {
            productId: {
              in: vendorProductIds,
            },
          },
        },
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    const transformedRecentOrders = recentOrders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      date: order.createdAt,
      customer: `${order.customer.firstName} ${order.customer.lastName}`,
      items: order.items.length,
      status: order.status,
      total: order.totalAmount.toString(),
    }));

    // 6. Get active rentals (orders with status PICKED_UP)
    const activeRentals = await prisma.order.count({
      where: {
        status: 'PICKED_UP',
        items: {
          some: {
            productId: {
              in: vendorProductIds,
            },
          },
        },
      },
    });

    // 7. Get pending returns (orders with status PICKED_UP but not yet RETURNED)
    const pendingReturns = await prisma.order.count({
      where: {
        status: 'PICKED_UP',
        items: {
          some: {
            productId: {
              in: vendorProductIds,
            },
          },
        },
      },
    });

    // 8. Get this month's earnings
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const thisMonthOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
        items: {
          some: {
            productId: {
              in: vendorProductIds,
            },
          },
        },
      },
      select: {
        totalAmount: true,
      },
    });

    const monthlyEarnings = thisMonthOrders.reduce((sum, order) => {
      return sum + parseFloat(order.totalAmount);
    }, 0);

    const stats = {
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue.toString(),
      activeRentals,
      pendingReturns,
      monthlyEarnings: monthlyEarnings.toString(),
      recentOrders: transformedRecentOrders,
      pendingActions: [
        {
          type: 'returns',
          count: pendingReturns,
          message: `${pendingReturns} ${pendingReturns === 1 ? 'Return' : 'Returns'} Awaiting Acceptance`,
        },
        {
          type: 'active',
          count: activeRentals,
          message: `${activeRentals} Active ${activeRentals === 1 ? 'Rental' : 'Rentals'}`,
        },
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
