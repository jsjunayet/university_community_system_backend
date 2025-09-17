import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config();

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
      throw new Error("This token does not exist");
    }

    try {
      const decoded = jwt.verify(
        token,
        "access-secret" as string
      ) as JwtPayload;

      if (!decoded) {
        throw new Error("This user is not authorized");
      }
      if (!roles.includes(decoded.role)) {
        throw new Error("Forbidden: Insufficient permissions!");
      }

      req.user = decoded;
      next();
    } catch (error: unknown) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid or expired token");
      }
      next(error);
    }
  };
};
