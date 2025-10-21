const authService = require("../services/auth.service");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, year, role } = req.body;
    const data = await authService.register(name, email, password, year, role);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
