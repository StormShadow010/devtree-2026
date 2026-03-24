import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI || "mongodb://localhost:27017/devtree";
    await mongoose.connect(url);
    console.log(colors.cyan.bold("Connected to MongoDB"));
  } catch (error) {
    console.log(colors.bgRed.white.bold(error.message));
    process.exit(1);
  }
};
