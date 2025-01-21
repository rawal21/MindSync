const express = require('express');
const {
  addJournal,
  getJournals,
  updateJournal,
  deleteJournal,
} = require('../controllers/journalController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST: Add a new journal entry
router.post('/add', addJournal);

// GET: Retrieve all journal entries
router.get('/', getJournals);

// PUT: Update a journal entry
router.put('/:id', updateJournal);

// DELETE: Delete a journal entry
router.delete('/:id' , deleteJournal);

module.exports = router;
