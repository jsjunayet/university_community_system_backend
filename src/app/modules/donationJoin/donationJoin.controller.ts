import { Request, Response } from "express";

import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { BloodDonationJoinService } from "./donationJoin.service";

// Donor apply for blood request
const joinBloodDonation = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await BloodDonationJoinService.joinBloodDonation(
    req.body,
    userId, // donorId
    req.body.requestId // কোন blood request এ apply করবে
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Joined blood donation request",
    data: result,
  });
});

// Donor cancel
const cancelBloodDonationJoin = catchAsync(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    const userId = req.user.id;
    const result = await BloodDonationJoinService.cancelBloodDonationJoin(
      req.params.id,
      userId
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Donation join canceled",
      data: result,
    });
  }
);

// Get all donors for a specific blood request
const getDonorsForRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await BloodDonationJoinService.getDonorsForRequest(
    req.params.requestId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Donors fetched for blood request",
    data: result,
  });
});

// Get all my donation joins
const getMyDonationJoins = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await BloodDonationJoinService.getMyDonationJoins(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My donation joins fetched",
    data: result,
  });
});

// Approve/Reject donor
const updateDonationJoinStatus = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BloodDonationJoinService.updateDonationJoinStatus(
      req.params.id,
      req.body.status
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Donation join ${req.body.status}`,
      data: result,
    });
  }
);

export const BloodDonationJoinController = {
  joinBloodDonation,
  cancelBloodDonationJoin,
  getDonorsForRequest,
  getMyDonationJoins,
  updateDonationJoinStatus,
};
