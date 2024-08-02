import { Request, Response, NextFunction } from "express";
import { addToWelcomeJobQueue } from "../jobs/queue/welcome-job.queue";
import httpStatus from "http-status";
import messages from "../config/messages.config";
import { wrapResponse } from "../utils/response-wrapper";

// Add next: NextFunction as a parameter to handle errors properly
const sayWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //add to queue
    await addToWelcomeJobQueue({ message: "Welcome from Job!" });

    wrapResponse(res, {
      statusCode: httpStatus.OK,
      message: messages.welcome.hello,
    });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

const welcomeController = {
  sayWelcome,
};

export default welcomeController;
