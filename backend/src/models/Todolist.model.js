const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    minlength: [1, 'Task title must be at least 1 character'],
    maxlength: [200, 'Task title cannot exceed 200 characters']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'completed'],
      message: 'Status must be either pending or completed'
    },
    default: 'pending'
  }
}, {
  timestamps: true  
});

module.exports = mongoose.model('TodoList', todoListSchema);


