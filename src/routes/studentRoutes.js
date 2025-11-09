import express from "express";
const Router = express.Router();
import {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} from "../controllers/studentController";
import {
  createStudentSchema,
  studentIdSchema,
  updateStudentSchema,
} from "../schemas/studentSchemas";

import { validateSchemas } from "../utility/schemaValidation";

Router.get("/", getAllStudents);
Router.post("/", validateSchemas(createStudentSchema, "body"), createStudent);
Router.get(
  "/:studentId",
  validateSchemas(studentIdSchema, "params"),
  getStudentById
);
Router.patch(
  "/:studentId",
  validateSchemas(studentIdSchema, "params"),
  validateSchemas(updateStudentSchema, "body"),
  updateStudentById
);
Router.delete(
  "/:studentId",
  validateSchemas(studentIdSchema, "params"),
  deleteStudentById
);

module.exports = Router;
