import { approveStatus, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// create tour (student/alumni/author)
const createTour = async (payload: any, userId: string) => {
  return await prisma.groupTour.create({
    data: { ...payload, authorId: userId, status: "pending" },
  });
};

// get all tours (only approved for user)
const getAllTours = async () => {
  return await prisma.groupTour.findMany({
    where: { status: "approved" },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
};

// get tour by id
const getTourMy = async (id: string) => {
  return await prisma.groupTour.findMany({
    where: { authorId: id },
    include: {
      author: true,
      tourJoins: {
        include: {
          user: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};
const getTourDeleted = async (id: string) => {
  return await prisma.groupTour.delete({
    where: { id },
    include: { author: true, tourJoins: true },
  });
};
const getTourForAdmin = async () => {
  return await prisma.groupTour.findMany({
    include: { author: true, tourJoins: true },
  });
};
// approve/reject tour (admin only)
const updateTourStatus = async (id: string, status: approveStatus) => {
  return await prisma.groupTour.update({
    where: { id },
    data: { status },
  });
};
export const tourService = {
  createTour,
  getAllTours,
  getTourDeleted,
  getTourForAdmin,
  getTourMy,

  updateTourStatus,
};
