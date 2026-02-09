const TodoList = require('../models/Todolist.model');
const response = require("../common/response");



// create api

exports.createTask = async (req, res) => {
    try {
        const todo = await TodoList.create(req.body);
       return response.success(res,201,"created successfully",todo);
    } catch (err) {
       return response.error(res, 500, error.message);
    }
}

// get Api

exports.getTask=async (req,res)=>{
    try {
        const todo=await TodoList.find({})
        return response.success(res,200,"data fetch successfully",todo)
    } catch (error) {
        return response.error(res,500,error.message)
    }
}

// update Api

exports.updateTask=async (req, res)=>{
    try {
        const id=req.params.id;
        const updatedData = { ...req.body };

        const todo=await TodoList.findByIdAndUpdate(id,updatedData,{new:true})
        return response.success(res, 200, "updated successfully", todo)
    } catch (error) {
        return response.error(res, 500, error.message)
    }
}


