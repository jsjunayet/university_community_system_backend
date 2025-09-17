import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { eventJoinController } from "./eventJoin.controller";

const router = Router();

// student join request
router.post(
  "/:eventId/join",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  eventJoinController.joinEvent
);

// student view my joins
router.get(
  "/my-joins",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  eventJoinController.getMyJoins
);

// Organizer approve/reject
router.patch(
  "/:joinId/approve",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  eventJoinController.approveJoin
);
router.patch(
  "/:joinId/reject",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  eventJoinController.rejectJoin
);

export const eventJoinRoutes = router;
