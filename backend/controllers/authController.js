const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

// Register a new user
const registerUser = [
    // Validate the fields
    body('name').notEmpty().withMessage('name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    // Handle validation results
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },

    // Create the user
    async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const user = new User({ name, email, password });
            await user.save();

            const token = generateToken(user._id);
            res.status(201).json({ message: 'User created successfully', token });
        } catch (err) {
            res.status(500).json({ message: 'Error creating user', error: err.message });
        }
    }
];

// Authenticate user
const authUser = [
    // Validate the fields
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password is required and must be at least 6 characters'),

    // Handle validation results
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },

    // Authenticate the user
    async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = generateToken(user._id);
            res.json({ message: 'Logged in successfully', token });
        } catch (err) {
            res.status(500).json({ message: 'Error logging in', error: err.message });
        }
    }
];

module.exports = { registerUser, authUser };
