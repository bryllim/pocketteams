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
  const comments = await Comments.find();
  console.log("getComment", comments);
  res.json(comments);
});

// create Comment
const createComment = asyncHandler(async (req, res) => {
  const { Comment_context, task_id } = req.body;
  console.log(task_id);
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
          { $push: { tasks_comments: createdComments } },
          { new: true, useFindAndModify: false }
        );
        if (taskResponse === null) {
          throw new Error("sectionResponse");
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

module.exports = { getComments, createComment };
