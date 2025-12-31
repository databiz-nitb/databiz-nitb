const express = require("express");
const router = express.Router();
const userQueryController = require("../controllers/userQuery.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { permit } = require("../middlewares/role.middleware");

// Public route: submit contact form
router.post("/", userQueryController.createQuery);

// Admin only: get all queries
router.get(
    "/",
    authMiddleware,
    permit("admin"),
    userQueryController.getAllQueries
);

// Admin only: update query status
router.patch(
    "/:id/status",
    authMiddleware,
    permit("admin"),
    userQueryController.updateQueryStatus
);

module.exports = router;
