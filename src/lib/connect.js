import mongoose from "mongoose";
const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error while connecting to MongoDB ", err);
  }
};

export default connectDB;
