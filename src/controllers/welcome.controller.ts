import { Request, Response } from "express";
import { addToWelcomeJobQueue } from "../jobs/queue/welcome-job.queue";
import httpStatus from "http-status";
import messages from "../config/messages.config";
import { wrapResponse } from "../utils/response-wrapper";
import { Welcome } from "../models/welcome.model";

// Add next: NextFunction as a parameter to handle errors properly
const sayWelcome = async (req: Request, res: Response): Promise<void> => {
  try {
    //add to queue
    await addToWelcomeJobQueue({ message: "Welcome from Job!" });

    //get all the welcome messages
    const welcomeData = await Welcome.find();

    wrapResponse(res, {
      statusCode: httpStatus.OK,
      message: messages.welcome.hello,
      data: welcomeData,
    });
  } catch (error) {
    wrapResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: messages.app.errors.internal_server_error,
    });
  }
};

const welcomeController = {
  sayWelcome,
};

export default welcomeController;
