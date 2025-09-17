import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { commentService } from "./comment.service";
const commentCreate = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user as JwtPayload;
  const result = await commentService.commentCreate(req.body, userId.id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "comment Created successfully",
    data: result,
  });
});
const commentUpdate = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = await commentService.commentUpdate(userId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "comment Updated successfully",
    data: result,
  });
});
const commentdeleted = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = await commentService.commentdeleted(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "comment deleted successfully",
    data: result,
  });
});
const commentGet = catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.commentGet();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "comment retrieve successfully",
    data: result,
  });
});

export const commentController = {
  commentUpdate,
  commentdeleted,
  commentCreate,
  commentGet,
};
