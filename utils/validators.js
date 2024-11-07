const Joi = require('joi');

const signupValidation = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[0-9].*[0-9])[A-Za-z0-9]{8,}$'))  // At least 8 chars with 2 numbers
    .required(),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = { signupValidation, loginValidation };
