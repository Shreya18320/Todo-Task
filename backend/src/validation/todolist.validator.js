const Joi = require('joi');


const createTaskSchema = Joi.object({
  title: Joi.string()
    .min(1)                    
    .max(200)                  
    .trim()                    
    .required()                
    .messages({
      'string.empty': 'Task title cannot be empty',
      'string.min': 'Task title must be at least 1 character long',
      'string.max': 'Task title cannot exceed 200 characters',
      'any.required': 'Task title is required'
    })
});


const updateTaskSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'completed')  
    .required()
    .messages({
      'string.empty': 'Status cannot be empty',
      'any.only': 'Status must be either "pending" or "completed"',
      'any.required': 'Status is required'
    })
});


const getTasksSchema = Joi.object({
  status: Joi.string()
    .valid('all', 'pending', 'completed')
    .optional()
    .messages({
      'any.only': 'Status must be "all", "pending", or "completed"'
    }),
  
  search: Joi.string()
    .min(1)
    .max(100)
    .trim()
    .optional()
    .messages({
      'string.min': 'Search query must be at least 1 character',
      'string.max': 'Search query cannot exceed 100 characters'
    }),
    page: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.min': 'Page number cannot be negative'

    }),
  limit: Joi.number()
  .min(1)
  .max(50)
  .optional()
  .messages({
    'number.min': 'Limit must be at least 1',
    'number.max': 'Limit cannot exceed 50'
  })
  
});


const objectIdSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)  
    .required()
    .messages({
      'string.pattern.base': 'Invalid task ID format',
      'any.required': 'Task ID is required'
    })
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  getTasksSchema,
  objectIdSchema
};