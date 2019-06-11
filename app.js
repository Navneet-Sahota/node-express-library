const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");

const app = express();

const PORT = 3000;

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.listen(PORT, () => {
  debug(`Listening on port ${chalk.rgb(109, 224, 26).bold(3000)}`);
});
