const express = require("express");
const { protect } = require("../middlewares/AuthMiddleware");
const {
  updateSubtask,
  getSubtasks,
  createSubtask,
  subtask_markAsComplete,
  deleteSubtaskById,
} = require("../controllers/SubtasksController");
// const { get } = require("mongoose");

const router = express.Router();

router.route("/").get(protect, getSubtasks);
router.route("/create").post(protect, createSubtask);
router.route("/update/:id").put(protect, updateSubtask);
router.route("/update/status/:id").put(protect, subtask_markAsComplete);
router.route("/delete/:id").delete(protect, deleteSubtaskById);

module.exports = router;
