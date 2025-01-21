const express = require('express');
const ChatMessage = require('../models/ChatMessage');

const router = express.Router();

// Get messages for a specific chat room
router.get('/:chatGroupId', async (req, res) => {
  const { chatGroupId } = req.params;

  try {
    const messages = await ChatMessage.find({ chatGroupId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
