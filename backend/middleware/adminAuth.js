// middleware/adminAuth.js
const jwt = require('jsonwebtoken');
const {User} = require('../models/user');

const adminAuth = async (req, res, next) => {

    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    
    const user = await User.findById({ _id: decoded._id });

    if (!user || !user.isAdmin) {
        throw new Error('Not authorized as admin');
      }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Not authorized2 to access this resource' });
  }
};

module.exports = adminAuth;
