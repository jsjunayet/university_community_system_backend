import express from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { tourJoinController } from "./tourJoin.controller";

const router = express.Router();

// user join tour
router.post(
  "/",
  authorizeRole(["student", "alumni", "superAdmin", "admin"]),
  tourJoinController.joinTour
);

// user my joins
router.get(
  "/my-joins",
  authorizeRole(["student", "alumni", "superAdmin", "admin"]),
  tourJoinController.getUserJoins
);

// get joins by tour (author/admin)
router.get(
  "/tour/:tourId",
  authorizeRole(["student", "alumni", "superAdmin", "admin"]),
  tourJoinController.getJoinsByTour
);

// verify join (admin only)
router.patch(
  "/:id/verify",
  authorizeRole(["student", "alumni", "superAdmin", "admin"]),
  tourJoinController.verifyJoin
);

export const tourJoinRoute = router;
