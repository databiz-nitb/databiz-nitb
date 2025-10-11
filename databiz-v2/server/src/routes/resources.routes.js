const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resource.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { permit } = require("../middlewares/role.middleware");

// Public: view resources
router.get("/", resourceController.getAllResources);
router.get("/:id", resourceController.getResourceById);

// Admin only: CRUD
router.post(
  "/",
  authMiddleware,
  permit("admin"),
  resourceController.createResource
);
router.put(
  "/:id",
  authMiddleware,
  permit("admin"),
  resourceController.updateResource
);
router.delete(
  "/:id",
  authMiddleware,
  permit("admin"),
  resourceController.deleteResource
);

module.exports = router;
