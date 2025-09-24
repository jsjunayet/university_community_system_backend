import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createEvent = async (payload: any, userId: string, role: string) => {
  const status =
    role === "admin" || role === "superAdmin" ? "approved" : "pending";
  console.log(role, status);
  const result = await prisma.event.create({
    data: {
      ...payload,
      organizerId: userId,
      status: status,
    },
  });
  return result;
};

const getAllEvents = async () => {
  const result = await prisma.event.findMany({
    where: { status: "approved" }, // শুধু approved ইভেন্ট
    include: {
      organizer: {
        select: { id: true, name: true, email: true },
      },
      participants: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return result;
};
const getallEventForAdmin = async () => {
  const result = await prisma.event.findMany({
    include: {
      organizer: {
        select: { id: true, name: true, email: true },
      },
      participants: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return result;
};
const getMyEvents = async (userId: string) => {
  const result = await prisma.event.findMany({
    where: { organizerId: userId },
    include: {
      organizer: {
        select: { id: true, name: true, email: true },
      },
      participants: {
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      },
    },
  });
  return result;
};

const updateEvent = async (eventId: string, userId: string, payload: any) => {
  const existing = await prisma.event.findUnique({ where: { id: eventId } });
  if (!existing) throw new Error("Event not found");
  if (existing.organizerId !== userId)
    throw new Error("You are not the organizer of this event");

  const result = await prisma.event.update({
    where: { id: eventId },
    data: payload,
  });
  return result;
};

const deleteEvent = async (eventId: string, userId: string) => {
  const existing = await prisma.event.findUnique({ where: { id: eventId } });
  if (!existing) throw new Error("Event not found");
  if (existing.organizerId !== userId)
    throw new Error("You are not the organizer of this event");

  const result = await prisma.event.delete({
    where: { id: eventId },
  });
  return result;
};

// ✅ admin Approval
const approveEvent = async (
  eventId: string,
  status: "approved" | "rejected"
) => {
  const result = await prisma.event.update({
    where: { id: eventId },
    data: { status },
  });
  return result;
};

export const eventService = {
  createEvent,
  getAllEvents,
  getMyEvents,
  updateEvent,
  deleteEvent,
  approveEvent,
  getallEventForAdmin,
};
