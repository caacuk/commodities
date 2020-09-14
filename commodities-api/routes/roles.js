const express = require("express");
const roles = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");

// Models
const Role = require("../models/Role");

// Middleware
const verifyToken = require("./verifyToken");

// Helper
const sendResponse = require("./sendResponse");

roles.use(cors());

// GET ALL
roles.get("/", verifyToken, async (req, res) => {
  try {
    const role = await Role.findAll();
    res
      .status(200)
      .json(sendResponse(200, "View all role success", null, role));
  } catch (err) {
    res.json(sendResponse(400, "View all role failed", err, null));
  }
});

// GET BY ID
roles.get("/:id", verifyToken, async (req, res) => {
  try {
    const role = await Role.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (role) {
      res
        .status(200)
        .json(
          sendResponse(200, "View role id " + role.id + " success", null, role)
        );
    } else {
      res
        .status(400)
        .json(
          sendResponse(
            400,
            "View role by id failed",
            "Role doesn't exist",
            null
          )
        );
    }
  } catch (err) {
    res
      .status(400)
      .json(sendResponse(400, "Unexpected error", "Unexpected error", null));
  }
});

// DELETE BY ID
roles.delete("/:id", verifyToken, async (req, res) => {
  try {
    const role = await Role.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (role) {
      res
        .status(200)
        .json(sendResponse(200, "Role delete success", null, null));
    } else {
      res
        .status(400)
        .json(
          sendResponse(400, "Role get by id failed", "Role doesnt exists", null)
        );
    }
  } catch (err) {
    res
      .status(400)
      .json(sendResponse(400, "Unexpected error", "Unexpected error", null));
  }
});

// INSERT role
roles.post("/", verifyToken, async (req, res) => {
  const role = await Role.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (role)
    return res
      .status(400)
      .json(sendResponse(400, "Insert role failed", "Role exist", null));

  const roleData = {
    name: req.body.name,
  };

  try {
    const savedrole = await Role.create(roleData);
    res
      .status(200)
      .json(sendResponse(200, "Insert role success", null, savedrole));
  } catch (err) {
    res
      .status(400)
      .json(sendResponse(400, "Unexpected error", "Unexpected error", null));
  }
});

module.exports = roles;
