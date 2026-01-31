// backend/controllers/vendor/orderController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all vendor orders
 */
const getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    // Simulated data
    const orders = [
      { id: 1001, customer: 'John Doe', items: 2, total: 450, status: 'Confirmed', date: '2026-01-28' },
      { id: 1002, customer: 'Jane Smith', items: 1, total: 145, status: 'Pickup', date: '2026-01-27' },
      { id: 1003, customer: 'Bob Johnson', items: 3, total: 290, status: 'Returned', date: '2026-01-25' },
    ];

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error('Get Orders Error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

/**
 * Update order status
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['Draft', 'Confirmed', 'Pickup', 'WithCustomer', 'Returned'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: { orderId, status },
    });
  } catch (error) {
    console.error('Update Order Status Error:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

/**
 * Get order details
 */
const getOrderDetail = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Simulated order detail
    const orderDetail = {
      id: orderId,
      customer: 'John Doe',
      items: [
        { productId: 1, name: 'Sony FX6', quantity: 1, duration: 3, pricePerDay: 145, total: 435 },
      ],
      subtotal: 435,
      gst: 78.3,
      total: 513.3,
      status: 'Confirmed',
      pickupDate: '2026-01-30',
      expectedReturnDate: '2026-02-02',
    };

    res.status(200).json({
      success: true,
      data: orderDetail,
    });
  } catch (error) {
    console.error('Get Order Detail Error:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
};

module.exports = {
  getVendorOrders,
  updateOrderStatus,
  getOrderDetail,
};
