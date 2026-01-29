const mongoose = require('mongoose');
const NoteModel = require('../models/notes.js');

const createNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const newNote = new NoteModel({ title, content, userId });
    await newNote.save();
    res.status(201).json({ message: 'Note created successfully', note: newNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const userId = req.user ? req.user._id.toString() : req.userId;
    const noteId = (req.params.id || '').trim();
    const { title, content } = req.body;

    console.log('updateNote called - noteId:', noteId, 'userId:', userId);

    if (!noteId || !mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ error: 'Invalid note id' });
    }

    const findNote = await NoteModel.findById(noteId);
    if (!findNote) {
      console.log('No note found for id:', noteId);
      return res.status(404).json({ error: 'Note not found' });
    }

    if (findNote.userId.toString() !== userId) {
      return res.status(403).json({ error: 'You are not authorized to update this note' });
    }

    const updatedNote = await NoteModel.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );

    res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteNote = async (req, res) => {
  try {
 const userId = req.user ? req.user._id.toString() : req.userId;
    const noteId = (req.params.id || '').trim();
    const note = await NoteModel.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    if (note.userId.toString() !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this note' });
    }
    const DeletedNote = await NoteModel.findByIdAndDelete(noteId);
    res.status(200).json({ message: 'Note deleted successfully', note: DeletedNote });

    
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error('deleteNote error:', error);
  }

}


const getNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const notes = await NoteModel.find({ userId });
    if (!notes) {
      return res.status(404).json({ error: 'No notes found' });
    }
    
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNote, updateNote , deleteNote, getNotes};