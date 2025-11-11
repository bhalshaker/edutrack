import dotenv from "dotenv";
import express from "express";
import { connectDatabase } from "./src/config/db.js";
import config from "./src/config/config.js";
import { StudentRouter } from "./src/routes/studentRoutes.js";

// Load the environment variables from .env file
dotenv.config();
// Connect to the database server
connectDatabase();
// Initilize Express application
const app = express();
// Enable JSON parsing for incoming requests
app.use(express.json());
app.use("/api", StudentRouter);

app.listen(config.PORT, () =>
  console.log(
    `🌐 The server is running in ${config.NODE_ENV} mode on port ${config.PORT}`
  )
);
