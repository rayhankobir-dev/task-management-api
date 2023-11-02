const { tokenInfo } = require("../config");
const { AuthFailureError, InternalError } = require("../core/ApiError");
const { JWT, JwtPayload } = require("../core/JWT");

// getting & validate Bearer token from header
const getAccessToken = (authorization) => {
  if (!authorization) throw new AuthFailureError("Invalid Authorization");
  if (!authorization.startsWith("Bearer "))
    throw new AuthFailureError("Invalid Authorization");
  return authorization.split(" ")[1];
};

// validate token
const validateTokenData = (payload) => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    !payload.prm ||
    payload.iss !== tokenInfo.issuer ||
    payload.aud !== tokenInfo.audience ||
    !payload.sub
  )
    throw new AuthFailureError("Invalid access token");
  return true;
};

// create new token
const createToken = async (user, secretKey) => {
  const accessToken = await JWT.encode(
    Object.assign(
      {},
      new JwtPayload(
        tokenInfo.issuer,
        tokenInfo.audience,
        user._id.toString(),
        secretKey,
        tokenInfo.accessTokenValidity
      )
    )
  );

  if (!accessToken) throw new InternalError();
  return accessToken;
};

module.exports = { createToken, validateTokenData, getAccessToken };
