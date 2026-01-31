const prisma = require('../src/prisma');

// ==========================================
// 1. ADD TO CART (Creates or updates Draft/Sent Quotation)
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
      // Allow adding to an existing Draft or Sent quotation (editable until confirmation)
      let order = await tx.order.findFirst({ where: { customerId: userId, status: { in: ['DRAFT', 'SENT'] } } });

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

      const product = await tx.product.findUnique({ where: { id: productId } });
      if (!product) throw new Error('Product not found');

      const item = await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId,
          quantity,
          priceAtBooking: product.price,
          startDate: start,
          endDate: end
        }
      });

      // Recalculate order-level start/end
      const items = await tx.orderItem.findMany({ where: { orderId: order.id } });
      let minStart = start;
      let maxEnd = end;
      for (const it of items) {
        const s = new Date(it.startDate);
        const e = new Date(it.endDate);
        if (s < minStart) minStart = s;
        if (e > maxEnd) maxEnd = e;
      }

      await tx.order.update({ where: { id: order.id }, data: { startDate: minStart, endDate: maxEnd } });

      // Recalculate totals
      await recalcOrderTotals(tx, order.id);

      const updated = await tx.order.findUnique({ where: { id: order.id }, include: { items: { include: { product: true } } } });

      return { item, order: updated };
    });

    res.json({ message: 'Item added to quotation', order: result.order });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: error.message || 'Failed to add item' });
  }
};

// ==========================================
// 2. SUBMIT QUOTATION (Draft -> Sent)
// ==========================================
const submitQuotation = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user.userId;

    const order = await prisma.order.findUnique({ where: { id: orderId } });

    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.customerId !== userId) return res.status(403).json({ error: 'Unauthorized' });
    if (order.status !== 'DRAFT') return res.status(400).json({ error: 'Order is not in draft mode' });

    // Update status to SENT
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'SENT' } 
    });

    res.json({ success: true, message: 'Quotation sent to vendor for approval.' });

  } catch (error) {
    console.error("Submit Quotation Error:", error);
    res.status(500).json({ error: 'Failed to submit quotation' });
  }
};

// ==========================================
// 3. GET CART
// ==========================================
const getMyCart = async (req, res) => {
  try {
    const order = await prisma.order.findFirst({
      where: { customerId: req.user.userId, status: { in: ['DRAFT', 'SENT'] } },
      include: { items: { include: { product: true } } }
    });
    res.json(order || { items: [] });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
};

// ==========================================
// Update Cart Item
// PUT /api/orders/cart/item/:itemId
// ==========================================
const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity, startDate, endDate } = req.body;
    const userId = req.user.userId;

    await prisma.$transaction(async (tx) => {
      const item = await tx.orderItem.findUnique({ where: { id: Number(itemId) }, include: { order: true } });
      if (!item) throw new Error('Item not found');
      if (item.order.customerId !== userId) throw new Error('Unauthorized');
      if (item.order.status === 'CONFIRMED') throw new Error('Cannot edit a confirmed order');

      const updates = {};
      if (quantity != null) updates.quantity = quantity;
      if (startDate) updates.startDate = new Date(startDate);
      if (endDate) updates.endDate = new Date(endDate);

      await tx.orderItem.update({ where: { id: Number(itemId) }, data: updates });

      // Recalc totals and adjust order dates
      const items = await tx.orderItem.findMany({ where: { orderId: item.orderId } });
      let minStart = items.length ? new Date(items[0].startDate) : new Date();
      let maxEnd = items.length ? new Date(items[0].endDate) : new Date();
      for (const it of items) {
        const s = new Date(it.startDate);
        const e = new Date(it.endDate);
        if (s < minStart) minStart = s;
        if (e > maxEnd) maxEnd = e;
      }
      await tx.order.update({ where: { id: item.orderId }, data: { startDate: minStart, endDate: maxEnd } });
      await recalcOrderTotals(tx, item.orderId);
    });

    res.json({ success: true, message: 'Item updated' });
  } catch (error) {
    console.error('Update Cart Item Error:', error);
    res.status(400).json({ error: error.message });
  }
};

// ==========================================
// Remove Cart Item
// DELETE /api/orders/cart/item/:itemId
// ==========================================
const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.userId;

    await prisma.$transaction(async (tx) => {
      const item = await tx.orderItem.findUnique({ where: { id: Number(itemId) }, include: { order: true } });
      if (!item) throw new Error('Item not found');
      if (item.order.customerId !== userId) throw new Error('Unauthorized');
      if (item.order.status === 'CONFIRMED') throw new Error('Cannot remove item from a confirmed order');

      await tx.orderItem.delete({ where: { id: Number(itemId) } });

      const remaining = await tx.orderItem.findMany({ where: { orderId: item.orderId } });
      if (remaining.length) {
        let minStart = new Date(remaining[0].startDate);
        let maxEnd = new Date(remaining[0].endDate);
        for (const it of remaining) {
          const s = new Date(it.startDate);
          const e = new Date(it.endDate);
          if (s < minStart) minStart = s;
          if (e > maxEnd) maxEnd = e;
        }
        await tx.order.update({ where: { id: item.orderId }, data: { startDate: minStart, endDate: maxEnd } });
      } else {
        // If no items left, delete or reset the order
        await tx.order.delete({ where: { id: item.orderId } });
      }

      // Recalc totals if order still exists
      const still = await tx.order.findUnique({ where: { id: item.orderId } });
      if (still) await recalcOrderTotals(tx, item.orderId);
    });

    res.json({ success: true, message: 'Item removed' });
  } catch (error) {
    console.error('Remove Cart Item Error:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addToCart, submitQuotation, getMyCart, updateCartItem, removeCartItem };