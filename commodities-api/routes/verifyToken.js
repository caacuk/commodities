const jwt = require("jsonwebtoken");

// Helper
const sendResponse = require("./sendResponse");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json(sendResponse(401, "Access Denied", "Unauthorized", null));

  try {
    req.user = jwt.verify(token, "secret");
    next();
  } catch (err) {
    res
      .status(401)
      .json(sendResponse(401, "Access Denied", "Invalid Token", null));
  }
};
