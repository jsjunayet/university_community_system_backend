import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// user join request (pending)
const joinEvent = async (eventId: string, userId: string) => {
  console.log(eventId);
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) throw new Error("Event not found");
  if (event.status !== "approved") throw new Error("Event is not approved yet");

  const already = await prisma.eventJoin.findUnique({
    where: { userId_eventId: { userId, eventId } },
  });
  if (already) throw new Error("Already requested to join this event");

  const result = await prisma.eventJoin.create({
    data: {
      eventId,
      userId,
      status: "PENDING",
    },
  });

  return result;
};

// Organizer approves join request
const approveJoin = async (
  joinId: string,
  organizerId: string,
  meetLink: string
) => {
  const joinReq = await prisma.eventJoin.findUnique({
    where: { id: joinId },
    include: { event: true },
  });
  if (!joinReq) throw new Error("Join request not found");

  // Only organizer can approve
  if (joinReq.event.organizerId !== organizerId) {
    throw new Error("You are not the organizer of this event");
  }

  // Check max participants
  const approvedCount = await prisma.eventJoin.count({
    where: { eventId: joinReq.eventId, status: "ACCEPTED" },
  });
  if (approvedCount >= joinReq.event.maxParticipants) {
    throw new Error("Max participants limit reached");
  }

  const result = await prisma.eventJoin.update({
    where: { id: joinId },
    data: {
      status: "ACCEPTED",
      meetLink,
      joinedAt: new Date(),
    },
  });
  return result;
};

// Organizer rejects join request
const rejectJoin = async (joinId: string, organizerId: string) => {
  const joinReq = await prisma.eventJoin.findUnique({
    where: { id: joinId },
    include: { event: true },
  });
  if (!joinReq) throw new Error("Join request not found");
  if (joinReq.event.organizerId !== organizerId) {
    throw new Error("You are not the organizer of this event");
  }

  const result = await prisma.eventJoin.update({
    where: { id: joinId },
    data: { status: "REJECTED", meetLink: null },
  });
  return result;
};

// user view my join status
const getMyJoins = async (userId: string) => {
  const result = await prisma.eventJoin.findMany({
    where: { userId },
    include: { event: true },
  });
  return result;
};

export const eventJoinService = {
  joinEvent,
  approveJoin,
  rejectJoin,
  getMyJoins,
};
