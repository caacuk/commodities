const express = require("express");
const commodities = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");

// Models
const Commodity = require("../models/Commodity");

// Schema validation
const { surveyorValidation } = require("./validations");

// Middleware
const verifyToken = require("./verifyToken");

// Helper
const sendResponse = require("./sendResponse");

commodities.use(cors());

// GET ALL
commodities.get("/", verifyToken, async (req, res) => {
  try {
    const commodity = await Commodity.findAll({
      order: [["id", "DESC"]],
    });
    res
      .status(200)
      .json(sendResponse(200, "View all commodities success", null, commodity));
  } catch (err) {
    res
      .status(400)
      .json(sendResponse(400, "Unexpected error", "Unexpected error", null));
  }
});

// GET BY ID
commodities.get("/:id", async (req, res) => {
  try {
    const commodity = await Commodity.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (commodity) {
      res
        .status(200)
        .json(
          sendResponse(200, "View commodities by id success", null, commodity)
        );
    } else {
      res
        .status(400)
        .json(
          sendResponse(
            400,
            "View commodities by id failed",
            "Commodity doesnt exists",
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

// GET BY STATUS
commodities.get("/status/:status", async (req, res) => {
  try {
    const commodity = await Commodity.findAll({
      where: {
        status: req.params.status,
      },
      order: [["id", "DESC"]],
    });

    if (commodity) {
      res
        .status(200)
        .json(
          sendResponse(
            200,
            "View commodities by status success",
            null,
            commodity
          )
        );
    } else {
      res
        .status(400)
        .json(
          sendResponse(
            400,
            "View commodities by status failed",
            "Commodities doesnt exists",
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
commodities.delete("/:id", verifyToken, async (req, res) => {
  try {
    const commodity = await Commodity.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (commodity) {
      res
        .status(200)
        .json(sendResponse(200, "Delete commodities success", null, null));
    } else {
      res
        .status(400)
        .json(
          sendResponse(
            400,
            "Delete commodities failed",
            "Commodities doesnt exists",
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

// INSERT commodity
commodities.post("/", verifyToken, async (req, res) => {
  // Schema validation
  const { error } = surveyorValidation(req.body);
  if (error)
    return res
      .status(400)
      .json(
        sendResponse(
          400,
          "Insert commodity failed",
          error.details[0].message,
          null
        )
      );

  const commodity = await Commodity.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (commodity)
    return res
      .status(400)
      .json(
        sendResponse(
          400,
          "Insert commodity failed",
          "Commodity already exists",
          null
        )
      );

  const commodityData = {
    name: req.body.name,
    price: req.body.price,
    status: req.body.status,
    date: req.body.date,
  };

  try {
    const savedcommodity = await Commodity.create(commodityData);
    res
      .status(200)
      .json(
        sendResponse(200, "Insert commodities success", null, savedcommodity)
      );
  } catch (err) {
    res
      .status(400)
      .json(sendResponse(400, "Unexpected error", "Unexpected error", null));
  }
});

// UPDATE commodity
commodities.put("/:id", verifyToken, async (req, res) => {
  const commodity = await Commodity.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!commodity)
    return res
      .status(400)
      .json(
        sendResponse(
          400,
          "Update commodities failed",
          "commodities doesnt exists",
          null
        )
      );

  const commodityData = {
    name: req.body.name,
    price: req.body.price,
    status: req.body.status,
    date: req.body.date,
  };

  try {
    const savedcommodity = await Commodity.update(commodityData, {
      where: {
        id: req.params.id,
      },
    });
    res
      .status(200)
      .json(
        sendResponse(200, "Update commodity success", null, savedcommodity)
      );
  } catch (err) {
    res
      .status(400)
      .json(sendResponse(400, "Unexpected error", "Unexpected error", null));
  }
});

module.exports = commodities;
