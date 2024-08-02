import cron from "node-cron";
import welcomeTask from "./tasks/welcome.task";
import appLogger from "../config/app-logger.config";

// Define cron jobs
cron.schedule("0 0 * * *", async () => {
  try {
    await welcomeTask();
    appLogger.info("Welcome task completed successfully.");
  } catch (error) {
    appLogger.error("Error performing welcome task:", error);
  }
});

export default cron;
