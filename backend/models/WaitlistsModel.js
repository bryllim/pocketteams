const mongoose = require("mongoose");

const waitlistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const Waitlist = mongoose.model("Waitlist", waitlistSchema);

module.exports = Waitlist;
