import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
}
