import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const config = {
  PORT: parseInt(process.env.PORT, 10) || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "",
};

export default config;
