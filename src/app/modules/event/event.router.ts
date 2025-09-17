import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { eventController } from "./event.controller";

const router = Router();

// Public
router.get("/", eventController.getAllEvents);

// Organizer
router.post(
  "/create",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  eventController.createEvent
);
router.get(
  "/my-events",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  eventController.getMyEvents
);
router.get(
  "/admin",
  authorizeRole(["admin", "superAdmin"]),
  eventController.getallEventForAdmin
);
router.patch(
  "/:id",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  eventController.updateEvent
);
router.delete(
  "/:id",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  eventController.deleteEvent
);

// admin
router.patch(
  "/:id/approve",
  authorizeRole(["admin", "superAdmin"]),
  eventController.approveEvent
);

export const eventRoutes = router;
