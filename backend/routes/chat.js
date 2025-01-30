const express = require('express');
const ChatMessage = require('../models/ChatMessage');


const router = express.Router();

// messages.js (backend router)
router.get('/:chatGroupId', async (req, res) => {
  try {
    console.log("this is the group id", req.params.chatGroupId);
    const messages = await ChatMessage.find({ chatGroupId: req.params.chatGroupId })
      .sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;