const express = require("express");
const router = express.Router();
const pathwayController = require("../controllers/pathway.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { permit } = require("../middlewares/role.middleware");

// Public: list all pathways
router.get("/", pathwayController.getAllPathways);
router.get("/:id", pathwayController.getPathwayById);

// Admin only: create/update/delete
router.post(
  "/",
  authMiddleware,
  permit("admin"),
  pathwayController.createPathway
);
router.put(
  "/:id",
  authMiddleware,
  permit("admin"),
  pathwayController.updatePathway
);
router.delete(
  "/:id",
  authMiddleware,
  permit("admin"),
  pathwayController.deletePathway
);

module.exports = router;
