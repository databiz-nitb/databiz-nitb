const authService = require("../services/auth.service");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, year } = req.body;
    const data = await authService.register(name, email, password, year);
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

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token is required." });
    }
    const data = await authService.verifyEmail(token);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    const data = await authService.resendVerification(email);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
