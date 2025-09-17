import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { eventService } from "./event.service";

// Create Event
const createEvent = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  console.log(user);
  const result = await eventService.createEvent(req.body, user.id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Event created successfully (waiting for admin approval)",
    data: result,
  });
});

// Get all approved events
const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await eventService.getAllEvents();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Events retrieved successfully",
    data: result,
  });
});

// Get my organized events
const getMyEvents = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await eventService.getMyEvents(user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My events retrieved successfully",
    data: result,
  });
});
const getallEventForAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await eventService.getallEventForAdmin();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "all events retrieved successfully",
    data: result,
  });
});
// Update event (Organizer only)
const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await eventService.updateEvent(
    req.params.id,
    user.id,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event updated successfully",
    data: result,
  });
});

// Delete event (Organizer only)
const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await eventService.deleteEvent(req.params.id, user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event deleted successfully",
    data: result,
  });
});

// Approve / Reject event (admin only)
const approveEvent = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;
  const result = await eventService.approveEvent(req.params.id, status);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Event ${status} successfully`,
    data: result,
  });
});

export const eventController = {
  createEvent,
  getAllEvents,
  getMyEvents,
  updateEvent,
  deleteEvent,
  approveEvent,
  getallEventForAdmin,
};
