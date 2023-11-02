const bcrypt = require("bcrypt");
const { tokenInfo } = require("../config");
const UserService = require("../services/user");
const asyncHandler = require("../helpers/asyncHandler");
const { createToken } = require("../helpers/authUtils");

const { BadRequestError } = require("../core/ApiError");
const { SuccessResponse } = require("../core/ApiResponse");

// signup controller
const signUpController = asyncHandler(async (req, res, next) => {
  const user = await UserService.findByEmail(req.body.email);
  // check email already used
  if (user) throw new BadRequestError("Email already used");

  // make hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  req.body.password = hashedPassword;

  const createdUser = await UserService.create(req.body);
  new SuccessResponse("Successfully registered", createdUser, 201).send(res);
});

// login controller
const loginController = asyncHandler(async (req, res) => {
  const user = await UserService.findByEmail(req.body.email);
  if (!user) throw new BadRequestError("Invalid credentials");

  const match = bcrypt.compareSync(req.body.password, user.password);
  if (!match) throw new BadRequestError("Invalid credentialss");
  const token = await createToken(user, tokenInfo.tokenSecret); // generate token
  new SuccessResponse("Successfully logged in", { token }).send(res);
});

// logout controller
const logoutController = (req, res) => {
  new SuccessResponse("Logout successfully").send(res);
};

module.exports = { signUpController, loginController, logoutController };
