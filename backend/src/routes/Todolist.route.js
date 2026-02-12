const express = require("express");
const router = express.Router();

const todoListController = require("../controllers/Todolist.controller");
router.post("/create", todoListController.createTask);
router.get("/all",todoListController.getTask);
router.put("/update/:id", todoListController.updateTask);
router.get("/all/:status", todoListController.filterTask);



module.exports = router;