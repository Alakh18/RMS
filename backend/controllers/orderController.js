// src/controllers/orderController.js
const prisma = require('../src/prisma');

const recalcOrderTotals = async (tx, orderId) => {
  const items = await tx.orderItem.findMany({ where: { orderId } });
  if (!items.length) {
    return tx.order.update({
      where: { id: orderId },
      data: { totalAmount: 0 }
    });
  }

  const oneDay = 24 * 60 * 60 * 1000;
  let total = 0;
  let minStart = items[0].startDate;
  let maxEnd = items[0].endDate;

  for (const item of items) {
    const days = Math.round(Math.abs((item.endDate - item.startDate) / oneDay)) || 1;
    total += Number(item.priceAtBooking) * item.quantity * days;
    if (item.startDate < minStart) minStart = item.startDate;
    if (item.endDate > maxEnd) maxEnd = item.endDate;
  }

  return tx.order.update({
    where: { id: orderId },
    data: {
      totalAmount: total,
      startDate: minStart,
      endDate: maxEnd,
    }
  });
};

// ==========================================
// 1. ADD TO QUOTATION (Add to Cart)
// ==========================================
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, startDate, endDate } = req.body;
    const userId = req.user.userId; // Taken from authMiddleware

    // 1. Basic Validation
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }

    // 2. Find or Create a "DRAFT" Order (This is the Quotation)
    let order = await prisma.order.findFirst({
      where: { 
        customerId: userId, 
        status: 'DRAFT' 
      }
    });

    // If no quotation exists, create a new one
    if (!order) {
      order = await prisma.order.create({
        data: {
          customerId: userId,
          status: 'DRAFT',
          orderNumber: `QTN-${Date.now()}`, // QTN for Quotation
          startDate: start, // Default to first item's dates
          endDate: end,
          totalAmount: 0,
        }
      });
    }

    // 3. Get Product Details for Pricing
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // 4. Calculate Price (Simple Logic: Price * Days * Qty)
    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.round(Math.abs((end - start) / oneDay)) || 1; // Minimum 1 day
    const priceAtBooking = product.price; 
    
    // 5. Add Item to the Quotation
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId,
        quantity,
        priceAtBooking,
        startDate: start,
        endDate: end
      }
    });

    // Recalculate Order Total & Dates
    await recalcOrderTotals(prisma, order.id);

    res.json({ message: 'Item added to quotation', orderId: order.id });

  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: 'Failed to add item' });
  }
};

// ==========================================
// 2. CONFIRM ORDER (The "Double Booking" Check)
// ==========================================
const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user.userId;
    let confirmedOrder = null;

    // We use a Transaction ($transaction) to ensure that we check stock 
    // AND confirm the order at the exact same millisecond.
    await prisma.$transaction(async (tx) => {
      
      // 1. Fetch the Quotation (Draft Order)
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true } // Get all items to check them
      });

      if (!order) throw new Error('Order not found');
      if (order.status !== 'DRAFT') throw new Error('Order is already confirmed');
      if (order.customerId !== userId) throw new Error('Unauthorized');

      // 2. CHECK INVENTORY FOR EVERY ITEM
      for (const item of order.items) {
        
        // A. Find all CONFIRMED orders for this specific product
        // that overlap with our requested dates.
        const overlappingItems = await tx.orderItem.findMany({
          where: {
            productId: item.productId,
            order: {
              status: { in: ['CONFIRMED', 'PICKED_UP'] } // Only active rentals count
            },
            // THE OVERLAP FORMULA: (StartA < EndB) and (EndA > StartB)
            AND: [
              { startDate: { lt: item.endDate } }, 
              { endDate: { gt: item.startDate } }
            ]
          }
        });

        // B. Calculate how many are currently reserved
        const reservedQuantity = overlappingItems.reduce((sum, i) => sum + i.quantity, 0);

        // C. Get Total Warehouse Stock
        const product = await tx.product.findUnique({ where: { id: item.productId } });

        // D. The Final Check
        // If (Reserved + New Request) > Total Stock -> REJECT
        if ((reservedQuantity + item.quantity) > product.quantity) {
          throw new Error(`Product '${product.name}' is unavailable for these dates.`);
        }
      }

      // 3. Recalculate totals and order dates before confirmation
      await recalcOrderTotals(tx, orderId);

      // 4. If the loop finishes, it means STOCK IS AVAILABLE.
      // Update status to CONFIRMED (This reserves the stock)
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { 
          status: 'CONFIRMED',
          orderNumber: `ORD-${Date.now()}` // Change ID from QTN to ORD
        }
      });
      confirmedOrder = updatedOrder;

      // 5. Create Invoice and Payment record if not exists
      const existingInvoice = await tx.invoice.findFirst({
        where: { orderId: updatedOrder.id }
      });

      if (!existingInvoice) {
        const invoice = await tx.invoice.create({
          data: {
            orderId: updatedOrder.id,
            invoiceNumber: `INV-${Date.now()}`,
            status: 'PAID',
            totalAmount: updatedOrder.totalAmount,
            paidAmount: updatedOrder.totalAmount,
            balanceAmount: 0,
            dueDate: new Date(),
          }
        });

        await tx.payment.create({
          data: {
            invoiceId: invoice.id,
            amount: updatedOrder.totalAmount,
            method: 'CARD',
            transactionId: `PAY-${Date.now()}`,
          }
        });
      }
      
      // 4. (Optional) Create Invoice here automatically
      // await tx.invoice.create({ ... })
    });

    res.json({ success: true, message: 'Order Confirmed! Stock Reserved.', orderId, orderNumber: confirmedOrder?.orderNumber });

  } catch (error) {
    console.error("Confirm Order Error:", error);
    res.status(400).json({ error: error.message }); // Send specific error to frontend
  }
};

// ==========================================
// 3. VIEW QUOTATION
// ==========================================
const getMyCart = async (req, res) => {
  try {
    const order = await prisma.order.findFirst({
      where: { customerId: req.user.userId, status: 'DRAFT' },
      include: { items: { include: { product: true } } }
    });
    res.json(order || { items: [] });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quotation' });
  }
};

module.exports = { addToCart, confirmOrder, getMyCart };