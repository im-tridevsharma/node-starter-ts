import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import appLogger from "../config/app-logger.config";

const applicationErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  appLogger.error(`Error occurred: ${err.message}`, {
    method: req.method,
    url: req.url,
    stack: err.stack,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
  });

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    error: {
      message: err.message,
      status: httpStatus.INTERNAL_SERVER_ERROR,
    },
  });
};

export default applicationErrorHandler;
