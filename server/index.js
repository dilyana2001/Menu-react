const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config');
const app = express();

mongoose.connect(config.DATABASE);
mongoose.connection.on('error', console.log.bind(console, `connection error`));
mongoose.connection.once('open', console.log.bind(console, `Database connected!`));

app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use(errorHandler);

app.listen(3030, console.log.bind(console, `Server is listening on port 3030...`));