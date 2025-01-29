// utils/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({  _id: id }, process.env.jwt, { expiresIn: '1d' });
};

const verifyToken = (token) => {
    try {

        // console.log("this is the jwt secret key" , process.env.JWT)
        const decoded = jwt.verify(token, process.env.jwt);
        return decoded;
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
