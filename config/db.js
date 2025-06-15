import mongoose from "mongoose";
import "dotenv/config";

const connectDb = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("DB connected");
    })
    .catch(() => {
      console.log("DB not connected");
    });
};

export default connectDb;
