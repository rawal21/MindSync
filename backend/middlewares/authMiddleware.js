// middleware/authMiddleware.js
const { verifyToken } = require('../utils/jwt');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findById(decoded._id);
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
};

module.exports = authMiddleware;
