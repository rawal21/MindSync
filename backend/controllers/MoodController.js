// controllers/moodController.js
const MoodJournal = require("../models/Mood");
const analyzeSentiment = require("../utils/sentimentAnalyzer");

// Function to handle journal entry submission
async function submitMoodEntry(req, res) {
  const { moodEntry } = req.body;

  if (!moodEntry) {
    return res.status(400).json({ message: 'User ID and mood entry are required' });
  }

  try {
    const sentimentScore = analyzeSentiment(moodEntry);

    console.log("sentiment Score of today" , sentimentScore);

    const newMoodJournal = new MoodJournal({
      userId : req.user._id , 
      moodEntry,
      sentimentScore
    });

    await newMoodJournal.save();
    return res.status(201).json({ message: 'Mood entry saved successfully', data: newMoodJournal });
  } catch (err) {
    console.error('Error saving mood entry:', err);
    return res.status(500).json({ message: 'Failed to save mood entry' });
  }
}

// Function to fetch mood entries for a user
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

async function getUserStats(req, res) {
  try {
    const userId = req.user._id;

    // Fetch all mood entries for the user
    const moodEntries = await MoodJournal.find({ userId });

    // Calculate total journal entries
    const totalEntries = moodEntries.length;

    // Calculate average mood sentiment score
    const averageMood =
      moodEntries.reduce((sum, entry) => sum + entry.sentimentScore, 0) /
      (totalEntries || 1); // Avoid division by zero

    return res.status(200).json({
      data: {
        averageMood: averageMood.toFixed(2), // Rounded to 2 decimals
        totalEntries,
      },
    });
  } catch (err) {
    console.error('Error fetching user stats:', err);
    return res.status(500).json({ message: 'Failed to fetch user stats' });
  }
}

module.exports = { submitMoodEntry, getMoodEntries , getUserStats };
