import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const seedsuperAdmin = async () => {
  // check superAdmin exist
  const issuperAdminExits = await prisma.user.findFirst({
    where: {
      OR: [{ role: "superAdmin" }, { email: "junayetshiblu0@gmail.com" }],
    },
  });

  if (!issuperAdminExits) {
    const hashedPassword = await bcrypt.hash("admin123", 10); // ✅ hash password

    await prisma.user.create({
      data: {
        email: "junayetshiblu0@gmail.com",
        name: "Junayet Shiblu",
        password: hashedPassword, // ✅ save hashed password
        role: "superAdmin",
        studentId: "CS-2203073",
        bloodGroup: "O_POS",
      },
    });
  }
};

export default seedsuperAdmin;
