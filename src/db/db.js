import mongoose from "mongoose";
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("conected to databases");
  } catch (err) {
    console.error("database is not connected", err);
  }
}

export default connectDB;
