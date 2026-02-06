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
        
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('TodoList', todoListSchema);