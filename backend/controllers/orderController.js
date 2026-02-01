const prisma = require('../src/prisma');

/**
 * Recalculate order totals + overall start/end dates
 */
const recalcOrderTotals = async (tx, orderId) => {
  const items = await tx.orderItem.findMany({ where: { orderId } });

  if (!items.length) {
    return tx.order.update({
      where: { id: orderId },
      data: { totalAmount: 0 }
    });
  }

  const ONE_DAY = 24 * 60 * 60 * 1000;
  let total = 0;
  let minStart = items[0].startDate;
  let maxEnd = items[0].endDate;

  for (const item of items) {
    const days =
      Math.ceil(Math.abs(item.endDate - item.startDate) / ONE_DAY) || 1;

    total += Number(item.priceAtBooking) * item.quantity * days;

    if (item.startDate < minStart) minStart = item.startDate;
    if (item.endDate > maxEnd) maxEnd = item.endDate;
  }

  return tx.order.update({
    where: { id: orderId },
    data: {
      totalAmount: total,
      startDate: minStart,
      endDate: maxEnd
    }
  });
};

// ==========================================
// 1. ADD TO CART (Create / Update Draft Quotation)
// ==========================================
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, startDate, endDate } = req.body;
    const userId = req.user.userId;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }

    const result = await prisma.$transaction(async (tx) => {
      let order = await tx.order.findFirst({
        where: {
          customerId: userId,
          status: { in: ['DRAFT', 'SENT'] }
        }
      });

      if (!order) {
        order = await tx.order.create({
          data: {
            customerId: userId,
            status: 'DRAFT',
            orderNumber: `QTN-${Date.now()}`,
            startDate: start,
            endDate: end,
            totalAmount: 0
          }
        });
      }

      const product = await tx.product.findUnique({
        where: { id: productId }
      });

      if (!product) throw new Error('Product not found');

      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId,
          quantity,
          priceAtBooking: product.price,
          startDate: start,
          endDate: end
        }
      });

      await recalcOrderTotals(tx, order.id);

      return order;
    });

    res.json({
      success: true,
      message: 'Item added to quotation',
      orderId: result.id
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: error.message });
  }
};

// ==========================================
// 2. SUBMIT QUOTATION (DRAFT → SENT)
// ==========================================
const submitQuotation = async (req, res) => {
  try {
    const userId = req.user.userId;

    const order = await prisma.order.findFirst({
      where: { customerId: userId, status: 'DRAFT' },
      include: { items: true }
    });

    if (!order) {
      return res.status(404).json({ error: 'No draft quotation found' });
    }

    if (!order.items.length) {
      return res.status(400).json({ error: 'Quotation is empty' });
    }

    await prisma.$transaction(async (tx) => {
      await recalcOrderTotals(tx, order.id);
      await tx.order.update({
        where: { id: order.id },
        data: { status: 'SENT' }
      });
    });

    res.json({
      success: true,
      message: 'Quotation submitted',
      orderId: order.id
    });
  } catch (error) {
    console.error('Submit quotation error:', error);
    res.status(500).json({ error: 'Failed to submit quotation' });
  }
};

// ==========================================
// 3. CONFIRM ORDER (Reservation / Double Booking)
// ==========================================
const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user.userId;

    const confirmedOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true }
      });

      if (!order) throw new Error('Order not found');
      if (order.customerId !== userId) throw new Error('Unauthorized');
      if (order.status !== 'SENT')
        throw new Error('Quotation not submitted');

      // Inventory check
      for (const item of order.items) {
        const overlapping = await tx.orderItem.findMany({
          where: {
            productId: item.productId,
            order: { status: { in: ['CONFIRMED', 'PICKED_UP'] } },
            AND: [
              { startDate: { lt: item.endDate } },
              { endDate: { gt: item.startDate } }
            ]
          }
        });

        const reservedQty = overlapping.reduce(
          (sum, i) => sum + i.quantity,
          0
        );

        const product = await tx.product.findUnique({
          where: { id: item.productId }
        });

        if (reservedQty + item.quantity > product.quantity) {
          throw new Error(
            `Product '${product.name}' unavailable for selected dates`
          );
        }
      }

      await recalcOrderTotals(tx, orderId);

      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'CONFIRMED',
          orderNumber: `ORD-${Date.now()}`
        }
      });

      const invoice = await tx.invoice.create({
        data: {
          orderId: updatedOrder.id,
          invoiceNumber: `INV-${Date.now()}`,
          status: 'PAID',
          totalAmount: updatedOrder.totalAmount,
          paidAmount: updatedOrder.totalAmount,
          balanceAmount: 0,
          dueDate: new Date()
        }
      });

      await tx.payment.create({
        data: {
          invoiceId: invoice.id,
          amount: updatedOrder.totalAmount,
          method: 'CARD',
          transactionId: `PAY-${Date.now()}`
        }
      });

      return updatedOrder;
    });

    res.json({
      success: true,
      message: 'Order confirmed. Stock reserved.',
      orderId: confirmedOrder.id,
      orderNumber: confirmedOrder.orderNumber
    });
  } catch (error) {
    console.error('Confirm order error:', error);
    res.status(500).json({ error: error.message });
  }
};

// ==========================================
// 4. PAY ORDER (If needed separately)
// ==========================================
const payOrder = async (req, res) => {
  res.json({ success: true, message: 'Payment already handled at confirmation' });
};

// ==========================================
// 5. GET QUOTATION STATUS
// ==========================================
const getQuotationStatus = async (req, res) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        customerId: req.user.userId,
        status: { in: ['DRAFT', 'SENT', 'CONFIRMED'] }
      },
      orderBy: { updatedAt: 'desc' },
      include: { items: { include: { product: true } } }
    });

    res.json({ success: true, data: order || null });
  } catch {
    res.status(500).json({ error: 'Failed to fetch quotation status' });
  }
};

// ==========================================
// 6. VIEW CART
// ==========================================
const getMyCart = async (req, res) => {
  const order = await prisma.order.findFirst({
    where: {
      customerId: req.user.userId,
      status: { in: ['DRAFT', 'SENT'] }
    },
    include: { items: { include: { product: true } } }
  });

  res.json(order || { items: [] });
};

module.exports = {
  addToCart,
  submitQuotation,
  confirmOrder,
  payOrder,
  getQuotationStatus,
  getMyCart
};
