const express = require("express");
const { protect } = require("../middlewares/AuthMiddleware");
const { getNotes, createdNote, getNoteById, updateNote } = require("../controllers/NotesController") 

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route('/').post(protect, createdNote);
router.route('/:id').get(protect, getNoteById).put(protect, updateNote)

module.exports = router; 