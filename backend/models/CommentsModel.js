const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    Comment_context: {
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
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
