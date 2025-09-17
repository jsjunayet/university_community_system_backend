import { Request, Response } from "express";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { tourJoinService } from "./tourjoin.service";

// join tour
const joinTour = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await tourJoinService.joinTour(req.body, userId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Joined tour successfully (pending verification)",
    data: result,
  });
});

// get joins by tour
const getJoinsByTour = catchAsync(async (req: Request, res: Response) => {
  const result = await tourJoinService.getJoinsByTour(req.params.tourId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour joins retrieved successfully",
    data: result,
  });
});

// get user joins
const getUserJoins = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await tourJoinService.getUserJoins(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Your tour joins retrieved successfully",
    data: result,
  });
});

// verify join
const verifyJoin = catchAsync(async (req: Request, res: Response) => {
  const result = await tourJoinService.verifyJoin(
    req.params.id,
    req.body.status
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour join verified successfully",
    data: result,
  });
});
export const tourJoinController = {
  joinTour,
  getJoinsByTour,
  getUserJoins,
  verifyJoin,
};
