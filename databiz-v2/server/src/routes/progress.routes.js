const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progress.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { permit } = require("../middlewares/role.middleware");

// Junior & Admin: mark progress
router.post(
  "/",
  authMiddleware,
  permit("junior", "admin"),
  progressController.markProgress
);
router.patch(
  "/:id",
  authMiddleware,
  permit("junior", "admin"),
  progressController.updateProgress
);

// Junior: personal dashboard
router.get(
  "/me",
  authMiddleware,
  permit("junior", "admin"),
  progressController.getMyProgress
);

// Get all user progress (grouped by pathways)
router.get(
  "/overview",
  authMiddleware,
  permit("junior", "admin"),
  progressController.getAllUserProgress
);

// Get user progress for specific pathway
router.get(
  "/pathway/:pathwayId",
  authMiddleware,
  permit("junior", "admin"),
  progressController.getUserPathwayProgress
);

// Admin: view all junior progress
router.get(
  "/pathway/:pathwayId/users",
  authMiddleware,
  permit("admin"),
  progressController.getPathwayProgress
);

// Comparative dashboard
router.get(
  "/comparative/:pathwayId",
  authMiddleware,
  permit("junior", "admin"),
  progressController.getComparativeProgress
);

module.exports = router;
