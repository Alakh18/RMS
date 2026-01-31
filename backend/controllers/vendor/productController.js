// backend/controllers/vendor/productController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all vendor products
 */
const getVendorProducts = async (req, res) => {
  try {
    const vendorId = req.user.userId;

    // Simulated data
    const products = [
      {
        id: 1,
        name: 'Sony FX6 Cinema Camera',
        category: 'Cameras',
        price: 145,
        pricing: 'Day',
        quantity: 5,
        reserved: 2,
        status: 'Published',
      },
      {
        id: 2,
        name: 'MacBook Pro 16" M3',
        category: 'Computers',
        price: 85,
        pricing: 'Day',
        quantity: 3,
        reserved: 1,
        status: 'Published',
      },
    ];

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Get Products Error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

/**
 * Create a new product
 */
const createProduct = async (req, res) => {
  try {
    const vendorId = req.user.userId;
    const { name, category, hourlyRate, dailyRate, weeklyRate, quantity, description } = req.body;

    // Validate required fields
    if (!name || !category || !dailyRate || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Simulated product creation
    const newProduct = {
      id: Math.floor(Math.random() * 10000),
      name,
      category,
      hourlyRate: hourlyRate || 0,
      dailyRate,
      weeklyRate: weeklyRate || dailyRate * 6,
      quantity,
      description: description || '',
      reserved: 0,
      status: 'Draft',
      vendorId,
    };

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

/**
 * Update product details
 */
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, category, dailyRate, quantity, status } = req.body;

    // Simulated update
    const updatedProduct = {
      id: productId,
      name,
      category,
      dailyRate,
      quantity,
      status,
    };

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Update Product Error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

/**
 * Delete product
 */
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete Product Error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  getVendorProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
