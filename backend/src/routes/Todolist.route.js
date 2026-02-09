const express = require("express");
const router = express.Router();

const todoListController = require("../controllers/Todolist.controller");
router.post("/create", todoListController.createTask);
router.get("/all",todoListController.getTask);
router.put("/update/:id", todoListController.updateTask);


module.exports = router;