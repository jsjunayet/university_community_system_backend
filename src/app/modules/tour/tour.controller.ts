import { Request, Response } from "express";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { tourService } from "./tour.service";

// create tour
const createTour = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const role = req.user.role;
  const status =
    role === "admin" || role === "superAdmin" ? "approved" : "pending";
  const result = await tourService.createTour(req.body, userId, status);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tour created successfully (pending approval)",
    data: result,
  });
});

// get all approved tours
const getAllTours = catchAsync(async (req: Request, res: Response) => {
  const result = await tourService.getAllTours();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tours retrieved successfully",
    data: result,
  });
});

// get single tour
const getTourDeleted = catchAsync(async (req: Request, res: Response) => {
  const result = await tourService.getTourDeleted(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour retrieved successfully",
    data: result,
  });
});

const getTourForAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await tourService.getTourForAdmin();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour retrieved successfully",
    data: result,
  });
});
const getTourMy = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await tourService.getTourMy(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour retrieved successfully",
    data: result,
  });
});

// update tour status
const updateTourStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await tourService.updateTourStatus(
    req.params.id,
    req.body.status
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Tour ${req.body.status} successfully`,
    data: result,
  });
});
export const tourController = {
  createTour,
  getAllTours,

  updateTourStatus,
  getTourDeleted,
  getTourForAdmin,
  getTourMy,
};
