const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { userValidation, loginValidation } = require("./validations");
users.use(cors());

// Helper
const sendResponse = require("./sendResponse");

// Register
users.post("/register", async (req, res) => {
  // Schema validation
  const { error } = userValidation(req.body);
  if (error)
    return res
      .status(400)
      .json(
        sendResponse(400, "Register failed", error.details[0].message, null)
      );

  // Check if username exist
  const usernameExist = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (usernameExist)
    return res
      .status(400)
      .json(
        sendResponse(400, "Register failed", "Username already exists", null)
      );

  // Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Create new user
  const userData = {
    role_id: req.body.role_id,
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
  };

  try {
    const savedUser = await User.create(userData);
    res.status(200).json(sendResponse(200, "Register sucess", null, savedUser));
  } catch (err) {
    res
      .status(400)
      .json(sendResponse(400, "Unexpected error", "Unexpected error", null));
  }
});

// Login
users.post("/login", async (req, res) => {
  // Schema validation
  const { error } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .json(sendResponse(400, "Login failed", error.details[0].message, null));

  // Check if username exist then get user data
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user)
    return res
      .status(400)
      .json(
        sendResponse(400, "Login failed", "Invalid username or password", null)
      );

  // Check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res
      .status(400)
      .json(
        sendResponse(400, "Login failed", "Invalid username or password", null)
      );

  // Data for token
  const dataToken = {
    id: user.id,
    role_id: user.role_id,
    name: user.name,
    username: user.username,
  };

  // Get token
  let token = await jwt.sign(dataToken, process.env.SECRET_KEY, {
    expiresIn: 1440,
  });
  res.json(sendResponse(200, "Login success", null, token));
});

module.exports = users;
