const express = require("express");
const { protect } = require("../middlewares/AuthMiddleware");
const {
  updateComment,
  getComments,
  createComment,
} = require("../controllers/CommentsController");
// const { get } = require("mongoose");

const router = express.Router();

// router.route("/").get(protect, getCommentsByTask);
router.route("/").get(protect, getComments);
router.route("/create").post(protect, createComment);
router.route("/update/:id").put(protect, updateComment);

module.exports = router;
