const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

// ROUTE
const Users = require("./routes/users");
const Roles = require("./routes/roles");
const Commodities = require("./routes/commodities");
const Auth = require("./routes/auth");

// PORT
let port = process.env.PORT || 5000;

// APP CONFIG
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use("/users", Users);
app.use("/roles", Roles);
app.use("/commodities", Commodities);
app.use("/users", Auth);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

if (process.env.NODE_ENV === "production") {
  // console.log("production");
  app.disable("x-powered-by");
  app.use(compression());
  app.use(morgan("common"));

  //set static folder for deploy on Heroku
  app.use(express.static(path.resolve(__dirname, "routes")));
  app.use(express.static(path.resolve(__dirname, "models")));
  app.use(express.static(path.resolve(__dirname, "database")));

  //set static folder for deploy on Heroku
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "routes"));
    res.sendFile(path.resolve(__dirname, "models"));
    res.sendFile(path.resolve(__dirname, "database"));
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
