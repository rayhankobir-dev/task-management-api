const { ApiError } = require("../core/ApiError");

// handler for async controller
const asyncHandler = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    if (err instanceof ApiError) {
      return ApiError.handle(err, res);
    }
    return next(err);
  }
};

module.exports = asyncHandler;
