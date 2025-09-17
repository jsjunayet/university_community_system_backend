import { AppStatus } from "@prisma/client";
import { prisma } from "../../share/prismaClient";

// Donor apply for a blood request
const joinBloodDonation = async (
  payload: any,
  donorId: string,
  requestId: string
) => {
  return await prisma.donationJoin.create({
    data: {
      ...payload,
      donorId,
      requestId,
      status: "PENDING",
    },
  });
};

// Donor cancel his donation join
const cancelBloodDonationJoin = async (id: string, donorId: string) => {
  return await prisma.donationJoin.deleteMany({
    where: { id, donorId },
  });
};

// Get all donors for a specific blood request (admin/requester দেখতে পারবে)
const getDonorsForRequest = async (requestId: string) => {
  return await prisma.donationJoin.findMany({
    where: { requestId },
    include: { donor: true, request: true },
  });
};

// Get all my donation joins (একজন donor কতগুলা request এ apply করেছে)
const getMyDonationJoins = async (donorId: string) => {
  return await prisma.donationJoin.findMany({
    where: { donorId },
    include: { request: true },
  });
};

// Approve/Reject donor by admin/request owner
const updateDonationJoinStatus = async (
  id: string,
  status: "ACCEPTED" | "REJECTED"
) => {
  console.log(status);
  return await prisma.donationJoin.update({
    where: { id },
    data: { status: status.trim() as AppStatus },
  });
};

export const BloodDonationJoinService = {
  joinBloodDonation,
  cancelBloodDonationJoin,
  getDonorsForRequest,
  getMyDonationJoins,
  updateDonationJoinStatus,
};
