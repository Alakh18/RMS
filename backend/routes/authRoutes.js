const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');

// Definition: POST /api/auth/signup
router.post('/signup', signup);

module.exports = router;