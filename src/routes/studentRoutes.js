import express from "express";
const StudentRouter = express.Router();
import {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} from "../controllers/studentController.js";
import {
  createStudentSchema,
  studentIdSchema,
  updateStudentSchema,
} from "../schemas/studentSchemas.js";

import { validateSchemas } from "../utility/schemaValidation.js";

// Define routes for student operations
// GET /api/students - Retrieve all students
StudentRouter.get("/", getAllStudents);
// POST /api/students - Create a new student with payload validation
StudentRouter.post(
  "/",
  validateSchemas(createStudentSchema, "body"),
  createStudent
);
// GET /api/students/:studentId - Retrieve, update, or delete a student by ID with validation
StudentRouter.get(
  "/:studentId",
  validateSchemas(studentIdSchema, "params"),
  getStudentById
);
// PATCH /api/students/:studentId - Update a student by ID with payload and param validation
StudentRouter.patch(
  "/:studentId",
  validateSchemas(studentIdSchema, "params"),
  validateSchemas(updateStudentSchema, "body"),
  updateStudentById
);
// DELETE /api/students/:studentId - Delete a student by ID with param validation
StudentRouter.delete(
  "/:studentId",
  validateSchemas(studentIdSchema, "params"),
  deleteStudentById
);

export { StudentRouter };
