const MoodJournal = require("../models/Mood");
const analyzeSentiment = require("../utils/sentimentAnalyzer");

// Function to handle journal entry submission
async function submitMoodEntry(req, res) {
  const { moodEntry, emojiLabel } = req.body;

  console.log("This is mood entry:", moodEntry);
  console.log("This is emoji label:", emojiLabel);

  if (!moodEntry || !emojiLabel) {
    return res.status(400).json({ message: 'Mood entry and emoji label are required' });
  }

  try {
    const sentimentScore = analyzeSentiment(moodEntry);

    console.log("Sentiment Score:", sentimentScore);

    const newMoodJournal = new MoodJournal({
      userId: req.user._id,
      moodEntry,
      emojiLabel, // Save the emoji label in the database
      sentimentScore,
    });

    await newMoodJournal.save();
    return res.status(201).json({ message: 'Mood entry saved successfully', data: newMoodJournal });
  } catch (err) {
    console.error('Error saving mood entry:', err);
    return res.status(500).json({ message: 'Failed to save mood entry' });
  }
}

// Function to fetch mood entries 
async function getMoodEntries(req, res) {
  const  userId  = req.user._id ;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const moodEntries = await MoodJournal.find({ userId }).sort({ timestamp: -1 });
    return res.status(200).json({ data: moodEntries });
  } catch (err) {
    console.error('Error fetching mood entries:', err);
    return res.status(500).json({ message: 'Failed to fetch mood entries' });
  }
}

// New: Fetch mood entries for a date range
const getMoodEntriesByRange = async (req, res) => {
  const userId = req.user._id;
  const { startDate, endDate } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  if (!startDate || !endDate || isNaN(new Date(startDate).valueOf()) || isNaN(new Date(endDate).valueOf())) {
    return res.status(400).json({ message: "Invalid or missing date range parameters" });
  }

  try {
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999);

    const moodEntries = await MoodJournal.find({
      userId,
      timestamp: { $gte: start, $lte: end },
    }).sort({ timestamp: -1 });

    return res.status(200).json({ data: moodEntries });
  } catch (err) {
    console.error("Error fetching mood entries by range:", err);
    return res.status(500).json({ message: "Failed to fetch mood entries by range" });
  }
}

// function to get most recent entries 

async function getRecentMoodEntries(req, res) {
  const userId = req.user._id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Limit to the most recent 3 entries
    const moodEntries = await MoodJournal.find({ userId })
      .sort({ timestamp: -1 })
      .limit(3);

    return res.status(200).json({ data: moodEntries });
  } catch (err) {
    console.error('Error fetching mood entries:', err);
    return res.status(500).json({ message: 'Failed to fetch mood entries' });
  }
}


// Function to get user statistics
async function getUserStats(req, res) {
  try {
    const userId = req.user._id;

    const moodEntries = await MoodJournal.find({ userId });

    const totalEntries = moodEntries.length;

    const averageMood =
      moodEntries.reduce((sum, entry) => sum + entry.sentimentScore, 0) /
      (totalEntries || 1);

    return res.status(200).json({
      data: {
        averageMood: averageMood.toFixed(2),
        totalEntries,
      },
    });
  } catch (err) {
    console.error('Error fetching user stats:', err);
    return res.status(500).json({ message: 'Failed to fetch user stats' });
  }
}

module.exports = { submitMoodEntry, getMoodEntries, getMoodEntriesByRange, getUserStats , getRecentMoodEntries };
