// src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');
const { verifyAdmin } = require('../middlewares/adminMiddleware'); // Ensure you have this
const jwt = require('jsonwebtoken');

// Middleware to verify Token AND Admin role
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// Route: GET /api/admin/users
router.get('/users', authMiddleware, verifyAdmin, getAllUsers);

module.exports = router;