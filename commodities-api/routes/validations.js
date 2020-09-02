const Joi = require("joi");

const userValidation = (data) => {
  // Schema for validation
  const schema = Joi.object({
    role_id: Joi.number().min(3).required(),
    name: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  // Schema for validation
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
  });

  return schema.validate(data);
};

const surveyorValidation = (data) => {
  // Schema for validation
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(1000).required(),
    status: Joi.number().max(1).required(),
    date: Joi.date().required(),
  });

  return schema.validate(data);
};

module.exports.userValidation = userValidation;
module.exports.surveyorValidation = surveyorValidation;
module.exports.loginValidation = loginValidation;
