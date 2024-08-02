import { createLogger, format, transports, Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import CloudWatchTransport from 'winston-cloudwatch';
import path from 'path';

// Destructure necessary functions and classes from winston.format
const { combine, timestamp, printf, errors, splat, json } = format;

// Custom format for logging
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Determine if the app is in development mode
const isDevelopment = process.env.NODE_ENV === 'development';
const logDriver = process.env.LOG_DRIVER || 'file';

// Create the logger
const appLogger: Logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    splat(),
    json()
  ),
  defaultMeta: { logger: 'winston' },
  transports: [],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, '../logs', 'exceptions.log'),
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: path.join(__dirname, '../logs', 'rejections.log'),
    }),
  ],
});

// Configure transports based on LOG_DRIVER
if (logDriver === 'cloud') {
  appLogger.add(
    new CloudWatchTransport({
      logGroupName: process.env.CLOUDWATCH_LOG_GROUP_NAME,
      logStreamName: process.env.CLOUDWATCH_LOG_STREAM_NAME,
      awsRegion: process.env.AWS_REGION,
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
      jsonMessage: true,
    })
  );
} else {
  appLogger.add(
    new DailyRotateFile({
      filename: path.join(__dirname, '../logs', 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    })
  );
}

// Add console transport if in development mode
if (isDevelopment) {
  appLogger.add(
    new transports.Console({
      format: combine(format.colorize(), logFormat),
    })
  );
}

export default appLogger;