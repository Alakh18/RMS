const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
dotenv.config();

const app = express();
app.use('/api/orders', orderRoutes);
app.use('/api/admin', require('./routes/adminRoutes'));
const PORT = process.env.PORT || 3000;

// Global Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cors());         // Enable CORS for your friend's frontend

// Route Middlewares
// This prefixes all auth routes with /api/auth
// Example: The signup route becomes http://localhost:3000/api/auth/signup
app.use('/api/auth', authRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});