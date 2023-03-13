const joi = require("joi");

const contactValidation = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().email().required(),
  phone: joi.string().min(5).required(),
  favorite: joi.boolean(),
});

const validator = (schema) => (body) => {
  return schema.validate(body);
};

const isContactValid = validator(contactValidation);
module.exports = { isContactValid };
