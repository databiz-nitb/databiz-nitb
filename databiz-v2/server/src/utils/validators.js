const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const blogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = { registerSchema, blogSchema };
