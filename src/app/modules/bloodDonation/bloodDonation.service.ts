import { prisma } from "../../share/prismaClient";
import { fcm } from "../../utils/firebaseAdmin";

const createBloodRequest = async (
  payload: any,
  userId: string,
  role: string
) => {
  const status =
    role === "admin" || role === "superAdmin" ? "approved" : "pending";

  const request = await prisma.bloodRequest.create({
    data: { ...payload, requesterId: userId, status: status },
  });

  // সব user token নাও
  const tokens = await prisma.deviceToken.findMany();
  const tokenList = tokens.map((t) => t.token);
  console.log(tokenList, "tokenList");

  if (tokenList.length > 0) {
    const res = await fcm.sendEachForMulticast({
      tokens: tokenList,
      notification: {
        title: "🚨 New Blood Request",
        body: `Patient needs ${request.bloodType}. Please check!`,
      },
      data: {
        requestId: request.id,
        url: "http://localhost:3000/blood-donation",
      },
    });
    console.log(res, "this");
  }

  return request;
};

const getAllBloodRequests = async () => {
  return await prisma.bloodRequest.findMany({
    include: { requester: true },
    orderBy: { createdAt: "desc" },
  });
};

const getMyBloodRequests = async (userId: string) => {
  return await prisma.bloodRequest.findMany({
    where: { requesterId: userId },
    include: {
      requester: true,
      donations: {
        include: {
          donor: true, // fetch donor name/email so frontend can show it
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getuserBloodRequest = async (id: string) => {
  return await prisma.bloodRequest.findMany({
    include: { requester: true },
    orderBy: { createdAt: "desc" },
  });
};

const updateBloodRequest = async (id: string, payload: any, userId: string) => {
  return await prisma.bloodRequest.updateMany({
    where: { id, requesterId: userId },
    data: payload,
  });
};

const deleteBloodRequest = async (id: string, userId: string) => {
  return await prisma.bloodRequest.delete({
    where: { id },
  });
};

// ✅ Admin approve/reject
const approveOrRejectBloodRequest = async (
  id: string,
  status: "approved" | "rejected"
) => {
  return await prisma.bloodRequest.update({
    where: { id },
    data: { status },
  });
};

export const BloodRequestService = {
  createBloodRequest,
  getAllBloodRequests,
  getMyBloodRequests,
  getuserBloodRequest,
  updateBloodRequest,
  deleteBloodRequest,
  approveOrRejectBloodRequest,
};
