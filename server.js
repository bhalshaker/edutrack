import express from "express";
import { connectDatabase } from "./src/config/db.js";
import config from "./src/config/config.js";
import { StudentRouter } from "./src/routes/studentRoutes.js";

// Initilize Express application
const app = express();
// Enable JSON parsing for incoming requests
app.use(express.json());
app.use("/api/students", StudentRouter);

// Only start the server when not running tests. Jest sets NODE_ENV=test.
if (process.env.NODE_ENV !== "test") {
  // Connect to the database server
  connectDatabase();

  app.listen(config.PORT, () =>
    console.log(
      `🌐 The server is running in ${config.NODE_ENV} mode on port ${config.PORT}`
    )
  );
}

// Export the app for tests to import without starting a second listener
export default app;
