const offensiveWords = ['badword1', 'badword2', 'badword3']; // Add offensive words here

const filterMessage = (message) => {
  let filteredMessage = message;
  offensiveWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filteredMessage = filteredMessage.replace(regex, '****');
  });
  return filteredMessage;
};

module.exports = { filterMessage };
