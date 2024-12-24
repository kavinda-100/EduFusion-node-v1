import * as mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI_DEV = process.env.MONGO_URI_DEV as string;
const MONGO_URI = process.env.MONGO_URI as string;

const MONGODB_URI =
  process.env.DEV_MODE === "development" ? MONGO_URI_DEV : MONGO_URI;

export const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

export const disconnectFromDB = async () => {
  return await mongoose.disconnect();
};
