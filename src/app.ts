/**
 * Start of the Node Js Application using Express.
 * ----------------Let's Start-------------------
 */

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Load cron jobs
import "./cron-jobs";

// Load workers
import "./jobs/worker";

/* Get all the modules required... */
import express, { Application } from "express";
import helmet from "helmet";
import expressRateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import { applicationRouteHandler } from "./routes"; // Main route handler

// Service load
import applicationErrorHandler from "./services/app/application-error-handler.service";
import connectMongoose from "./services/app/mongoose-connect.service";

// Get all the configs
import helmetOptions from "./config/helmet.config";
import rateLimitOptions from "./config/express-rate-limit.config";
import httpLogger from "./config/http-logger.config";
import corsOptions from "./config/cors.config";
import appLogger from "./config/app-logger.config";

// Get all the middlewares
import responseBodyInterceptor from "./middlewares/response-interceptor.middleware";
import csrfProtection from "./middlewares/csrf.middleware";

// Application instance
const app: Application = express();

// Security middlewares
app.use(helmet(helmetOptions));

// HPP middleware to prevent HTTP Parameter Pollution
app.use(hpp());

// Logger
app.use(httpLogger());

// CORS setup
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable pre-flight requests for all routes

// Compression middleware
app.use(compression());

// Express middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "500kb" })); //limit the request data
app.use(cookieParser());

// XSS middleware
app.use(xssClean());
app.use(mongoSanitize());

// Apply CSRF protection middleware
app.use(csrfProtection);

// Request limiter
app.use(expressRateLimit(rateLimitOptions));

// Response body interceptor middleware
app.use(responseBodyInterceptor);

//connect to database: mongoose
connectMongoose();

// Handle all the requests
app.use(applicationRouteHandler);

// Application unexpected error handler
app.use(applicationErrorHandler);

// Start the application
const PORT: number = parseInt(process.env.SERVER_PORT || "3000", 10); // Default port
const applicationMode: string = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  appLogger.info(
    `Application is running on port: ${PORT} | Application Mode: ${applicationMode}`
  );
});
