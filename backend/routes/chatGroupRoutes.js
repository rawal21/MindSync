const express = require('express');
const ChatGroup = require('../models/ChatGroup');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const groups = await ChatGroup.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat groups' });
  }
});

module.exports = router;