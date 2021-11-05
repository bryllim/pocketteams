const express = require("express");
const {getTasks,createTask,getTasksBySection,deleteTaskById,updateTaskById} = require("../controllers/TasksController");
const { protect } = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.route("/").get(protect, getTasks);
router.route("/create").post(protect, createTask);
router.route("/:sectionid").get(protect, getTasksBySection);
router.route("/:id").delete(protect,deleteTaskById).put(protect,updateTaskById);
module.exports = router;
