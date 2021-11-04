const express = require("express");
const { getTeam, createTeam, updateTeam, deleteTeam, getTeamById } = require("../controllers/TeamsController");
const { protect } = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.route("/").get(protect, getTeams);
router.route("/create").post(protect, createTeam);
router.route("/:id").get(protect, getTeamById).put(protect, updateTeam).delete(protect, deleteTeam);
//.put().delete();

module.exports = router;