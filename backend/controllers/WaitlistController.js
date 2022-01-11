const Waitlist = require("../models/WaitlistsModel");
const asyncHandler = require("express-async-handler");

const joinWaitlist = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400);
    throw new Error("Please Fill all the Fields");
  } else {
    const waitlister = new Waitlist({
      name,
      email,
    });

    const join_success = await waitlister.save();

    res.status(201).json(join_success);
  }
});

module.exports = {
  joinWaitlist,
};
