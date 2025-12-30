const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { permit } = require("../middlewares/role.middleware");

// Public: list events
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);

const upload = require("../middlewares/upload.middleware");

// Admin only: create/update/delete
router.post("/", authMiddleware, permit("admin"), upload.single('ImageUrl'), eventController.createEvent);
router.put(
  "/:id",
  authMiddleware,
  permit("admin"),
  upload.single('ImageUrl'),
  eventController.updateEvent
);
router.delete(
  "/:id",
  authMiddleware,
  permit("admin"),
  eventController.deleteEvent
);

module.exports = router;
