const TodoList = require('../models/Todolist.model');
const response = require("../common/response");



// create api

exports.createTodo = async (req, res) => {
    try {
        const todo = await TodoList.create(req.body);
       return response.success(res,201,"created successfully");
    } catch (err) {
       return response.error(res, 500, error.message);
    }
}

