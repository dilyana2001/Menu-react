const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username, password: req.body.password })
    .then((user) => {
      let token = jwt.sign(
        { _id: user._id, username: user.username, isAdmin: user.isAdmin },
        "dilqna",
        { expiresIn: "3h" }
      );
      res.status(200).json({
        _id: user._id,
        username: user.username,
        token,
        isAdmin: user.isAdmin,
      });
    })
    .catch(() =>
      next({ status: 404, message: "No such user or password!", type: "ERROR" })
    );
});

router.get("/logout", (req, res) => {
  res.status(200).json({ message: "Logout" });
});

module.exports = router;
