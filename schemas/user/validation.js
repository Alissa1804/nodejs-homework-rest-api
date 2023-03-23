const Joi = require("joi");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const registerSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
  email: Joi.string().pattern(emailRegexp).email(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).email(),
  password: Joi.string().min(6).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).email(),
});

const validator = (schema) => (body) => {
  return schema.validate(body);
};

const registerValid = validator(registerSchema);
const loginValid = validator(loginSchema);
const verifyEmailValid = validator(verifyEmailSchema);

module.exports = { registerValid, loginValid, verifyEmailValid };
