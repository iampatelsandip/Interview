const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const  {sendError ,sendSuccess} = require('../utils/services')
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      sendError(res,401,"NOT_AUTHORIZED","Not authorized, token failed")
    }
  }

  if (!token) {
    sendError(res,401,"NOT_AUTHORIZED","Not authorized, no token")
  }
};
