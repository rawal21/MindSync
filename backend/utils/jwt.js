// utils/jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({  _id: id }, process.env.JWT, { expiresIn: '1d' });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT);
        return decoded;
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
