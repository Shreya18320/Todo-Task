const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", require("./routes/Todolist.route"));

module.exports = app;