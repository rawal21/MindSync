const mongoose = require('mongoose');

const WellnessRoutineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  routineType: {
    type: String,
    enum: ['Exercise', 'Meditation', 'Yoga', 'Stretching', 'Personalized'],
    required: true,
  },
  recommendations: [
    {
      name: { type: String, required: true },
      duration: { type: String, required: true },
    },
  ],
  status: {
    type: String,
    enum: ['Completed', 'In Progress', 'Pending'],
    default: 'Pending',
  },
  activityTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('WellnessRoutine', WellnessRoutineSchema);
