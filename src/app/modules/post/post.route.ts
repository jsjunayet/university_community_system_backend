import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { postController } from "./post.controller";

const router = Router();
router.post(
  "/create",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  postController.postCreateData
);
router.get(
  "/all-retreive-admin",
  authorizeRole(["admin", "superAdmin"]),
  postController.postGetData
);
router.get(
  "/my",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  postController.mypostdata
);
router.get(
  "/all-retreive-user",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  postController.postGetuserData
);
router.get(
  "/admin/analytics",
  authorizeRole(["admin"]),
  postController.analyticsData
);
router.get(
  "/single-retreive/:id",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  postController.postSingleGetData
);
router.patch(
  "/approve/:id",
  authorizeRole(["admin", "superAdmin"]),
  postController.postApprovedGetData
);
router.delete(
  "/deleted/:id",
  authorizeRole(["admin", "superAdmin"]),
  postController.postDeletedGetData
);
export const postRoutes = router;
