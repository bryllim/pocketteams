const asyncHandler = require("express-async-handler");
const Task = require("../models/TaskModel");
const Subtasks = require("../models/SubtasksModel");

const getSubtasks = asyncHandler(async (req, res) => {
  const subtasks = await Subtasks.find();
  res.json(subtasks);
});

const createSubtask = asyncHandler(async (req, res) => {
  const { subtask_content, task_id, subtask_isComplete } = req.body;
  try {
    if (!subtask_content) {
      throw new Error("Please Fill all the Fields");
    } else {
      try {
        const subtasks = new Subtasks({
          user: req.user._id,
          subtask_content,
          subtask_isComplete,
          task_id,
        });
        subtasks.subtask_isComplete = false;
        let createdSubtasks = await subtasks.save();
        taskResponse = await Task.findByIdAndUpdate(
          task_id,
          { $push: { task_subtasks: createdSubtasks } },
          { new: true, useFindAndModify: false }
        );
        if (taskResponse === null) {
          throw new Error("subtasks response");
        }

        createdSubtasks = createdSubtasks.toObject();
        // createdTask.task_temp_id = task_temp_id;
        res.status(201).json(createdSubtasks);

        console.log(createdSubtasks);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(400).json(err);
    console.log("error subtasks");
  }
});

const updateSubtask = asyncHandler(async (req, res) => {
  try {
    const { subtask_content } = req.body;
    const subtaskId = req.params.id;
    const subtask = await Subtasks.findById(subtaskId);
    console.log("subtask here:", subtask);
    if (subtask.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action.");
    }
    if (!subtask_content) {
      let err = new Error("Please Fill all the Fields");
      err.status = 400;
      throw err;
    }

    if (subtask) {
      subtask.subtask_content = subtask_content;
      await subtask.save();
      res
        .status(200)
        .json({ message: "subtask_content " + subtask + " updated" });
    } else {
      res.status(404);
      throw new Error("subtasks not found");
    }
  } catch (err) {
    console.log(err.status, err.message);
    res.status(err.status).json({ message: err.message });
  }
});

const subtask_markAsComplete = asyncHandler(async (req, res) => {
  try {
    const subtask_id = req.params.id;
    if (!subtask_id) {
      let err = new Error("Please Fill all the Fields");
      err.status = 400;
      throw err;
    }
    const subtask = await Subtasks.findById(subtask_id);
    if (subtask) {
      subtask.subtask_isComplete = !subtask.subtask_isComplete;
      await subtask.save();
      res
        .status(200)
        .json({ message: "taskStatus" + subtask_id + " completed" });
    } else {
      let err = new Error("Request of" + subtask_id + "not found");
      err.status = 404;
      throw err;
    }
  } catch (err) {
    console.log(err.status, err.message);
    res.status(err.status).json({ message: err.message });
  }
});

const deleteSubtaskById = asyncHandler(async (req, res) => {
  try {
    const subtask_id = req.params.id;
    if (!subtask_id) {
      throw new Error("Please Fill all the Fields");
    }
    const subtask = await Subtasks.findById(subtask_id);
    if (subtask) {
      await subtask.remove();
      res.json({ message: "subtask Removed" });
    } else {
      res.status(404).json({ message: "Request not found" });
      throw new Error("Request not found");
    }
  } catch (err) {
    console.log("deleteSubtaskById");
    res.status(400).json(err);
  }
});

module.exports = {
  getSubtasks,
  createSubtask,
  updateSubtask,
  deleteSubtaskById,
  subtask_markAsComplete,
};
