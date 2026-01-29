const jwt = require('jsonwebtoken');
const UserModel = require('../models/Auth-model.js');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies.token;
    console.log('verifyToken - cookies:', req.cookies);
    console.log('verifyToken - token found:', !!token);
    if (!token) {
      return res.status(401).json({ error: 'Access denied. Please Login.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('verifyToken - decoded token:', decoded);
    const user = await UserModel.findById(decoded.userId || decoded.id || decoded._id);
    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }
    req.user = user;
    req.userId = user._id.toString();
    next();

  } catch (error) {
    console.error('verifyToken error:', error);
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyToken;