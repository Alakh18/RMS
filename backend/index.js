const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const vendorRoutes = require('./routes/vendor');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// 1. MIDDLEWARES (MUST BE AT THE TOP)
// ==========================================
// [!] CRITICAL: This allows the Frontend to connect
app.use(cors({
  origin: 'http://localhost:5173', // Ensure this matches your frontend URL
  credentials: true
}));

// [!] CRITICAL: This MUST be before routes to read the 'items' you send
app.use(express.json()); 

// ==========================================
// 2. ROUTES
// ==========================================
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/products', require('./routes/productRoutes'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// ==========================================
// 3. START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});