const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
