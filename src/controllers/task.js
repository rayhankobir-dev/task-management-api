const asyncHandler = require("../helpers/asyncHandler");

const create = asyncHandler(async (req, res) => {
  res.send("create");
});

const view = asyncHandler(async (req, res) => {
  res.send("view");
});

const update = asyncHandler(async (req, res) => {
  res.send("update");
});

const remove = asyncHandler(async (req, res) => {
  res.send("delete");
});

module.exports = {
  create,
  view,
  update,
  remove,
};
