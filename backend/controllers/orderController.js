const { PrismaClient } = require('@prisma/client');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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

    res.json({ message: 'Item added to cart', orderId: order.id });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// ==========================================
// 2. INITIATE PAYMENT (Fixes "No Cart" Error)
// ==========================================
const initiatePayment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items: frontendItems } = req.body; 

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

  } catch (error) {
    console.error("Payment Init Error:", error);
    res.status(500).json({ error: error.message || "Payment init failed" });
  }
};

// ==========================================
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
  }
};

// ==========================================
// 4. GET MY CART
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

// [!] CRITICAL: EXPORT ALL FUNCTIONS
module.exports = { 
  addToCart, 
  initiatePayment, 
  verifyOrder, 
  getMyCart 
};