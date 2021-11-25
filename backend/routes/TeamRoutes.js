const express = require("express");
const { getTeam, createTeam, updateTeam, updateTeamUser, deleteTeam, getTeamById, deleteUser } = require("../controllers/TeamsController");
const { protect } = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.route("/").get(protect, getTeam);
router.route("/create").post(createTeam);
router.route("/addusers/:id").get(getTeamById).put(updateTeamUser)
router.route("/deleteusers/:id").delete(protect, deleteUser)
router.route("/:id").get(protect, getTeamById).put(protect, updateTeam).delete(protect, deleteTeam);
//.put().delete();

module.exports = router;