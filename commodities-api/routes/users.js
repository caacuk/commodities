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

// Helper
const sendResponse = require("./sendResponse");

users.use(cors());

// GET ALL
users.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findAll({
      include: [
        {
          model: Role,
          attributes: ["id", "name"],
        },
      ],
      attributes: ["id", "name", "username"],
    });
    res
      .status(200)
      .json(sendResponse(200, "View all users success", null, user));
  } catch (err) {
    res.json(sendResponse(400, "Unexpected error", "Unexpected error", null));
  }
});

// GET BY ID
users.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Role,
          attributes: ["id", "name"],
        },
      ],
      attributes: ["id", "name", "username"],
    });

    if (user) {
      res
        .status(200)
        .json(sendResponse(200, "View users by id success", null, user));
    } else {
      res
        .status(400)
        .json(
          sendResponse(
            400,
            "View users by id failed",
            "User doesnt exist",
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
users.delete("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (user) {
      res
        .status(200)
        .json(sendResponse(200, "Delete user success", null, null));
    } else {
      res
        .status(400)
        .json(
          sendResponse(400, "Unexpected error", "User doesnt exists", null)
        );
    }
  } catch (err) {
    res
      .status(400)
      .json(sendResponse(400, "Unexpected error", "Unexpected error", null));
  }
});

module.exports = users;
