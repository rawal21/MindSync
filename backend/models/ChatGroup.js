const mongoose = require('mongoose');

const chatGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  shortName: {
    type: String,
    required: true,
    trim: true, // e.g., "A1", "A2"
  },
  activeMembers: {
    type: Number,
    default: 0, // Will be updated dynamically using sockets
  },
});

module.exports = mongoose.model('ChatGroup', chatGroupSchema);
