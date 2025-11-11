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

StudentRouter.get("/", getAllStudents);
StudentRouter.post(
  "/",
  validateSchemas(createStudentSchema, "body"),
  createStudent
);
StudentRouter.get(
  "/:studentId",
  validateSchemas(studentIdSchema, "params"),
  getStudentById
);
StudentRouter.patch(
  "/:studentId",
  validateSchemas(studentIdSchema, "params"),
  validateSchemas(updateStudentSchema, "body"),
  updateStudentById
);
StudentRouter.delete(
  "/:studentId",
  validateSchemas(studentIdSchema, "params"),
  deleteStudentById
);

export { StudentRouter };
