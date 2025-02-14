const express = require("express");
const router = express.Router();
const WellnessRoutine = require("../models/WellnessRoutine");
const recommendBasedOnMood = require("../utils/recommendBasedOnMood");
const authMiddleware = require("../middlewares/authMiddleware");

// POST /wellness/routine - Generate and save a wellness routine
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { emotion, recommendations, activityTime } = req.body;

    // Generate recommendation based on mood
    const recommendation = recommendBasedOnMood(emotion);

    const newRoutine = await WellnessRoutine.create({
      userId: req.user._id,
      routineType: "Personalized",
      recommendations: recommendation,
      activityTime: activityTime || new Date(),
    });

    res.status(200).json({ success: true, routine: newRoutine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error generating routine" });
  }
});

// PATCH /wellness/routine/:id/status - Update the status of a routine
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Completed", "In Progress", "Pending"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updatedRoutine = await WellnessRoutine.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedRoutine) {
      return res.status(404).json({ success: false, message: "Routine not found" });
    }

    res.status(200).json({ success: true, routine: updatedRoutine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
});

// PATCH /wellness/routine/:id/time - Update the activity time
router.patch("/:id/time", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { activityTime } = req.body;

    if (!activityTime) {
      return res.status(400).json({ success: false, message: "Invalid time provided" });
    }

    const updatedRoutine = await WellnessRoutine.findByIdAndUpdate(id, { activityTime }, { new: true });

    if (!updatedRoutine) {
      return res.status(404).json({ success: false, message: "Routine not found" });
    }

    res.status(200).json({ success: true, routine: updatedRoutine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating activity time" });
  }
});

// GET /wellness/routines - Get all routines for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const routines = await WellnessRoutine.find({ userId: req.user._id });

    res.status(200).json({ success: true, routines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching routines" });
  }
});

module.exports = router;
