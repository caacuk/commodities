const express = require("express");
const roles = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");

// Models
const Role = require("../models/Role");

// Middleware
const verifyToken = require("./verifyToken");

roles.use(cors());

// GET ALL
roles.get("/", async (req, res) => {
  const auth = 1;
  try {
    const user = await Role.findAll();
    res.status(200).send(user);
  } catch (err) {
    res.send("error: " + err);
  }
});

// GET BY ID
roles.get("/:id", async (req, res) => {
  const auth = 1;

  try {
    const user = await Role.findOne({
      where: {
        id: req.params.id,
      },
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
roles.get("/delete/:id", async (req, res) => {
  const auth = 1;

  try {
    const user = await Role.destroy({
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
roles.post("/insert", async (req, res) => {
  const user = await Role.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (user) return res.status(400).send("User exist");

  const userData = {
    name: req.body.name,
  };

  try {
    const savedUser = await Role.create(userData);
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send("a");
  }
});

module.exports = roles;
