import { Request, Response } from "express";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { jobPostService } from "./jobPost.service";

// Create
const createJobPost = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await jobPostService.createJobPost(req.body, userId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Job created",
    data: result,
  });
});

const UpdateJobPost = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await jobPostService.updateJobPost(
    req.params.id,
    req.body,
    userId
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Update Job Post",
    data: result,
  });
});

const deletedJobPosts = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await jobPostService.deleteJobPost(req.params.id, userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Deleted Job post",
    data: result,
  });
});
// My posts
const getMyJobPosts = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  const userId = req.user.id;
  const result = await jobPostService.getMyJobPosts(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My jobs fetched",
    data: result,
  });
});
const getAllJobPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await jobPostService.getAllJobPosts();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get all jobs fetched",
    data: result,
  });
});
const getAllJobPostForUser = catchAsync(async (req: Request, res: Response) => {
  const result = await jobPostService.getAllJobPostsForUser();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get all jobs fetched",
    data: result,
  });
});
// Approve/Reject
const approveOrRejectJobPost = catchAsync(
  async (req: Request, res: Response) => {
    const result = await jobPostService.approveOrRejectJobPost(
      req.params.id,
      req.body.status
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Job ${req.body.status}`,
      data: result,
    });
  }
);

export const jobPostController = {
  createJobPost,
  getMyJobPosts,
  approveOrRejectJobPost,
  getAllJobPosts,
  UpdateJobPost,
  deletedJobPosts,
  getAllJobPostForUser,
};
