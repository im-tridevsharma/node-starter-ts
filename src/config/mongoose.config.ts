import mongoose from "mongoose";

export const MONGO_USER = process.env.MONGO_USER || "";
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
export const MONGO_URL = process.env.MONGO_URL || "";
export const MONGO_TABLE = process.env.MONGO_TABLE || "";
export const MONGO_LOCAL_URI = process.env.MONGO_LOCAL_URI || "";
export const MONGO_OPTIONS: mongoose.ConnectOptions = {
  retryWrites: true,
  w: "majority",
};

const isDevelopment = process.env.NODE_ENV === "development";

export const mongoOptions = {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_URL,
  MONGO_TABLE,
  MONGO_OPTIONS,
  MONGO_CONNECTION: isDevelopment
    ? MONGO_LOCAL_URI
    : `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_TABLE}`,
};
