import { Response } from "express";

export const sendResponse = <T>(res: Response, json: {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
  }): void => {
    res.status(json.statusCode).json({
      success: json.success,
      message: json.message,
      data: json.data,
    });
 };