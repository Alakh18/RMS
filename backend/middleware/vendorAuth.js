// backend/middleware/vendorAuth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

/**
 * Middleware to verify JWT and check if user is a VENDOR
 * Should be applied to all vendor routes
 */
const vendorAuth = (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if user is VENDOR
    if (decoded.role !== 'VENDOR') {
      return res.status(403).json({ error: 'Only vendors can access this resource' });
    }

    // Attach userId and role to request object
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = vendorAuth;
