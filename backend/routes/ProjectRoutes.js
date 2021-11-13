const express = require("express");
const { getProjects, createProject, updateProject, deleteProject, getProjectById, updateSectionOrder} = require("../controllers/ProjectsController");
const { protect } = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.route("/").get(protect, getProjects);
router.route("/create").post(protect, createProject);
router.route("/:id").get(protect, getProjectById).put(protect, updateProject).delete(protect, deleteProject);
router.route("/sectionorder/:id").put(protect, updateSectionOrder);
//.put().delete();

module.exports = router;
