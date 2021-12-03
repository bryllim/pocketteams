const asyncHandler = require("express-async-handler");
const Task = require("../models/TaskModel");
const Section = require("../models/SectionModel");

const createTask = asyncHandler( async (req,res) => {
    const {newTask} = req.body;
    newTask.user = req.user.id;
    console.log(newTask);
    try{
        if(!newTask){
            throw new Error("Please Fill all the Fields");
        } else {
            try{
                const task = new Task(newTask);
                let createdTask = await task.save()
                sectionResponse = await Section.findByIdAndUpdate(
                  newTask.section_id,
                    { $push: { tasks: createdTask} },
                    { new: true, useFindAndModify: false },
                );
                if(sectionResponse === null){
                    throw new Error("sectionResponse");
                }
                res.status(201).json();
                console.log("createdTask",createdTask)

            }catch (err) {
                console.log(err)
                res.status(500).json(err);
            }
        }
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
});

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().populate("task_comments");
  res.json(tasks);
});

const getTasksBySection = asyncHandler(async (req, res) => {
  const sectionId = req.params.sectionid;
  const tasks = await Task.find({ section: sectionId });
  console.log("Tasks", sectionId);
  res.json(tasks);
});

const deleteTaskById = asyncHandler(async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    console.log("Task Deleted", req.params.id);
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

const updateTaskById = asyncHandler(async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body);
  const allowedUpdates = ['task_name','task_description', 'order','section_id']
  const isValidOperation = updates.every(
      (update) => allowedUpdates.includes(update))
  if (!isValidOperation)
      return res.status(400).send({ error: 'Invalid updates!' })
  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true});
    if(!task)
      return res.status(404).json({message: "Task not found"});
    console.log("Task Updated ", _id);
    res.status(200).json(task);
  }
  catch(e) {
    console.log(e);
    res.status(500)
  }
});

const updateTaskDescriptionById = asyncHandler(async (req, res) => {
  try {
    const { task_description } = req.body;
    const task_id = req.params.id;
    if (!task_id || !task_description) {
      let err = new Error("Please Fill all the Fields");
      err.status = 400;
      throw err;
    }
    const task = await Task.findById(task_id);
    if (task) {
      task.task_description = task_description;
      await task.save();
      res
        .status(200)
        .json({ message: "task_description " + task_id + " updated" });
    } else {
      let err = new Error("Request of" + task_id + "not found");
      err.status = 404;
      throw err;
    }
  } catch (err) {
    console.log(err.status, err.message);
    res.status(err.status).json({ message: err.message });
  }
});

const updateTaskAssignedUsersById = asyncHandler(async (req, res) => {
  try {
    const { task_assigned_users } = req.body;
    const task_id = req.params.id;
    if (!task_id || !task_assigned_users) {
      let err = new Error("Please Fill all the Fields");
      err.status = 400;
      throw err;
    }
    const task = await Task.findById(task_id);
    if (task) {
      task.task_assigned_users = task_assigned_users;
      await task.save();
      res
        .status(200)
        .json({ message: "task_assigned_users " + task_id + " updated" });
    } else {
      let err = new Error("Request of" + task_id + "not found");
      err.status = 404;
      throw err;
    }
  } catch (err) {
    console.log(err.status, err.message);
    res.status(err.status).json({ message: err.message });
  }
});

const updateTaskPriorityById = asyncHandler(async (req, res) => {
  try {
    const { task_priority } = req.body;
    console.log(task_priority);
    const task_id = req.params.id;
    if (!task_id) {
      let err = new Error("Please Fill all the Fields");
      err.status = 400;
      throw err;
    }
    const task = await Task.findById(task_id);
    if (task) {
      task.task_priority = task_priority;
      await task.save();
      console.log("taskpriosave");
      res
        .status(200)
        .json({ message: "task_priority " + task_id + " updated" });
    } else {
      let err = new Error("Request of" + task_id + "not found");
      err.status = 404;
      throw err;
    }
  } catch (err) {
    console.log(err.status, err.message);
    res.status(err.status).json({ message: err.message });
  }
});

const updateTaskNameById = asyncHandler(async (req, res) => {
  try {
    const { task_name } = req.body;
    const task_id = req.params.id;
    if (!task_id || !task_name) {
      let err = new Error("Please Fill all the Fields");
      err.status = 400;
      throw err;
    }
    const task = await Task.findById(task_id);
    if (task) {
      task.task_name = task_name;
      await task.save();
      res.status(200).json({ message: "task_name " + task_id + " updated" });
    } else {
      let err = new Error("Request of" + task_id + "not found");
      err.status = 404;
      throw err;
    }
  } catch (err) {
    console.log(err.status, err.message);
    res.status(err.status).json({ message: err.message });
  }
});

const updateTaskEndDateById = asyncHandler(async (req, res) => {
  try {
    const { task_end_date } = req.body;
    const task_id = req.params.id;
    if (!task_id || !task_end_date) {
      let err = new Error("Please Fill all the Fields");
      err.status = 400;
      throw err;
    }
    const task = await Task.findById(task_id);
    if (task) {
      task.task_end_date = task_end_date;
      await task.save();
      res
        .status(200)
        .json({ message: "task_end_date " + task_id + " updated" });
    } else {
      let err = new Error("Request of" + task_id + "not found");
      err.status = 404;
      throw err;
    }
  } catch (err) {
    console.log(err.status, err.message);
    res.status(err.status).json({ message: err.message });
  }
});


const getTaskByProjectId = asyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find({ project_id: req.params.id });
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(500)
      throw new Error("Request not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500)
    throw new Error(err);
  }
});






module.exports = {
  createTask,
  getTasks,
  getTasksBySection,
  deleteTaskById,
  updateTaskById,
  updateTaskDescriptionById,
  updateTaskAssignedUsersById,
  updateTaskPriorityById,
  updateTaskNameById,
  getTaskByProjectId,
};
