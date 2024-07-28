const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireRole = (role) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (user.role !== role) {
        return res.status(403).json({ message: 'Erişim reddedildi' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Yetkisiz erişim' });
    }
  };
};

module.exports = { requireRole };
