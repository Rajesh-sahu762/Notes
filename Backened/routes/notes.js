const express = require('express');
const router = express.Router();
const { createNote,updateNote ,deleteNote, getNotes } = require('../Controllers/notes.js');
const verifyToken = require('../Middleware/verifyToken.js');

 router.post('/createNote', verifyToken, createNote);

 router.put('/updateNote/:id', verifyToken, updateNote);

router.delete("/deleteNote/:id", verifyToken, deleteNote);

router.get("/GetNotes", verifyToken, getNotes);



module.exports = router;