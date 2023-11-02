const Joi = require("joi");

const schema = {
  task: Joi.object().keys({
    title: Joi.string().required().min(5),
    description: Joi.string().required().min(20).max(500),
    tag: Joi.string().required().min(2),
    status: Joi.string()
      .default("pending")
      .valid("pending", "running", "completed"),
  }),
};

module.exports = schema;
