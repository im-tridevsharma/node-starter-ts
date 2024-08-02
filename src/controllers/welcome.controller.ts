import { Request, Response, NextFunction } from "express";
import { addToWelcomeJobQueue } from "../jobs/queue/welcome-job.queue";

// Add next: NextFunction as a parameter to handle errors properly
const sayWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await addToWelcomeJobQueue({ message: "Welcome from Job!" });
    res.status(200).json({ message: "Welcome to the API!" });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

const welcomeController = {
  sayWelcome,
};

export default welcomeController;
