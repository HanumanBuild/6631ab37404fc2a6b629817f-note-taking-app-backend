const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create a note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a note
router.patch('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id, { title, content, updatedAt: new Date() }, { new: true });
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;