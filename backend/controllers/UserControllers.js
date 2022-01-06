const User = require("../models/UserModel");
const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
const generateToken = require("../utils/GenerateToken");

//Handles the user registration
const registerUser = AsyncHandler(async (req, res) => {
  const { first_name, last_name, email_address, password, profile_pic } =
    req.body;

  const user_exists = await User.findOne({ email_address });

  //Check if the user exists from the database
  if (user_exists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  //Create the user
  const user = await User.create({
    first_name,
    last_name,
    email_address,
    password,
    profile_pic,
  });

  //If the user is recieved from the database
  if (user) {
    res.status(201).json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email_address: user.email_address,
      is_admin: user.is_admin,
      profile_pic: user.profile_pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred");
  }

  //Response from the API if the user is successfully registered
  res.json({
    first_name,
    last_name,
    email_address,
  });
});

//Handles the user login
const authUser = AsyncHandler(async (req, res) => {
  const { first_name, last_name, email_address, password, profile_pic } =
    req.body;

  //Check if the user exists and store it
  console.log("email_address", email_address);
  //const user = await User.findOne({ email_address });
  //Check if the password matches the user
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email_address: user.email_address,
      profile_pic: user.profile_pic,
      is_admin: user.is_admin,
      token: generateToken(user._id),
    });
  } else {
    console.log("user", user);
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

// const updateUser = AsyncHandler(async (req, res) => {
//   const {first_name, last_name, email_address, password, confirm_password} = req.body;

//   const user = await User.findById(req.params.id);

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email_address: user.email_address,
//       profile_pic: user.profile_pic,
//       is_admin: user.is_admin,
//       token: generateToken(user._id),
//     });
//   } else {
//     console.log("user", user);
//     res.status(400);
//     throw new Error("Invalid Email or Password!");
//   }
// })

const getUsers = AsyncHandler(async (req, res) => {
  const users = await User.find({}).select("email_address");
  res.json(users);
});

const getUserById = AsyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id);
  if (users) {
    res.json(users);
  } else {
    res.status(404).json({ message: "not found" });
  }
  res.json(users);
});



module.exports = { registerUser, authUser, getUsers, getUserById };
