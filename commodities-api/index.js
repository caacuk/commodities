const express = require("express");
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
