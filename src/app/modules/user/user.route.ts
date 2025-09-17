import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { userController } from "./user.controller";

const router = Router();
router.post(
  "/admin/register",
  authorizeRole(["admin", "superAdmin"]),
  userController.Registeruser
);
router.post("/login", userController.loginuser);

router.post(
  "/refreshToken",
  authorizeRole(["admin", "student"]),
  userController.refreshAccessToken
);
router.post(
  "/changePassword",
  authorizeRole(["alumni", "admin", "student", "superAdmin"]),
  userController.changePassword
);

router.get(
  "/all-retreive",
  authorizeRole(["admin", "superAdmin"]),
  userController.getAlluser
);
router.get(
  "/single-retreive/:id",
  authorizeRole(["admin", "superAdmin"]),
  userController.getSingleuser
);
router.get(
  "/single-retreive",
  authorizeRole(["admin", "student", "superAdmin"]),
  userController.getSingleuserToken
);
router.patch(
  "/role/:id",
  authorizeRole(["admin", "superAdmin"]),
  userController.roleUpdate
);
router.delete(
  "/deleted/:id",
  authorizeRole(["admin", "superAdmin"]),
  userController.deleteduser
);
router.get(
  "/admin/metadata",
  authorizeRole(["alumni", "admin", "student", "superAdmin"]),
  userController.dashboardMetaData
);

export const userRoutes = router;
