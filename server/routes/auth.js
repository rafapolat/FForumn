const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; 

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log('Register request received:', { username, email, password }); 

    // Check if user exists by email
    let user = await User.findOne({ email });
    if (user) {
      console.error('User already exists by email:', user); 
      return res.status(400).json({ error: 'Bu e-posta adresiyle kayıtlı bir kullanıcı zaten var.' });
    }

    // Check if user exists by username
    user = await User.findOne({ username });
    if (user) {
      console.error('User already exists by username:', user); 
      return res.status(400).json({ error: 'Bu kullanıcı adı zaten alınmış.' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10)
    });

    await user.save();

    // Generate JWT
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      console.error('Duplicate key error:', error.keyValue);
      return res.status(400).json({ error: 'Bu e-posta adresiyle kayıtlı bir kullanıcı zaten var.' });
    }
    console.error('Server error during registration:', error); 
    res.status(500).json({ error: 'Kayıt sırasında sunucu hatası oluştu.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login request received:', { email, password }); 
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found'); 
      return res.status(401).json({ error: 'Geçersiz kimlik bilgileri: Kullanıcı bulunamadı' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid password'); 
      return res.status(401).json({ error: 'Geçersiz kimlik bilgileri: Geçersiz şifre' });
    }

    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Server error during login:', error); 
    res.status(500).json({ error: 'Giriş sırasında sunucu hatası oluştu.' });
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    next();
  });
};


router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

module.exports = router;
