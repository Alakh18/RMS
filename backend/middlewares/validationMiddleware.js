const validateSignup = (req, res, next) => {
  const { password, confirmPassword, email } = req.body;

  // 1. Check if required fields are present
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Email, Password, and Confirm Password are required' });
  }

  // 2. Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // 3. (Optional) Check password strength
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  // If everything is good, proceed to the Controller
  next();
};

module.exports = { validateSignup };