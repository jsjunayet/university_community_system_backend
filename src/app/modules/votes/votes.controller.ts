import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { voteService } from "./votes.service";
const voteCreate = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const userId = req.user as JwtPayload;
  const result = await voteService.voteCreate(req.body, userId.id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "vote Created successfully",
    data: result,
  });
});

export const voteController = {
  voteCreate,
};
