import { PrismaClient, user } from "@prisma/client";

import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendEmail } from "../../config/sendMail";
const prisma = new PrismaClient();
const Registeruser = async (payload: user) => {
  const existinguser = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload.email }],
    },
  });

  if (existinguser) {
    if (existinguser.email === payload.email) {
      return {
        success: false,
        message: "This email is already registered",
        data: {},
      };
    }
    if (existinguser.studentId === payload.studentId) {
      return {
        success: false,
        message: "This user ID is already registered",
        data: {},
      };
    }
  }
  console.log(payload);
  const passwordHash = await bcrypt.hash(payload.password, 10);
  const result = await prisma.user.create({
    data: {
      email: payload.email,
      image: payload.image,
      name: payload.name,

      studentId: payload.studentId,
      password: passwordHash,
      role: payload.role,
      bloodGroup: payload.bloodGroup,
    },
  });
  const subject = "Welcome to Uni-Nexus-Community";

  const emailContent = `
  <h2 style="color: #4CAF50; text-align: center;">Welcome to Uni-Nexus-Community!</h2>
  <p>Dear ${payload?.name},</p>
  <p>Congratulations! Your account has been successfully created on <strong>Uni-Nexus-Community</strong>. You now have access to the platform and can start exploring our educational tools and features.</p>
  
  <h3>Your Account Details:</h3>
  <ul>
    <li><strong>ID:</strong> ${payload.studentId}</li>
    <li><strong>Password:</strong> ${payload.password}</li>
    <li><strong>Role:</strong> ${result?.role}</li>
  </ul>
  
  <p>🔒 For your security, we strongly recommend changing your password immediately after your first login.</p>

  <p>
    <a href="${"http://localhost:8080/login"}" 
       style="background-color: #4CAF50; color: white; padding: 10px 20px; 
              text-decoration: none; border-radius: 5px; display: inline-block;">
      Log In to EduSync
    </a>
  </p>

  <p>If you have any questions or face any issues, feel free to contact our support team.</p>

  <p>Best regards,</p>
  <p><strong>The Uni-Nexus-Community Team</strong></p>
`;
  await sendEmail(result.email, emailContent, subject);
  const { password, ...userWithoutPassword } = result;
  return userWithoutPassword;
};
const loginuser = async (payload: Partial<user>) => {
  const { email, password } = payload;

  const existinguser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existinguser) {
    throw new Error("user not found");
  }

  const isPasswordValid = await bcrypt.compare(
    password as string,
    existinguser.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const accessToken = jwt.sign(
    {
      id: existinguser.id,
      email: existinguser.email,
      role: existinguser.role,
      image: existinguser.image,
      name: existinguser.name,
      bloodGroup: existinguser.bloodGroup,
    },
    (process.env.ACCESS_TOKEN_SECRET as string) || "access-secret",
    {
      expiresIn: "7d", // shorter expiry for access token
    }
  );

  const refreshToken = jwt.sign(
    {
      id: existinguser.id,
      email: existinguser.email,
      role: existinguser.role,
      image: existinguser.image,
      name: existinguser.name,

      bloodGroup: existinguser.bloodGroup,
    },
    (process.env.REFRESH_TOKEN_SECRET as string) || "refresh-secret",
    {
      expiresIn: "7d",
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};
const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  // 1. Find user
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return { success: false, message: "user not found", data: {} };
  }

  // 2. Check old password
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return { success: false, message: "Old password is incorrect", data: {} };
  }

  // 4. Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // 5. Update user
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return { success: true, message: "Password changed successfully", data: {} };
};

