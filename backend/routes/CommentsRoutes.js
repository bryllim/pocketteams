const express = require("express");
const { protect } = require("../middlewares/AuthMiddleware");
const {
  updateComment,
  getComments,
  createComment,
  deleteCommentById,
} = require("../controllers/CommentsController");
// const { get } = require("mongoose");

const router = express.Router();

router.route("/").get(protect, getComments);
router.route("/create").post(protect, createComment);
router.route("/update/:id").put(protect, updateComment);
router.route("/delete/:id").delete(protect, deleteCommentById);

module.exports = router;
