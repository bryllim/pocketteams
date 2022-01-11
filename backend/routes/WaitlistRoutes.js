const express = require("express");
const { joinWaitlist } = require("../controllers/WaitlistController");
const router = express.Router();

// router.route("/").get();
router.route("/create").post(joinWaitlist);

module.exports = router;
