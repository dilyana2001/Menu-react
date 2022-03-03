const router = require("express").Router();

const itemsController = require("./controllers/itemsController");
const usersController = require("./controllers/usersController");

router.use("/", itemsController);
router.use("/auth", usersController);

module.exports = router;
