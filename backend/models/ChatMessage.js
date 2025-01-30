// ChatMessage model (backend)

const mongoose = require('mongoose');
const chatMessageSchema = new mongoose.Schema({
  username: { // Changed from senderId
    type: String,
    required: true,
    default: "Anonymous"
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  chatGroupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatGroup',
    required: true
  }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);