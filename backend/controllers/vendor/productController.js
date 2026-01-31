// backend/controllers/vendor/productController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all vendor products with attributes and images
 * Only returns products belonging to the authenticated vendor
 */
const getVendorProducts = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    const products = await prisma.product.findMany({
      where: {
        vendorId: vendorId,
      },
      include: {
        attributes: true,
        images: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform Decimal to string for JSON serialization
    const transformedProducts = products.map(product => ({
      ...product,
      price: product.price.toString(),
      securityDeposit: product.securityDeposit.toString(),
    }));

    res.status(200).json({
      success: true,
      data: transformedProducts,
    });
  } catch (error) {
    console.error('Get Products Error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

/**
 * Create a new product with optional attributes and images
 * vendorId is extracted from authenticated user, never from request body
 */
const createProduct = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    const { name, description, brand, pricingType, price, securityDeposit, quantity, isRentable, isPublished, attributes, images } = req.body;

    console.log('Creating product for vendorId:', vendorId);
    console.log('Request body:', req.body);

    // Validate required fields based on schema
    if (!name || price === undefined || quantity === undefined) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'price', 'quantity'],
      });
    }

    // Validate pricingType if provided
    const validPricingTypes = ['HOURLY', 'DAILY', 'WEEKLY', 'CUSTOM'];
    if (pricingType && !validPricingTypes.includes(pricingType)) {
      return res.status(400).json({
        error: `Invalid pricingType. Must be one of: ${validPricingTypes.join(', ')}`,
      });
    }

    // Create product with attributes and images
    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description || null,
        brand: brand || null,
        pricingType: pricingType || 'DAILY',
        price: parseFloat(price),
        securityDeposit: securityDeposit ? parseFloat(securityDeposit) : 0,
        quantity: parseInt(quantity),
        isRentable: isRentable !== undefined ? isRentable : true,
        isPublished: isPublished !== undefined ? isPublished : false,
        vendorId: vendorId,
        attributes: {
          create: (attributes || []).map(attr => ({
            name: attr.name,
            value: attr.value,
          })),
        },
        images: {
          create: (images || []).map((image, index) => ({
            url: image.url || image,
            altText: image.altText || `${name} - Image ${index + 1}`,
            isPrimary: image.isPrimary || index === 0,
          })),
        },
      },
      include: {
        attributes: true,
        images: true,
      },
    });

    // Transform for response
    const response = {
      ...newProduct,
      price: newProduct.price.toString(),
      securityDeposit: newProduct.securityDeposit.toString(),
    };

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: response,
    });
  } catch (error) {
    console.error('Create Product Error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Duplicate product name' });
    }
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
};

/**
 * Update product details, attributes, and images
 * Vendor can only update their own products
 */
const updateProduct = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    const { productId } = req.params;
    const { name, description, brand, pricingType, price, securityDeposit, quantity, isRentable, isPublished, attributes, images } = req.body;

    const productIdNum = parseInt(productId);

    // Check if product exists and belongs to vendor
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productIdNum,
        vendorId: vendorId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    // Validate pricingType if provided
    const validPricingTypes = ['HOURLY', 'DAILY', 'WEEKLY', 'CUSTOM'];
    if (pricingType && !validPricingTypes.includes(pricingType)) {
      return res.status(400).json({
        error: `Invalid pricingType. Must be one of: ${validPricingTypes.join(', ')}`,
      });
    }

    // Build update data - only include provided fields
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (brand !== undefined) updateData.brand = brand;
    if (pricingType !== undefined) updateData.pricingType = pricingType;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (securityDeposit !== undefined) updateData.securityDeposit = parseFloat(securityDeposit);
    if (quantity !== undefined) updateData.quantity = parseInt(quantity);
    if (isRentable !== undefined) updateData.isRentable = isRentable;
    if (isPublished !== undefined) updateData.isPublished = isPublished;

    // Update product and handle attributes/images
    const updatedProduct = await prisma.product.update({
      where: {
        id: productIdNum,
      },
      data: {
        ...updateData,
        // Replace attributes if provided
        ...(attributes && {
          attributes: {
            deleteMany: {},
            create: attributes.map(attr => ({
              name: attr.name,
              value: attr.value,
            })),
          },
        }),
        // Replace images if provided
        ...(images && {
          images: {
            deleteMany: {},
            create: images.map((image, index) => ({
              url: image.url || image,
              altText: image.altText || `${name} - Image ${index + 1}`,
              isPrimary: image.isPrimary || index === 0,
            })),
          },
        }),
      },
      include: {
        attributes: true,
        images: true,
      },
    });

    // Transform for response
    const response = {
      ...updatedProduct,
      price: updatedProduct.price.toString(),
      securityDeposit: updatedProduct.securityDeposit.toString(),
    };

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: response,
    });
  } catch (error) {
    console.error('Update Product Error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Duplicate product name' });
    }
    res.status(500).json({ error: 'Failed to update product' });
  }
};

/**
 * Delete product - cascades to attributes and order items
 * Vendor can only delete their own products
 */
const deleteProduct = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    const { productId } = req.params;

    const productIdNum = parseInt(productId);

    // Check if product exists and belongs to vendor
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productIdNum,
        vendorId: vendorId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    // Delete product (cascades to attributes and order items via schema)
    await prisma.product.delete({
      where: {
        id: productIdNum,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete Product Error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

/**
 * Publish/Unpublish a product
 * PATCH /api/vendor/products/:productId/publish
 */
const publishProduct = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    const { productId } = req.params;
    const { isPublished } = req.body;

    if (isPublished === undefined) {
      return res.status(400).json({ error: 'isPublished field is required' });
    }

    const productIdNum = parseInt(productId);

    // Check if product exists and belongs to vendor
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productIdNum,
        vendorId: vendorId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    // Update publish status
    const updatedProduct = await prisma.product.update({
      where: {
        id: productIdNum,
      },
      data: {
        isPublished: Boolean(isPublished),
      },
      include: {
        attributes: true,
        images: true,
      },
    });

    // Transform for response
    const response = {
      ...updatedProduct,
      price: updatedProduct.price.toString(),
      securityDeposit: updatedProduct.securityDeposit.toString(),
    };

    res.status(200).json({
      success: true,
      message: 'Product published status updated',
      data: response,
    });
  } catch (error) {
    console.error('Publish Product Error:', error);
    res.status(500).json({ error: 'Failed to update publish status' });
  }
};

module.exports = {
  getVendorProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  publishProduct,
};
