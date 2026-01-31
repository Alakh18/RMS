// src/controllers/orderController.js
const Razorpay = require('razorpay');
const crypto = require('crypto');
const prisma = require('../src/prisma');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ==========================================
// 1. ADD TO QUOTATION (Add to Cart)
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

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Calculate Price
    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.round(Math.abs((end - start) / oneDay)) || 1;
    const priceAtBooking = product.price;

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

    // Update Order Total
    const currentTotal = Number(order.totalAmount) + (Number(priceAtBooking) * quantity * days);
    await prisma.order.update({
      where: { id: order.id },
      data: { totalAmount: currentTotal }
    });

    res.json({ message: 'Item added to quotation', orderId: order.id });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: 'Failed to add item' });
  }
};

// ==========================================
// 2. INITIATE PAYMENT (Step 1: Check Stock & Create RZP Order)
// ==========================================
const initiatePayment = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1. Find the User's Draft Order
    const order = await prisma.order.findFirst({
      where: { customerId: userId, status: 'DRAFT' },
      include: { items: true, customer: true }
    });

    if (!order) return res.status(404).json({ error: "No active quotation found" });

    // 2. STOCK CHECK (Crucial: Don't take money if stock is gone)
    for (const item of order.items) {
      const overlappingItems = await prisma.orderItem.findMany({
        where: {
          productId: item.productId,
          order: { status: { in: ['CONFIRMED', 'PICKED_UP'] } },
          AND: [{ startDate: { lt: item.endDate } }, { endDate: { gt: item.startDate } }]
        }
      });

      const reservedQuantity = overlappingItems.reduce((sum, i) => sum + i.quantity, 0);
      const product = await prisma.product.findUnique({ where: { id: item.productId } });

      if ((reservedQuantity + item.quantity) > product.quantity) {
        return res.status(400).json({ error: `Product '${product.name}' is unavailable for these dates.` });
      }
    }

    // 3. Create Razorpay Order
    const amountInPaise = Math.round(Number(order.totalAmount) * 100);
    const rzpOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: order.orderNumber,
    });

    // 4. Send Details to Frontend
    res.json({
      success: true,
      rzpOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      dbOrderId: order.id, // We need this for verification later
      customer: {
        name: `${order.customer.firstName} ${order.customer.lastName}`,
        email: order.customer.email,
        contact: "9999999999" // Replace with actual phone field if available
      }
    });

  } catch (error) {
    console.error("Payment Init Error:", error);
    res.status(500).json({ error: error.message || "Payment initiation failed" });
  }
};

// ==========================================
// 3. VERIFY PAYMENT (Step 2: Confirm Order & Invoice)
// ==========================================
const verifyOrder = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      dbOrderId 
    } = req.body;

    // 1. Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: "Invalid Signature" });
    }

    // 2. Transaction: Update Order, Create Invoice, Record Payment
    const result = await prisma.$transaction(async (tx) => {
      // Update Order Status
      const updatedOrder = await tx.order.update({
        where: { id: parseInt(dbOrderId) },
        data: { 
          status: 'CONFIRMED',
          orderNumber: `ORD-${Date.now()}` // Convert QTN to ORD
        }
      });

      // Create Invoice
      const invoice = await tx.invoice.create({
        data: {
          invoiceNumber: `INV-${Date.now()}`,
          status: 'PAID',
          totalAmount: updatedOrder.totalAmount,
          paidAmount: updatedOrder.totalAmount,
          balanceAmount: 0,
          dueDate: new Date(), // Due immediately
          orderId: updatedOrder.id
        }
      });

      // Record Payment
      await tx.payment.create({
        data: {
          amount: updatedOrder.totalAmount,
          method: 'CARD', // Or 'UPI', 'NET_BANKING' based on Razorpay response details if available
          transactionId: razorpay_payment_id,
          invoiceId: invoice.id
        }
      });

      return updatedOrder;
    });

    res.json({ success: true, orderId: result.orderNumber });

  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ success: false, error: "Payment verification failed" });
  }
};

// ==========================================
// 4. VIEW QUOTATION (Get My Cart)
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

module.exports = { addToCart, initiatePayment, verifyOrder, getMyCart };