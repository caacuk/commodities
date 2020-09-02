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

commodities.use(cors());

// GET ALL
commodities.get("/", verifyToken, async (req, res) => {
  try {
    const commodity = await Commodity.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).send(commodity);
  } catch (err) {
    res.send("error: " + err);
  }
});

// GET BY ID
commodities.get("/", async (req, res) => {
  const auth = 1;

  try {
    const commodity = await Commodity.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (commodity) {
      res.status(200).send(commodity);
    } else {
      res.status(400).send("commodity doesnt exists");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET BY STATUS
commodities.get("/status/:status", async (req, res) => {
  const auth = 1;

  try {
    const commodity = await Commodity.findAll({
      where: {
        status: req.params.status,
      },
      order: [["id", "DESC"]],
    });

    if (commodity) {
      res.status(200).send(commodity);
    } else {
      res.status(400).send("commodity doesnt exists");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE BY ID
commodities.get("/delete/:id", async (req, res) => {
  const auth = 1;

  try {
    const commodity = await Commodity.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (commodity) {
      res.status(200).send("commodity deleted");
    } else {
      res.status(400).send("commodity doesnt exists");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// INSERT commodity
commodities.post("/insert", verifyToken, async (req, res) => {
  // Schema validation
  const { error } = surveyorValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const commodity = await Commodity.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (commodity) return res.status(400).send("commodity exist");

  const commodityData = {
    name: req.body.name,
    price: req.body.price,
    status: req.body.status,
    date: req.body.date,
  };

  try {
    const savedcommodity = await Commodity.create(commodityData);
    res.status(200).send(savedcommodity);
  } catch (err) {
    res.status(400).send(err);
  }
});

// UPDATE commodity
commodities.post("/update", async (req, res) => {
  const commodity = await Commodity.findOne({
    where: {
      id: req.body.id,
    },
  });

  if (!commodity) return res.status(400).send("commodity doesnt exist");

  const commodityData = {
    name: req.body.name,
    price: req.body.price,
    status: req.body.status,
    date: req.body.date,
  };

  try {
    const savedcommodity = await Commodity.update(commodityData, {
      where: {
        id: req.body.id,
      },
    });
    res.status(200).send(savedcommodity);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = commodities;
