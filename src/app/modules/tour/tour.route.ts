import express from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { tourController } from "./tour.controller";

const router = express.Router();
// create tour (student/alumni)
router.post(
  "/",
  authorizeRole(["student", "alumni", "superAdmin", "admin"]),
  tourController.createTour
);

// get all approved tours
router.get(
  "/",
  authorizeRole(["student", "alumni", "superAdmin", "admin"]),
  tourController.getAllTours
);

// get single tour
router.get(
  "/my",
  authorizeRole(["student", "alumni", "superAdmin", "admin"]),
  tourController.getTourMy
);
router.delete(
  "/:id",
  authorizeRole(["student", "alumni", "superAdmin", "admin"]),
  tourController.getTourDeleted
);

router.get(
  "/admin",
  authorizeRole(["superAdmin", "admin"]),
  tourController.getTourForAdmin
);

// approve/reject (admin only)
router.patch(
  "/:id/status",
  authorizeRole(["admin", "superAdmin"]),
  tourController.updateTourStatus
);

export const tourRoutes = router;
