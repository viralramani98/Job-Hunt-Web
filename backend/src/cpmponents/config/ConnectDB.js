import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoDB_URL = process.env.MONGODB_URL;

export async function connectDB() {
  try {
    await mongoose.connect(MongoDB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error while connecting to database", error.message);
  }
}
