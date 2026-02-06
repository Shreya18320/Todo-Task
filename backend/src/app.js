const express = require("express");
const app = express();


app.use(express.json());

app.use("/user", require("./routes/Todolist.route"));


module.exports = app;