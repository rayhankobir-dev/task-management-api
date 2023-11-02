const { Router } = require("express");
const { auth } = require("./auth");
const { tasks } = require("./task");

const router = new Router();

router.use("/auth", auth);
router.use("/tasks", tasks);

module.exports = { routes: router };
