const express = require("express");
const { protect } = require("../middlewares/AuthMiddleware");
const {
  getCommentsByTask,
  getComments,
  createComment,
} = require("../controllers/CommentsController");

const router = express.Router();

// router.route("/").get(protect, getCommentsByTask);
router.route("/").get(protect, getComments);
router.route("/create").post(protect, createComment);
// router.route("/").put(protect);

module.exports = router;
