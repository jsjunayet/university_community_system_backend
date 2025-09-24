import { Request, Response } from "express";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { BloodRequestService } from "./bloodDonation.service";

// create request
const createBloodRequest = catchAsync(async (req: Request, res: Response) => {
  // Example for any controller
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const role = req.user.role;

  const result = await BloodRequestService.createBloodRequest(
    req.body,
    userId,
    role
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Blood request created successfully",
    data: result,
  });
});

// get all requests (admin/superAdmin only)
const getAllBloodRequests = catchAsync(async (req: Request, res: Response) => {
  const result = await BloodRequestService.getAllBloodRequests();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All blood requests fetched successfully",
    data: result,
  });
});

// get my requests
const getMyBloodRequests = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await BloodRequestService.getMyBloodRequests(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My blood requests fetched successfully",
    data: result,
  });
});

// get single request
const getuserBloodRequest = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await BloodRequestService.getuserBloodRequest(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blood request fetched successfully",
    data: result,
  });
});

// update request (only requester)
const updateBloodRequest = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await BloodRequestService.updateBloodRequest(
    req.params.id,
    req.body,
    userId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blood request updated successfully",
    data: result,
  });
});

// delete request (only requester)
const deleteBloodRequest = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await BloodRequestService.deleteBloodRequest(
    req.params.id,
    userId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blood request deleted successfully",
    data: result,
  });
});

// approve/reject (admin only)
const approveOrRejectBloodRequest = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BloodRequestService.approveOrRejectBloodRequest(
      req.params.id,
      req.body.status
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Blood request ${req.body.status} successfully`,
      data: result,
    });
  }
);

export const BloodRequestController = {
  createBloodRequest,
  getAllBloodRequests,
  getMyBloodRequests,
  getuserBloodRequest,
  updateBloodRequest,
  deleteBloodRequest,
  approveOrRejectBloodRequest,
};
