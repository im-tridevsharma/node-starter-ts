import { CorsOptions, CorsOptionsDelegate } from "cors";
import { Request } from "express";

// Load allowed origins from environment variables
const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(",") || [];

// Define the CORS options type
const corsOptions: CorsOptions | CorsOptionsDelegate<Request> = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, success: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Export the CORS options
export default corsOptions;
