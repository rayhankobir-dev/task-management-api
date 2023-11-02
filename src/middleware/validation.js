const { ValidationSource } = require("../helpers/validator");
const { ForbiddenError, BadRequestError } = require("../core/ApiError");

// validate request based on schema and source such as body, headers, params
const validation =
  (schema, source = "body") =>
  (req, res, next) => {
    try {
      const { error } = schema.validate(req[source], { abortEarly: false });

      if (!error) return next();

      let errors = [];
      error.details.map((i) =>
        errors.push({
          message: i.message.replace(/['"]+/g, ""),
        })
      );

      if (source === ValidationSource.HEADER) {
        throw new ForbiddenError("Permission denied", errors);
      }

      throw new BadRequestError("Bad request", errors);
    } catch (error) {
      next(error);
    }
  };

module.exports = validation;
