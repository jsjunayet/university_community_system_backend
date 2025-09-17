import { Request, Response } from "express";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { jobApplicationService } from "./jobApply.service";

const applyJob = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await jobApplicationService.applyJob(req.body, userId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Applied for job",
    data: result,
  });
});

const cancelJobApplication = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await jobApplicationService.cancelJobApplication(
    req.params.id,
    userId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Application canceled",
    data: result,
  });
});

const getApplicationsForJob = catchAsync(
  async (req: Request, res: Response) => {
    const result = await jobApplicationService.getApplicationsForJob(
      req.params.jobPostId
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Applications fetched",
      data: result,
    });
  }
);
const getApplicationsForMyJob = catchAsync(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    const userId = req.user.id;
    const result = await jobApplicationService.getApplicationsForMyJob(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: " my Applications fetched",
      data: result,
    });
  }
);

const updateJobApplicationStatus = catchAsync(
  async (req: Request, res: Response) => {
    const result = await jobApplicationService.updateJobApplicationStatus(
      req.params.id,
      req.body.status
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Application ${req.body.status}`,
      data: result,
    });
  }
);

export const jobApplicationController = {
  applyJob,
  cancelJobApplication,
  getApplicationsForJob,
  updateJobApplicationStatus,
  getApplicationsForMyJob,
};
