const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
<<<<<<< HEAD
const orderRoutes = require('./routes/orderRoutes');
=======
const vendorRoutes = require('./routes/vendor');

>>>>>>> 9c6baa7726bfe505ba86a673199275745d3c017e
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

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});