const response = require('../common/response');

const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const dataToValidate = req[property] || {};

    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: false
    });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return response.error(res, 400, 'Validation Error', errorMessages);
    }

    req[property] = value;
    next();
  };
};

module.exports = validate;