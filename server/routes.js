const router = require('express').Router();

const itemsController = require('./controllers/itemsController');

router.use('/', itemsController);

module.exports = router;