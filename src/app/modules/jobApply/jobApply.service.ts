import { AppStatus } from "@prisma/client";
import { prisma } from "../../share/prismaClient";

// Apply job
const applyJob = async (payload: any, userId: string) => {
  return await prisma.jobApplication.create({
    data: { ...payload, userId, status: "PENDING" },
  });
};

// Cancel application
const cancelJobApplication = async (id: string, userId: string) => {
  return await prisma.jobApplication.deleteMany({
    where: { id, userId },
  });
};

// Get applications for a job (author/admin)
const getApplicationsForJob = async (jobPostId: string) => {
  return await prisma.jobApplication.findMany({
    where: { jobPostId },
    include: { user: true, jobPost: true },
  });
};
const getApplicationsForMyJob = async (userId: string) => {
  console.log(userId);
  return await prisma.jobApplication.findMany({
    where: { userId },
    include: { user: true, jobPost: true },
  });
};
// Approve/Reject application
const updateJobApplicationStatus = async (id: string, status: AppStatus) => {
  return await prisma.jobApplication.update({
    where: { id },
    data: { status },
  });
};

export const jobApplicationService = {
  applyJob,
  cancelJobApplication,
  getApplicationsForJob,
  updateJobApplicationStatus,
  getApplicationsForMyJob,
};
