const { PrismaClient } = require('@prisma/client');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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
// 1. ADD TO CART (For single item adds)
// ==========================================
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, startDate, endDate } = req.body;
    const userId = req.user.userId;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Find or Create Draft Order
    let order = await prisma.order.findFirst({
      where: { customerId: userId, status: 'DRAFT' }
    });

    if (!order) {
      order = await prisma.order.create({
        data: {
          customerId: userId,
          status: 'DRAFT',
          orderNumber: `QTN-${Date.now()}`,
          startDate: start,
          endDate: end,
          totalAmount: 0,
        }
      });
    }

    // Fetch Product & Calculate Price
    const product = await prisma.product.findUnique({ where: { id: parseInt(productId) } });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.max(1, Math.round(Math.abs((end - start) / oneDay)));
    const price = Number(product.price);

    // Add Item
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: product.id,
        quantity: quantity,
        priceAtBooking: price,
        startDate: start,
        endDate: end
      }
    });

<<<<<<< HEAD
    res.json({ message: 'Item added to cart', orderId: order.id });
=======
    // Recalculate Order Total & Dates
    await recalcOrderTotals(prisma, order.id);

    res.json({ message: 'Item added to quotation', orderId: order.id });

>>>>>>> 35915921eef5e05f2c0808d4cbd1daf9d464fdce
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// ==========================================
<<<<<<< HEAD
// 2. INITIATE PAYMENT (Fixes "No Cart" Error)
=======
// 1B. SUBMIT QUOTATION (Move DRAFT -> SENT)
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

    await recalcOrderTotals(prisma, order.id);

    const updated = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'SENT',
        orderNumber: order.orderNumber || `QTN-${Date.now()}`
      }
    });

    res.json({ success: true, message: 'Quotation submitted', orderId: updated.id, status: updated.status, orderNumber: updated.orderNumber });
  } catch (error) {
    console.error('Submit Quotation Error:', error);
    res.status(500).json({ error: 'Failed to submit quotation' });
  }
};

// ==========================================
// 2. CONFIRM ORDER (The "Double Booking" Check)
>>>>>>> 35915921eef5e05f2c0808d4cbd1daf9d464fdce
// ==========================================
const initiatePayment = async (req, res) => {
  try {
    const userId = req.user.userId;
<<<<<<< HEAD
    const { items: frontendItems } = req.body; 
=======
    let confirmedOrder = null;
>>>>>>> 35915921eef5e05f2c0808d4cbd1daf9d464fdce

    // A. Check for existing DB Order
    let order = await prisma.order.findFirst({
      where: { customerId: userId, status: 'DRAFT' },
      include: { items: true, customer: true }
    });

    // B. If missing, create from Frontend Items
    if (!order) {
      if (!frontendItems || frontendItems.length === 0) {
        return res.status(404).json({ error: "No items to checkout." });
      }

      console.log("Creating new DRAFT order for payment...");

      let calculatedTotal = 0;
      const orderItemsData = [];
      const oneDay = 24 * 60 * 60 * 1000;

      for (const item of frontendItems) {
        const pId = parseInt(item.productId || item.product?.id);
        const product = await prisma.product.findUnique({ where: { id: pId } });
        
        if (product) {
            const start = new Date(item.startDate);
            const end = new Date(item.endDate);
            const days = Math.max(1, Math.round(Math.abs((end - start) / oneDay)));
            const price = Number(product.price);
            
            calculatedTotal += price * item.quantity * days;

            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                priceAtBooking: price,
                startDate: start,
                endDate: end
            });
        }
      }

<<<<<<< HEAD
      order = await prisma.order.create({
        data: {
          customerId: userId,
          status: 'DRAFT',
          orderNumber: `QTN-${Date.now()}`,
          startDate: new Date(),
          endDate: new Date(),
          totalAmount: calculatedTotal,
          items: { create: orderItemsData }
        },
        include: { items: true, customer: true }
      });
    }

    // C. Create Razorpay Order
    const amountInPaise = Math.round(Number(order.totalAmount) * 100);
    const rzpOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: order.orderNumber,
      notes: { customerId: userId, orderId: order.id }
    });

    res.json({
      success: true,
      rzpOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      dbOrderId: order.id,
      customer: {
        name: order.customer.firstName,
        email: order.customer.email,
        contact: ""
      }
    });
