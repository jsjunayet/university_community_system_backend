import express from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { jobApplicationController } from "./jobApply.controller";

const router = express.Router();

// student
router.post(
  "/",
  authorizeRole(["student", "alumni", "superAdmin", "admin"]),
  jobApplicationController.applyJob
);
router.delete(
  "/:id",
  authorizeRole(["stuent", "alumni", "superAdmin", "admin"]),
  jobApplicationController.cancelJobApplication
);

// author/admin
router.get(
  "/:jobPostId",
  authorizeRole(["admin", "alumni", "superAdmin"]),
  jobApplicationController.getApplicationsForJob
);
router.get(
  "/my-job/own",
  authorizeRole(["admin", "alumni", "superAdmin", "student"]),
  jobApplicationController.getApplicationsForMyJob
);
router.patch(
  "/:id/status",
  authorizeRole(["admin", "alumni", "superAdmin"]),
  jobApplicationController.updateJobApplicationStatus
);

export const jobApplicationRoutes = router;
