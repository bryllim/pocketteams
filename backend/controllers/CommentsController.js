const Task = require("../models/TaskModel");
const Comments = require("../models/CommentsModel");
const asyncHandler = require("express-async-handler");

// const getCommentsByTask = asyncHandler(async (req, res) => {
//   const taskId = req.params.task_id;
//   const comments = await Comments.find({ tasks: taskId });
//   console.log("Comment", taskId);
//   res.json(comments);
// });

const getComments = asyncHandler(async (req, res) => {
  // const { task_id } = req.body;
  // console.log("taskId", task_id);
  const comments = await Comments.find();
  res.json(comments);
});

// create Comment
const createComment = asyncHandler(async (req, res) => {
  const { Comment_context, task_id } = req.body;
  try {
    if (!Comment_context) {
      throw new Error("Please Fill all the Fields");
    } else {
      try {
        const comment = new Comments({
          user: req.user._id,
          Comment_context,
          task_id,
        });
        let createdComment = await comment.save();
        taskResponse = await Task.findByIdAndUpdate(
          task_id,
          { $push: { task_comments: createdComment } },
          { new: true, useFindAndModify: false }
        );
        if (taskResponse === null) {
          throw new Error("commentRespone");
        }

        createdComment = createdComment.toObject();
        // createdTask.task_temp_id = task_temp_id;
        res.status(201).json(createdComment);

        console.log(createdComment);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(400).json(err);
    console.log("error comment");
  }
});

const updateComment = asyncHandler(async (req, res) => {
  try {
    const { Comment_context, user } = req.body;
    const commentId = req.params.id;
    const comment = await Comments.findById(commentId);
    console.log("comment here:", comment);
    if (comment.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action.");
    }
    // if (!Comment_context) {
    //   let err = new Error("Please Fill all the Fields");
    //   err.status = 400;
    //   throw err;
    // }

    if (comment) {
      comment.Comment_context = Comment_context;
      await comment.save();
      res
        .status(200)
        .json({ message: "Comment_context " + comment + " updated" });
    } else {
      res.status(404);
      throw new Error("Comment not found");
    }
  } catch (err) {
    console.log(err.status, err.message);
    res.status(err.status).json({ message: err.message });
  }
});

module.exports = { getComments, createComment, updateComment };
