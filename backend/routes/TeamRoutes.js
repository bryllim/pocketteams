const express = require("express");
const { getTeam, createTeam, updateTeam, updateTeamUser, updateTeamProject, deleteTeam, getTeamById, deleteUser, removeProject } = require("../controllers/TeamsController");
const { protect } = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.route("/").get(protect, getTeam);
router.route("/create").post(createTeam);
router.route("/projects/:id").get(protect,getTeamById).put(protect,updateTeamProject);
router.route("/deleteprojects/:id").get(getTeamById).put(protect,removeProject);
router.route("/users/:id").get(protect,getTeamById).put(protect,updateTeamUser);
router.route("/deleteusers/:id").get(getTeamById).put(protect,deleteUser);
router.route("/:id").get(protect, getTeamById).put(protect, updateTeam).delete(protect, deleteTeam);
//.put().delete();

module.exports = router;