const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
// const { userValidation, loginValidation } = require("../validation");
users.use(cors());

process.env.SECRET_KEY = "secret";

// Register
users.post("/register", async (req, res) => {
  // Schema validation
  //   const { error } = userValidation(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  // Check if username exist
  const usernameExist = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (usernameExist) return res.status(400).send("username already exists");

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
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
users.post("/login", async (req, res) => {
  // Schema validation
  //   const { error } = loginValidation(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  // Check if username exist then get user data
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user) return res.status(400).send("username is not found.");

  // Check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password.");

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
  res.send(token);
});

module.exports = users;
