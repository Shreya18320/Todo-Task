const express = require("express");
const router = express.Router();
const todoListController = require("../controllers/Todolist.controller");

const validate = require("../middlewares/validate");
const {
  createTaskSchema,
  updateTaskSchema,
  getTasksSchema,
  objectIdSchema
} = require("../validation/todolist.validator");

// CREATE TASK
router.post(
  "/create",
  validate(createTaskSchema, 'body'),
  todoListController.createTask
);

// GET TASKS (all / pending / completed / search)
router.get(
  "/all",
  validate(getTasksSchema, 'query'),
  todoListController.getTask
);

// UPDATE TASK STATUS
router.put(
  "/update/:id",
  validate(objectIdSchema, 'params'),
  validate(updateTaskSchema, 'body'),
  todoListController.updateTask
);

module.exports = router;