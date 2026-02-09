const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
        },

        createdAt: {
        type: Date,
        default: Date.now
  }
        
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('TodoList', todoListSchema);



