const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progress.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { permit } = require("../middlewares/role.middleware");

// Junior: mark progress
router.post(
  "/",
  authMiddleware,
  permit("junior"),
  progressController.markProgress
);
router.patch(
  "/:id",
  authMiddleware,
  permit("junior"),
  progressController.updateProgress
);

// Junior: personal dashboard
router.get(
  "/me",
  authMiddleware,
  permit("junior"),
  progressController.getMyProgress
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
