const { AuthFailureError, TokenExpiredError } = require("../core/ApiError");
const { JWT } = require("../core/JWT");
const asyncHandler = require("../helpers/asyncHandler");
const { getAccessToken, validateTokenData } = require("../helpers/authUtils");
const UserService = require("../services/user");

const authentication = () => {
  return asyncHandler(async (req, res, next) => {
    req.accessToken = getAccessToken(req.headers.authorization);

    try {
      const payload = await JWT.validate(req.accessToken);
      validateTokenData(payload);

      const user = await UserService.findById(payload.sub);
      if (!user) throw new AuthFailureError("Authentication failed");

      next();
    } catch (err) {
      if (err instanceof TokenExpiredError)
        throw new TokenExpiredError(err.message);
      throw err;
    }
  });
};

module.exports = authentication;
