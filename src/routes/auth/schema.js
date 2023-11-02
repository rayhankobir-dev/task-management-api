const Joi = require("joi");
const { JoiAuthBearer } = require("../../helpers/validator");

const schema = {
  credential: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),

  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),

  signup: Joi.object().keys({
    name: Joi.string().required().min(3),
    profileImageURL: Joi.string().optional(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};

module.exports = schema;
