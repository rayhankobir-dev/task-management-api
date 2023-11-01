const { Router } = require("express");
const loginController = require("../../controllers/login");
const registerController = require("../../controllers/register");
// creating router
const router = new Router();

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = { auth: router };
