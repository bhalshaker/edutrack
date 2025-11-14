import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// config dictionary with populated values from OS ENV
const config = {
  PORT: parseInt(process.env.PORT, 10) || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "",
};

// Export config dictionary
export default config;