=======
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
>>>>>>> 35915921eef5e05f2c0808d4cbd1daf9d464fdce

  } catch (error) {
    console.error("Payment Init Error:", error);
    res.status(500).json({ error: error.message || "Payment init failed" });
  }
};

// ==========================================
<<<<<<< HEAD
// 3. VERIFY PAYMENT
// ==========================================
const verifyOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = req.body;
    
    // Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString()).digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: "Invalid Signature" });
    }

    // Confirm Order
    await prisma.order.update({
      where: { id: parseInt(dbOrderId) },
      data: { status: 'CONFIRMED', orderNumber: `ORD-${Date.now()}` }
    });

    res.json({ success: true, orderId: dbOrderId });
  } catch (error) {
    console.error("Verify Error", error);
    res.status(500).json({ error: "Verification failed" });
=======
// 2B. PAY CONFIRMED QUOTATION
// ==========================================
const payOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user.userId;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });

    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.customerId !== userId) return res.status(403).json({ error: 'Unauthorized' });
    if (order.status !== 'CONFIRMED') {
      return res.status(400).json({ error: 'Quotation not approved yet' });
    }

    const existingInvoice = await prisma.invoice.findFirst({ where: { orderId: order.id } });

    if (!existingInvoice) {
      const invoice = await prisma.invoice.create({
        data: {
          orderId: order.id,
          invoiceNumber: `INV-${Date.now()}`,
          status: 'PAID',
          totalAmount: order.totalAmount,
          paidAmount: order.totalAmount,
          balanceAmount: 0,
          dueDate: new Date(),
        }
      });

      await prisma.payment.create({
        data: {
          invoiceId: invoice.id,
          amount: order.totalAmount,
          method: 'CARD',
          transactionId: `PAY-${Date.now()}`,
        }
      });
    }

    res.json({ success: true, message: 'Payment recorded', orderId: order.id, orderNumber: order.orderNumber });
  } catch (error) {
    console.error('Pay Order Error:', error);
    res.status(500).json({ error: 'Failed to record payment' });
>>>>>>> 35915921eef5e05f2c0808d4cbd1daf9d464fdce
  }
};

// ==========================================
<<<<<<< HEAD
// 4. GET MY CART
=======
// 3B. GET QUOTATION STATUS (Customer)
// ==========================================
const getQuotationStatus = async (req, res) => {
  try {
    const userId = req.user.userId;

    const order = await prisma.order.findFirst({
      where: {
        customerId: userId,
        status: { in: ['DRAFT', 'SENT', 'CONFIRMED', 'CANCELLED'] }
      },
      orderBy: { updatedAt: 'desc' },
      include: { items: { include: { product: true } } }
    });

    if (!order) return res.json({ success: true, data: null });

    res.json({
      success: true,
      data: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        totalAmount: order.totalAmount.toString(),
        items: order.items
      }
    });
  } catch (error) {
    console.error('Get Quotation Status Error:', error);
    res.status(500).json({ error: 'Failed to fetch quotation status' });
  }
};

// ==========================================
// 3. VIEW QUOTATION
>>>>>>> 35915921eef5e05f2c0808d4cbd1daf9d464fdce
// ==========================================
const getMyCart = async (req, res) => {
  try {
    const order = await prisma.order.findFirst({
        where: { customerId: req.user.userId, status: 'DRAFT' },
        include: { items: { include: { product: true } } }
    });
    // Return items array (or empty if no order)
    res.json(order ? order.items : []);
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

<<<<<<< HEAD
// [!] CRITICAL: EXPORT ALL FUNCTIONS
module.exports = { 
  addToCart, 
  initiatePayment, 
  verifyOrder, 
  getMyCart 
};
=======
module.exports = { addToCart, confirmOrder, getMyCart, submitQuotation, getQuotationStatus, payOrder };
>>>>>>> 35915921eef5e05f2c0808d4cbd1daf9d464fdce