const getAlluser = async () => {
  const result = await prisma.user.findMany();
  return result;
};
const getSingleuser = async (userId: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
  return result;
};
const getSingleuserToken = async (userId: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    include: {
      posts: true,
      comments: true,
    },
  });
  return result;
};
const roleUpdate = async (userId: string, payload: Partial<user>) => {
  console.log(payload.role);
  const exituser = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: payload.role,
    },
  });
  return result;
};
const deleteduser = async (userId: string) => {
  const result = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return result;
};
const refreshAccessToken = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    (process.env.REFRESH_TOKEN_SECRET as string) || "refresh-secret"
  ) as JwtPayload;

  const existinguser = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!existinguser) {
    throw new Error("user not found");
  }

  const newAccessToken = jwt.sign(
    {
      id: existinguser.id,
      email: existinguser.email,
      role: existinguser.role,
      image: existinguser.image,
      name: existinguser.name,
      bloodGroup: existinguser.bloodGroup,
    },
    (process.env.ACCESS_TOKEN_SECRET as string) || "access-secret",
    {
      expiresIn: "15m",
    }
  );

  return { accessToken: newAccessToken };
};
const dashboardMetaData = async (userId: string, role: string) => {
  if (role === "admin" || role === "superAdmin") {
    const totalUsers = await prisma.user.count();
    const totalRequests = await prisma.bloodRequest.count();
    const totalJobs = await prisma.jobPost.count();
    const totalEvents = await prisma.event.count();

    return [
      {
        title: "Total Users",
        value: totalUsers,
        icon: "Users",
        trend: "+124 this month", // চাইলে dynamic logic বসাতে পারো
      },
      {
        title: "Active Events",
        value: totalEvents,
        icon: "Calendar",
        trend: "+3 this week",
      },
      {
        title: "Blood Requests",
        value: totalRequests,
        icon: "Heart",
        trend: "5 urgent",
      },
      {
        title: "Pending Applications",
        value: totalJobs,
        icon: "Briefcase",
        trend: "Review needed",
      },
    ];
  } else if (role === "student") {
    const myRequestsCount = await prisma.bloodRequest.count({
      where: { requesterId: userId },
    });
    const myJobsCount = await prisma.jobApplication.count({
      where: { userId },
    });
    const myEventsCount = await prisma.eventJoin.count({
      where: { userId },
    });
    const myMentorships = await prisma.post.count({
      where: { userId: userId },
    });

    return [
      {
        title: "Blood Donations",
        value: myRequestsCount || 0,
        icon: "Heart",
        trend: "+1 this month",
      },
      {
        title: "Events Attended",
        value: myEventsCount || 0,
        icon: "Calendar",
        trend: "+2 this week",
      },
      {
        title: "Job Applications",
        value: myJobsCount || 0,
        icon: "Briefcase",
        trend: "2 pending",
      },
      {
        title: "All Community Post",
        value: myMentorships || 0,
        icon: "Users",
        trend: "+3 this month",
      },
    ];
  } else if (role === "alumni") {
    const myJobsCount = await prisma.jobPost.count({
      where: { authorId: userId },
    });
    const myEventsCount = await prisma.event.count({
      where: { organizerId: userId },
    });
    const myMentorships = await prisma.post.count({
      where: { userId: userId },
    });
    const myRequestsCount = await prisma.bloodRequest.count({
      where: { requesterId: userId },
    });

    return [
      {
        title: "Jobs Posted",
        value: myJobsCount || 0,
        icon: "Briefcase",
        trend: "+1 this month",
      },
      {
        title: "Events Organized",
        value: myEventsCount || 0,
        icon: "Calendar",
        trend: "+1 this week",
      },
      {
        title: "All Community Post",
        value: myMentorships || 0,
        icon: "Users",
        trend: "+3 this month",
      },
      {
        title: "Blood Donations",
        value: myRequestsCount || 0,
        icon: "Heart",
        trend: "Regular donor",
      },
    ];
  } else {
    throw new Error("Role not supported");
  }
};
export const userService = {
  Registeruser,
  loginuser,
  getAlluser,
  getSingleuser,
  roleUpdate,
  deleteduser,
  refreshAccessToken,
  getSingleuserToken,
  changePassword,
  dashboardMetaData,
};
