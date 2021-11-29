const express = require("express");
const {createSection,getSections,getSectionById, updateSection, deleteSection,updateSectionOrder,updateSectionTask,getSectionByProjectId} = require("../controllers/SectionController");
const { protect } = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.route("/").get(protect, getSections);
router.route("/create").post(protect, createSection);
router.route("/:id").get(protect, getSectionById).put(protect, updateSection).delete(protect, deleteSection);
router.route("/:id/:newindex/:oldindex").put(protect,updateSectionOrder);
router.route("/tasks/:id").put(protect, updateSectionTask);
router.route("/project/:id").get(protect, getSectionByProjectId);

module.exports = router;
