import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// join tour
const joinTour = async (payload: any, userId: string) => {
  return await prisma.tourJoin.create({
    data: {
      ...payload,
      userId,
      status: "PENDING",
      verified: false,
    },
  });
};

// get joins for tour (author/admin)
const getJoinsByTour = async (tourId: string) => {
  return await prisma.tourJoin.findMany({
    where: { tourId },
    include: { user: true },
  });
};

// get user’s own joins
const getUserJoins = async (userId: string) => {
  return await prisma.tourJoin.findMany({
    where: { userId },
    include: { tour: true, user: true },
    orderBy: { createdAt: "desc" },
  });
};

// verify join (admin only)
const verifyJoin = async (
  id: string,
  status: "PENDING" | "ACCEPTED" | "REJECTED"
) => {
  console.log(status);
  return await prisma.tourJoin.update({
    where: { id },
    data: {
      verified: status === "ACCEPTED",
      status,
    },
  });
};

export const tourJoinService = {
  joinTour,
  getJoinsByTour,
  getUserJoins,
  verifyJoin,
};
