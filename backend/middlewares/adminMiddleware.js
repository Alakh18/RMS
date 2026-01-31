// src/middlewares/adminMiddleware.js

const verifyAdmin = (req, res, next) => {
  // 1. Check if verifyToken middleware ran successfully
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }

  // 2. Check the Role
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  // 3. User is Admin, proceed
  next();
};

module.exports = { verifyAdmin };