const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  senderId: {
    type: String, // Anonymous user identifier (can be a random string or token)
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  chatGroupId: {
    type: String, // Group/topic ID for categorizing chats
    required: true,
  },
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
