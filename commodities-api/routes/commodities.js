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
    const user = await Commodity.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).send(user);
  } catch (err) {
    res.send("error: " + err);
  }
});

// GET BY ID
commodities.get("/", async (req, res) => {
  const auth = 1;

  try {
    const user = await Commodity.findOne({
      where: {
        id: req.body.id,
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

// GET BY STATUS
commodities.get("/status/:status", async (req, res) => {
  const auth = 1;

  try {
    const user = await Commodity.findAll({
      where: {
        status: req.params.status,
      },
      order: [["id", "DESC"]],
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
commodities.get("/delete/:id", async (req, res) => {
  const auth = 1;

  try {
    const user = await Commodity.destroy({
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
commodities.post("/insert", verifyToken, async (req, res) => {
  // Schema validation
  const { error } = surveyorValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const user = await Commodity.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (user) return res.status(400).send("User exist");

  const userData = {
    name: req.body.name,
    price: req.body.price,
    status: req.body.status,
    date: req.body.date,
  };

  try {
    const savedUser = await Commodity.create(userData);
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// UPDATE USER
commodities.post("/update", async (req, res) => {
  const user = await Commodity.findOne({
    where: {
      id: req.body.id,
    },
  });

  if (!user) return res.status(400).send("User doesnt exist");

  const userData = {
    name: req.body.name,
    price: req.body.price,
    status: req.body.status,
    date: req.body.date,
  };

  try {
    const savedUser = await Commodity.update(userData, {
      where: {
        id: req.body.id,
      },
    });
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = commodities;
