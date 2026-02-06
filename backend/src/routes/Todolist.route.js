const express = require("express");
const router = express.Router();

const todoListController = require("../controllers/Todolist.controller");
router.post("/create", todoListController.createTodo);


module.exports = router;