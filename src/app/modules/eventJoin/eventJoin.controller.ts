import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { eventJoinService } from "./eventJoin.service";

// Request to join event
const joinEvent = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await eventJoinService.joinEvent(req.params.eventId, user.id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Join request submitted (pending approval)",
    data: result,
  });
});

// Organizer approves
const approveJoin = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const { meetLink } = req.body;
  const result = await eventJoinService.approveJoin(
    req.params.joinId,
    user.id,
    meetLink
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student approved successfully",
    data: result,
  });
});

// Organizer rejects
const rejectJoin = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await eventJoinService.rejectJoin(req.params.joinId, user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student rejected successfully",
    data: result,
  });
});

// Student see my joins
const getMyJoins = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await eventJoinService.getMyJoins(user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My event joins retrieved successfully",
    data: result,
  });
});

export const eventJoinController = {
  joinEvent,
  approveJoin,
  rejectJoin,
  getMyJoins,
};
