import mongoose from "mongoose";
import { mongoOptions } from "../../config/mongoose.config";
import appLogger from "../../config/app-logger.config";

const connectMongoose = async () => {
  try {
    const connection = await mongoose.connect(
      mongoOptions.MONGO_CONNECTION,
      mongoOptions.MONGO_OPTIONS
    );

    appLogger.info(
      `Mongoose connected successfully. Version: ${connection.version}`
    );
  } catch (error) {
    appLogger.error("Mongoose Connect Error: ", error);
  }
};

export default connectMongoose;
