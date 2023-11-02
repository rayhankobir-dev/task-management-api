const { Router } = require("express");
const schema = require("./schema");
const validation = require("../../middleware/validation");
const authentication = require("../../middleware/authentication");
const {
  signUpController,
  loginController,
  logoutController,
} = require("../../controllers/auth");

// creating router
const router = new Router();

router.post("/login", validation(schema.credential), loginController);
router.post("/signup", validation(schema.signup), signUpController);
router.post("/logout", authentication(), logoutController);

module.exports = { auth: router };
