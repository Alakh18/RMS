const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const vendorRoutes = require('./routes/vendor'); // This automatically loads routes/vendor/index.js
const adminRoutes = require('./routes/adminRoutes'); // Make sure this file exists

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// 1. GLOBAL MIDDLEWARES (Must come first!)
// ==========================================
app.use(cors());          // Allow frontend to connect
app.use(express.json());  // Parse JSON body (Fixes undefined req.body)

// ==========================================
// 2. REGISTER ROUTES
// ==========================================

// Auth Routes (Login/Signup)
app.use('/api/auth', authRoutes);

// Public Routes (Product Browsing)
app.use('/api/products', productRoutes);

// Customer Routes (Cart, Request Quote)
app.use('/api/orders', orderRoutes);

// Vendor Routes (Dashboard, Approve Quotes, Inventory)
// This maps to routes/vendor/index.js, which handles /quotations, /products, etc.
app.use('/api/vendor', vendorRoutes); 

// Admin Routes (User Management, Reports)
app.use('/api/admin', adminRoutes);

// ==========================================
// 3. HEALTH CHECK & START SERVER
// ==========================================
app.get('/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});