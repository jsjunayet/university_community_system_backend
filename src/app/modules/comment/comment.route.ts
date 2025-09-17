import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { commentController } from "./comment.controller";

const router = Router();
router.post(
  "/create",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  commentController.commentCreate
);
router.get(
  "/getall",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  commentController.commentGet
);
router.patch(
  "/:id",
  authorizeRole(["admin", "superAdmin"]),
  commentController.commentUpdate
);
router.delete(
  "/:id",
  authorizeRole(["admin", "superAdmin"]),
  commentController.commentdeleted
);
export const commentRoute = router;
