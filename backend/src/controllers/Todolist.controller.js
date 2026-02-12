const TodoList = require('../models/Todolist.model');
const response = require("../common/response");


exports.createTask = async (req, res) => {
    try {
        const todo = await TodoList.create(req.body);
       return response.success(res,201,"created successfully",todo);
    } catch (err) {
      return response.error(res, 500, err.message);  
    }
}



exports.getTask=async (req,res)=>{
    try {
        const todo=await TodoList.find({})
        return response.success(res,200,"data fetch successfully",todo)
    } catch (error) {
        return response.error(res,500,error.message)
    }
}

exports.filterTask = async (req, res) => {
    try {
        const status = req.params.status;
        const todo = await TodoList.find({ status });
        return response.success(res, 200, "data fetched successfully", todo);
    } catch (error) {
        return response.error(res, 500, error.message);
    }
}

exports.updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const status=req.body.status;
        
        let newStatus ;

        if(status==="completed"){
            newStatus="pending"
        }else{
            newStatus="completed"
        }

        const todo = await TodoList.findByIdAndUpdate(id, { status: newStatus});
        return response.success(res, 200, "updated successfully", todo);
    } catch (error) {
        return response.error(res, 500, error.message);
    }
}



