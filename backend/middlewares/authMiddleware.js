// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // 1. Get the token from the header (Bearer <TOKEN>)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // 2. Verify the token using your secret key
    // Make sure JWT_SECRET is in your .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Attach user info (userId, role, etc.) to the request object
    req.user = decoded; 
    
    next(); // Proceed to the next middleware or controller
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

// ✅ IMPORTANT: Export as an object to match your import statement
module.exports = { verifyToken };