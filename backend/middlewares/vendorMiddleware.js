// src/middlewares/vendorMiddleware.js

const verifyVendor = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  if (req.user.role !== 'VENDOR') return res.status(403).json({ error: 'Vendors only' });
  next();
};

module.exports = { verifyVendor };