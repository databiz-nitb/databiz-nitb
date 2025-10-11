const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { permit } = require("../middlewares/role.middleware");

// Public: list blogs
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);

// Admin only: create/update/delete
router.post("/", authMiddleware, permit("admin"), blogController.createBlog);
router.put("/:id", authMiddleware, permit("admin"), blogController.updateBlog);
router.delete(
  "/:id",
  authMiddleware,
  permit("admin"),
  blogController.deleteBlog
);

module.exports = router;
