const express = require("express");
const {createSection,getSections,getSectionById, updateSection, deleteSection,updateSectionOrder} = require("../controllers/SectionController");
const { protect } = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.route("/").get(protect, getSections);
router.route("/create").post(protect, createSection);
router.route("/:id").get(protect, getSectionById).put(protect, updateSection).delete(protect, deleteSection);
router.route("/:id/:newindex/:oldindex").put(protect,updateSectionOrder);
module.exports = router;
