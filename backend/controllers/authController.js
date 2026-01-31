// RMS/backend/controllers/authController.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); 

const prisma = new PrismaClient();

// --- CONFIGURATION ---
const JWT_SECRET = process.env.JWT_SECRET || Maan123; 
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'; 

// Configure Email Transporter (Example using Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'manthanmd21@gmail.com', 
    pass: 'lxkj gcjq msuw anfp'      
  },
  logger: true,
  debug: true
});

// --- SIGNUP LOGIC ---
const signup = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      role, 
      companyName, 
      gstin, 
      productCategory 
    } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role || 'CUSTOMER',
        companyName: role === 'VENDOR' ? companyName : null,
        gstin: role === 'VENDOR' ? gstin : null,
        productCategory: role === 'VENDOR' ? productCategory : null,
      },
    });

    res.status(201).json({
      message: 'User created successfully',
      user: { id: newUser.id, email: newUser.email, role: newUser.role, firstName: newUser.firstName }
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// --- LOGIN LOGIC ---
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, firstName: user.firstName, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// --- FORGOT PASSWORD LOGIC ---
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(200).json({ message: 'If email exists, reset link sent.' });
    }

    // Secret specific to this user/password state
    const secret = JWT_SECRET + user.password;
    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '15m' });
    const link = `${FRONTEND_URL}/reset-password?token=${token}`;

    const mailOptions = {
      from: 'manthanmd21@gmail.com', 
      to: email,
      subject: 'Password Reset Request - RentalEco',
      text: `Click this link to reset your password: ${link}\n\nThis link expires in 15 minutes.`,
      html: `<b>Click the link to reset your password:</b> <a href="${link}">${link}</a>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

// --- RESET PASSWORD LOGIC ---
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.id) return res.status(400).json({ error: 'Invalid token.' });

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const secret = JWT_SECRET + user.password;
    try {
      jwt.verify(token, secret);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    // Password Complexity Check (6-12 chars, 1 upper, 1 lower, 1 special)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$&_]).{6,12}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ error: 'Password must be 6-12 chars, with 1 uppercase, 1 lowercase, and 1 special (@, $, &, _).' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    res.status(200).json({ message: 'Password successfully reset. Please login.' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signup, login, forgotPassword, resetPassword };