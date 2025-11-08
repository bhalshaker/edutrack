import express from "express";
const Router = express.Router();
import {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} from "../controllers/studentController";

Router.get("/", getAllStudents);
Router.post("/", createStudent);
Router.get("/:studentId", getStudentById);
Router.put("/:studentId", updateStudentById);
Router.delete("/:studentId", deleteStudentById);

module.exports = Router;
