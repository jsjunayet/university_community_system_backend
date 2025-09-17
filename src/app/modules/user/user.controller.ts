import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { userService } from "./user.service";

const getAlluser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAlluser();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All user retreive successfully",
    data: result,
  });
});
const getSingleuser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = await userService.getSingleuser(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "single user retreive successfully",
    data: result,
  });
});
const getSingleuserToken = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user as JwtPayload;

  const result = await userService.getSingleuserToken(user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "single user retreive successfully",
    data: result,
  });
});
const roleUpdate = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const role = req.body;
  const result = await userService.roleUpdate(userId, role);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user updated successfully",
    data: result,
  });
});
const deleteduser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = await userService.deleteduser(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user deleted successfully",
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;
  const result = await userService.changePassword(
    userId,
    oldPassword,
    newPassword
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password change successfully",
    data: result,
  });
});
const Registeruser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.Registeruser(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "user Created successfully",
    data: result,
  });
});
const loginuser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.loginuser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successfully",
    data: result,
  });
});

const refreshAccessToken = catchAsync(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    throw new Error("This token does not exist");
  }
  const result = await userService.refreshAccessToken(token);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Access token refreshed successfully",
    data: result,
  });
});
const dashboardMetaData = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;

  const userrole = req.user.role;
  const result = await userService.dashboardMetaData(userId, userrole);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Dashboard meta data update",
    data: result,
  });
});
export const userController = {
  getAlluser,
  Registeruser,
  loginuser,
  getSingleuser,
  roleUpdate,
  deleteduser,
  refreshAccessToken,
  getSingleuserToken,
  dashboardMetaData,
  changePassword,
};
