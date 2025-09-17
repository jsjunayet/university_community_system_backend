import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { BloodRequestController } from "./bloodDonation.controller";

const router = Router();

// ✅ User routes
router.post(
  "/",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  BloodRequestController.createBloodRequest
);
router.get(
  "/my",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  BloodRequestController.getMyBloodRequests
);
router.patch(
  "/:id",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  BloodRequestController.updateBloodRequest
);
router.delete(
  "/:id",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  BloodRequestController.deleteBloodRequest
);

// ✅ Public
router.get(
  "/user",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  BloodRequestController.getuserBloodRequest
);

// ✅ Admin routes
router.get(
  "/",
  authorizeRole(["admin", "superAdmin"]),
  BloodRequestController.getAllBloodRequests
);
router.patch(
  "/:id/verify",
  authorizeRole(["admin", "superAdmin"]),
  BloodRequestController.approveOrRejectBloodRequest
);

export const bloodReqestRoute = router;
