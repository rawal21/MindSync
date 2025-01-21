
const Sentiment = require('sentiment');

const sentiment = new Sentiment();

function analyzeSentiment(text) {
  const result = sentiment.analyze(text);
  return result.score; // Positive scores are good, negative are bad
}

module.exports = analyzeSentiment;
