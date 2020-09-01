const express = require("express");
const users = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");

// Models
const User = require("../models/User");
const Role = require("../models/Role");

// FOREIGNKEY
Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id" });

// Middleware
const verifyToken = require("./verifyToken");

users.use(cors());

users.get("/profile", verifyToken, (req, res) => {
  User.findOne({
    where: {
      id: req.user.id,
    },
  })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

// GET ALL
users.get("/", async (req, res) => {
  const auth = 1;
  try {
    const user = await User.findAll({
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).send(user);
  } catch (err) {
    res.send("error: " + err);
  }
});

// GET BY ID
users.get("/:id", async (req, res) => {
  const auth = 1;

  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send("User doesnt exists");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE BY ID
users.get("/delete/:id", async (req, res) => {
  const auth = 1;

  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (user) {
      res.status(200).send("User deleted");
    } else {
      res.status(400).send("User doesnt exists");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// INSERT USER
users.post("/insert", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (user) return res.status(400).send("User exist");

  // Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const userData = {
    name: req.body.name,
    role_id: req.body.role_id,
    username: req.body.username,
    password: hashedPassword,
  };

  try {
    const savedUser = await User.create(userData);
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send("a");
  }
});

module.exports = users;
