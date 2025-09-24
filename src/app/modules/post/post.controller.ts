import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { postService } from "./post.service";

const postCreateData = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user as JwtPayload;
  const role = req.user?.role;
  const status =
    role === "admin" || role === "superAdmin" ? "approved" : "pending";
  const result = await postService.postCreateData(req.body, userId.id, status);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Post Created successfully",
    data: result,
  });
});
const postGetData = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.postGetData();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All post retrieve successfully",
    data: result,
  });
});
const postGetuserData = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await postService.postGetuserData(user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All post retrieve successfully",
    data: result,
  });
});

const postSingleGetData = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id;
  const result = await postService.postSingleGetData(postId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single post retrieve successfully",
    data: result,
  });
});
const mypostdata = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;

  const result = await postService.mypostdata(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single post retrieve successfully",
    data: result,
  });
});
const postApprovedGetData = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const postId = req.params.id;
  const result = await postService.postApprovedGetData(postId, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "post Approved successfully",
    data: result,
  });
});
const postDeletedGetData = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id;
  const result = await postService.postDeletedGetData(postId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "post deleted successfully",
    data: result,
  });
});
const analyticsData = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.analyticsData();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "analytics Data successfully",
    data: result,
  });
});
export const postController = {
  postCreateData,
  postGetData,
  postSingleGetData,
  postDeletedGetData,
  postApprovedGetData,
  postGetuserData,
  analyticsData,
  mypostdata,
};
