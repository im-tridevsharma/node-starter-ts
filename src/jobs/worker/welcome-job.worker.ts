import { Worker, Job } from "bullmq";
import appLogger from "../../config/app-logger.config";
import redisOptions from "../../config/redis.config";

// Define the worker for the 'welcomeJobQueue'
const welcomeJobWorker = new Worker(
  "welcomeJobQueue",
  async (job: Job) => {
    try {
      appLogger.info(`Processing job from Welcome Queue: ${job.id}`);
      appLogger.info(`Job data: ${JSON.stringify(job.data)}`);

      // Simulate job processing
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      throw err;
    }
  },
  { connection: redisOptions }
);

// Event listeners for job completion and failure
welcomeJobWorker.on("completed", (job: Job) => {
  appLogger.info(`Job ${job.id} from Welcome Queue completed successfully`);
});

welcomeJobWorker.on("failed", (job: Job | undefined, err: Error) => {
  if (job) {
    appLogger.error(
      `Job ${job.id} from Welcome Queue failed with error: ${err.message}`
    );
  } else {
    appLogger.error("Job from Welcome Queue failed with error:", err);
  }
});

export default welcomeJobWorker;
