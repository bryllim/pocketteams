const express = require("express");
const { getProjects, createProject, updateProject, deleteProject, getProjectById } = require("../controllers/ProjectsController");
const { protect } = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.route("/").get(protect, getProjects);
router.route("/create").post(protect, createProject);
router.route("/:id").get(protect, getProjectById).put(protect, updateProject).delete(protect, deleteProject);
//.put().delete();

module.exports = router;
