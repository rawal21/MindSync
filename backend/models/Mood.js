// models/MoodJournal.js
const mongoose = require('mongoose');

const moodJournalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming User model exists for referencing
    required: true
  },
  moodEntry: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sentimentScore: { 
    type: Number,
    required: true
  }
});

const MoodJournal = mongoose.model('MoodJournal', moodJournalSchema);
module.exports = MoodJournal;
