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
    const role = await Role.findAll();
    res.status(200).send(role);
  } catch (err) {
    res.send("error: " + err);
  }
});

// GET BY ID
roles.get("/:id", async (req, res) => {
  const auth = 1;

  try {
    const role = await Role.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (role) {
      res.status(200).send(role);
    } else {
      res.status(400).send("role doesnt exists");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE BY ID
roles.get("/delete/:id", async (req, res) => {
  const auth = 1;

  try {
    const role = await Role.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (role) {
      res.status(200).send("role deleted");
    } else {
      res.status(400).send("role doesnt exists");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// INSERT role
roles.post("/insert", async (req, res) => {
  const role = await Role.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (role) return res.status(400).send("role exist");

  const roleData = {
    name: req.body.name,
  };

  try {
    const savedrole = await Role.create(roleData);
    res.status(200).send(savedrole);
  } catch (err) {
    res.status(400).send("a");
  }
});

module.exports = roles;
