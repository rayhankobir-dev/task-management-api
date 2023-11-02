const { Router } = require("express");
const schema = require("./schema");
const taskController = require("../../controllers/task");
const validation = require("../../middleware/validation");
const authentication = require("../../middleware/authentication");

const router = new Router();

// task routes
router.get("/", taskController.view);
router.post(
  "/create",
  authentication(),
  validation(schema.task),
  taskController.create
);
router.put("/edit/:id", validation(schema.task), taskController.update);
router.delete("/delete/:id", authentication(), taskController.remove);

module.exports = { tasks: router };
