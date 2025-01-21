const Journal = require('../models/Journal');

// Add a new journal entry
const addJournal = async (req, res) => {
  const { title, content, mood } = req.body;

  try {
    const newJournal = await Journal.create({
      user: req.user.id,
      title,
      content,
      mood,
    });

    res.status(201).json(newJournal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all journal entries for the logged-in user
const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user.id }).sort({ date: -1 });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a journal entry
const updateJournal = async (req, res) => {
  const { id } = req.params;
  const { title, content, mood } = req.body;

  try {
    const journal = await Journal.findById(id);

    if (!journal || journal.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    journal.title = title || journal.title;
    journal.content = content || journal.content;
    journal.mood = mood || journal.mood;

    const updatedJournal = await journal.save();
    res.json(updatedJournal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a journal entry
const deleteJournal = async (req, res) => {
  const { id } = req.params;

  try {
    const journal = await Journal.findById(id);

    if (!journal || journal.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    await journal.remove();
    res.json({ message: 'Journal entry removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addJournal, getJournals, updateJournal, deleteJournal };
