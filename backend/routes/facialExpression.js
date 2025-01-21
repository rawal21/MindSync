const express = require("express");
const router = express.Router();
const FacialExpression = require("../models/FacialExpression");
const  authMiddleware = require("../middlewares/authMiddleware");

// Route to save facial expression data
router.post("/", authMiddleware ,async (req, res) => {
  try {
    const {  detectedEmotion, facialFeatures } = req.body;

  

    const newExpression = new FacialExpression({
      userId : req.user._id ,
      detectedEmotion,
      facialFeatures,
    });


  

    await newExpression.save();
    res.status(201).json({ message: "Facial expression saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving facial expression data." });
  }
});

module.exports = router;
