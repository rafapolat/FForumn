const express = require('express');
const { requireRole } = require('../middleware/authMiddleware');
const User = require('../models/User');
const router = express.Router();

// Kullanıcıları listele
router.get('/', requireRole('admin'), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Kullanıcı rolü güncelle
router.put('/:id/role', requireRole('admin'), async (req, res) => {
  const { role } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.role = role;
      await user.save();
      res.json({ message: 'Kullanıcı rolü güncellendi' });
    } else {
      res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
  } catch (error) {
    console.error('Error updating user role:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
