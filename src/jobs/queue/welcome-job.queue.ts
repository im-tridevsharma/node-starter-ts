import { Queue } from 'bullmq';
import redisOptions from '../../config/redis.config';
import appLogger from '../../config/app-logger.config';

// Define the welcome job queue with Redis options
const welcomeJobQueue = new Queue('welcomeJobQueue', redisOptions);

// Function to add a job to the welcome job queue
export const addToWelcomeJobQueue = async (data: any): Promise<void> => {
  try {
    const job = await welcomeJobQueue.add('welcomeJob', data);
    appLogger.info(`Job added to Queue One with ID: ${job.id}`);
  } catch (err) {
    appLogger.error('Error adding job to welcome Queue:', err);
  }
};
