const express = require('express');
const router = express.Router();
const WellnessRoutine = require('../models/WellnessRoutine');
const recommendBasedOnMood = require("../utils/recommendBasedOnMood");
const authMiddleware = require("../middlewares/authMiddleware");

// POST /wellness/routine - Generate and save a wellness routine
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { emotion, recommendations } = req.body;

    // Generate routine based on mood and preferences
    const recommendation = recommendBasedOnMood(emotion, recommendations);

    // Create a new wellness routine
    const newRoutine = await WellnessRoutine.create({
      userId: req.user._id,
      routineType: 'Personalized',
      recommendations: recommendation,
    });

    res.status(200).json({
      success: true,
      routine: newRoutine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error generating routine' });
  }
})
// PATCH /wellness/routine/:id/status - Update the status of a routine
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['Completed', 'In Progress', 'Pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    // Update routine status
    const updatedRoutine = await WellnessRoutine.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRoutine) {
      return res.status(404).json({ success: false, message: 'Routine not found' });
    }

    res.status(200).json({
      success: true,
      routine: updatedRoutine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating status' });
  }
});

// GET /wellness/routines - Get all routines for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Find all routines for the authenticated user
    const routines = await WellnessRoutine.find({ userId: req.user._id });

    res.status(200).json({
      success: true,
      routines,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching routines' });
  }
});

module.exports = router;