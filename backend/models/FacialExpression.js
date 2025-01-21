const mongoose = require("mongoose");

const FacialExpressionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  detectedEmotion: {
    type: String,
    required: true,
    enum: ["happy", "sad", "neutral", "angry", "surprised", "fearful", "disgusted"], // Add more emotions as needed
  },
  facialFeatures: {
    type: Object, // JSON object to store facial feature data
    required: true,
  },
});

module.exports = mongoose.model("FacialExpression", FacialExpressionSchema);
