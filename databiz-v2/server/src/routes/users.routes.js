const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { permit } = require("../middlewares/role.middleware");

// Admin only: list all users
router.get("/", authMiddleware, permit("admin"), userController.getAllUsers);

// Admin only: assign role
router.post(
  "/:id/role",
  authMiddleware,
  permit("admin"),
  userController.assignRole
);

// Junior or admin: get personal profile
router.get("/me", authMiddleware, userController.getMe);

module.exports = router;
