const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true },
}, { timestamps: true });

const NoteModel = mongoose.model('Note', noteSchema);

module.exports = NoteModel;