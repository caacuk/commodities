const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");

  try {
    req.user = jwt.verify(token, "secret");
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
