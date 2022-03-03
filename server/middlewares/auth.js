const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  let authorizationHeader = req.get("Authorization");
  if (authorizationHeader) {
    let token = authorizationHeader.split(" ")[1];
    try {
      let decoded = jwt.verify(token, "dilqna");
      req.user = decoded;
    } catch (error) {
      console.log("Invalid token!");
    }
  }
  next();
}

function isAuth(req, res, next) {
  if (!req.user) {
    return res
      .status(403)
      .send({ errorData: { message: "You cannot perform this action!" } })
      .end();
  }
  next();
}

module.exports = {
  auth,
  isAuth,
};
