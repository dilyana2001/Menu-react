const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const { auth } = require("./middlewares/auth");
const app = express();

mongoose.connect(
  "mongodb+srv://productionUserEli:awPg9qmHM7DWPHvf@cluster0.af70a.mongodb.net/menu?retryWrites=true&w=majority"
);
mongoose.connection.on("error", console.log.bind(console, `connection error`));
mongoose.connection.once(
  "open",
  console.log.bind(console, `Database connected!`)
);

app.use(cors());
app.use(express.json());

app.use(auth);

app.get("/", (req, res) => {
  res.json({ message: `It's working!` });
});

app.use("/api", routes);
app.use(errorHandler);

app.listen(
  5555,
  console.log.bind(console, `Server is listening on port 5555...`)
);
