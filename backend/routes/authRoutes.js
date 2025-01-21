const express = require('express');
const { registerUser, authUser } = require('../controllers/authController');
const { check } = require('express-validator');


const router = express.Router();

// Register a new user
router.post('/register',    [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
], registerUser);

// Authenticate a user and get a token
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], authUser);

module.exports = router;
