import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { voteController } from "./votes.controller";

const router = Router();
router.post(
  "/create",
  authorizeRole(["admin", "student", "alumni", "superAdmin"]),
  voteController.voteCreate
);
export const voteRoute = router;
