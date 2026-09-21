import mongoose from 'mongoose';
async function connectDB(){
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("connected to database");
}

export default connectDB;