import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db";
import config from "./src/config/config";
import studentRoutes from "./src/routes/studentRoutes";

// Load the environment variables from .env file
dotenv.config();
// Connect to the database server
connectDB();

const app = express();
app.use(express.json());
app.use("/api", studentRoutes);

app.listen(config.PORT, () =>
  console.log(
    `🌐 The server is running in ${config.NODE_ENV} mode on port ${config.PORT}`
  )
);
