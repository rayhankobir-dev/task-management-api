const User = require("../models/User");

async function findByEmail(email) {
  return User.findOne({ email: email })
    .select("+email +password + salt")
    .lean()
    .exec();
}

async function findById(id) {
  return User.findOne({ _id: id });
}

async function findFieldsById(id, ...fields) {
  return User.findOne({ _id: id }, [...fields])
    .lean()
    .exec();
}

async function create(user) {
  user.createdAt = user.updatedAt = new Date();
  const createdUser = await User.create(user);
  return {
    user: { ...createdUser._doc },
  };
}

async function updateInfo(user) {
  user.updatedAt = new Date();
  return User.updateOne({ _id: user._id }, { $set: { ...user } })
    .lean()
    .exec();
}

module.exports = {
  create,
  findById,
  findByEmail,
  findFieldsById,
  updateInfo,
};
