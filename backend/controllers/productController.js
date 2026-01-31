const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all published products for public listing
 * Includes images, attributes, and basic vendor info
 */
const getPublishedProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true },
      include: {
        images: true,
        attributes: true,
        vendor: {
          select: { id: true, firstName: true, lastName: true, companyName: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const transformed = products.map(p => {
      const vendor = p.vendor || null;
      const vendorName = vendor ? (vendor.companyName || `${vendor.firstName || ''} ${vendor.lastName || ''}`.trim()) : null;
      return {
        ...p,
        price: p.price.toString(),
        securityDeposit: p.securityDeposit.toString(),
        vendor: vendor ? { id: vendor.id, name: vendorName } : null,
      };
    });

    res.status(200).json({ success: true, data: transformed });
  } catch (error) {
    console.error('Get Published Products Error:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
};

module.exports = { getPublishedProducts };
