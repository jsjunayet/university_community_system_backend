import { prisma } from "../../share/prismaClient";

const createJobPost = async (payload: any, userId: string, status: string) => {
  return await prisma.jobPost.create({
    data: { ...payload, authorId: userId, status: status },
  });
};

const getAllJobPosts = async () => {
  console.log("hello ");
  return await prisma.jobPost.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
};
const getAllJobPostsForUser = async () => {
  return await prisma.jobPost.findMany({
    where: { status: "approved" },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
};

const getMyJobPosts = async (userId: string) => {
  return await prisma.jobPost.findMany({
    where: { authorId: userId },
    include: {
      author: true,
      applications: {
        include: {
          user: true,
        },
      },
    },
  });
};

const updateJobPost = async (id: string, payload: any, userId: string) => {
  return await prisma.jobPost.updateMany({
    where: { id, authorId: userId },
    data: payload,
  });
};

const deleteJobPost = async (id: string, userId: string) => {
  return await prisma.jobPost.delete({
    where: { id },
  });
};

// ✅ Admin approve/reject
const approveOrRejectJobPost = async (
  id: string,
  status: "approved" | "rejected"
) => {
  return await prisma.jobPost.update({
    where: { id },
    data: { status },
  });
};

export const jobPostService = {
  createJobPost,
  getAllJobPosts,
  getMyJobPosts,
  updateJobPost,
  deleteJobPost,
  approveOrRejectJobPost,
  getAllJobPostsForUser,
};
