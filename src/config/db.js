import mongoose from "mongoose";
import config from "./config";

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI, {
      // MongoDB connection options
      useNewUrlParser: true,
      userUnifiedTopology: true,
    });
    console.log(
      `✅ MongoDB successfully connected to: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(`❌ Error occured while connected to DB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
