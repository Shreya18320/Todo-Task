const TodoList = require('../models/Todolist.model');
const response = require("../common/response");

exports.getTask = async (req, res) => {
  try {
    const { search, status } = req.query;

    
    const page = parseInt(req.query.page) || 0;      
    const limit = parseInt(req.query.limit) || 10;    
    const skip = page * limit

    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search && search.trim()) {
      query.title = {
        $regex: search.trim(),
        $options: 'i',
      };
    }

    
    const totalRecords = await TodoList.countDocuments(query);


    const todo = await TodoList.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });


    return response.success(res, 200, "Data fetched successfully", {
      tasks: todo,
      totalRecords,
      page,
      limit
    });

  } catch (error) {
    console.error('Error in getTask:', error);
    return response.error(res, 500, error.message);
  }
};

exports.createTask = async (req, res) => {
  try {
   
    const { title } = req.body;
    
    
    const newTask = await TodoList.create({
      title,  
      status: 'pending'
    });
    
    return response.success(res, 201, "Task created successfully", newTask);
    
  } catch (error) {
    console.error('Error in createTask:', error);
    return response.error(res, 500, error.message);
  }
}

exports.updateTask = async (req, res) => {
  try {
    
    const { id } = req.params;
    const { status } = req.body;
    
    
    
    const updatedTask = await TodoList.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!updatedTask) {
      return response.error(res, 404, "Task not found");
    }
    
    return response.success(res, 200, "Task updated successfully", updatedTask);
    
  } catch (error) {
    console.error('Error in updateTask:', error);
    return response.error(res, 500, error.message);
  }
}