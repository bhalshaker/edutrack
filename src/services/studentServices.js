import { Student } from "../models/studentModel.js";
import mongoose from "mongoose";

const getAllStudentsService = async () => {
  try {
    const allStudents = await Student.find();
    return allStudents;
  } catch (error) {
    console.error("###  Error - getting all students", error);
    throw new Error("Could not retrieve all students");
  }
};
const createStudentService = async (studentData) => {
  try {
    const student = new Student(studentData);
    await student.save();
    return student;
  } catch (error) {
    console.error(
      `###  Error - not save student ${JSON.stringify(studentData)} due to`,
      error
    );
    throw new Error("Could not save the new student");
  }
};
const getStudentByIdService = async (studentId) => {
  try {
    // If the studentId looks like an auto-increment numeric id (e.g. "1"),
    // search by the studentId field. Otherwise, if it's a valid ObjectId,
    // search by _id. If it's neither, return null so controller can return 404.
    if (/^\d+$/.test(String(studentId))) {
      const student = await Student.findOne({ studentId: Number(studentId) });
      return student;
    }

    if (mongoose.Types.ObjectId.isValid(String(studentId))) {
      const student = await Student.findById(studentId);
      return student;
    }

    // Not a numeric id nor a valid ObjectId -> no result
    return null;
  } catch (error) {
    console.error(
      `###  Error - not find student with id ${studentId} due to`,
      error
    );
    throw new Error("Could not find the student");
  }
};
const updateStudentByIdService = async (studentId, updatedData) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      Number(studentId),
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedStudent;
  } catch (error) {
    console.error(
      `###  Error - not find update student ${studentId} with following data ${JSON.stringify(
        updatedData
      )} due to`,
      error
    );
    throw new Error("Could not update the student");
  }
};
const deleteStudentByIdService = async (studentId) => {
  try {
    await Student.findByIdAndDelete(Number(studentId));
  } catch (error) {
    console.error(
      `###  Error - not delete the student with id ${studentId} due to`,
      error
    );
    throw new Error("Could not delete the student");
  }
};

export {
  getAllStudentsService,
  createStudentService,
  getStudentByIdService,
  updateStudentByIdService,
  deleteStudentByIdService,
};
