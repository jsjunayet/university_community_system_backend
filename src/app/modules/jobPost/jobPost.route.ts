import express from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { jobPostController } from "./jobPost.controller";

const router = express.Router();

// user
router.post(
  "/",
  authorizeRole(["alumni", "admin", "superAdmin"]),
  jobPostController.createJobPost
);
router.get(
  "/my",
  authorizeRole(["alumni", "admin", "superAdmin"]),
  jobPostController.getMyJobPosts
);
router.patch(
  "/:id",
  authorizeRole(["alumni", "admin", "superAdmin"]),
  jobPostController.UpdateJobPost
);
// admin
router.get(
  "/",
  authorizeRole(["admin", "superAdmin"]),
  jobPostController.getAllJobPosts
);
router.get(
  "/user",
  authorizeRole(["alumni", "admin", "superAdmin", "student"]),
  jobPostController.getAllJobPostForUser
);
router.patch(
  "/:id/status",
  authorizeRole(["admin", "superAdmin"]),
  jobPostController.approveOrRejectJobPost
);
router.delete(
  "/:id",
  authorizeRole(["alumni", "admin", "superAdmin"]),
  jobPostController.deletedJobPosts
);
export const jobPostRoutes = router;
