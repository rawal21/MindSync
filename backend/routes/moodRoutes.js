const express = require('express');
const  {submitMoodEntry, getMoodEntries , getUserStats ,  getMoodEntriesByRange, getRecentMoodEntries  } = require('../controllers/MoodController');
const  authMiddleware  = require('../middlewares/authMiddleware');

const router = express.Router();

// POST: Add a new mood
router.post('/add', authMiddleware ,submitMoodEntry);

// GET: Retrieve all moods for the logged-in user
router.get('/', authMiddleware,getMoodEntries);

router.get("/range", authMiddleware, getMoodEntriesByRange);

router.get('/recent', authMiddleware, getRecentMoodEntries);

router.get('/stats', authMiddleware, getUserStats);

module.exports = router;
