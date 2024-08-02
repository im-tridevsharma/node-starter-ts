import { Request, Response } from "express";

// Define the rate limit options type
interface RateLimitOptions {
  windowMs: number;
  max: number;
  message: string;
  standardHeaders: boolean;
  legacyHeaders: boolean;
  handler: (req: Request, res: Response) => void;
  skipSuccessfulRequests: boolean;
}

// Create the rate limit options object
const rateLimitOptions: RateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      status: "error",
      statusCode: 429,
      message: "You have exceeded the rate limit. Please try again later.",
    });
  },
  skipSuccessfulRequests: false, // Count successful requests as well as failed ones
};

// Export the rate limit configuration
export default rateLimitOptions;
