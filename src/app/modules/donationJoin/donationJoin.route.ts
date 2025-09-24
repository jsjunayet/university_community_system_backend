import express from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { BloodDonationJoinController } from "./donationJoin.controller";

const router = express.Router();

// Donor apply
router.post(
  "/",
  authorizeRole(["student", "alumni", "admin", "superAdmin"]),
  BloodDonationJoinController.joinBloodDonation
);

// Donor cancel
router.delete(
  "/:id",
  authorizeRole(["student", "alumni", "admin", "superAdmin"]),
  BloodDonationJoinController.cancelBloodDonationJoin
);

// Get all donors for a request (admin/requester দেখতে পারবে)
router.get(
  "/request/:requestId",
  authorizeRole(["admin", "superAdmin", "student", "alumni"]),
  BloodDonationJoinController.getDonorsForRequest
);

// Get my donation joins
router.get(
  "/my-joins",
  authorizeRole(["student", "alumni", "admin", "superAdmin"]),
  BloodDonationJoinController.getMyDonationJoins
);

// Approve/Reject donor
router.patch(
  "/:id/status",
  authorizeRole(["student", "alumni","admin", "superAdmin"]),
  BloodDonationJoinController.updateDonationJoinStatus
);

export const BloodDonationJoinRoutes = router;
