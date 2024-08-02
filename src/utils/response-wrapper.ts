import { Response } from "express";
import httpStatus from "http-status";
import ApiResponse from "../interface/api-response.interface";

type WrapperData = {
  statusCode: number;
  message: string;
  data?: object | null;
};

export const wrapResponse = (
  res: Response,
  { statusCode = httpStatus.OK, message = "", data = null }: WrapperData
) => {
  const isSuccess = statusCode >= 200 && statusCode < 300;
  const response: ApiResponse = {
    status: isSuccess ? "success" : "failure",
    statusCode,
    message,
  };

  if (data) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};
