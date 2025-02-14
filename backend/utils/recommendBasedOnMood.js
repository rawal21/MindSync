const emojiToMood = {
  "😊": "happy",
  "😐": "neutral",
  "😔": "sad",
  "😡": "angry",
  "😴": "stressed",
  "🤗": "surprised",
};

function recommendBasedOnMood(mood, userPreferences = []) {
  // Convert emoji to mood name if necessary
  const moodName = emojiToMood[mood] || mood;

  // Default recommendations for each mood with name and duration
  const moodRecommendations = {
    happy: [
      { name: "Go for a 30-minute run", duration: "30 minutes" },
      { name: "Try a new dance routine", duration: "20 minutes" },
      { name: "Engage in creative art therapy", duration: "15 minutes" },
    ],
    stressed: [
      { name: "Practice a 10-minute meditation", duration: "10 minutes" },
      { name: "Take a deep breathing session", duration: "5 minutes" },
      { name: "Try a calming yoga routine", duration: "15 minutes" },
    ],
    neutral: [
      { name: "Take a brisk walk outdoors", duration: "20 minutes" },
      { name: "Read a book for 20 minutes", duration: "20 minutes" },
      { name: "Complete a light stretching session", duration: "10 minutes" },
    ],
    sad: [
      { name: "Listen to uplifting music", duration: "10 minutes" },
      { name: "Do a gratitude journaling exercise", duration: "15 minutes" },
      { name: "Call a loved one for a chat", duration: "20 minutes" },
    ],
    angry: [
      { name: "Do an intense workout session", duration: "25 minutes" },
      { name: "Try kickboxing or martial arts", duration: "30 minutes" },
      { name: "Write down your feelings in a journal", duration: "15 minutes" },
    ],
    surprised: [
      { name: "Explore a new hobby", duration: "30 minutes" },
      { name: "Take a spontaneous nature walk", duration: "20 minutes" },
      { name: "Watch an inspirational TED Talk", duration: "18 minutes" },
    ],
  };

  // Get recommendations for the mood
  const defaultRecommendations = moodRecommendations[moodName] || [
    { name: "Take a moment to relax", duration: "10 minutes" },
  ];

  // Personalize recommendations based on user preferences
  const personalizedRecommendations = defaultRecommendations.filter((rec) =>
    userPreferences.some((pref) => rec.name.toLowerCase().includes(pref.toLowerCase()))
  );

  // Return personalized recommendations if available; otherwise, return defaults
  return personalizedRecommendations.length > 0 ? personalizedRecommendations : defaultRecommendations;
}

module.exports = recommendBasedOnMood;
