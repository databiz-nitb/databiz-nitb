const userService = require("../services/user.service");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await userService.getMe(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.assignRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await userService.assignRole(req.params.id, role);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
