const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');const vendorRoutes = require('./routes/vendor');

dotenv.config();

const app = express();
app.use('/api/orders', orderRoutes);
app.use('/api/admin', require('./routes/adminRoutes'));
const PORT = process.env.PORT || 3000;

// Global Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cors());         // Enable CORS for your friend's frontend

// Route Middlewares
// Customer authentication routes
app.use('/api/auth', authRoutes);

// Vendor routes (protected by vendorAuth middleware)
app.use('/api/vendor', vendorRoutes);

// Public products listing
app.use('/api/products', require('./routes/productRoutes'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});