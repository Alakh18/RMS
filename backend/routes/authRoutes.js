const express = require('express');
const router = express.Router();
const { signup, login, forgotPassword ,resetPassword } = require('../controllers/authController');
const { validateSignup } = require('../middlewares/validationMiddleware');

// Definition: POST /api/auth/signup
router.post('/signup', validateSignup, signup);

// Definition: POST /api/auth/login
router.post('/login', login);

// Definition: POST /api/auth/forgot-password
// This handles the request to send a reset link to the user's email
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;