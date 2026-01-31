// backend/controllers/vendor/invoiceController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all invoices for orders containing vendor's products (READ-ONLY)
 */
const getVendorInvoices = async (req, res) => {
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

    // Get all invoices linked to orders containing vendor's products
    const invoices = await prisma.invoice.findMany({
      where: {
        order: {
          items: {
            some: {
              productId: {
                in: vendorProductIds,
              },
            },
          },
        },
      },
      include: {
        order: {
          include: {
            customer: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
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
          },
        },
        payments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform Decimal values to strings
    const transformedInvoices = invoices.map(invoice => ({
      ...invoice,
      totalAmount: invoice.totalAmount.toString(),
      paidAmount: invoice.paidAmount.toString(),
      balanceAmount: invoice.balanceAmount.toString(),
      order: {
        ...invoice.order,
        totalAmount: invoice.order.totalAmount.toString(),
        taxAmount: invoice.order.taxAmount.toString(),
        items: invoice.order.items.map(item => ({
          ...item,
          priceAtBooking: item.priceAtBooking.toString(),
        })),
      },
      payments: invoice.payments.map(payment => ({
        ...payment,
        amount: payment.amount.toString(),
      })),
    }));

    res.status(200).json({
      success: true,
      data: transformedInvoices,
    });
  } catch (error) {
    console.error('Get Invoices Error:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};

/**
 * Get invoice details for vendor (READ-ONLY)
 */
const getInvoiceDetail = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    const { invoiceId } = req.params;

    const invoiceIdNum = parseInt(invoiceId);

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

    // Get invoice detail
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoiceIdNum,
      },
      include: {
        order: {
          include: {
            customer: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                companyName: true,
                gstin: true,
              },
            },
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
          },
        },
        payments: true,
      },
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    if (invoice.order.items.length === 0) {
      // Invoice doesn't contain any of vendor's products
      return res.status(403).json({ error: 'Unauthorized: Invoice does not contain your products' });
    }

    // Transform Decimal values to strings
    const response = {
      ...invoice,
      totalAmount: invoice.totalAmount.toString(),
      paidAmount: invoice.paidAmount.toString(),
      balanceAmount: invoice.balanceAmount.toString(),
      order: {
        ...invoice.order,
        totalAmount: invoice.order.totalAmount.toString(),
        taxAmount: invoice.order.taxAmount.toString(),
        items: invoice.order.items.map(item => ({
          ...item,
          priceAtBooking: item.priceAtBooking.toString(),
        })),
      },
      payments: invoice.payments.map(payment => ({
        ...payment,
        amount: payment.amount.toString(),
      })),
    };

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Get Invoice Detail Error:', error);
    res.status(500).json({ error: 'Failed to fetch invoice details' });
  }
};

/**
 * Download invoice as PDF (READ-ONLY)
 * In production, this would generate an actual PDF
 */
const downloadInvoicePDF = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    const { invoiceId } = req.params;

    const invoiceIdNum = parseInt(invoiceId);

    // Verify vendor has access to this invoice
    const vendorProducts = await prisma.product.findMany({
      where: {
        vendorId: vendorId,
      },
      select: {
        id: true,
      },
    });

    const vendorProductIds = vendorProducts.map(p => p.id);

    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoiceIdNum,
      },
      include: {
        order: {
          include: {
            items: {
              where: {
                productId: {
                  in: vendorProductIds,
                },
              },
            },
          },
        },
      },
    });

    if (!invoice || invoice.order.items.length === 0) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Set response headers for PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice-${invoice.invoiceNumber}.pdf"`);

    // In production, generate actual PDF using a library like pdf-lib or pdfkit
    // For now, send a placeholder
    res.send(Buffer.from('PDF Invoice placeholder'));
  } catch (error) {
    console.error('Download Invoice Error:', error);
    res.status(500).json({ error: 'Failed to download invoice' });
  }
};

module.exports = {
  getVendorInvoices,
  getInvoiceDetail,
  downloadInvoicePDF,
};
