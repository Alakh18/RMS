// src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, updateUser } = require('../controllers/adminController'); //
const { verifyAdmin } = require('../middlewares/adminMiddleware'); //
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

// Apply auth middleware to all admin routes
router.use(authMiddleware, verifyAdmin);

// Route: GET /api/admin/users
router.get('/users', getAllUsers);

// Route: DELETE /api/admin/users/:id
router.delete('/users/:id', deleteUser);

// Route: PATCH /api/admin/users/:id
router.patch('/users/:id', updateUser);

module.exports = router;