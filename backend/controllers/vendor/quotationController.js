// backend/controllers/vendor/quotationController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. GET QUOTATIONS (Status = SENT)
const getVendorQuotations = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    const vendorProducts = await prisma.product.findMany({
      where: { vendorId },
      select: { id: true },
    });

    const vendorProductIds = vendorProducts.map(p => p.id);

    if (!vendorProductIds.length) {
      return res.status(200).json({ success: true, data: [] });
    }

    const quotations = await prisma.order.findMany({
      where: {
        status: { in: ['SENT', 'CONFIRMED', 'CANCELLED'] },
        items: {
          some: { productId: { in: vendorProductIds } }
        }
      },
      include: {
        customer: { select: { id: true, firstName: true, lastName: true, email: true } },
        items: {
          where: { productId: { in: vendorProductIds } },
          include: { product: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    const transformed = quotations.map(q => ({
      id: q.id,
      orderNumber: q.orderNumber,
      customer: q.customer ? `${q.customer.firstName} ${q.customer.lastName}` : 'Unknown',
      amount: q.totalAmount.toString(),
      status: q.status,
      date: q.createdAt,
      items: q.items,
    }));

    res.status(200).json({ success: true, data: transformed });
  } catch (error) {
    console.error('Get Quotations Error:', error);
    res.status(500).json({ error: 'Failed to fetch quotations' });
  }
};

// 2. APPROVE QUOTATION (Locks the Stock)
const approveQuotation = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    const { quotationId } = req.params;
    const orderId = parseInt(quotationId);

    const vendorProducts = await prisma.product.findMany({
      where: { vendorId },
      select: { id: true }
    });
    const vendorProductIds = vendorProducts.map(p => p.id);

    const order = await prisma.order.findUnique({
      where: { id: parseInt(quotationId) },
      include: { items: true }
    });

    if (!order) return res.status(404).json({ error: 'Quotation not found' });
    const hasVendorItems = order.items.some(i => vendorProductIds.includes(i.productId));
    if (!hasVendorItems) return res.status(403).json({ error: 'Unauthorized' });

    const updated = await prisma.order.update({
      where: { id: order.id },
      data: { status: 'CONFIRMED', orderNumber: order.orderNumber || `QTN-${Date.now()}` }
    });

    res.status(200).json({ success: true, message: 'Quotation approved', data: { id: updated.id, status: updated.status } });
  } catch (error) {
    console.error('Approve Error:', error);
    res.status(400).json({ error: error.message || 'Failed to approve' });
  }
};

// 3. REJECT QUOTATION
const rejectQuotation = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    const { quotationId } = req.params;

    const vendorProducts = await prisma.product.findMany({
      where: { vendorId },
      select: { id: true }
    });
    const vendorProductIds = vendorProducts.map(p => p.id);

    const order = await prisma.order.findUnique({
      where: { id: parseInt(quotationId) },
      include: { items: true }
    });

    if (!order) return res.status(404).json({ error: 'Quotation not found' });
    const hasVendorItems = order.items.some(i => vendorProductIds.includes(i.productId));
    if (!hasVendorItems) return res.status(403).json({ error: 'Unauthorized' });

    const updated = await prisma.order.update({
      where: { id: order.id },
      data: { status: 'CANCELLED' }
    });

    res.status(200).json({ success: true, message: 'Quotation rejected', data: { id: updated.id, status: updated.status } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject' });
  }
};

module.exports = { getVendorQuotations, approveQuotation, rejectQuotation };