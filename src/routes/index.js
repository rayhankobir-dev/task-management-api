const { Router } = require("express");
const { auth } = require("./auth");

const router = new Router();

router.use("/auth", auth);

module.exports = { routes: router };
