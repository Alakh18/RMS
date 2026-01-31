const express = require('express');
const router = express.Router();
const { signup,login } = require('../controllers/authController');
const { validateSignup } = require('../middlewares/validationMiddleware');

// Definition: POST /api/auth/signup
router.post('/signup',validateSignup,signup);
router.post('/login', login);
module.exports = router;