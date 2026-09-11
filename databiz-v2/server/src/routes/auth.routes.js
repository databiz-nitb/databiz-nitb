const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verify", authController.verifyEmail);
router.post("/resend-verification", authController.resendVerification);

module.exports = router;
