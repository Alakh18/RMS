// backend/controllers/vendor/orderController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all orders that contain the vendor's products (READ-ONLY)
 * Fetches orders where at least one OrderItem references a product from this vendor
 */
const getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    // Get all products for this vendor
    const vendorProducts = await prisma.product.findMany({
      where: {
        vendorId: vendorId,
      },
      select: {
        id: true,
      },
    });

    const vendorProductIds = vendorProducts.map(p => p.id);

    if (vendorProductIds.length === 0) {
      // Vendor has no products, return empty list
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    // Get all orders that contain vendor's products
    const orders = await prisma.order.findMany({
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
          include: {
            product: true,
          },
        },
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform Decimal values to strings
    const transformedOrders = orders.map(order => ({
      ...order,
      totalAmount: order.totalAmount.toString(),
      taxAmount: order.taxAmount.toString(),
      items: order.items.map(item => ({
        ...item,
        priceAtBooking: item.priceAtBooking.toString(),
      })),
    }));

    res.status(200).json({
      success: true,
      data: transformedOrders,
    });
  } catch (error) {
    console.error('Get Orders Error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

/**
 * Get order details for vendor's products (READ-ONLY)
 */
const getOrderDetail = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    const { orderId } = req.params;

    const orderIdNum = parseInt(orderId);

    // Get vendor's product IDs
    const vendorProducts = await prisma.product.findMany({
      where: {
        vendorId: vendorId,
      },
      select: {
        id: true,
      },
    });

    const vendorProductIds = vendorProducts.map(p => p.id);

    // Get order detail but only include vendor's items
    const order = await prisma.order.findUnique({
      where: {
        id: orderIdNum,
      },
      include: {
        items: {
          where: {
            productId: {
              in: vendorProductIds,
            },
          },
          include: {
            product: true,
          },
        },
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        invoices: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.items.length === 0) {
      // Order doesn't contain any of vendor's products
      return res.status(403).json({ error: 'Unauthorized: Order does not contain your products' });
    }

    // Transform Decimal values to strings
    const response = {
      ...order,
      totalAmount: order.totalAmount.toString(),
      taxAmount: order.taxAmount.toString(),
      items: order.items.map(item => ({
        ...item,
        priceAtBooking: item.priceAtBooking.toString(),
      })),
    };

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Get Order Detail Error:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
};

/**
 * Update order status - This is read-only for vendor orders
 * Vendors cannot modify order status directly from their panel
 */
const updateOrderStatus = async (req, res) => {
  try {
    // This is intentionally restricted - vendors cannot modify orders
    res.status(403).json({
      error: 'Vendors cannot modify order status. Orders are managed by the customer and admin system.',
    });
  } catch (error) {
    console.error('Update Order Status Error:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

module.exports = {
  getVendorOrders,
  updateOrderStatus,
  getOrderDetail,
};
