const mongoose = require("mongoose");

const SubtaskSchema = mongoose.Schema({
  subtask_isComplete: {
    type: Boolean,
  },
  subtask_content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Task",
  },
});

const Subtask = mongoose.model("Subtask", SubtaskSchema);

module.exports = Subtask;
