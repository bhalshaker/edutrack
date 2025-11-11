import mongoose from "mongoose";
import config from "./config.js";

const connectDatabase = async () => {
  try {
    console.log(`Database URL value: ${config.MONGO_URI}`);
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log(
      `✅ MongoDB successfully connected to: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(`❌ Error occured while connected to DB: ${error.message}`);
    process.exit(1);
  }
};

export { connectDatabase };
