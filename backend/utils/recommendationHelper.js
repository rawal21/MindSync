const Sentiment = require('sentiment');

const generateRecommendations = (journalEntries) => {
  const sentimentAnalyzer = new Sentiment();
  const recommendations = [];

  journalEntries.forEach((entry) => {
    const { mood, text } = entry;
    const sentimentScore = sentimentAnalyzer.analyze(text).score;

    // Basic recommendation logic
    if (mood < 3 || sentimentScore < 0) {
      recommendations.push("Consider doing a relaxing activity, like meditation or a walk.");
    } else if (mood >= 3 && sentimentScore >= 0) {
      recommendations.push("Keep up the good work! Maybe try journaling about your successes.");
    } else {
      recommendations.push("How about exploring a new hobby or calling a friend?");
    }
  });

  return recommendations;
};

module.exports = generateRecommendations;
