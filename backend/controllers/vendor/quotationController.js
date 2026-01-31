// backend/controllers/vendor/quotationController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. GET QUOTATIONS (Status = SENT)
const getVendorQuotations = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    // Find orders that contain this vendor's products AND are 'SENT'
    // This allows vendors to see only relevant requests
    const quotations = await prisma.order.findMany({
      where: {
        status: 'SENT', 
        items: {
          some: {
            product: { vendorId: vendorId }
          }
        }
      },
      include: {
        customer: { 
          select: { firstName: true, lastName: true, companyName: true, email: true } 
        },
        items: {
          include: { product: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    // Format numbers for frontend
    const formattedData = quotations.map(q => ({
      ...q,
      totalAmount: q.totalAmount.toString(),
      items: q.items.map(i => ({
        ...i,
        priceAtBooking: i.priceAtBooking.toString()
      }))
    }));

    res.status(200).json({ success: true, data: formattedData });
  } catch (error) {
    console.error('Get Quotations Error:', error);
    res.status(500).json({ error: 'Failed to fetch quotations' });
  }
};

// 2. APPROVE QUOTATION (Locks the Stock)
const approveQuotation = async (req, res) => {
  try {
    const { quotationId } = req.params;
    const orderId = parseInt(quotationId);

    // USE TRANSACTION: Check Stock + Confirm Order atomically
    await prisma.$transaction(async (tx) => {
      
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true }
      });

      if (!order || order.status !== 'SENT') {
        throw new Error('Invalid quotation status or order not found');
      }

      // --- INVENTORY CHECK LOGIC ---
      for (const item of order.items) {
        // Find overlapping ACTIVE rentals (Confirmed or Picked Up)
        const overlappingItems = await tx.orderItem.findMany({
          where: {
            productId: item.productId,
            order: { status: { in: ['CONFIRMED', 'PICKED_UP'] } }, 
            AND: [
              { startDate: { lt: item.endDate } },
              { endDate: { gt: item.startDate } }
            ]
          }
        });

        const reservedQuantity = overlappingItems.reduce((sum, i) => sum + i.quantity, 0);
        const product = await tx.product.findUnique({ where: { id: item.productId } });

        // If (Reserved + New Request) > Total Stock -> FAIL
        if ((reservedQuantity + item.quantity) > product.quantity) {
          throw new Error(`Product '${product.name}' is unavailable for these dates.`);
        }
      }
      // -----------------------------

      // If check passes, Approve it!
      await tx.order.update({
        where: { id: orderId },
        data: { 
          status: 'CONFIRMED',
          orderNumber: `ORD-${Date.now()}` // Convert QTN to ORD
        }
      });
      
      // Optional: Generate Invoice here
      await tx.invoice.create({
        data: {
            invoiceNumber: `INV-${Date.now()}`,
            orderId: order.id,
            status: 'DRAFT',
            totalAmount: order.totalAmount,
            balanceAmount: order.totalAmount,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7))
        }
      });
    });

    res.status(200).json({ success: true, message: 'Quotation Approved & Stock Reserved' });

  } catch (error) {
    console.error('Approve Error:', error);
    res.status(400).json({ error: error.message || 'Failed to approve' });
  }
};

// 3. REJECT QUOTATION
const rejectQuotation = async (req, res) => {
  try {
    const { quotationId } = req.params;
    
    await prisma.order.update({
      where: { id: parseInt(quotationId) },
      data: { status: 'CANCELLED' } 
    });

    res.json({ success: true, message: 'Quotation rejected' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject' });
  }
};

module.exports = { getVendorQuotations, approveQuotation, rejectQuotation };