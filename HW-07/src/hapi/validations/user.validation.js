const Joi = require('@hapi/joi');

class UserValidation {
  getCreateValidator = () => {
    return {
      payload: Joi.object({
        email: Joi.string(),
        password: Joi.string()
      })
    };
  }
}

module.exports = UserValidation;