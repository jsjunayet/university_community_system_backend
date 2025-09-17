// routes/token.route.ts

import { Router } from "express";
import { prisma } from "../../share/prismaClient";

const router = Router();

router.post("/save-token", async (req, res) => {
  const { userId, token } = req.body;
  try {
    await prisma.deviceToken.upsert({
      where: { token },
      update: { userId },
      create: { userId, token },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Error saving token" });
  }
});

export const NotificationRoute = router;
