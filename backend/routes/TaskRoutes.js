const express = require("express");
const {
  getTasks,
  createTask,
  getTasksBySection,
  deleteTaskById,
  updateTaskById,
  updateTaskDescriptionById,
  updateTaskAssignedUsersById,
  updateTaskPriorityById,
  updateTaskNameById,
  markAsComplete,
} = require("../controllers/TasksController");
const { protect } = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.route("/").get(protect, getTasks);
router.route("/create").post(protect, createTask);
// router.route("/:sectionid").get(protect, getTasksBySection);
router
  .route("/:id")
  .patch(protect, updateTaskById)
  .delete(protect, deleteTaskById);
router.route("/update/description/:id").put(protect, updateTaskDescriptionById);
router
  .route("/update/assignedusers/:id")
  .put(protect, updateTaskAssignedUsersById);
router.route("/update/priority/:id").put(protect, updateTaskPriorityById);
router.route("/update/name/:id").put(protect, updateTaskNameById);
router.route("/update/status/:id").put(protect, markAsComplete);

module.exports = router;
